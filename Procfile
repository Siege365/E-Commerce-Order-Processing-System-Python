# ShopPy - Procfile for Render/Heroku deployment
# This file specifies the commands to run for each process type

web: gunicorn lib.ECommerce.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --threads 4 --worker-class gthread --worker-tmp-dir /dev/shm --access-logfile - --error-logfile -
