#!/bin/bash

# Exit on any error
set -e

echo "Installing dependencies..."
npm ci

echo "Building for production..."
npm run build:prod

echo "Build completed successfully!" 