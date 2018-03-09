#!/usr/bin/env bash

sed -i '' "s/assetsPublicPath: '\/'/assetsPublicPath: '\/Front-End\/'/g" config/index.js
sed -i '' "s_/static/img/_/Front-End/static/img/_g" src/views/Home.vue
npm install
npm run build
sed -i '' "s_/Front-End/static/img/_/static/img/_g" src/views/Home.vue
sed -i '' "s/assetsPublicPath: '\/Front-End\/'/assetsPublicPath: '\/'/g" config/index.js
./gh-pages.sh