#!/usr/bin/env bash
# ShopPy - Render Build Script
# This script is executed by Render during deployment

set -o errexit  # Exit on error

echo "=== ShopPy Build Script ==="
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Running database migrations..."
python manage.py migrate --no-input

# Create admin user if it doesn't exist (optional - uses environment variables)
echo "Checking for admin user..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lib.ECommerce.Config')
django.setup()

from lib.ECommerce.Models.User import User

admin_username = os.getenv('ADMIN_USERNAME', 'admin')
admin_email = os.getenv('ADMIN_EMAIL', 'admin@shoppy.com')
admin_password = os.getenv('ADMIN_PASSWORD')

if admin_password:
    if not User.objects.filter(username=admin_username).exists():
        User.objects.create_superuser(
            username=admin_username,
            email=admin_email,
            password=admin_password
        )
        print(f'Admin user \"{admin_username}\" created successfully!')
    else:
        print(f'Admin user \"{admin_username}\" already exists.')
else:
    print('ADMIN_PASSWORD not set, skipping admin user creation.')
"

echo "=== Build Complete ==="
