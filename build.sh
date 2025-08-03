#!/bin/bash

# Exit on any error
set -e

echo "Checking Node.js version..."
node --version

echo "Installing dependencies..."
npm ci

echo "Building for production..."
npm run build:prod

echo "Build completed successfully!" 