# 🚀 Deploying ShopPy to PythonAnywhere

Complete guide for deploying the ShopPy E-Commerce system to PythonAnywhere.

## 📋 Prerequisites

- PythonAnywhere account (free tier works fine)
- Git installed locally (to push code)
- Basic terminal knowledge

---

## 🎯 Deployment Steps

### 1. Create PythonAnywhere Account

1. Go to [www.pythonanywhere.com](https://www.pythonanywhere.com)
2. Sign up for a free account (or login if you have one)
3. Note your username - you'll need it throughout setup

### 2. Upload Your Project

**Option A: Using Git (Recommended)**

```bash
# Open a Bash console on PythonAnywhere (from Dashboard)
cd ~
git clone https://github.com/yourusername/E-Commerce-Order-Processing-System-Python.git
cd E-Commerce-Order-Processing-System-Python
```

**Option B: Upload Files**

1. Use PythonAnywhere Files tab
2. Upload project as a zip file
3. Extract in your home directory

### 3. Create Virtual Environment

```bash
# In PythonAnywhere Bash console
cd ~
mkvirtualenv --python=/usr/bin/python3.10 shoppy
workon shoppy

# Navigate to project
cd ~/E-Commerce-Order-Processing-System-Python

# Install dependencies
pip install -r requirements.txt
```

**Note**: If `mysqlclient` fails to install, you may need to use SQLite instead (see Database Configuration below).

### 4. Configure Database

**Option A: MySQL (Recommended for Production)**

1. Go to PythonAnywhere **Databases** tab
2. Initialize MySQL if not done (set a password)
3. Create a database: `shoppy`
4. Note: Free accounts get one MySQL database

Update your `.env` file:

```bash
DATABASE_URL=mysql://yourusername:yourpassword@yourusername.mysql.pythonanywhere-services.com/yourusername$shoppy
```

**Option B: SQLite (Simple for Testing)**

Create `.env` file without `DATABASE_URL` - will use SQLite automatically.

```bash
# No DATABASE_URL needed - defaults to SQLite
DEBUG=False
DJANGO_SECRET_KEY=your-generated-secret-key
ALLOWED_HOSTS=yourusername.pythonanywhere.com
```

### 5. Create `.env` File

```bash
# In Bash console
cd ~/E-Commerce-Order-Processing-System-Python
nano .env
```

Add these variables (update values):

```env
# Django Core
DJANGO_SECRET_KEY=generate-a-secure-key-here
DEBUG=False
ALLOWED_HOSTS=yourusername.pythonanywhere.com

# Database (if using MySQL)
DATABASE_URL=mysql://yourusername:password@yourusername.mysql.pythonanywhere-services.com/yourusername$shoppy

# Admin User
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@shoppy.com
ADMIN_PASSWORD=your-secure-password
```

**Generate Secret Key:**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Save and exit (Ctrl+X, Y, Enter).

### 6. Run Database Migrations

```bash
cd ~/E-Commerce-Order-Processing-System-Python
workon shoppy
python manage.py migrate
```

### 7. Create Admin User

```bash
python scripts/create_admin.py
# Or manually:
# python manage.py createsuperuser
```

### 8. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

This creates `staticfiles/` directory with all CSS/JS/images.

### 9. Configure Web App

1. Go to PythonAnywhere **Web** tab
2. Click **Add a new web app**
3. Choose **Manual configuration** (not Django wizard)
4. Select **Python 3.10**
5. Click through to create the app

### 10. Configure WSGI File

1. On the Web tab, find **WSGI configuration file** link
2. Click it to edit
3. **Delete all contents**
4. Copy the entire contents of `pythonanywhere_wsgi.py` from your project
5. **Update these lines** with your username:

```python
USERNAME = 'yourusername'  # Replace with YOUR PythonAnywhere username
```

6. Save the file (Ctrl+S or click Save)

### 11. Configure Static Files

On the Web tab, scroll to **Static files** section:

| URL        | Directory                                                                  |
| ---------- | -------------------------------------------------------------------------- |
| `/static/` | `/home/yourusername/E-Commerce-Order-Processing-System-Python/staticfiles` |
| `/media/`  | `/home/yourusername/E-Commerce-Order-Processing-System-Python/media`       |

Click the checkmark/add button after each entry.

### 12. Set Python Path (Optional but Recommended)

On the Web tab, find **Code** section and set:

**Source code:** `/home/yourusername/E-Commerce-Order-Processing-System-Python`

### 13. Reload Web App

1. At the top of the Web tab, click the green **Reload** button
2. Wait ~15 seconds for reload to complete
3. Click the link to your app: `https://yourusername.pythonanywhere.com`

---

## ✅ Verification

Visit your site and verify:

- [ ] Homepage loads (login page)
- [ ] CSS/styling is applied correctly
- [ ] Can login with admin credentials
- [ ] Dashboard displays
- [ ] Products page works
- [ ] Static files (images, CSS) load correctly

---

## 🔧 Troubleshooting

### Static Files Not Loading (404 errors)

**Solution:**

```bash
cd ~/E-Commerce-Order-Processing-System-Python
workon shoppy
python manage.py collectstatic --clear --noinput
```

Then reload web app on the Web tab.

### Database Errors

**Check database connection:**

```bash
cd ~/E-Commerce-Order-Processing-System-Python
workon shoppy
python manage.py dbshell
```

If this fails, verify `DATABASE_URL` in `.env` or WSGI file.

### ImportError or Module Not Found

**Reinstall requirements:**

```bash
cd ~/E-Commerce-Order-Processing-System-Python
workon shoppy
pip install -r requirements.txt --force-reinstall
```

Then reload web app.

### 500 Internal Server Error

**View error logs:**

1. Go to Web tab
2. Click **Error log** link (red button)
3. Check the latest errors
4. Also check **Server log** (yellow button)

**Common fixes:**

- Ensure `DEBUG=False` in production
- Check `ALLOWED_HOSTS` includes your domain
- Verify `DJANGO_SECRET_KEY` is set
- Run migrations: `python manage.py migrate`

### Permission Errors

```bash
chmod -R 755 ~/E-Commerce-Order-Processing-System-Python
```

### Virtual Environment Not Activating

**In WSGI file**, ensure path is correct:

```python
VIRTUALENV_PATH = f'/home/{USERNAME}/.virtualenvs/shoppy'
```

---

## 🔄 Updating Your Application

When you make code changes:

```bash
# Pull latest changes
cd ~/E-Commerce-Order-Processing-System-Python
git pull origin main

# Activate virtual environment
workon shoppy

# Install any new dependencies
pip install -r requirements.txt

# Run new migrations
python manage.py migrate

# Collect static files if CSS/JS changed
python manage.py collectstatic --noinput

# Reload web app (or use Web tab Reload button)
touch /var/www/yourusername_pythonanywhere_com_wsgi.py
```

---

## 📊 Database Management

### Backup MySQL Database

```bash
# From PythonAnywhere Bash console
mysqldump -u yourusername -h yourusername.mysql.pythonanywhere-services.com \
  'yourusername$shoppy' > backup_$(date +%Y%m%d).sql
```

### Restore MySQL Database

```bash
mysql -u yourusername -h yourusername.mysql.pythonanywhere-services.com \
  'yourusername$shoppy' < backup.sql
```

### Switch from SQLite to MySQL

```bash
# Export data from SQLite
cd ~/E-Commerce-Order-Processing-System-Python
workon shoppy
python manage.py dumpdata --natural-foreign --natural-primary \
  -e contenttypes -e auth.Permission > data_backup.json

# Update DATABASE_URL in .env to MySQL
# Run migrations on MySQL
python manage.py migrate

# Import data
python manage.py loaddata data_backup.json
```

---

## 🔒 Security Checklist

- [ ] `DEBUG=False` in production
- [ ] Strong `DJANGO_SECRET_KEY` (never commit to Git)
- [ ] `ALLOWED_HOSTS` properly set
- [ ] Changed default admin password
- [ ] `.env` file in `.gitignore`
- [ ] Database password is secure
- [ ] HTTPS enabled (automatic on PythonAnywhere)

---

## 💰 PythonAnywhere Free Tier Limits

- 1 web app
- 1 MySQL database (512 MB)
- 512 MB disk space
- 100 seconds CPU time per day
- Good for hobby/portfolio projects

**For production**: Upgrade to paid plan for:

- More CPU time
- Multiple web apps
- Larger database
- Custom domains
- No PythonAnywhere branding

---

## 📞 Need Help?

- PythonAnywhere Forums: https://www.pythonanywhere.com/forums/
- PythonAnywhere Help: https://help.pythonanywhere.com/
- Django Docs: https://docs.djangoproject.com/

---

## 🎉 Success!

Your ShopPy e-commerce system should now be live at:
**https://yourusername.pythonanywhere.com**

Share your deployed app and start selling! 🛒
