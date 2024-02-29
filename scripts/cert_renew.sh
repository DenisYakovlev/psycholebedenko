#!/bin/bash

# Renew the Let's Encrypt certificate
sudo certbot renew --force-renewal --standalone

echo "Applying changes to nginx container"

# Check if the renewal was successful
if [ $? -eq 0 ]; then
    # Reload Nginx configuration to apply the new certificate
    docker-compose -f ../docker-compose.prod.yml restart nginx
else
    echo "Certificate renewal failed. Check Certbot logs."
fi