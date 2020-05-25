# Webpack 4 多頁面配置 - pug, sass, vue template
```
# git clone
git clone -b addsprite https://github.com/gohiking/webpack4-template.git

# install node_modules
npm i

# Start a development server
npm run dev

# Build for production
npm run build
```

構建目錄：
```
|-- webpack
| |-- webpack.common.js
| |-- webpack.dev.js
| |-- webpack.prod.js
| |-- utils.js
| └-- output.js
|-- src
| |-- assets
| | |-- images
| | └-- fonts
| |-- sass
| |-- scripts
| | └-- main.js
| |-- vue
| | |-- VueComponent
| | | |-- index.vue
| | | |-- template.pug
| | | └-- style.sass
| |-- pages
| | |-- _layouts
| | | |-- default.pug
| | | |-- header.pug
| | | └-- footer.pug
| | |-- index
| | | └-- index.pug
| | |-- about
| | | └-- index.pug
|-- static
| |-- favicon.png
| └-- fbshare.png
| .babelrc
| .eslintignore
| .eslintrc
| .gitignore
| .npmrc
| .stylelintignore
| .stylelintrc
| package.json
| postcss.config.js
```
