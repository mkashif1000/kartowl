# Use the official Playwright image which has browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./

# Install NestJS dependencies
RUN npm install

COPY . .

# Build the NestJS app
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "dist/main"]