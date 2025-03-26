# Use Node.js 22-alpine version
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN yarn run build

EXPOSE 3306

# Use a lightweight Node.js image in the final stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Load environment variables from .env file
ENV PORT=9001

# Run Prisma migrations before starting the app
RUN npx prisma generate
CMD npx prisma migrate deploy && node dist/main

# Expose port
EXPOSE 9001
