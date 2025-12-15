# ?? ShopPy - E-Commerce Order Processing System

**Python/Django Full-Stack E-Commerce Platform**

> _Wrapped in code, packed with deals._ ??

## ?? Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [System Requirements](#system-requirements)
- [Installation & Setup](#installation--setup)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [User Roles & Access](#user-roles--access)
- [Key Features](#key-features)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment to Render](#deployment-to-render)
- [Troubleshooting](#troubleshooting)
- [Development Guide](#development-guide)

---

## ?? Overview

ShopPy is a full-featured e-commerce order processing system built with Django 4.2, featuring:

- **Role-Based Access Control**: Admin, Staff, and Customer roles
- **Complete Shopping Experience**: Product browsing, cart management, checkout
- **Order Management**: Full order lifecycle from creation to delivery
- **Inventory Tracking**: Real-time stock management with low-stock alerts
- **Admin Dashboard**: Analytics, reports, and system management
- **Responsive UI**: Modern CSS with custom components and animations
- **RESTful API**: JSON endpoints for AJAX operations

**Tech Stack:**

- Backend: Python 3.8+, Django 4.2
- Database: SQLite (dev) / PostgreSQL (prod)
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Authentication: Django Auth with custom User model
- Session Management: Django sessions

---

## ?? Quick Start (5 Minutes)

```bash
# 1. Clone the repository
git clone <repository-url>
cd E-Commerce-Order-Processing-System-Python

# 2. Install dependencies
pip install -r requirements.txt

# 3. Initialize database
python manage.py migrate

# 4. Create admin user
python scripts/create_admin.py  # Uses .env credentials

# 5. Run development server
python manage.py runserver

# 6. Open browser
# http://localhost:8000
```

**Default Credentials (Development Only):**

- Admin: `admin` / `admin123`
- Staff: `staff` / `staff123`
- Customer: `customer` / `customer123`

> **⚠️ SECURITY WARNING:**
>
> - These default credentials are for **DEVELOPMENT ONLY**
> - **NEVER use these passwords in production**
> - Change all passwords immediately after setup
> - See [SECURITY.md](SECURITY.md) for production security guidelines

---

## ?? System Requirements

### Required

- Python 3.8 or higher
- pip (Python package installer)
- 100MB free disk space

### Recommended

- Python 3.10+
- Virtual environment (venv/virtualenv)
- 4GB RAM
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Optional

- Git (for version control)
- PostgreSQL (for production)
- Docker (for containerization)

---

## ?? Installation & Setup

### Step 1: Set Up Virtual Environment (Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

**Required Packages:**

```
Django>=4.2,<5.0          # Web framework
Pillow>=10.0.0            # Image processing
python-dotenv>=1.0.0      # Environment variables
bcrypt>=4.0.0             # Password hashing
whitenoise>=6.5.0         # Static file serving
```

### Step 3: Configure Environment

1. **Create `.env` file** (copy from `.env.example`):

```bash
cp .env.example .env
```

2. **Edit `.env` file**:

```env
# Security
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@shoppy.com
ADMIN_PASSWORD=your-secure-password
```

3. **Generate Secret Key**:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 4: Initialize Database

```bash
# Run migrations
python manage.py migrate

# Create admin user
python scripts/create_admin.py

# (Optional) Import sample products
python scripts/import_products.py
```

### Step 5: Collect Static Files (Production)

```bash
python manage.py collectstatic --noinput
```

### Step 6: Run Development Server

```bash
python manage.py runserver
```

**Access the application:**

- Main site: http://localhost:8000
- Admin login: http://localhost:8000/
- Customer products: http://localhost:8000/products/

---

## ??? Project Architecture

### System Design

ShopPy follows the **Model-View-Controller (MVC)** pattern adapted to Django's **Model-View-Template (MVT)** architecture:

```
┌─────────────────────────────────────────────────────┐
│                   Client (Browser)                  │
│        HTML + CSS + JavaScript (Frontend)           │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP Requests
                   ▼
┌─────────────────────────────────────────────────────┐
│               URL Router (urls.py)                  │
│         Routes requests to controllers              │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│            Controllers (Routes)                     │
│  ├── shared_routes.py (Auth, Dashboard, Common)    │
│  ├── admin_routes.py (Admin Operations)            │
│  └── customer_routes.py (Shopping, Cart, Orders)   │
└──────────────────┬──────────────────────────────────┘
                   │
         ┌─────────┴──────────┐
         ▼                    ▼
┌────────────────┐   ┌──────────────────┐
│   Models       │   │   Templates      │
│  (Database)    │   │   (Views)        │
│ ├── User       │   │ ├── login.html   │
│ ├── Customer   │   │ ├── dashboard    │
│ ├── Product    │   │ ├── products     │
│ └── Order      │   │ └── orders       │
└────────────────┘   └──────────────────┘
         │                    │
         └────────┬───────────┘
                  ▼
         ┌─────────────────┐
         │   Database      │
         │   (SQLite)      │
         └─────────────────┘
```

### Layer Breakdown

#### 1. **Presentation Layer** (Frontend)

- **Location**: `templates/`, `public/`
- **Technology**: HTML5, CSS3, JavaScript
- **Components**:
  - Layout templates (`layouts/default.html`, `layouts/auth.html`)
  - Page templates (customer/, admin/)
  - CSS modules (components/, pages/, utilities/)
  - JavaScript modules (admin/, customer/)

#### 2. **Application Layer** (Controllers)

- **Location**: `lib/ECommerce/Controllers/`
- **Files**:
  - `shared_routes.py`: Authentication, dashboard, products, orders
  - `admin_routes.py`: Admin-only operations (product management, reports)
  - `customer_routes.py`: Customer-only operations (cart, checkout)
- **Responsibilities**:
  - Request handling
  - Business logic
  - Response formatting (HTML/JSON)
  - Authorization checks

#### 3. **Data Layer** (Models)

- **Location**: `lib/ECommerce/Models/`
- **Files**:
  - `User.py`: Authentication and user management
  - `Customer.py`: Customer profile information
  - `Product.py`: Product catalog and inventory
  - `Order.py`: Order processing and order items
- **ORM**: Django ORM (Object-Relational Mapping)

#### 4. **Configuration Layer**

- **Location**: `lib/ECommerce/`
- **Files**:
  - `Config.py`: Django settings, application config
  - `Auth.py`: Authentication utilities
  - `Database.py`: Database initialization
  - `context_processors.py`: Template context providers

---

## ?? Directory Structure

```
E-Commerce-Order-Processing-System-Python/
│
├── manage.py                      # Django CLI management script
├── requirements.txt               # Python dependencies
├── .env.example                   # Environment template
├── README.md                      # This file
│
├── data/                          # Database and data files
│   └── ecommerce.db              # SQLite database (auto-created)
│
├── docs/                          # Documentation
│   └── docs-MUST-READ.md         # Detailed documentation
│
├── lib/ECommerce/                 # Main Django application
│   ├── __init__.py
│   ├── Config.py                  # Django settings
│   ├── urls.py                    # URL routing
│   ├── wsgi.py                    # WSGI entry point
│   ├── Auth.py                    # Auth utilities
│   ├── Database.py                # DB initialization
│   ├── context_processors.py      # Template contexts
│   │
│   ├── Controllers/               # Route handlers (Views)
│   │   ├── __init__.py
│   │   ├── shared_routes.py      # Common routes
│   │   ├── admin_routes.py       # Admin routes
│   │   ├── customer_routes.py    # Customer routes
│   │   ├── Admin/                # Admin modules
│   │   └── Customer/             # Customer modules
│   │
│   ├── Models/                    # Database models (ORM)
│   │   ├── __init__.py
│   │   ├── User.py               # User authentication
│   │   ├── Customer.py           # Customer profiles
│   │   ├── Product.py            # Product catalog
│   │   └── Order.py              # Orders & items
│   │
│   └── migrations/                # Database migrations
│       └── 0001_initial.py       # Initial schema
│
├── public/                        # Static files (CSS/JS/Images)
│   ├── css/
│   │   ├── style.css             # Main stylesheet
│   │   ├── base/                 # Base styles
│   │   │   ├── reset.css
│   │   │   ├── typography.css
│   │   │   └── variables.css     # CSS variables
│   │   ├── components/           # UI components
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── forms.css
│   │   │   ├── modals.css
│   │   │   └── tables.css
│   │   ├── layout/               # Layout styles
│   │   │   ├── header.css
│   │   │   ├── sidebar.css
│   │   │   └── footer.css
│   │   ├── pages/                # Page-specific
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── products.css
│   │   │   └── orders.css
│   │   └── utilities/            # Helpers
│   │       ├── animations.css
│   │       ├── helpers.css
│   │       └── responsive.css
│   │
│   ├── js/
│   │   ├── admin/                # Admin JavaScript
│   │   │   ├── common.js
│   │   │   ├── dashboard.js
│   │   │   ├── products-list.js
│   │   │   ├── orders-list.js
│   │   │   └── customers.js
│   │   └── customer/             # Customer JavaScript
│   │       ├── products.js
│   │       ├── cart.js
│   │       └── account.js
│   │
│   └── images/                    # Static images
│       ├── python-logo-primary.svg
│       ├── empty-cart.svg
│       └── ...
│
├── scripts/                       # Utility scripts
│   ├── create_admin.py           # Create superuser
│   ├── import_products.py        # Import products
│   └── import_stock.py           # Import inventory
│
└── templates/                     # Django HTML templates
    ├── login.html                # Login page
    │
    ├── layouts/                  # Base templates
    │   ├── default.html          # Main layout
    │   └── auth.html             # Auth layout
    │
    ├── admin/                    # Admin templates
    │   ├── dashboard_admin.html
    │   ├── products_admin.html
    │   ├── product_add.html
    │   ├── product_edit.html
    │   ├── orders_admin.html
    │   ├── order_detail_admin.html
    │   ├── customers.html
    │   ├── customer_detail.html
    │   └── reports.html
    │
    └── customer/                 # Customer templates
        ├── register.html
        ├── dashboard_customer.html
        ├── products_customer.html
        ├── cart.html
        ├── orders_customer.html
        ├── order_detail_customer.html
        └── account.html
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file in project root:

```env
# Django Settings
DJANGO_SECRET_KEY=<generated-secret-key>
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Admin User (for scripts/create_admin.py)
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@shoppy.com
ADMIN_PASSWORD=your-secure-password

# Database (Optional - defaults to SQLite)
# DATABASE_URL=postgresql://user:password@localhost:5432/shoppy

# Email (Optional - for order notifications)
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_HOST_USER=your-email@gmail.com
# EMAIL_HOST_PASSWORD=your-password
```

### Application Settings

Edit `lib/ECommerce/Config.py`:

```python
# Business Rules
APP_CONFIG = {
    'tax_rate': 0.08,              # 8% tax
    'shipping_cost': 5.00,         # $5 flat rate
    'free_shipping_threshold': 100.00,  # Free over $100
    'low_stock_threshold': 10,     # Alert when < 10 units
    'session_expiration': 3600,    # 1 hour
}

# Security
SESSION_COOKIE_AGE = 3600          # 1 hour
SESSION_SAVE_EVERY_REQUEST = True
CSRF_COOKIE_HTTPONLY = True
SECURE_BROWSER_XSS_FILTER = True

# Static Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'public']

# Media Files (Product Images)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
```

---

## ?? Running the Application

### Development Server

```bash
python manage.py runserver
```

**Default URL**: http://localhost:8000

**Custom Port**:

```bash
python manage.py runserver 8080
```

**Accessible from Network**:

```bash
python manage.py runserver 0.0.0.0:8000
```

### Production Deployment

```bash
# 1. Set environment
export DEBUG=False
export DJANGO_SECRET_KEY='<secure-key>'
export ALLOWED_HOSTS='yourdomain.com,www.yourdomain.com'

# 2. Collect static files
python manage.py collectstatic --noinput

# 3. Run with production server (Gunicorn)
pip install gunicorn
gunicorn lib.ECommerce.wsgi:application --bind 0.0.0.0:8000
```

**Using systemd (Linux)**:

```bash
# Create service file: /etc/systemd/system/shoppy.service
[Unit]
Description=ShopPy Django Application
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/shoppy
Environment="PATH=/var/www/shoppy/venv/bin"
ExecStart=/var/www/shoppy/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8000 lib.ECommerce.wsgi:application

[Install]
WantedBy=multi-user.target

# Enable and start
sudo systemctl enable shoppy
sudo systemctl start shoppy
```

---

## ?? User Roles & Access

### Role Hierarchy

```
┌─────────────────────────────────────────────────┐
│                    Admin                        │
│  Full system access + user management          │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼──────────┐   ┌────────▼───────┐
│      Staff       │   │    Customer    │
│  Product mgmt    │   │    Shopping    │
│  Order mgmt      │   │    Cart        │
│  Reports         │   │    Orders      │
└──────────────────┘   └────────────────┘
```

### Admin Permissions

- ✅ Create/edit/delete products
- ✅ Manage inventory and pricing
- ✅ View all orders and customers
- ✅ Update order status
- ✅ Generate reports
- ✅ Create staff/admin users
- ✅ System configuration

### Staff Permissions

- ✅ View/edit products
- ✅ Manage orders
- ✅ View customer data
- ✅ Generate reports
- ❌ Create users
- ❌ System settings

### Customer Permissions

- ✅ Browse products
- ✅ Add to cart
- ✅ Checkout
- ✅ View order history
- ✅ Update profile
- ❌ Access admin pages
- ❌ Manage products

### Authentication Flow

```python
# Login required decorator
@login_required
def dashboard(request):
    # Accessible to all authenticated users
    pass

# Role-specific decorator
@require_role(['admin', 'staff'])
def product_edit(request, product_id):
    # Only admin/staff can access
    pass

@require_role(['customer'])
def checkout(request):
    # Only customers can checkout
    pass
```

---

## ✨ Key Features

### 1. Product Management

- Product catalog with categories
- Real-time inventory tracking
- Low stock alerts
- Bulk product import via CSV
- Product image upload (or URL)
- Search and filtering

### 2. Shopping Cart

- Session-based cart (guests)
- Persistent cart (logged-in users)
- Quantity management
- Real-time pricing calculation
- Tax and shipping calculation
- Stock validation

### 3. Order Processing

- Multi-step checkout
- Order confirmation
- Order status tracking
- Order history
- Email notifications (optional)
- Invoice generation

### 4. Admin Dashboard

- Sales analytics
- Revenue reports
- Low stock alerts
- Recent orders
- Customer statistics
- Top-selling products

### 5. Customer Features

- User registration
- Profile management
- Order history
- Wishlist (planned)
- Product reviews (planned)

### 6. Security

- Password hashing (bcrypt)
- CSRF protection
- XSS prevention
- SQL injection protection (ORM)
- Session management
- Role-based access control

---

## ?? API Endpoints

### Authentication

```
POST   /login/              Login user
POST   /register/           Register new customer
POST   /logout/             Logout user
```

### Products

```
GET    /products/                     List all products
GET    /products/<id>/                Get product details
POST   /admin/products/add/           Create product (admin)
PUT    /admin/products/<id>/edit/     Update product (admin)
DELETE /admin/products/<id>/delete/   Delete product (admin)
```

### Cart

```
GET    /cart/                         View cart
POST   /cart/add/                     Add to cart
PUT    /cart/update/                  Update quantity
DELETE /cart/remove/<id>/             Remove from cart
POST   /cart/clear/                   Empty cart
```

### Orders

```
GET    /orders/                       List orders (role-based)
GET    /orders/<id>/                  Order details
POST   /checkout/                     Create order from cart
PUT    /admin/orders/<id>/status/     Update order status (admin)
```

### Customers (Admin)

```
GET    /admin/customers/              List all customers
GET    /admin/customers/<id>/         Customer details
PUT    /admin/customers/<id>/edit/    Update customer
```

### Reports (Admin)

```
GET    /admin/reports/                Dashboard analytics
GET    /admin/reports/sales/          Sales report
GET    /admin/reports/inventory/      Inventory report
```

### Request/Response Format

**Example: Add to Cart**

Request:

```json
POST /cart/add/
Content-Type: application/json

{
  "product_id": 123,
  "quantity": 2
}
```

Response (Success):

```json
{
  "success": true,
  "message": "Product added to cart",
  "cart_count": 3,
  "cart_total": 149.99
}
```

Response (Error):

```json
{
  "success": false,
  "message": "Insufficient stock",
  "available": 1
}
```

---

## ??? Database Schema

### Entity Relationship Diagram

```
┌──────────────┐
│     User     │──────────┐
│──────────────│          │
│ id (PK)      │          │
│ username     │          │
│ email        │          │ 1:1
│ password     │          │
│ role         │    ┌─────▼────────┐
│ created_at   │    │   Customer   │
└──────────────┘    │──────────────│
                    │ id (PK)      │
       │            │ user_id (FK) │◄────────┐
       │            │ first_name   │         │
       │ 1:N        │ last_name    │         │
       │            │ phone        │         │ N:1
       │            │ address      │         │
       ▼            └──────────────┘         │
┌──────────────┐                             │
│    Order     │                             │
│──────────────│                             │
│ id (PK)      │                             │
│ customer_id  ├─────────────────────────────┘
│ order_number │
│ status       │
│ subtotal     │
│ tax          │         ┌──────────────┐
│ shipping     │         │   Product    │
│ total        │         │──────────────│
│ created_at   │         │ id (PK)      │
└──────┬───────┘         │ name         │
       │                 │ description  │
       │ 1:N             │ price        │
       │                 │ stock        │
       ▼                 │ image_url    │
┌──────────────┐         │ category     │
│  OrderItem   │         │ created_at   │
│──────────────│         └──────┬───────┘
│ id (PK)      │                │
│ order_id (FK)├────────────┐   │
│ product_id   ├────────────┼───┘ N:1
│ quantity     │            │
│ price        │            │
└──────────────┘            │
                            │ 1:N
                            ▼
                   ┌──────────────────────┐
                   │ InventoryTransaction │
                   │──────────────────────│
                   │ id (PK)              │
                   │ product_id (FK)      │
                   │ quantity             │
                   │ type                 │
                   │ timestamp            │
                   └──────────────────────┘
```

### Table Definitions

#### User

```python
class User(AbstractBaseUser):
    username = CharField(max_length=150, unique=True)
    email = EmailField(unique=True)
    password = CharField(max_length=128)  # bcrypt hashed
    first_name = CharField(max_length=30)
    last_name = CharField(max_length=30)
    role = CharField(choices=['admin', 'staff', 'customer'])
    is_active = BooleanField(default=True)
    is_staff = BooleanField(default=False)
    is_superuser = BooleanField(default=False)
    date_joined = DateTimeField(auto_now_add=True)
```

#### Customer

```python
class Customer:
    user = OneToOneField(User, on_delete=CASCADE)
    phone = CharField(max_length=20)
    address = TextField()
    city = CharField(max_length=100)
    state = CharField(max_length=100)
    zip_code = CharField(max_length=20)
    country = CharField(max_length=100, default='USA')
```

#### Product

```python
class Product:
    name = CharField(max_length=200)
    description = TextField()
    price = DecimalField(max_digits=10, decimal_places=2)
    stock = IntegerField(default=0)
    image_url = URLField()
    category = CharField(max_length=100)
    is_active = BooleanField(default=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

#### Order

```python
class Order:
    customer = ForeignKey(Customer, on_delete=CASCADE)
    order_number = CharField(max_length=50, unique=True)
    status = CharField(choices=[
        'pending', 'processing', 'shipped',
        'delivered', 'cancelled'
    ])
    subtotal = DecimalField(max_digits=10, decimal_places=2)
    tax = DecimalField(max_digits=10, decimal_places=2)
    shipping = DecimalField(max_digits=10, decimal_places=2)
    total = DecimalField(max_digits=10, decimal_places=2)
    shipping_address = TextField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

#### OrderItem

```python
class OrderItem:
    order = ForeignKey(Order, on_delete=CASCADE)
    product = ForeignKey(Product, on_delete=PROTECT)
    quantity = IntegerField()
    price = DecimalField(max_digits=10, decimal_places=2)
    subtotal = DecimalField(max_digits=10, decimal_places=2)
```

---

## Deployment to PythonAnywhere

## Deployment to Render

ShopPy is configured for easy deployment to [Render](https://render.com). Follow these steps:

### Option 1: Blueprint Deployment (Recommended)

1. **Fork/Push to GitHub**: Ensure your code is in a GitHub repository

2. **Deploy via Blueprint**:

   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **New** **Blueprint**
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml` and create all services

3. **Set Environment Variables** (if not using Blueprint):
   - `ADMIN_USERNAME`: Admin username
   - `ADMIN_EMAIL`: Admin email
   - `ADMIN_PASSWORD`: Secure admin password

### Option 2: Manual Deployment

1. **Create PostgreSQL Database**:

   - Go to Render Dashboard **New** **PostgreSQL**
   - Choose a name and region
   - Note the **Internal Database URL**

2. **Create Web Service**:

   - Go to Render Dashboard **New** **Web Service**
   - Connect your GitHub repository
   - Configure:
     - **Runtime**: Python 3
     - **Build Command**: `./build.sh`
     - **Start Command**: `gunicorn lib.ECommerce.wsgi:application --bind 0.0.0.0:$PORT`

3. **Add Environment Variables**:
   `DJANGO_SECRET_KEY    = (click "Generate" for a secure key)
DEBUG                = False
ALLOWED_HOSTS        = your-app-name.onrender.com
DATABASE_URL         = (paste Internal Database URL from step 1)
ADMIN_USERNAME       = admin
ADMIN_EMAIL          = admin@yourdomain.com
ADMIN_PASSWORD       = your-secure-password`

4. **Deploy**: Click **Create Web Service**

### Post-Deployment

- **Access your app**: `https://your-app-name.onrender.com`
- **Login**: Use the admin credentials you set
- **Import sample data** (optional): Use Django admin or create products manually

### Deployment Files

| File               | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `render.yaml`      | Render Blueprint configuration                       |
| `build.sh`         | Build script (migrations, collectstatic, admin user) |
| `Procfile`         | Process configuration for gunicorn                   |
| `runtime.txt`      | Python version specification                         |
| `requirements.txt` | Python dependencies                                  |

### Custom Domain

To use a custom domain:

1. Add domain in Render Dashboard Your Service Settings Custom Domains
2. Add environment variable: `CUSTOM_DOMAIN=www.yourdomain.com`
3. Update DNS records as instructed by Render

---

python manage.py runserver --nothreading --noreload

````

#### 2. Static Files Not Loading

**Symptom**: CSS/JS not loading, 404 errors

**Solution**:

```bash
# Development
python manage.py collectstatic

# Check settings
DEBUG = True  # For development
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'public']
````

#### 3. Migration Errors

**Symptom**: `django.db.migrations.exceptions.InconsistentMigrationHistory`

**Solution**:

```bash
# Delete database and migrations
rm data/ecommerce.db
rm lib/ECommerce/migrations/000*.py

# Recreate migrations
python manage.py makemigrations
python manage.py migrate
```

#### 4. Port Already in Use

**Symptom**: `Error: That port is already in use`

**Solution**:

```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <process_id> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Or use different port
python manage.py runserver 8080
```

#### 5. ImportError: No module named 'lib'

**Symptom**: Module import errors

**Solution**:

```bash
# Ensure you're in project root
cd E-Commerce-Order-Processing-System-Python

# Check PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:$(pwd)"

# Or run with manage.py
python manage.py runserver
```

### Debug Mode

Enable detailed error messages in `lib/ECommerce/Config.py`:

```python
DEBUG = True
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}
```

---

## ?? Development Guide

### Code Style

Follow PEP 8 for Python code:

```bash
# Install formatter
pip install black flake8

# Format code
black lib/

# Check style
flake8 lib/
```

### Adding New Features

#### 1. Create Model (if needed)

```python
# lib/ECommerce/Models/NewModel.py
from django.db import models

class NewModel(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
```

#### 2. Create Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 3. Add Controller

```python
# lib/ECommerce/Controllers/new_routes.py
from django.shortcuts import render
from ..Models.NewModel import NewModel

def new_view(request):
    items = NewModel.objects.all()
    return render(request, 'new_template.html', {'items': items})
```

#### 4. Add URL Route

```python
# lib/ECommerce/urls.py
from .Controllers import new_routes

urlpatterns = [
    path('new/', new_routes.new_view, name='new_view'),
]
```

#### 5. Create Template

```html
<!-- templates/new_template.html -->
{% extends "layouts/default.html" %} {% block content %}
<h1>New Feature</h1>
{% for item in items %}
<p>{{ item.name }}</p>
{% endfor %} {% endblock %}
```

### Testing

```bash
# Run tests
python manage.py test

# Create test file
# lib/ECommerce/tests/test_models.py
from django.test import TestCase
from ..Models.Product import Product

class ProductTestCase(TestCase):
    def test_product_creation(self):
        product = Product.objects.create(
            name="Test Product",
            price=9.99,
            stock=10
        )
        self.assertEqual(product.name, "Test Product")
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

---

## ?? Additional Resources

- **Django Documentation**: https://docs.djangoproject.com/
- **Python Style Guide**: https://pep8.org/
- **SQLite Documentation**: https://www.sqlite.org/docs.html
- **WhiteNoise**: http://whitenoise.evans.io/

---

## ?? License

[Your License Here]

---

## ?? Author

ShopPy Development Team

---

**Last Updated**: 2024

### Customer Pages

- Homepage: `/`
- Products: `/products`
- Cart: `/cart`
- Checkout: `/checkout`
- Orders: `/orders`
- Account: `/account`

### Admin Pages

- Dashboard: `/admin/dashboard`
- Products: `/admin/products`
- Orders: `/admin/orders`
- Customers: `/admin/customers`
- Reports: `/admin/reports`

### Auth Pages

- Login: `/login`
- Register: `/register`
- Logout: `/logout`

---

## 🎨 Project Colors

```
Primary:   #6366f1 (Indigo)
Success:   #10b981 (Green)
Error:     #ef4444 (Red)
Warning:   #f59e0b (Amber)
Info:      #3b82f6 (Blue)
```

---

## 📝 Adding New Features

### Add a New Page

1. Create template: `templates/page_name.html`
2. Create view function in Controllers
3. Add URL route in `urls.py`
4. Add CSS: `public/css/pages/page_name.css`

### Add a New Component

1. Create component HTML (reusable)
2. Add CSS: `public/css/components/component_name.css`
3. Import in `style.css`

### Add Models

1. Define in `lib/ECommerce/Models/`
2. Run: `python manage.py makemigrations`
3. Run: `python manage.py migrate`

---

## 🔧 Configuration

Edit `lib/ECommerce/Config.py`:

```python
TAX_RATE = 0.08              # 8% tax
SHIPPING_RATE = 5.00         # $5 shipping
FREE_SHIPPING_THRESHOLD = 100.00  # Free over $100
```

---

## 💡 Development Tips

### Django Shell

```bash
python manage.py shell
from lib.ECommerce.Models.Product import Product
Product.objects.all()
```

### Create Admin User

```bash
python manage.py createsuperuser
```

### Database Backup

```bash
python manage.py dumpdata > backup.json
```

### Reset Database

```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

---

## 🐛 Common Issues

### Port Already in Use

```bash
python manage.py runserver 8001
```

### Static Files Not Loading

```bash
python manage.py collectstatic
```

### Database Locked

```bash
rm db.sqlite3
python manage.py migrate
```

---

## 📊 File Sizes

- Models: ~2KB each
- Templates: ~3-8KB each
- CSS Files: ~5-15KB each
- Total Project: ~2MB

---

## ✅ Checklist for Deployment

- [ ] Set `DEBUG = False` in settings
- [ ] Set `SECRET_KEY` to secure value
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set up environment variables
- [ ] Run `collectstatic`
- [ ] Test all user flows
- [ ] Set up backup schedule

---

## 📚 Documentation Files

- **docs-MUST-READ.md** - Complete project documentation
- **docs/docs-MUST-READ.md** - Complete project documentation (moved to `docs/`)
- **README.md** - This file
- **requirements.txt** - Python dependencies

---

## 🆘 Getting Help

1. Check `docs-MUST-READ.md` for detailed info
2. Review template examples
3. Check CSS variables in `public/css/base/variables.css`
4. Read Django documentation: https://docs.djangoproject.com

---

## 🎯 Next Steps

1. ✅ Run the server
2. ✅ Create admin account
3. ✅ Add sample products
4. ✅ Test checkout flow
5. ✅ Customize branding
6. ✅ Deploy to production

---

**Happy coding! 🚀**

ShopPy - Wrapped in code, packed with deals.
