# 1️⃣ Base stage: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Install production dependencies only
RUN npm ci --production

# 2️⃣ Production stage: Serve Next.js app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the application port
EXPOSE 3000

# Set environment variables (can be overridden via --env-file)
ENV NODE_ENV=production

# Start Next.js app
CMD ["node_modules/.bin/next", "start"]
