# Use official Node.js image as the base image
FROM node:22-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@17

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the Angular app for production
RUN npm run ng build --prod

# Second stage, use nginx to serve the production-ready Angular app
FROM nginx:stable-alpine-slim

# Copy the built app from the previous stage to the NGINX directory
COPY --from=build /app/dist/forms-ui/* /usr/share/nginx/html/
# Not /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 

# Expose port 80 to the outside world
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
