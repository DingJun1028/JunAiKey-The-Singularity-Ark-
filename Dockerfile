# Use nginx to serve the static React build
FROM nginx:alpine

# Copy the built React app to nginx html directory
COPY build/ /usr/share/nginx/html/

# Copy custom nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]