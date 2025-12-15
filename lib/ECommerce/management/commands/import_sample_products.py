"""
Django management command to import sample products
Usage: python manage.py import_sample_products
"""
from django.core.management.base import BaseCommand
from lib.ECommerce.Models.Product import Product


class Command(BaseCommand):
    help = 'Import sample products into the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing products before importing',
        )

    def handle(self, *args, **options):
        self.stdout.write('Importing sample products...')
        self.stdout.write('-' * 60)

        # Clear existing products if requested
        if options['clear']:
            count = Product.objects.count()
            Product.objects.all().delete()
            self.stdout.write(self.style.WARNING(f'Cleared {count} existing products'))

        # Product data
        products_data = [
            # Electronics
            {'name': 'Wireless Bluetooth Headphones', 'description': 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
             'sku': 'ELEC-001', 'category': 'Electronics', 'price': 149.99, 'cost': 75.00, 'stock_quantity': 50,
             'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'},
            {'name': 'Smart Watch Pro', 'description': 'Feature-rich smartwatch with health monitoring, GPS, and water resistance.',
             'sku': 'ELEC-002', 'category': 'Electronics', 'price': 299.99, 'cost': 150.00, 'stock_quantity': 30,
             'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'},
            {'name': 'Portable Bluetooth Speaker', 'description': 'Compact speaker with powerful bass and 12-hour playtime.',
             'sku': 'ELEC-003', 'category': 'Electronics', 'price': 79.99, 'cost': 35.00, 'stock_quantity': 75,
             'image_url': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'},
            {'name': 'Mechanical Keyboard', 'description': 'RGB mechanical keyboard with customizable keys and wrist rest.',
             'sku': 'ELEC-004', 'category': 'Electronics', 'price': 119.99, 'cost': 50.00, 'stock_quantity': 20,
             'image_url': 'https://www.popsci.com/wp-content/uploads/2022/02/12/mechanical-keyboard-with-rbg.jpg?quality=85'},
            {'name': 'Wireless Charging Pad', 'description': 'Fast wireless charger compatible with all Qi-enabled devices.',
             'sku': 'ELEC-005', 'category': 'Electronics', 'price': 34.99, 'cost': 12.00, 'stock_quantity': 45,
             'image_url': 'https://eu.omnicharge.co/cdn/shop/files/omni-2-in-1-wireless-charging-pad-03.jpg?v=1723201087&width=1000'},
            
            # Clothing
            {'name': 'Classic Denim Jacket', 'description': 'Timeless denim jacket with comfortable fit and stylish design.',
             'sku': 'CLOTH-001', 'category': 'Clothing', 'price': 89.99, 'cost': 40.00, 'stock_quantity': 40,
             'image_url': 'https://www.celebritystylefashion.com.au/cdn/shop/files/Sa5e4eb5acec74ad484fd808a3e37d448N.webp?v=1716011791'},
            {'name': 'Running Sneakers', 'description': 'Lightweight running shoes with responsive cushioning.',
             'sku': 'CLOTH-002', 'category': 'Clothing', 'price': 129.99, 'cost': 55.00, 'stock_quantity': 60,
             'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'},
            {'name': 'Cotton T-Shirt', 'description': 'Comfortable cotton t-shirt in various colors.',
             'sku': 'CLOTH-003', 'category': 'Clothing', 'price': 24.99, 'cost': 10.00, 'stock_quantity': 100,
             'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'},
            
            # Books
            {'name': 'Python Programming Book', 'description': 'Comprehensive guide to Python programming for beginners and experts.',
             'sku': 'BOOK-001', 'category': 'Books', 'price': 49.99, 'cost': 20.00, 'stock_quantity': 100,
             'image_url': 'https://m.media-amazon.com/images/I/81YWUlX6J4L._AC_UF1000,1000_QL80_.jpg'},
            {'name': 'Cookbook Gourmet', 'description': 'Collection of gourmet recipes from around the world.',
             'sku': 'BOOK-002', 'category': 'Books', 'price': 34.99, 'cost': 15.00, 'stock_quantity': 50,
             'image_url': 'https://eatdrinkfrolic.com/wp-content/uploads/2015/07/Easy2BGourmet.jpg'},
            
            # Home & Kitchen
            {'name': 'Ceramic Coffee Mug Set', 'description': 'Set of 4 elegant ceramic mugs, microwave and dishwasher safe.',
             'sku': 'HOME-001', 'category': 'Home', 'price': 34.99, 'cost': 12.00, 'stock_quantity': 45,
             'image_url': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop'},
            {'name': 'LED Desk Lamp', 'description': 'Adjustable LED lamp with multiple brightness levels and USB charging port.',
             'sku': 'HOME-002', 'category': 'Home', 'price': 59.99, 'cost': 25.00, 'stock_quantity': 35,
             'image_url': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop'},
            {'name': 'Coffee Maker', 'description': '12-cup programmable coffee maker with thermal carafe.',
             'sku': 'HOME-003', 'category': 'Home', 'price': 79.99, 'cost': 35.00, 'stock_quantity': 25,
             'image_url': 'https://media.wired.com/photos/64bad54a52bb92d7ad7c335a/master/w_1600%2Cc_limit/Delonghi-TrueBrew-Beans-Gear.jpg'},
            
            # Sports & Fitness
            {'name': 'Yoga Mat Premium', 'description': 'Extra thick, non-slip yoga mat with carrying strap.',
             'sku': 'SPORT-001', 'category': 'Sports', 'price': 39.99, 'cost': 15.00, 'stock_quantity': 80,
             'image_url': 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop'},
            {'name': 'Dumbbell Set', 'description': 'Adjustable dumbbell set 5-25 lbs with storage rack.',
             'sku': 'SPORT-002', 'category': 'Sports', 'price': 149.99, 'cost': 70.00, 'stock_quantity': 15,
             'image_url': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop'},
            
            # Toys
            {'name': 'Building Blocks Set', 'description': 'Creative building blocks set with 500 pieces for endless fun.',
             'sku': 'TOY-001', 'category': 'Toys', 'price': 44.99, 'cost': 18.00, 'stock_quantity': 55,
             'image_url': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop'},
            {'name': 'Board Game Collection', 'description': 'Family board game collection with 5 classic games.',
             'sku': 'TOY-002', 'category': 'Toys', 'price': 59.99, 'cost': 25.00, 'stock_quantity': 30,
             'image_url': 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop'},
            
            # Beauty
            {'name': 'Organic Skincare Set', 'description': 'All-natural skincare collection with cleanser, toner, and moisturizer.',
             'sku': 'BEAUTY-001', 'category': 'Beauty', 'price': 69.99, 'cost': 30.00, 'stock_quantity': 25,
             'image_url': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'},
            {'name': 'Hair Dryer Professional', 'description': 'Professional-grade hair dryer with ionic technology.',
             'sku': 'BEAUTY-002', 'category': 'Beauty', 'price': 89.99, 'cost': 40.00, 'stock_quantity': 20,
             'image_url': 'https://frisorshop.se/images/zoom/30wdu2fq.jpeg'},
            
            # Automotive
            {'name': 'Car Phone Mount', 'description': 'Universal magnetic phone mount with 360-degree rotation.',
             'sku': 'AUTO-001', 'category': 'Automotive', 'price': 24.99, 'cost': 8.00, 'stock_quantity': 90,
             'image_url': 'https://preview.redd.it/what-car-phone-holder-do-you-use-v0-90wg3nl6b6fc1.jpeg?auto=webp&s=5109da07e87f629a22dc608c65faa41a379b395e'},
            {'name': 'Tire Pressure Gauge', 'description': 'Digital tire pressure gauge with LCD display.',
             'sku': 'AUTO-002', 'category': 'Automotive', 'price': 19.99, 'cost': 7.00, 'stock_quantity': 70,
             'image_url': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/ReifendruckPruefen.jpg'},
        ]

        # Import products
        created_count = 0
        for prod_data in products_data:
            try:
                product, created = Product.objects.get_or_create(
                    sku=prod_data['sku'],
                    defaults=prod_data
                )
                if created:
                    created_count += 1
                    self.stdout.write(f"✓ Created: {product.name} ({product.sku})")
                else:
                    self.stdout.write(self.style.WARNING(f"⊘ Already exists: {product.name}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"✗ Error importing {prod_data['name']}: {e}"))

        self.stdout.write('-' * 60)
        self.stdout.write(self.style.SUCCESS(f'\n✓ Successfully imported {created_count} new products!'))
        self.stdout.write(f'Total products in database: {Product.objects.count()}')
        
        # Show categories
        self.stdout.write('\nProduct Categories:')
        categories = Product.objects.values_list('category', flat=True).distinct()
        for cat in categories:
            count = Product.objects.filter(category=cat).count()
            self.stdout.write(f'  • {cat}: {count} products')
