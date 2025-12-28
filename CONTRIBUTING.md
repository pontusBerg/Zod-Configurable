# Contributing to Zod Production

Thank you for your interest in contributing to Zod Production! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Environment details (Node version, OS, etc.)
- Any relevant code snippets or error messages

### Suggesting Features

Feature suggestions are welcome! Please open an issue with:

- A clear description of the feature
- Use cases and examples
- Potential implementation approach (if you have ideas)

### Pull Requests

1. **Fork the repository** and create a branch from `main`
2. **Make your changes** following the coding standards below
3. **Add tests** for new features or bug fixes
4. **Update documentation** if needed
5. **Ensure all tests pass** (`npm test`)
6. **Ensure linting passes** (`npm run lint`)
7. **Submit a pull request** with a clear description

### Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Write clear commit messages
- Update CHANGELOG.md for user-facing changes
- Ensure your code follows the existing style
- Add tests for new functionality
- Update documentation as needed

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/zod-production.git
   cd zod-production
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

5. Run type checking:
   ```bash
   npm run type-check
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow the existing code style
- Add type annotations where helpful
- Use meaningful variable and function names

### Testing

- Write tests for all new features
- Maintain or improve test coverage
- Use descriptive test names
- Follow the existing test structure

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings (or follow existing style)
- Add JSDoc comments for public APIs
- Keep functions focused and small

### Git Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Reference issue numbers when applicable
- Example: `Fix: Handle null values in safeParse method`

## Project Structure

```
zod-production/
├── src/
│   ├── zod-service.ts    # Main ZodService class
│   ├── zod-logger.ts      # Error logging utilities
│   └── zod.test.ts        # Tests
├── dist/                  # Build output (gitignored)
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE
```

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the `question` label
- Check existing issues and discussions

Thank you for contributing! 🎉

