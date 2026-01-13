#!/bin/bash

# Html5-QRCode JSON i18n テスト用簡易サーバー起動スクリプト

echo "🌍 Html5-QRCode JSON i18n Test Server"
echo "======================================"
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Error: Python is not installed"
    echo "Please install Python to run this test server"
    exit 1
fi

echo "✅ Python found: $PYTHON_CMD"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

PORT=8000

echo "📁 Serving files from current directory"
echo "🌐 Server will start on: http://localhost:$PORT"
echo ""
echo "📝 To test JSON i18n, open:"
echo "   → http://localhost:$PORT/examples/html5/i18n-json-demo.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "Starting server..."
echo "===================="

# Start Python HTTP server
$PYTHON_CMD -m http.server $PORT
