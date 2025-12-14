# Contributing to ShopPy

Thank you for your interest in contributing to ShopPy! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- **Clear title** describing the bug
- **Detailed description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Python version, Django version)
- **Screenshots** (if applicable)

### Suggesting Enhancements

We welcome feature requests! Please create an issue with:

- **Clear title** describing the feature
- **Use case** explaining why this feature would be useful
- **Proposed solution** (if you have one)
- **Alternative solutions** you've considered

### Security Issues

**DO NOT** create public issues for security vulnerabilities. Instead, please report them responsibly through the channels outlined in [SECURITY.md](SECURITY.md).

---

## 💻 Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/E-Commerce-Order-Processing-System-Python.git
cd E-Commerce-Order-Processing-System-Python

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/E-Commerce-Order-Processing-System-Python.git
```

### 2. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
# Install project dependencies
pip install -r requirements.txt

# Install development dependencies
pip install black flake8 pytest pytest-django
```

### 4. Set Up Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings
# At minimum, set DJANGO_SECRET_KEY
```

### 5. Initialize Database

```bash
python manage.py migrate
python scripts/create_admin.py
```

### 6. Run Development Server

```bash
python manage.py runserver
```

---

## 📝 Coding Standards

### Python Style Guide

We follow [PEP 8](https://pep8.org/) with some modifications:

- **Line length**: 100 characters (not 79)
- **Indentation**: 4 spaces (no tabs)
- **String quotes**: Single quotes for short strings, double for docstrings

### Code Formatting

We use **Black** for automatic code formatting:

```bash
# Format all Python files
black lib/

# Check formatting without making changes
black --check lib/
```

### Linting

We use **Flake8** for linting:

```bash
# Run linter
flake8 lib/ --max-line-length=100

# Common issues to avoid:
# - Unused imports
# - Undefined variables
# - Syntax errors
# - Style violations
```

### Django Best Practices

- **Models**: Use descriptive field names, add `__str__` methods
- **Views**: Keep business logic in models, use class-based views when appropriate
- **Templates**: Use template inheritance, avoid inline JavaScript
- **Security**: Always use Django's built-in security features

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
python manage.py test

# Run specific test file
python manage.py test lib.ECommerce.tests.test_models

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html  # Generate HTML report
```

### Writing Tests

Create tests in `lib/ECommerce/tests/`:

```python
from django.test import TestCase
from lib.ECommerce.Models.Product import Product

class ProductTestCase(TestCase):
    def setUp(self):
        """Set up test data"""
        self.product = Product.objects.create(
            name="Test Product",
            price=29.99,
            stock=10
        )

    def test_has_stock(self):
        """Test stock availability check"""
        self.assertTrue(self.product.has_stock(5))
        self.assertFalse(self.product.has_stock(15))

    def tearDown(self):
        """Clean up after tests"""
        self.product.delete()
```

---

## 🔀 Pull Request Process

### 1. Create a Branch

```bash
# Update your fork
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Write clear, concise commit messages
- Follow the coding standards
- Add tests for new features
- Update documentation as needed

### 3. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add feature: description of what you added"

# Follow this format:
# - "Add feature: ..." for new features
# - "Fix: ..." for bug fixes
# - "Update: ..." for updates/improvements
# - "Remove: ..." for deletions
# - "Refactor: ..." for code refactoring
```

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request" button
3. Select your branch and fill out the PR template
4. Provide clear description of changes
5. Reference related issues (e.g., "Fixes #123")

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Code has been formatted with Black
- [ ] Linting passes (flake8)
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear
- [ ] PR description explains the changes
- [ ] No merge conflicts

---

## 📚 Code Review Process

### What We Look For

- **Code quality**: Clean, readable, maintainable code
- **Security**: No security vulnerabilities introduced
- **Tests**: Adequate test coverage
- **Documentation**: Clear documentation of changes
- **Performance**: No performance regressions
- **Compatibility**: Works with supported Python/Django versions

### Review Timeline

- We aim to review PRs within **3-5 business days**
- Complex PRs may take longer
- We may request changes or ask questions
- Please be responsive to feedback

### Approval Process

- At least **one maintainer approval** required
- All CI checks must pass
- No unresolved comments
- Up to date with main branch

---

## 🎨 UI/UX Contributions

### CSS Changes

- Follow existing CSS structure (BEM methodology)
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Ensure responsive design (mobile, tablet, desktop)
- Maintain accessibility standards (WCAG 2.1)

### JavaScript Changes

- Use vanilla JavaScript (no jQuery or other libraries unless necessary)
- Follow ES6+ standards
- Add comments for complex logic
- Ensure cross-browser compatibility

---

## 📖 Documentation

### Updating Documentation

When making changes, update relevant documentation:

- **README.md**: User-facing documentation
- **docs/docs-MUST-READ.md**: Technical documentation
- **Code comments**: Inline documentation
- **Docstrings**: Function/class documentation

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots/diagrams when helpful
- Keep formatting consistent

---

## 🏆 Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes
- CONTRIBUTORS.md file (to be created)

---

## 📞 Getting Help

If you need help:

- **Questions**: Open a GitHub discussion
- **Bugs**: Create an issue
- **Security**: See [SECURITY.md](SECURITY.md)
- **Chat**: [To be set up - Discord/Slack]

---

## 📄 License

By contributing to ShopPy, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

## 🙏 Thank You!

Your contributions make ShopPy better for everyone. Thank you for taking the time to contribute!

---

**Happy coding!** 🎉
