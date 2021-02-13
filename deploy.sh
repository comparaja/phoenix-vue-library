#!/usr/bin/env sh

# abort on errors
set -e

#install
npm install

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
git commit -m 'deploy'

git push -f git@github.com:comparaja/phoenix-vue-library.git master:gh-pages

cd -