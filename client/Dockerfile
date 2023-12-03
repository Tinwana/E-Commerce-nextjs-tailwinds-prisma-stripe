# Step 1: Build the Next.js application
# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:18 as builder

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the Next.js application.
RUN npm run build

# Step 2: Serve the Next.js application from Node.js server
FROM node:18 as runner

WORKDIR /usr/src/app

# Copy the built app from the builder stage.
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

# Set the command to start the node server.
CMD ["npm", "start"]

# Open the container on port 3000.
EXPOSE 3000
