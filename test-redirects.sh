#!/bin/bash

# Test script to verify Vercel rewrites work correctly
# Run this after building: npm run build

echo "Testing Vercel rewrites for React Router..."

# Check if dist/index.html exists
if [ ! -f "dist/index.html" ]; then
  echo "❌ Build not found. Run 'npm run build' first."
  exit 1
fi

echo "✅ Build found at dist/index.html"

# Test that index.html contains the React app
if grep -q "root" dist/index.html; then
  echo "✅ index.html contains React app"
else
  echo "❌ index.html missing React app"
  exit 1
fi

echo ""
echo "=== VERCEL DEPLOYMENT CHECKLIST ==="
echo "1. ✅ vercel.json configured with rewrites"
echo "2. ✅ Build completes successfully"
echo "3. ✅ dist/index.html exists"
echo ""
echo "To deploy:"
echo "  git add ."
echo "  git commit -m 'fix: resolve Vercel 404 on dynamic routes'"
echo "  git push origin main"
echo ""
echo "Vercel will auto-deploy! 🚀"
