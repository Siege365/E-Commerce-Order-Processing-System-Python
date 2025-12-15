"""
ShopPy - PythonAnywhere WSGI Configuration

IMPORTANT: This file should be placed in your PythonAnywhere web app WSGI configuration.

Setup Instructions:
1. Go to PythonAnywhere Web tab
2. Click on "WSGI configuration file" link
3. Replace the entire contents with this file
4. Update paths below to match your username and project location
"""

import os
import sys
from pathlib import Path

# ============================================================================
# CONFIGURATION - UPDATE THESE PATHS FOR YOUR PYTHONANYWHERE ACCOUNT
# ============================================================================

# Replace 'yourusername' with your actual PythonAnywhere username
USERNAME = 'yourusername'

# Path to your project directory
# Example: /home/yourusername/E-Commerce-Order-Processing-System-Python
PROJECT_HOME = f'/home/{USERNAME}/E-Commerce-Order-Processing-System-Python'

# Path to your virtual environment (if using one - RECOMMENDED)
# Example: /home/yourusername/.virtualenvs/shoppy
VIRTUALENV_PATH = f'/home/{USERNAME}/.virtualenvs/shoppy'

# ============================================================================
# VIRTUAL ENVIRONMENT ACTIVATION
# ============================================================================

if VIRTUALENV_PATH:
    # Activate virtual environment
    activate_this = os.path.join(VIRTUALENV_PATH, 'bin', 'activate_this.py')
    if os.path.exists(activate_this):
        with open(activate_this) as f:
            exec(f.read(), {'__file__': activate_this})

# ============================================================================
# PYTHON PATH CONFIGURATION
# ============================================================================

# Add project directory to Python path
if PROJECT_HOME not in sys.path:
    sys.path.insert(0, PROJECT_HOME)

# Add lib directory to Python path (for ECommerce module)
lib_path = os.path.join(PROJECT_HOME, 'lib')
if lib_path not in sys.path:
    sys.path.insert(0, lib_path)

# ============================================================================
# ENVIRONMENT VARIABLES
# ============================================================================

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'lib.ECommerce.Config'

# SECURITY: Set these environment variables
# You can set them here or use a .env file in your project
os.environ.setdefault('DJANGO_SECRET_KEY', 'your-secret-key-here-generate-a-new-one')
os.environ.setdefault('DEBUG', 'False')
os.environ.setdefault('ALLOWED_HOSTS', f'{USERNAME}.pythonanywhere.com')

# Database URL (if using PostgreSQL/MySQL instead of SQLite)
# os.environ.setdefault('DATABASE_URL', 'mysql://username:password@hostname/database')

# Admin credentials (for initial setup script)
# os.environ.setdefault('ADMIN_USERNAME', 'admin')
# os.environ.setdefault('ADMIN_EMAIL', 'admin@shoppy.com')
# os.environ.setdefault('ADMIN_PASSWORD', 'your-secure-password')

# ============================================================================
# LOAD .ENV FILE (RECOMMENDED APPROACH)
# ============================================================================

# If you prefer using .env file for secrets (more secure):
try:
    from dotenv import load_dotenv
    env_path = os.path.join(PROJECT_HOME, '.env')
    if os.path.exists(env_path):
        load_dotenv(env_path)
except ImportError:
    pass  # python-dotenv not installed

# ============================================================================
# DJANGO APPLICATION
# ============================================================================

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
