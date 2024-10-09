# Use the official Node.js image as a base
FROM node:20.17.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/server.js"]
