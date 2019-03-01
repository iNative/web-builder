# Olon - Html templating script


## Getting Started
Olon is a gulp script that helps you build html sites recycling as much html mark up as posssible or needed, populating it with dynamic data if needed, and deployed to netlify. 

Olon uses plain .html files, so you can start off with whatever you like, really a empty file or brand new template. 
Put everything in the 'dist' folder.
This is the root of your website.

Data can be pulled from json file or from any api, '{{mustache}}' notation is used for rendering data within html files.
The scope is the root of the json data obj.

Ghost api are installed by default. Posts will be available as a array within the main scope as {{posts}}, whereas pages as {{pages}}

We've also included a  Gulp file to help you get started with theme customization. You'll need to install Node.js and Gulp before using our included gulpfile.js.

a scss folder is present for the purpouse of this demo.
You will find all the branding colors inside `scss/variables/_brand.scss`. You can change them with a `HEX` value or with other predefined variables from`scss/variables/_colors.scss`
5. Run in terminal `gulp compile:scss` for a single compilation or `gulp ` for continous compilation of the changes that you make in `*.scss` files. This command should be run in the same folder where `gulpfile.js` and `package.json` are located

1. Download the project's zip
2. Make sure you have node.js (https://nodejs.org/en/) installed
3. Type `npm install` in terminal/console in the source folder where `package.json` is located
4. Run in terminal `npm start` for first compile and Index Page (default) of the product.


