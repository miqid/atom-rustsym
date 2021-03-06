# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning][].

## [0.4.1][] - 2017-10-08

### Fixes
- Package failing activation due to Atom 1.21 API changes ([#4][]).

## [0.4.0][] - 2017-08-15

**Note:** This update involved a fairly broad rework of package internals.

### Fixes
- Package no longer functioning due to an obsolete dependency ([#3][]).

## [0.3.1][] - 2017-05-15

### Fixes
- Executable path setting from potentially being ignored ([#1][]).

## [0.3.0][] - 2017-01-24

### Adds
- Package setting to specify a custom path to the `rustsym` executable.
- Package setting to adjust debounce time when entering search terms for symbols.

### Fixes
- Package not activating on the specified override commands.

## [0.2.0][] - 2017-01-08

### Adds
- Package settings to override commands for an existing symbols provider.
- Package commands to support manual key bindings.

## 0.1.0 - 2017-01-01

### Adds
- Initial source files for a basic working prototype.

[0.4.1]: https://github.com/miqid/atom-rustsym/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/miqid/atom-rustsym/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/miqid/atom-rustsym/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/miqid/atom-rustsym/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/miqid/atom-rustsym/compare/0.1.0...0.2.0

[#4]: https://github.com/miqid/atom-rustsym/issues/4
[#3]: https://github.com/miqid/atom-rustsym/issues/3
[#1]: https://github.com/miqid/atom-rustsym/issues/1

[semantic versioning]: http://semver.org/
