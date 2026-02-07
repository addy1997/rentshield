# Contributing to RentShield

First off, thank you for considering contributing to RentShield! It's people like you that make RentShield such a great tool for UK tenants.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct: be respectful, inclusive, and constructive.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs what actually happened
- **Screenshots** if applicable
- **Environment details** (browser, OS, Node version)

### Suggesting Features

Feature requests are welcome! Please provide:

- **Clear description** of the feature
- **Use case** explaining why this would be useful
- **Possible implementation** if you have ideas

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main` (`git checkout -b feature/AmazingFeature`)
3. **Make your changes** following our code style
4. **Test** your changes thoroughly
5. **Commit** with clear, descriptive messages
6. **Push** to your branch
7. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/rentshield.git
cd rentshield

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your Gemini API key

# Start development server
npm run dev
```

## Code Style

- Use **TypeScript** for all new code
- Follow existing patterns in the codebase
- Use **meaningful variable names**
- Keep components **small and focused**
- Add **types** for all function parameters and returns

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add rent increase calculator`
- `fix: resolve contract scanner timeout issue`
- `docs: update API reference`
- `style: format code with prettier`
- `refactor: simplify hazard detection logic`

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🛡️
