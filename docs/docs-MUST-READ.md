# 🐍 ShopPy - Complete System Documentation

**E-Commerce Order Processing System - Python/Django Implementation**

> Comprehensive technical documentation for developers

---

## 📑 Table of Contents

1. [System Overview](#system-overview)
2. [Technical Architecture](#technical-architecture)
3. [Database Schema](#database-schema)
4. [API Reference](#api-reference)
5. [File Structure Reference](#file-structure-reference)
6. [Business Logic](#business-logic)
7. [Frontend Components](#frontend-components)
8. [Security](#security)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

---

## 1. System Overview

### 1.1 Purpose

ShopPy is a full-stack e-commerce platform designed for educational purposes and small business deployments. It demonstrates best practices in Django development, including:

- Clean MVC architecture
- Role-based authentication
- RESTful API design
- Responsive frontend
- Database normalization
- Security best practices

### 1.2 Technology Stack

| Layer                | Technology    | Version | Purpose                   |
| -------------------- | ------------- | ------- | ------------------------- |
| **Backend**          | Django        | 4.2.27  | Web framework             |
| **Database**         | SQLite        | 3.x     | Development database      |
| **ORM**              | Django ORM    | 4.2     | Object-relational mapping |
| **Authentication**   | Django Auth   | 4.2     | User authentication       |
| **Password Hashing** | bcrypt        | 4.0.0   | Secure password storage   |
| **Static Files**     | WhiteNoise    | 6.5.0   | Static file serving       |
| **Image Processing** | Pillow        | 10.0.0  | Image manipulation        |
| **Environment**      | python-dotenv | 1.0.0   | Config management         |
| **Frontend**         | HTML5/CSS3    | -       | Presentation              |
| **JavaScript**       | ES6+          | -       | Client-side logic         |
| **WSGI**             | Gunicorn      | Latest  | Production server         |

### 1.3 Key Features

**Customer Features:**

- User registration and authentication
- Product browsing with search/filters
- Shopping cart management
- Secure checkout process
- Order history and tracking
- Profile management

**Admin Features:**

- Product catalog management
- Inventory tracking
- Order management
- Customer management
- Sales analytics and reports
- Low stock alerts
- User role management

**Technical Features:**

- Session-based authentication
- AJAX cart operations
- Real-time stock validation
- Responsive design
- CSRF protection
- SQL injection prevention
- XSS protection

### 1.4 System Requirements

**Minimum:**

- Python 3.8+
- 2GB RAM
- 100MB disk space
- Modern web browser

**Recommended:**

- Python 3.10+
- 4GB RAM
- 500MB disk space
- PostgreSQL (production)

---

## 2. Technical Architecture

### 2.1 Django Architecture

ShopPy implements Django's MVT (Model-View-Template) pattern, adapted to MVC nomenclature:

```
┌─────────────────────────────────────────────────────────┐
│                    HTTP Request                          │
│              (Browser → Django Server)                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  MIDDLEWARE STACK                        │
│  1. SecurityMiddleware       (HTTPS, headers)           │
│  2. SessionMiddleware        (Session management)       │
│  3. CommonMiddleware         (URL rewriting)            │
│  4. CsrfViewMiddleware       (CSRF protection)          │
│  5. AuthenticationMiddleware (User authentication)      │
│  6. MessageMiddleware        (Flash messages)           │
│  7. WhiteNoiseMiddleware     (Static files)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   URL DISPATCHER                         │
│                  (urls.py routing)                       │
│                                                          │
│  /                  → shared_routes.home                │
│  /login/            → shared_routes.login               │
│  /products/         → shared_routes.products            │
│  /admin/products/   → admin_routes.products_list        │
│  /cart/             → customer_routes.cart              │
│  /checkout/         → customer_routes.checkout          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 VIEW/CONTROLLER                          │
│            (Controllers/*.py files)                      │
│                                                          │
│  1. Authentication check (@login_required)              │
│  2. Role authorization (@require_role)                  │
│  3. Request validation                                  │
│  4. Business logic                                      │
│  5. Database operations (via Models)                    │
│  6. Response preparation                                │
└────────────┬───────────────────────┬────────────────────┘
             │                       │
             ▼                       ▼
┌─────────────────────┐   ┌──────────────────────┐
│     DATABASE         │   │     TEMPLATES        │
│   (Models/ORM)       │   │   (HTML + Django)    │
│                      │   │                      │
│  User                │   │  layouts/            │
│  Customer            │   │  admin/              │
│  Product             │   │  customer/           │
│  Order               │   │                      │
│  OrderItem           │   │  Context:            │
│  InventoryTransaction│   │  - User data         │
│  OrderTimeline       │   │  - Cart info         │
└──────────────────────┘   │  - Products          │
                           │  - Orders            │
                           └──────────────────────┘
                                     │
                                     ▼
                           ┌──────────────────────┐
                           │   HTTP RESPONSE      │
                           │   (HTML or JSON)     │
                           └──────────────────────┘
```

### 2.2 Directory Architecture

```
Project Root
│
├── manage.py                 ← Django CLI entry point
├── requirements.txt          ← Python dependencies
├── .env                      ← Environment configuration
│
├── lib/ECommerce/           ← Main Django application
│   │
│   ├── Config.py            ← Django settings (INSTALLED_APPS, DB, etc.)
│   ├── urls.py              ← URL routing configuration
│   ├── wsgi.py              ← WSGI entry point (production)
│   ├── Auth.py              ← Authentication utilities
│   ├── Database.py          ← Database initialization
│   ├── context_processors.py ← Template context providers
│   │
│   ├── Models/              ← Database models (ORM)
│   │   ├── User.py          ← Custom user model
│   │   ├── Customer.py      ← Customer profiles
│   │   ├── Product.py       ← Product catalog
│   │   └── Order.py         ← Orders and order items
│   │
│   ├── Controllers/         ← Business logic (Views)
│   │   ├── shared_routes.py  ← Common routes (auth, dashboard)
│   │   ├── admin_routes.py   ← Admin-only routes
│   │   └── customer_routes.py ← Customer-only routes
│   │
│   └── migrations/          ← Database migrations
│       └── 0001_initial.py   ← Initial schema
│
├── templates/               ← HTML templates
│   ├── layouts/             ← Base layouts
│   ├── admin/               ← Admin pages
│   └── customer/            ← Customer pages
│
├── public/                  ← Static assets
│   ├── css/                 ← Stylesheets
│   ├── js/                  ← JavaScript
│   └── images/              ← Images and icons
│
├── data/                    ← Database files
│   └── ecommerce.db         ← SQLite database (auto-created)
│
└── scripts/                 ← Utility scripts
    ├── create_admin.py      ← Create admin user
    ├── import_products.py   ← Import products from CSV
    └── import_stock.py      ← Update inventory
```

### 2.3 Request Flow Example

**Scenario**: User adds product to cart

1. **Client Action**:

   ```javascript
   // public/js/customer/products.js
   fetch("/cart/add/", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ product_id: 123, quantity: 2 }),
   });
   ```

2. **URL Routing**:

   ```python
   # lib/ECommerce/urls.py
   path('cart/add/', customer_routes.add_to_cart, name='add_to_cart')
   ```

3. **Controller Processing**:

   ```python
   # lib/ECommerce/Controllers/customer_routes.py
   @login_required
   @require_role(['customer'])
   def add_to_cart(request):
       product_id = request.POST.get('product_id')
       quantity = int(request.POST.get('quantity', 1))

       # Validate product
       product = Product.objects.get(id=product_id)
       if product.stock < quantity:
           return JsonResponse({'error': 'Insufficient stock'})

       # Add to cart (session)
       cart = request.session.get('cart', {})
       cart[product_id] = cart.get(product_id, 0) + quantity
       request.session['cart'] = cart

       return JsonResponse({'success': True, 'cart_count': len(cart)})
   ```

4. **Response**:
   ```json
   { "success": true, "cart_count": 3 }
   ```

### 2.4 Authentication Flow

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │ 1. POST /login/
       │    {username, password}
       ▼
┌──────────────────────────────────────┐
│  shared_routes.login()               │
│  1. Validate credentials             │
│  2. Check password (bcrypt)          │
│  3. Create session                   │
│  4. Set session cookie               │
└──────┬───────────────────────────────┘
       │ 2. Set-Cookie: sessionid=...
       ▼
┌──────────────┐
│   Browser    │ ← Stores cookie
└──────┬───────┘
       │ 3. GET /dashboard/
       │    Cookie: sessionid=...
       ▼
┌──────────────────────────────────────┐
│  AuthenticationMiddleware            │
│  1. Read sessionid cookie            │
│  2. Load session from DB             │
│  3. Load user from session           │
│  4. Attach to request.user           │
└──────┬───────────────────────────────┘
       │ 4. request.user populated
       ▼
┌──────────────────────────────────────┐
│  @login_required decorator           │
│  - Check request.user.is_authenticated│
│  - Redirect to /login/ if not        │
└──────┬───────────────────────────────┘
       │ 5. User authenticated
       ▼
┌──────────────────────────────────────┐
│  @require_role(['customer'])         │
│  - Check request.user.role           │
│  - Return 403 if unauthorized        │
└──────┬───────────────────────────────┘
       │ 6. User authorized
       ▼
┌──────────────────────────────────────┐
│  dashboard() view executes           │
│  - Query user data                   │
│  - Render template                   │
└──────┬───────────────────────────────┘
       │ 7. HTML response
       ▼
┌──────────────┐
│   Browser    │
└──────────────┘
```

---

## 3. Database Schema

### 3.1 Complete Entity Relationship Diagram

```
┌──────────────────────────────────────┐
│              User                    │
│──────────────────────────────────────│
│ id (PK)              INTEGER         │
│ username             VARCHAR(150)    │◄────────────┐
│ email                VARCHAR(254)    │             │
│ password             VARCHAR(128)    │             │ 1:1
│ first_name           VARCHAR(30)     │             │
│ last_name            VARCHAR(30)     │      ┌──────┴───────────────────────┐
│ role                 VARCHAR(20)     │      │        Customer               │
│ is_active            BOOLEAN         │      │───────────────────────────────│
│ is_staff             BOOLEAN         │      │ id (PK)          INTEGER      │
│ is_superuser         BOOLEAN         │      │ user_id (FK)     INTEGER      │
│ date_joined          DATETIME        │      │ phone            VARCHAR(20)  │
│ last_login           DATETIME        │      │ address          TEXT         │
└──────────────────────────────────────┘      │ city             VARCHAR(100) │
                                              │ state            VARCHAR(100) │
                                              │ zip_code         VARCHAR(20)  │
       ┌──────────────────────────────────────┤ country          VARCHAR(100) │
       │                                      └──────┬───────────────────────┘
       │ 1:N                                         │
       │                                             │ 1:N
       ▼                                             ▼
┌──────────────────────────────────────┐      ┌──────────────────────────────┐
│         OrderTimeline                │      │           Order               │
│──────────────────────────────────────│      │──────────────────────────────│
│ id (PK)              INTEGER         │      │ id (PK)          INTEGER     │
│ order_id (FK)        INTEGER         │◄─────┤ customer_id (FK) INTEGER     │
│ status               VARCHAR(20)     │  1:N │ order_number     VARCHAR(50) │
│ notes                TEXT            │      │ status           VARCHAR(20) │
│ timestamp            DATETIME        │      │ subtotal         DECIMAL(10,2│
└──────────────────────────────────────┘      │ tax              DECIMAL(10,2│
                                              │ shipping         DECIMAL(10,2│
                                              │ total            DECIMAL(10,2│
                                              │ shipping_address TEXT         │
                                              │ created_at       DATETIME    │
                                              │ updated_at       DATETIME    │
                                              └──────┬───────────────────────┘
                                                     │
                                                     │ 1:N
                                                     ▼
┌──────────────────────────────────────┐      ┌──────────────────────────────┐
│    InventoryTransaction              │      │         OrderItem             │
│──────────────────────────────────────│      │──────────────────────────────│
│ id (PK)              INTEGER         │      │ id (PK)          INTEGER     │
│ product_id (FK)      INTEGER         │◄─┐   │ order_id (FK)    INTEGER     │
│ quantity             INTEGER         │  │   │ product_id (FK)  INTEGER     │
│ type                 VARCHAR(20)     │  │   │ quantity         INTEGER     │
│ reference_type       VARCHAR(50)     │  │   │ price            DECIMAL(10,2│
│ reference_id         INTEGER         │  │   │ subtotal         DECIMAL(10,2│
│ timestamp            DATETIME        │  │   └──────┬───────────────────────┘
└──────────────────────────────────────┘  │          │
                                          │          │ N:1
                                          │          ▼
                                          │   ┌──────────────────────────────┐
                                          └───┤        Product                │
                                          1:N │──────────────────────────────│
                                              │ id (PK)          INTEGER     │
                                              │ name             VARCHAR(200)│
                                              │ description      TEXT        │
                                              │ price            DECIMAL(10,2│
                                              │ stock            INTEGER     │
                                              │ image_url        VARCHAR(200)│
                                              │ category         VARCHAR(100)│
                                              │ is_active        BOOLEAN     │
                                              │ created_at       DATETIME    │
                                              │ updated_at       DATETIME    │
                                              └──────────────────────────────┘
```

### 3.2 Table Definitions

#### User Table

```sql
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,  -- bcrypt hashed
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role VARCHAR(20) CHECK(role IN ('admin', 'staff', 'customer')),
    is_active BOOLEAN DEFAULT 1,
    is_staff BOOLEAN DEFAULT 0,
    is_superuser BOOLEAN DEFAULT 0,
    date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

CREATE INDEX idx_user_username ON user(username);
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_user_role ON user(role);
```

**Indexes**:

- Primary key on `id`
- Unique index on `username`
- Unique index on `email`
- Index on `role` for filtering

**Relationships**:

- One-to-One with `Customer`
- One-to-Many with `Order` (through Customer)

#### Customer Table

```sql
CREATE TABLE customer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'USA',
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE INDEX idx_customer_user_id ON customer(user_id);
```

**Indexes**:

- Primary key on `id`
- Unique foreign key on `user_id`

**Relationships**:

- One-to-One with `User`
- One-to-Many with `Order`

#### Product Table

```sql
CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK(price >= 0),
    stock INTEGER DEFAULT 0 CHECK(stock >= 0),
    image_url VARCHAR(200),
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_product_is_active ON product(is_active);
CREATE INDEX idx_product_created_at ON product(created_at DESC);
```

**Indexes**:

- Primary key on `id`
- Index on `category` for filtering
- Index on `is_active` for active products
- Index on `created_at` for sorting

**Relationships**:

- One-to-Many with `OrderItem`
- One-to-Many with `InventoryTransaction`

#### Order Table

```sql
CREATE TABLE "order" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) CHECK(status IN (
        'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    )),
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    shipping DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);

CREATE INDEX idx_order_customer_id ON "order"(customer_id);
CREATE INDEX idx_order_status ON "order"(status);
CREATE INDEX idx_order_created_at ON "order"(created_at DESC);
CREATE INDEX idx_order_number ON "order"(order_number);
```

**Indexes**:

- Primary key on `id`
- Unique index on `order_number`
- Index on `customer_id` for customer orders
- Index on `status` for filtering
- Index on `created_at` for sorting

**Relationships**:

- Many-to-One with `Customer`
- One-to-Many with `OrderItem`
- One-to-Many with `OrderTimeline`

#### OrderItem Table

```sql
CREATE TABLE order_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES "order"(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE PROTECT
);

CREATE INDEX idx_order_item_order_id ON order_item(order_id);
CREATE INDEX idx_order_item_product_id ON order_item(product_id);
```

**Indexes**:

- Primary key on `id`
- Index on `order_id` for order items
- Index on `product_id` for product sales

**Relationships**:

- Many-to-One with `Order`
- Many-to-One with `Product`

#### InventoryTransaction Table

```sql
CREATE TABLE inventory_transaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    type VARCHAR(20) CHECK(type IN ('purchase', 'sale', 'return', 'adjustment')),
    reference_type VARCHAR(50),  -- 'order', 'manual', etc.
    reference_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE INDEX idx_inventory_product_id ON inventory_transaction(product_id);
CREATE INDEX idx_inventory_timestamp ON inventory_transaction(timestamp DESC);
```

**Indexes**:

- Primary key on `id`
- Index on `product_id` for product history
- Index on `timestamp` for chronological view

**Relationships**:

- Many-to-One with `Product`

#### OrderTimeline Table

```sql
CREATE TABLE order_timeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    notes TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES "order"(id) ON DELETE CASCADE
);

CREATE INDEX idx_order_timeline_order_id ON order_timeline(order_id);
CREATE INDEX idx_order_timeline_timestamp ON order_timeline(timestamp DESC);
```

**Indexes**:

- Primary key on `id`
- Index on `order_id` for order history
- Index on `timestamp` for chronological view

**Relationships**:

- Many-to-One with `Order`

### 3.3 Database Operations

#### Sample Queries

**Get Customer Orders**:

```python
# lib/ECommerce/Controllers/customer_routes.py
orders = Order.objects.filter(
    customer=request.user.customer
).prefetch_related('orderitem_set__product').order_by('-created_at')
```

**Check Product Stock**:

```python
# lib/ECommerce/Models/Product.py
def has_stock(self, quantity=1):
    return self.stock >= quantity and self.is_active
```

**Calculate Order Total**:

```python
# lib/ECommerce/Models/Order.py
def calculate_total(self):
    self.subtotal = sum(item.subtotal for item in self.orderitem_set.all())
    self.tax = self.subtotal * APP_CONFIG['tax_rate']
    self.shipping = 0 if self.subtotal >= APP_CONFIG['free_shipping_threshold'] \
                    else APP_CONFIG['shipping_cost']
    self.total = self.subtotal + self.tax + self.shipping
```

**Create Order from Cart**:

```python
# lib/ECommerce/Controllers/customer_routes.py
@transaction.atomic
def checkout(request):
    # Create order
    order = Order.objects.create(
        customer=request.user.customer,
        order_number=generate_order_number(),
        status='pending',
        shipping_address=get_shipping_address(request)
    )

    # Create order items
    cart = request.session.get('cart', {})
    for product_id, quantity in cart.items():
        product = Product.objects.get(id=product_id)
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=product.price,
            subtotal=product.price * quantity
        )

        # Update inventory
        product.stock -= quantity
        product.save()

        # Record transaction
        InventoryTransaction.objects.create(
            product=product,
            quantity=-quantity,
            type='sale',
            reference_type='order',
            reference_id=order.id
        )

    # Calculate totals
    order.calculate_total()
    order.save()

    # Clear cart
    request.session['cart'] = {}

    return order
```

---

## 4. API Reference

### 4.1 Authentication Endpoints

#### POST /login/

Login user and create session.

**Request**:

```json
{
  "username": "customer",
  "password": "customer123"
}
```

**Response (Success)**:

```json
{
  "success": true,
  "message": "Login successful",
  "redirect": "/dashboard/",
  "user": {
    "username": "customer",
    "role": "customer",
    "full_name": "John Doe"
  }
}
```

**Response (Error)**:

```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

#### POST /register/

Register new customer account.

**Request**:

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "secure123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "555-1234",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zip_code": "62701"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Registration successful",
  "redirect": "/login/"
}
```

#### POST /logout/

Logout user and destroy session.

**Response**:

```json
{
  "success": true,
  "redirect": "/login/"
}
```

### 4.2 Product Endpoints

#### GET /products/

List all products with optional filters.

**Query Parameters**:

- `category` (optional): Filter by category
- `search` (optional): Search in name/description
- `min_price` (optional): Minimum price
- `max_price` (optional): Maximum price
- `sort` (optional): Sort order (price_asc, price_desc, newest)

**Response**:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "stock": 50,
      "image_url": "https://example.com/image.jpg",
      "category": "Electronics",
      "is_active": true
    }
  ],
  "count": 25,
  "categories": ["Electronics", "Clothing", "Books"]
}
```

#### GET /products/<id>/

Get single product details.

**Response**:

```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Detailed description...",
  "price": 29.99,
  "stock": 50,
  "image_url": "https://example.com/image.jpg",
  "category": "Electronics",
  "is_active": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

### 4.3 Cart Endpoints

#### POST /cart/add/

Add product to cart.

**Request**:

```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Response**:

```json
{
  "success": true,
  "message": "Product added to cart",
  "cart_count": 3,
  "cart_total": 149.97
}
```

#### PUT /cart/update/

Update cart item quantity.

**Request**:

```json
{
  "product_id": 1,
  "quantity": 5
}
```

**Response**:

```json
{
  "success": true,
  "message": "Cart updated",
  "cart_total": 149.95
}
```

#### DELETE /cart/remove/<product_id>/

Remove item from cart.

**Response**:

```json
{
  "success": true,
  "message": "Item removed",
  "cart_count": 2,
  "cart_total": 99.98
}
```

### 4.4 Order Endpoints

#### GET /orders/

List user orders (filtered by role).

**Response**:

```json
{
  "orders": [
    {
      "id": 1,
      "order_number": "ORD-2024-001",
      "status": "delivered",
      "total": 159.99,
      "items_count": 3,
      "created_at": "2024-01-01T12:00:00Z"
    }
  ],
  "count": 10
}
```

#### GET /orders/<id>/

Get order details.

**Response**:

```json
{
  "id": 1,
  "order_number": "ORD-2024-001",
  "status": "delivered",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [
    {
      "product_name": "Product 1",
      "quantity": 2,
      "price": 29.99,
      "subtotal": 59.98
    }
  ],
  "subtotal": 149.99,
  "tax": 12.0,
  "shipping": 5.0,
  "total": 166.99,
  "shipping_address": "123 Main St...",
  "timeline": [
    {
      "status": "pending",
      "timestamp": "2024-01-01T12:00:00Z"
    },
    {
      "status": "processing",
      "timestamp": "2024-01-01T14:00:00Z"
    }
  ],
  "created_at": "2024-01-01T12:00:00Z"
}
```

#### POST /checkout/

Create order from cart.

**Request**:

```json
{
  "shipping_address": "123 Main St, Springfield, IL 62701"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Order placed successfully",
  "order_id": 1,
  "order_number": "ORD-2024-001",
  "total": 166.99
}
```

### 4.5 Admin Endpoints

#### POST /admin/products/add/

Create new product (admin/staff only).

**Request**:

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "stock": 100,
  "image_url": "https://example.com/image.jpg",
  "category": "Electronics"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Product created",
  "product_id": 25
}
```

#### PUT /admin/orders/<id>/status/

Update order status (admin/staff only).

**Request**:

```json
{
  "status": "shipped",
  "notes": "Shipped via FedEx, tracking #123456"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Order status updated"
}
```

#### GET /admin/reports/

Get admin dashboard statistics.

**Response**:

```json
{
  "revenue": {
    "today": 1250.0,
    "week": 8750.0,
    "month": 35000.0
  },
  "orders": {
    "pending": 5,
    "processing": 12,
    "shipped": 8,
    "delivered": 150
  },
  "products": {
    "total": 250,
    "low_stock": 15,
    "out_of_stock": 3
  },
  "customers": {
    "total": 500,
    "new_this_month": 25
  },
  "top_products": [
    {
      "id": 1,
      "name": "Product 1",
      "sales_count": 150,
      "revenue": 4498.5
    }
  ]
}
```

---

## 5. File Structure Reference

### 5.1 Core Django Files

#### manage.py

Django command-line utility.

**Usage**:

```bash
python manage.py <command> [options]
```

**Common Commands**:

- `runserver` - Start development server
- `migrate` - Apply database migrations
- `makemigrations` - Create new migrations
- `createsuperuser` - Create admin user
- `shell` - Python shell with Django
- `collectstatic` - Collect static files

#### lib/ECommerce/Config.py

Main Django settings file.

**Key Sections**:

```python
# Security
SECRET_KEY = env('DJANGO_SECRET_KEY')
DEBUG = env.bool('DEBUG', default=False)
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

# Application
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'lib.ECommerce',
]

# Custom User Model
AUTH_USER_MODEL = 'ECommerce.User'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'data' / 'ecommerce.db',
    }
}

# Business Rules
APP_CONFIG = {
    'tax_rate': 0.08,
    'shipping_cost': 5.00,
    'free_shipping_threshold': 100.00,
}
```

#### lib/ECommerce/urls.py

URL routing configuration.

**Structure**:

```python
from django.urls import path
from .Controllers import shared_routes, admin_routes, customer_routes

urlpatterns = [
    # Authentication
    path('', shared_routes.home, name='home'),
    path('login/', shared_routes.login, name='login'),
    path('logout/', shared_routes.logout, name='logout'),
    path('register/', shared_routes.register, name='register'),

    # Shared Routes
    path('dashboard/', shared_routes.dashboard, name='dashboard'),
    path('products/', shared_routes.products, name='products'),
    path('orders/', shared_routes.orders, name='orders'),
    path('orders/<int:order_id>/', shared_routes.order_detail, name='order_detail'),

    # Admin Routes
    path('admin/products/', admin_routes.products_list, name='admin_products'),
    path('admin/products/add/', admin_routes.product_add, name='product_add'),
    path('admin/products/<int:product_id>/edit/', admin_routes.product_edit),
    path('admin/orders/', admin_routes.orders_list, name='admin_orders'),
    path('admin/customers/', admin_routes.customers_list, name='admin_customers'),
    path('admin/reports/', admin_routes.reports, name='admin_reports'),

    # Customer Routes
    path('cart/', customer_routes.cart, name='cart'),
    path('cart/add/', customer_routes.add_to_cart, name='add_to_cart'),
    path('checkout/', customer_routes.checkout, name='checkout'),
    path('account/', customer_routes.account, name='account'),
]
```

### 5.2 Models

#### lib/ECommerce/Models/User.py

Custom user model with role-based authentication.

**Key Methods**:

```python
class User(AbstractBaseUser):
    # Fields...

    def has_role(self, roles):
        """Check if user has one of the specified roles"""
        return self.role in roles

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_customer(self):
        return self.role == 'customer'

    @property
    def is_admin_or_staff(self):
        return self.role in ['admin', 'staff']
```

#### lib/ECommerce/Models/Product.py

Product catalog and inventory management.

**Key Methods**:

```python
class Product(models.Model):
    # Fields...

    def has_stock(self, quantity=1):
        """Check if product has sufficient stock"""
        return self.stock >= quantity and self.is_active

    @property
    def is_low_stock(self):
        """Check if product is low on stock"""
        return self.stock < APP_CONFIG['low_stock_threshold']

    def adjust_stock(self, quantity, transaction_type='adjustment'):
        """Adjust product stock and create transaction record"""
        self.stock += quantity
        self.save()

        InventoryTransaction.objects.create(
            product=self,
            quantity=quantity,
            type=transaction_type
        )
```

### 5.3 Controllers

#### lib/ECommerce/Controllers/shared_routes.py

Common routes for all users.

**Key Functions**:

- `home()` - Landing page
- `login()` - User authentication
- `logout()` - Session termination
- `register()` - Customer registration
- `dashboard()` - Role-based dashboard
- `products()` - Product listing
- `orders()` - Order listing (role-filtered)
- `order_detail()` - Single order view

#### lib/ECommerce/Controllers/admin_routes.py

Admin/staff-only routes.

**Key Functions**:

- `products_list()` - Admin product management
- `product_add()` - Create product
- `product_edit()` - Update product
- `product_delete()` - Delete product
- `orders_list()` - All orders management
- `customers_list()` - Customer management
- `customer_detail()` - Customer profile
- `reports()` - Analytics dashboard

#### lib/ECommerce/Controllers/customer_routes.py

Customer-only routes.

**Key Functions**:

- `cart()` - View cart
- `add_to_cart()` - Add product to cart
- `update_cart()` - Update quantities
- `remove_from_cart()` - Remove item
- `checkout()` - Create order
- `account()` - Profile management

### 5.4 Templates

#### templates/layouts/default.html

Main layout template with sidebar navigation.

**Blocks**:

```django
{% block title %}Page Title{% endblock %}
{% block extra_css %}<!-- Additional CSS -->{% endblock %}
{% block content %}<!-- Main content -->{% endblock %}
{% block extra_js %}<!-- Additional JS -->{% endblock %}
```

**Features**:

- Responsive sidebar
- User info header
- Cart indicator
- Logout button
- Flash messages

#### templates/layouts/auth.html

Authentication layout (login/register).

**Features**:

- Centered form layout
- Brand logo
- Minimal design
- Responsive

### 5.5 Static Assets

#### public/css/style.css

Main stylesheet importing all modules.

**Structure**:

```css
/* Base Styles */
@import url("base/reset.css");
@import url("base/variables.css");
@import url("base/typography.css");

/* Components */
@import url("components/buttons.css");
@import url("components/cards.css");
@import url("components/forms.css");
@import url("components/tables.css");
@import url("components/modals.css");
@import url("components/alerts.css");

/* Layout */
@import url("layout/header.css");
@import url("layout/sidebar.css");
@import url("layout/footer.css");

/* Pages */
@import url("pages/auth.css");
@import url("pages/dashboard.css");
@import url("pages/products.css");
@import url("pages/cart.css");
@import url("pages/orders.css");

/* Utilities */
@import url("utilities/helpers.css");
@import url("utilities/responsive.css");
@import url("utilities/animations.css");
```

#### public/css/base/variables.css

CSS custom properties.

**Key Variables**:

```css
:root {
  /* Colors */
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
  --secondary: #64748b;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;

  /* Grays */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

---

## 6. Business Logic

### 6.1 Shopping Cart

**Session-Based Cart**:

```python
# Cart structure in session
request.session['cart'] = {
    '1': 2,  # product_id: quantity
    '5': 1,
    '12': 3
}

# Add to cart
def add_to_cart(request):
    cart = request.session.get('cart', {})
    product_id = str(request.POST.get('product_id'))
    quantity = int(request.POST.get('quantity', 1))

    # Validate stock
    product = Product.objects.get(id=product_id)
    if not product.has_stock(quantity):
        return JsonResponse({'error': 'Insufficient stock'})

    # Add or update
    cart[product_id] = cart.get(product_id, 0) + quantity
    request.session['cart'] = cart
    request.session.modified = True

    return JsonResponse({'success': True})
```

### 6.2 Order Calculation

**Tax and Shipping**:

```python
def calculate_order_totals(cart_items, subtotal):
    # Tax calculation (8%)
    tax = subtotal * APP_CONFIG['tax_rate']

    # Shipping calculation ($5 flat, free over $100)
    if subtotal >= APP_CONFIG['free_shipping_threshold']:
        shipping = 0
    else:
        shipping = APP_CONFIG['shipping_cost']

    # Total
    total = subtotal + tax + shipping

    return {
        'subtotal': round(subtotal, 2),
        'tax': round(tax, 2),
        'shipping': round(shipping, 2),
        'total': round(total, 2)
    }
```

### 6.3 Inventory Management

**Stock Deduction**:

```python
@transaction.atomic
def process_order(cart, customer):
    order = Order.objects.create(customer=customer, status='pending')

    for product_id, quantity in cart.items():
        product = Product.objects.select_for_update().get(id=product_id)

        # Validate stock
        if product.stock < quantity:
            raise InsufficientStockError(f"{product.name} has only {product.stock} units")

        # Create order item
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=product.price
        )

        # Deduct stock
        product.stock -= quantity
        product.save()

        # Record transaction
        InventoryTransaction.objects.create(
            product=product,
            quantity=-quantity,
            type='sale',
            reference_type='order',
            reference_id=order.id
        )

    return order
```

### 6.4 Order Status Workflow

```
pending → processing → shipped → delivered
                          ↓
                     cancelled
```

**Status Transitions**:

```python
ALLOWED_TRANSITIONS = {
    'pending': ['processing', 'cancelled'],
    'processing': ['shipped', 'cancelled'],
    'shipped': ['delivered'],
    'delivered': [],
    'cancelled': []
}

def update_order_status(order, new_status, notes=''):
    # Validate transition
    if new_status not in ALLOWED_TRANSITIONS.get(order.status, []):
        raise InvalidStatusTransition(
            f"Cannot change from {order.status} to {new_status}"
        )

    # Update order
    order.status = new_status
    order.save()

    # Create timeline entry
    OrderTimeline.objects.create(
        order=order,
        status=new_status,
        notes=notes
    )

    # Handle cancellation
    if new_status == 'cancelled':
        restore_inventory(order)
```

---

## 7. Frontend Components

### 7.1 Product Card

**HTML Structure**:

```html
<div class="product-card">
  <img
    src="{{ product.image_url }}"
    alt="{{ product.name }}"
    class="product-image"
  />
  <div class="product-info">
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <div class="product-footer">
      <span class="product-price">${{ product.price }}</span>
      <button
        class="btn btn-primary add-to-cart-btn"
        data-product-id="{{ product.id }}"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>
```

**JavaScript**:

```javascript
// public/js/customer/products.js
document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const productId = e.target.dataset.productId;

    try {
      const response = await fetch("/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      const data = await response.json();
      if (data.success) {
        updateCartCount(data.cart_count);
        showNotification("Product added to cart", "success");
      }
    } catch (error) {
      showNotification("Error adding to cart", "error");
    }
  });
});
```

### 7.2 Data Table with Actions

**HTML**:

```html
<table class="data-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {% for product in products %}
    <tr>
      <td>{{ product.name }}</td>
      <td>${{ product.price }}</td>
      <td>{{ product.stock }}</td>
      <td>
        <div class="kebab-menu">
          <button class="kebab-btn">⋮</button>
          <div class="kebab-dropdown">
            <a href="/admin/products/{{ product.id }}/edit/">Edit</a>
            <a href="#" class="delete-product" data-id="{{ product.id }}"
              >Delete</a
            >
          </div>
        </div>
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
```

**JavaScript**:

```javascript
// public/js/admin/products-list.js
document.querySelectorAll(".kebab-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const dropdown = btn.nextElementSibling;
    dropdown.classList.toggle("show");
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".kebab-dropdown.show").forEach((dropdown) => {
    dropdown.classList.remove("show");
  });
});
```

### 7.3 Modal Dialog

**HTML**:

```html
<div id="confirmModal" class="modal">
  <div class="modal-content">
    <h2 class="modal-title">Confirm Action</h2>
    <p class="modal-message">Are you sure?</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="confirmAction()">Confirm</button>
    </div>
  </div>
</div>
```

**JavaScript**:

```javascript
function showModal(title, message, onConfirm) {
  const modal = document.getElementById("confirmModal");
  modal.querySelector(".modal-title").textContent = title;
  modal.querySelector(".modal-message").textContent = message;
  modal.style.display = "flex";

  modal.dataset.onConfirm = onConfirm.toString();
}

function closeModal() {
  document.getElementById("confirmModal").style.display = "none";
}

function confirmAction() {
  const modal = document.getElementById("confirmModal");
  const onConfirm = new Function(modal.dataset.onConfirm);
  onConfirm();
  closeModal();
}
```

---

## 8. Security

### 8.1 Authentication

**Password Hashing (bcrypt)**:

```python
from django.contrib.auth.hashers import make_password, check_password

# Registration
user = User(username=username, email=email)
user.password = make_password(password)  # bcrypt hash
user.save()

# Login
user = User.objects.get(username=username)
if check_password(password, user.password):
    # Login successful
    pass
```

**Session Management**:

```python
# lib/ECommerce/Config.py
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 3600  # 1 hour
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = not DEBUG  # HTTPS only in production
SESSION_SAVE_EVERY_REQUEST = True
```

### 8.2 Authorization

**Role-Based Decorators**:

```python
# lib/ECommerce/Auth.py
from functools import wraps
from django.http import HttpResponseForbidden

def require_role(allowed_roles):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return redirect('login')

            if request.user.role not in allowed_roles:
                return HttpResponseForbidden('Access denied')

            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

# Usage
@require_role(['admin', 'staff'])
def admin_view(request):
    pass
```

### 8.3 CSRF Protection

**Middleware**:

```python
MIDDLEWARE = [
    ...
    'django.middleware.csrf.CsrfViewMiddleware',
    ...
]
```

**Template Usage**:

```html
<form method="post">
  {% csrf_token %}
  <!-- Form fields -->
</form>
```

**AJAX Requests**:

```javascript
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

fetch("/api/endpoint/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
  },
  body: JSON.stringify(data),
});
```

### 8.4 SQL Injection Prevention

**Django ORM**:

```python
# SAFE - Parameterized query
products = Product.objects.filter(category=user_input)

# SAFE - Named parameters
Product.objects.raw('SELECT * FROM product WHERE category = %s', [category])

# UNSAFE - String concatenation (NEVER DO THIS)
# Product.objects.raw(f'SELECT * FROM product WHERE category = "{category}"')
```

### 8.5 XSS Prevention

**Template Auto-escaping**:

```django
{# Auto-escaped #}
<p>{{ user_input }}</p>

{# Explicitly safe (use with caution) #}
<p>{{ trusted_html|safe }}</p>

{# URL escaping #}
<a href="{{ url }}">Link</a>
```

---

## 9. Testing

### 9.1 Unit Tests

```python
# lib/ECommerce/tests/test_models.py
from django.test import TestCase
from ..Models.Product import Product
from ..Models.User import User

class ProductTestCase(TestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name="Test Product",
            price=29.99,
            stock=10
        )

    def test_has_stock(self):
        self.assertTrue(self.product.has_stock(5))
        self.assertFalse(self.product.has_stock(15))

    def test_is_low_stock(self):
        self.product.stock = 5
        self.product.save()
        self.assertTrue(self.product.is_low_stock)
```

### 9.2 Integration Tests

```python
# lib/ECommerce/tests/test_views.py
from django.test import TestCase, Client
from django.urls import reverse

class ShoppingCartTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.product = Product.objects.create(
            name="Test Product",
            price=29.99,
            stock=10
        )

    def test_add_to_cart(self):
        response = self.client.post(reverse('add_to_cart'), {
            'product_id': self.product.id,
            'quantity': 2
        })
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
```

### 9.3 Running Tests

```bash
# Run all tests
python manage.py test

# Run specific test file
python manage.py test lib.ECommerce.tests.test_models

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

---

## 10. Deployment

### 10.1 Production Checklist

- [ ] Set `DEBUG = False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use strong `SECRET_KEY`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Configure static file serving
- [ ] Set up HTTPS
- [ ] Configure email backend
- [ ] Set up logging
- [ ] Configure backup strategy
- [ ] Set up monitoring

### 10.2 Environment Configuration

```env
# .env.production
DJANGO_SECRET_KEY=<strong-random-key>
DEBUG=False
ALLOWED_HOSTS=shoppy.com,www.shoppy.com

DATABASE_URL=postgresql://user:password@localhost:5432/shoppy

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=noreply@shoppy.com
EMAIL_HOST_PASSWORD=<password>
```

### 10.3 Gunicorn Setup

```bash
# Install Gunicorn
pip install gunicorn

# Run with 4 workers
gunicorn lib.ECommerce.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 4 \
  --timeout 60 \
  --access-logfile - \
  --error-logfile -
```

### 10.4 Nginx Configuration

```nginx
server {
    listen 80;
    server_name shoppy.com www.shoppy.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name shoppy.com www.shoppy.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location /static/ {
        alias /var/www/shoppy/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /var/www/shoppy/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 11. Troubleshooting

### 11.1 Database Issues

**Problem**: Database locked error

```
sqlite3.OperationalError: database is locked
```

**Solution**: SQLite doesn't handle concurrent writes well. Use PostgreSQL in production:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'shoppy',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### 11.2 Static Files

**Problem**: CSS/JS not loading (404 errors)

**Solution**:

```bash
# Development
python manage.py collectstatic

# Check settings
DEBUG = True  # Enables development static serving
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'public']
```

### 11.3 Session Expiration

**Problem**: Users logged out too quickly

**Solution** (Config.py):

```python
SESSION_COOKIE_AGE = 86400  # 24 hours instead of 1 hour
SESSION_SAVE_EVERY_REQUEST = True  # Extend on each request
```

### 11.4 Cart Not Persisting

**Problem**: Cart empty after page refresh

**Solution**:

```python
# Always modify session after cart changes
request.session['cart'] = cart
request.session.modified = True  # Force save
```

---

**End of Documentation**

For additional help, see:

- Django Documentation: https://docs.djangoproject.com/
- ShopPy GitHub Issues: [repository]/issues
- Contact: support@shoppy.com

**Wrapped in code, packed with deals.**

## 📋 Overview

ShopPy is a complete e-commerce order processing system built with Python and Django. This project is a full-featured 1-to-1 port of the original Perl-based E-Commerce Order Processing System, featuring comprehensive product management, customer accounts, shopping cart functionality, and administrative order management.

### Key Features

- 🛍️ **Product Catalog**: Browse, search, and filter products with detailed product pages
- 🛒 **Shopping Cart**: Session-based cart management with real-time updates
- 👤 **Customer Accounts**: User registration, login, profile management, and order history
- 📦 **Order Management**: Complete order tracking, status updates, and delivery information
- 👨‍💼 **Admin Dashboard**: Comprehensive administrative interface for managing products, orders, customers, and reports
- 📊 **Reporting**: Sales reports, product analytics, customer insights, and revenue tracking
- 💳 **Checkout Flow**: Streamlined multi-step checkout with shipping and tax calculations
- 🔐 **Security**: Session-based authentication with bcrypt password hashing
- 📱 **Responsive Design**: Mobile-first CSS architecture with breakpoints for all devices

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- SQLite3 (included with Python)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd E-Commerce-Order-Processing-System-Python
   ```

2. **Create a virtual environment** (recommended)

   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**

   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Run the development server**

   ```bash
   python manage.py runserver
   ```

   The application will be available at `http://localhost:8000`

## 📁 Project Structure

```
E-Commerce-Order-Processing-System-Python/
├── manage.py                    # Django management script
├── requirements.txt             # Python dependencies
├── db.sqlite3                   # SQLite database
├── lib/
│   └── ECommerce/              # Main Django app
│       ├── models.py           # Database models (User, Customer, Product, Order)
│       ├── views.py            # View functions
│       ├── urls.py             # URL routing
│       ├── wsgi.py             # WSGI configuration
│       ├── Auth.py             # Authentication utilities
│       ├── Database.py         # Database helpers
│       ├── Config.py           # Configuration settings
│       ├── context_processors.py
│       ├── Controllers/        # View controllers
│       │   ├── shared_routes.py
│       │   ├── admin_routes.py
│       │   └── customer_routes.py
│       └── Models/            # ORM models
│           ├── User.py
│           ├── Customer.py
│           ├── Product.py
│           └── Order.py
├── templates/                  # Django HTML templates
│   ├── layouts/               # Base layouts
│   │   ├── default.html
│   │   └── auth.html
│   ├── customer/              # Customer pages
│   │   ├── dashboard_customer.html
│   │   ├── products_customer.html
│   │   ├── cart.html
│   │   ├── orders_customer.html
│   │   ├── order_detail_customer.html
│   │   └── account.html
│   └── admin/                 # Admin pages
│       ├── dashboard_admin.html
│       ├── products_admin.html
│       ├── product_add.html
│       ├── product_edit.html
│       ├── orders_admin.html
│       ├── order_detail_admin.html
│       ├── customers.html
│       └── reports.html
├── public/                    # Static files
│   ├── css/                   # Stylesheets
│   │   ├── style.css          # Main stylesheet
│   │   ├── base/              # Base styles
│   │   │   ├── reset.css
│   │   │   ├── variables.css
│   │   │   └── typography.css
│   │   ├── layout/            # Layout components
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── sidebar.css
│   │   │   └── navigation.css
│   │   ├── components/        # Reusable components
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── forms.css
│   │   │   ├── tables.css
│   │   │   ├── modals.css
│   │   │   └── alerts.css
│   │   ├── pages/             # Page-specific styles
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── products.css
│   │   │   ├── cart.css
│   │   │   ├── orders.css
│   │   │   └── reports.css
│   │   └── utilities/         # Utility classes
│   │       ├── helpers.css
│   │       ├── animations.css
│   │       └── responsive.css
│   └── images/                # SVG assets
│       ├── logo.svg
│       ├── icons.svg
│       ├── login-illustration.svg
│       ├── empty-cart.svg
│       ├── empty-orders.svg
│       └── no-products.svg
└── docs/                      # Documentation
```

## 🗄️ Database Models

### User Model

- `id`: Primary key
- `email`: Unique email address
- `password`: Hashed password (bcrypt)
- `is_admin`: Admin flag
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### Customer Model

- `user`: Foreign key to User
- `first_name`: Customer's first name
- `last_name`: Customer's last name
- `phone`: Contact phone number
- `address`: Shipping/billing address
- `city`: City
- `state`: State/Province
- `zip_code`: Postal code
- `country`: Country
- `created_at`: Registration date
- `updated_at`: Last update date

### Product Model

- `id`: Primary key
- `sku`: Stock Keeping Unit (unique)
- `name`: Product name
- `description`: Product description
- `price`: Product price
- `quantity`: Available stock quantity
- `category`: Product category
- `is_active`: Availability flag
- `created_at`: Creation date
- `updated_at`: Last update date

### Order Model

- `id`: Primary key
- `customer`: Foreign key to Customer
- `order_number`: Unique order number
- `status`: Order status (pending, processing, shipped, delivered, cancelled)
- `subtotal`: Sum of item prices
- `tax`: Tax amount
- `shipping`: Shipping cost
- `total`: Final order total
- `shipping_address`: Delivery address
- `tracking_number`: Carrier tracking number
- `notes`: Order notes
- `created_at`: Order date
- `updated_at`: Last status update

### OrderItem Model

- `order`: Foreign key to Order
- `product`: Foreign key to Product
- `quantity`: Items ordered
- `unit_price`: Price per item at order time
- `total_price`: Line item total

## 🎨 CSS Architecture

The CSS system is organized into modular, reusable files with a clear hierarchy:

### Base CSS (`public/css/base/`)

- **reset.css**: Browser reset and normalization
- **variables.css**: CSS custom properties (colors, spacing, typography, shadows)
- **typography.css**: Font definitions and text styles

### Layout CSS (`public/css/layout/`)

- **header.css**: Navigation header with logo and user menu
- **footer.css**: Footer with company info and links
- **sidebar.css**: Admin sidebar navigation
- **navigation.css**: Breadcrumbs, tabs, pagination, steps

### Component CSS (`public/css/components/`)

- **buttons.css**: Button variants (primary, secondary, danger, etc.)
- **cards.css**: Card containers with consistent styling
- **forms.css**: Form inputs, labels, and validation styles
- **tables.css**: Data table styles with responsive support
- **modals.css**: Modal dialogs and overlays
- **alerts.css**: Alert messages and toast notifications

### Page CSS (`public/css/pages/`)

- **auth.css**: Login and registration page styles
- **dashboard.css**: Admin and customer dashboard layouts
- **products.css**: Product grid and detail page styles
- **cart.css**: Shopping cart and checkout flows
- **orders.css**: Order list and detail pages
- **reports.css**: Analytics and reporting pages

### Utilities CSS (`public/css/utilities/`)

- **helpers.css**: Utility classes for layout, spacing, text, colors
- **animations.css**: Keyframe animations and transitions
- **responsive.css**: Media query utilities and responsive patterns

### CSS Variables

```css
/* Colors */
--primary-color: #6366f1          /* Indigo */
--primary-light: #818cf8
--primary-lighter: #e0e7ff
--primary-dark: #4f46e5

--success-color: #10b981          /* Green */
--error-color: #ef4444            /* Red */
--warning-color: #f59e0b           /* Amber */
--info-color: #3b82f6             /* Blue */

/* Spacing (8px base unit) */
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)

/* Typography */
--font-size-xs: 0.75rem (12px)
--font-size-sm: 0.875rem (14px)
--font-size-base: 1rem (16px)
--font-size-lg: 1.125rem (18px)
--font-size-xl: 1.25rem (20px)

--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700

/* Layout */
--header-height: 64px
--sidebar-width: 280px
--container-xl: 1280px

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)

/* Border Radius */
--radius-sm: 0.25rem
--radius-md: 0.375rem
--radius-lg: 0.5rem
--radius-xl: 0.75rem
--radius-full: 9999px

/* Transitions */
--transition-fast: 150ms ease
--transition-normal: 300ms ease
```

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Session Management**: Django session framework for authentication
- **CSRF Protection**: Built-in Django CSRF middleware
- **SQL Injection Prevention**: Django ORM parameterized queries
- **XSS Prevention**: Django template auto-escaping
- **Admin Interface**: Role-based access control (admin vs. customer)

## ⚙️ Configuration

Edit `lib/ECommerce/Config.py` to customize:

```python
# Tax calculation
TAX_RATE = 0.08  # 8% sales tax

# Shipping
SHIPPING_RATE = 5.00              # Base shipping cost
FREE_SHIPPING_THRESHOLD = 100.00  # Free shipping above $100

# Pagination
ITEMS_PER_PAGE = 20

# Currency
CURRENCY = "USD"
CURRENCY_SYMBOL = "$"
```

## 🌐 Responsive Design

The CSS system includes responsive utilities for all breakpoints:

```
Mobile-first approach:
- Mobile: < 640px (default)
- Small tablet: 640px - 767px (sm)
- Tablet: 768px - 1023px (md)
- Desktop: 1024px - 1279px (lg)
- Large desktop: 1280px+ (xl)
```

### Responsive Classes

```html
<!-- Display utilities -->
<div class="d-none md:d-block">Hidden on mobile</div>

<!-- Grid columns -->
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 col mobile, 2 cols tablet, 3 cols desktop -->
</div>

<!-- Text alignment -->
<p class="text-center md:text-left">Centered on mobile</p>

<!-- Spacing -->
<div class="p-4 md:p-6 lg:p-8">Responsive padding</div>
```

## 🎯 Features Implementation

### Customer Features

- ✅ User registration and login
- ✅ Product browsing and search
- ✅ Shopping cart management
- ✅ Checkout with address and payment info
- ✅ Order history and tracking
- ✅ Account profile management
- ✅ Order status notifications

### Admin Features

- ✅ Product management (CRUD)
- ✅ Inventory tracking
- ✅ Order management and fulfillment
- ✅ Customer management
- ✅ Sales reports and analytics
- ✅ Dashboard with key metrics
- ✅ Export capabilities

## 📊 Business Logic
