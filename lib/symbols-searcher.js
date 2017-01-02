'use babel';

import * as fs from 'fs';
import * as path from 'path';
import { BufferedProcess } from 'atom';

const RUST_PANIC = 101;
const RUSTSYM_SEARCH_FLAGS = {
  EXTENDED_LOCAL: '',
  LOCAL: '-l',
  GLOBAL: '-g'
};

export default class SymbolSearcher {

  static get MODE() {
    return RUSTSYM_SEARCH_FLAGS;
  }

  constructor() {
    this.searchProcess = null;
  }

  search(basePath, filePath, query, searchMode) {
    if (this.searchProcess) {
      this.searchProcess.kill();
      this.searchProcess = null;
    }
    // Must use base path when searching globally with rustsym
    if (searchMode === RUSTSYM_SEARCH_FLAGS.GLOBAL) {
      let crateRootPath = getCrateRoot(path.join(basePath, filePath));
      filePath = path.relative(basePath, crateRootPath);
    }
    return new Promise((resolve, reject) => {
      let data = null;
      let command = 'rustsym';
      let args = ['search', searchMode, filePath, query];
      let options = {
        cwd: basePath,
        // Needed to trigger error callback on Windows
        // https://github.com/atom/atom/issues/7793
        shell: false
      };
      let stdout = buffer => {
        // Only expect one JSON array of objects
        data = buffer;
      };
      let stderr = buffer => {
        data = buffer;
      };
      let exit = code => {
        if (code) {
          reject({
            message: code === RUST_PANIC
              ? `\`${command}\` panicked while searching \`${path.join(basePath, filePath)}\` for symbols.`
              : `\`${command}\` terminated abnormally with code \`${code}\`.`,
            stack: data
          });
        } else {
          try {
            let symbols = JSON.parse(data);
            resolve(symbols);
          } catch (err) {
            reject({
              message: `\`${command}\` produced malformed JSON symbol data.`,
              stack: data
            });
          }
        }
        this.searchProcess = null;
      };
      this.searchProcess = new BufferedProcess({
        command,
        args,
        options,
        stdout,
        stderr,
        exit
      }).onWillThrowError(err => {
        if (err.error.errno === 'ENOENT') {
          reject({
            message: `Unable to locate \`${command}\`.\n\nPlease ensure it is available in your \`PATH\`.`,
            stack: err.error.stack
          });
          err.handle();
        }
        this.searchProcess = null;
      });
    });
  }

}

function getCrateRoot(filePath) {
  let p = filePath;
  while (p !== '') {
    let index = p.lastIndexOf(path.sep);
    if (index === -1) break;
    p = p.slice(0, index);
    if (fs.existsSync(path.join(p, 'Cargo.toml'))) return p;
  }
}