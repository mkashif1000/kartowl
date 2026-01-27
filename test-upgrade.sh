#!/bin/bash

echo "🚀 Testing KartOwl Upgrade..."

# Test 1: Check if all services compile
echo "1️⃣ Checking compilation..."
cd kartowl-backend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Backend compiles successfully"
else
    echo "❌ Backend compilation failed"
    exit 1
fi

# Test 2: Check if all required files exist
echo "2️⃣ Checking required files..."

required_files=(
    "src/browser.service.ts"
    "src/history.service.ts"
    "src/entities/product-history.entity.ts"
    "src/app.module.ts"
    "src/app.controller.ts"
    "Dockerfile"
    ".env"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Test 3: Check if services are properly refactored
echo "3️⃣ Checking service refactoring..."

refactored_services=(
    "src/daraz.service.ts"
    "src/priceoye.service.ts"
    "src/telemart.service.ts"
    "src/olx.service.ts"
)

for service in "${refactored_services[@]}"; do
    if grep -q "BrowserService" "$service"; then
        echo "✅ $service uses BrowserService"
    else
        echo "❌ $service not properly refactored"
        exit 1
    fi
done

echo "🎉 All tests passed! KartOwl upgrade completed successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Start Redis and PostgreSQL locally or use docker-compose up"
echo "2. Update .env with your database credentials"
echo "3. Run npm run start:dev to start the application"
echo "4. Test with: curl http://localhost:3000/api/search?q=iPhone"