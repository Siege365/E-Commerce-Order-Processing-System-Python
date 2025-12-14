# Security Policy

## 🔒 Reporting a Vulnerability

If you discover a security vulnerability in ShopPy, please report it responsibly:

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report vulnerabilities through one of these channels:

1. **Email**: security@shoppy.example.com (replace with your actual email)
2. **GitHub Security Advisory**: Use the "Security" tab in the repository
3. **Direct Message**: Contact the maintainers directly

### What to Include

Please include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)
- Your contact information

### Response Timeline

- We will acknowledge receipt within **48 hours**
- We will provide an initial assessment within **7 days**
- We will work with you to understand and resolve the issue
- We will credit you in the security advisory (unless you prefer to remain anonymous)

---

## 🛡️ Security Best Practices

### For Deployment

#### 1. Environment Configuration

**Never commit these files:**

- `.env` files containing secrets
- Database files (`data/*.db`)
- Secret keys or API tokens

**Always:**

```bash
# Generate a strong SECRET_KEY
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# Set DEBUG=False in production
DEBUG=False

# Configure ALLOWED_HOSTS properly
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

#### 2. Database Security

**Development:**

- SQLite is acceptable for development and testing
- Never commit `data/ecommerce.db` to version control

**Production:**

```python
# Use PostgreSQL in production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
```

#### 3. HTTPS Configuration

**Production settings:**

```python
# Force HTTPS
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# HSTS
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Security headers
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
```

#### 4. Password Security

**Current Implementation:**

- ✅ bcrypt hashing (via Django's `make_password`)
- ✅ Minimum length validation (6 characters)
- ✅ User attribute similarity check

**Recommendations:**

- Change default passwords immediately after installation
- Use strong, unique passwords for admin accounts
- Consider implementing password complexity requirements
- Enable two-factor authentication (2FA) for admin users

#### 5. Session Security

**Current Configuration:**

```python
SESSION_COOKIE_AGE = 3600  # 1 hour
SESSION_COOKIE_HTTPONLY = True  # Prevent JavaScript access
SESSION_COOKIE_SECURE = True    # HTTPS only (production)
SESSION_COOKIE_SAMESITE = 'Lax' # CSRF protection
```

#### 6. Input Validation

**Implemented:**

- ✅ Django ORM prevents SQL injection
- ✅ Template auto-escaping prevents XSS
- ✅ CSRF tokens on all forms
- ✅ Server-side validation on all inputs

**Best Practices:**

- Never trust user input
- Validate on both client and server side
- Sanitize data before storage
- Use Django's built-in validators

---

## 🚨 Known Security Considerations

### 1. Default Sample Data

**⚠️ IMPORTANT:** The system creates sample users with default passwords:

```python
# In Database.py - REMOVE IN PRODUCTION
users_data = [
    {'username': 'admin', 'password': 'admin123', ...},
    {'username': 'staff', 'password': 'staff123', ...},
    {'username': 'customer', 'password': 'customer123', ...},
]
```

**Action Required:**

```bash
# Before deploying to production:
1. Comment out or remove create_sample_data() in Database.py
2. Delete all sample users from the database
3. Create production users with strong passwords
4. Never use default credentials in production
```

### 2. DEBUG Mode

**Development:**

```python
DEBUG = True  # Shows detailed error pages
```

**Production:**

```python
DEBUG = False  # NEVER run production with DEBUG=True
ALLOWED_HOSTS = ['yourdomain.com']
```

**Why?** DEBUG mode exposes:

- Source code in error pages
- Environment variables
- Database queries
- Internal paths
- Sensitive configuration

### 3. Secret Key

**Bad:**

```python
SECRET_KEY = 'dev-secret-key-change-in-production'  # Don't use this!
```

**Good:**

```python
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')  # Load from environment
```

Generate a strong key:

```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### 4. Static Files

**Development:**

- Django serves static files automatically

**Production:**

```bash
# Collect static files
python manage.py collectstatic

# Serve with Nginx or WhiteNoise (already configured)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

---

## 🔐 Security Checklist for Production

### Pre-Deployment

- [ ] Set `DEBUG = False`
- [ ] Generate and set strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS` properly
- [ ] Remove or disable `create_sample_data()` function
- [ ] Delete all default/sample users
- [ ] Change all default passwords
- [ ] Switch from SQLite to PostgreSQL
- [ ] Set up database backups
- [ ] Configure HTTPS/SSL certificates
- [ ] Enable security headers (HSTS, CSP, etc.)
- [ ] Set `SESSION_COOKIE_SECURE = True`
- [ ] Set `CSRF_COOKIE_SECURE = True`
- [ ] Review and restrict `CORS_ALLOWED_ORIGINS` (if using CORS)
- [ ] Disable unnecessary Django apps
- [ ] Configure rate limiting (e.g., Django-ratelimit)
- [ ] Set up logging and monitoring
- [ ] Configure email for error notifications
- [ ] Review file upload restrictions
- [ ] Implement API rate limiting
- [ ] Set up firewall rules
- [ ] Configure security scanning (Dependabot, Snyk)

### Post-Deployment

- [ ] Regularly update dependencies (`pip list --outdated`)
- [ ] Monitor security advisories
- [ ] Review access logs
- [ ] Perform security audits
- [ ] Test backup restoration
- [ ] Rotate secrets periodically
- [ ] Review user permissions
- [ ] Monitor for suspicious activity

---

## 🔍 Security Scanning

### Automated Tools

**1. Safety (Python dependency scanner):**

```bash
pip install safety
safety check
```

**2. Bandit (Python security linter):**

```bash
pip install bandit
bandit -r lib/
```

**3. Django Check:**

```bash
python manage.py check --deploy
```

**4. OWASP Dependency Check:**

```bash
# Scan for known vulnerabilities
pip install pip-audit
pip-audit
```

### GitHub Security Features

Enable these in your repository:

- **Dependabot**: Automatic dependency updates
- **Code Scanning**: Detect security issues in code
- **Secret Scanning**: Prevent credential leaks
- **Security Advisories**: Report vulnerabilities

---

## 📚 Additional Resources

### Security Guidelines

- [Django Security Documentation](https://docs.djangoproject.com/en/stable/topics/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)

### Django Security Tools

- [django-axes](https://github.com/jazzband/django-axes) - Login attempt monitoring
- [django-ratelimit](https://github.com/jsocol/django-ratelimit) - Rate limiting
- [django-defender](https://github.com/jazzband/django-defender) - Brute force protection
- [django-csp](https://github.com/mozilla/django-csp) - Content Security Policy

### Security Testing

- [OWASP ZAP](https://www.zaproxy.org/) - Security scanner
- [Burp Suite](https://portswigger.net/burp) - Web security testing
- [SQLMap](http://sqlmap.org/) - SQL injection testing

---

## 📝 Version History

| Version | Date       | Changes                 |
| ------- | ---------- | ----------------------- |
| 1.0.0   | 2025-12-15 | Initial security policy |

---

## 🤝 Contributing

If you improve the security of this project, please:

1. Submit a pull request with your improvements
2. Document the security enhancement in the PR description
3. Update this SECURITY.md file if needed

---

**Remember: Security is everyone's responsibility!** 🔒
