#!/bin/bash

echo "🚀 Starting EduPathfinder Platform..."

# Start MongoDB (if not running)
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /tmp/mongod.log
fi

# Install dependencies and start backend
echo "📦 Setting up backend..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Install dependencies and start frontend
echo "🎨 Setting up frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Platform started successfully!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔗 Backend API: http://localhost:5000"
echo "📚 API Docs: http://localhost:5000/api-docs"
echo "📊 Health Check: http://localhost:5000/api/v1/health"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait