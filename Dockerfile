# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

ENV HOST 0.0.0.0

# Step 3: Copy the package.json and package-lock.json (or pnpm-lock.yaml) files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Step 4: Install pnpm globally and install project dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Step 5: Copy the entire application to the working directory
COPY . .

# Step 6: Build the TypeScript code
RUN pnpm run build

# Step 7: Remove dev dependencies
RUN pnpm prune --prod

# Step 8: Use a lightweight base image to serve the app (final stage)
FROM node:18-alpine

# Step 9: Set the working directory for the production stage
WORKDIR /app

# Step 10: Copy only the necessary files from the builder stage
COPY --from=builder /app ./

# Step 11: Expose the port that Cloud Run will use
EXPOSE 8080

# Step 12: Set environment variable for Cloud Run (listens on port 8080)
ENV PORT=8080

# Step 13: Start the app using the compiled JavaScript
CMD ["node", "dist/server.js"]
