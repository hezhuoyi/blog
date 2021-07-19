#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# if you want to commit on the master branch
git add -A
git commit -m 'update'
git push origin master

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:hezhuoyi/blog.git master:gh-pages

cd -