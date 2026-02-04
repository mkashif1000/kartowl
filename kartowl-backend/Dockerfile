# Base image with Playwright installed (includes Node.js)
# Matching the version in package.json (v1.57.0)
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Set working directory
WORKDIR /app

# Ensure we have the latest npm (often helpful)
RUN npm install -g npm@latest

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
# We use 'npm ci' for a clean, deterministic install
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Prune development dependencies to save space (optional, but good practice)
# Note: NestJS 'dist' usually doesn't need devDeps, but some build tools might. 
# Safe to keep if space isn't critical, but for Fly free tier, smaller is better.
# However, we need 'dist' so we must not prune before build.
RUN npm prune --production

# Expose the application port
EXPOSE 3000

# Set environment variable defaults
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["npm", "run", "start:prod"]