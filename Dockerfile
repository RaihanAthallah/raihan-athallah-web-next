# Use official Node.js LTS version as base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the Next.js project
RUN npm run build

# Use a minimal base image for production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built files and production dependencies
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./

# Expose the application port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
