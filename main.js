const { app, BrowserWindow } = require("electron");
const home = "desktop";
const fs = require("fs");
const { ipcMain } = require("electron");
const mkdirp = require('mkdirp');

let text = require('./src/indexmodule.js')
let name = 'maciek';
let description = 'something'
let isfacebook = 'none';
const facebooklink = 'https://www.facebook.com/';
let isinstagram = 'none';
const instagramlink = 'https://www.instagram.com/';
let isgithub = 'none';
const githublink = 'https://github.com/';

ipcMain.on("button", (event, arg) => {
  /* fs.writeFile(app.getPath(home)+'/test.txt', 'Hello content!', function (err) {
    if (err) throw err;
   event.reply('info','Saved! in '+app.getPath(home) )
  });*/
  let input = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  input.loadFile("input.html");
  ipcMain.on("submit", (event, arg) => {
    generate()
  })
});

function generate(){
  mkdirp(app.getPath(home)+'/' + name + ' portfolio', function (err) {
    if (err) console.error(err);
  fs.writeFile(app.getPath(home)+'/' + name + ' portfolio/index.html', text.site(name, description, isfacebook, facebooklink, isinstagram, instagramlink, isgithub, githublink),()=>{

  })
  fs.copyFile('Desktop.png', app.getPath(home)+'/' + name + ' portfolio/Desktop.png', (err) => {
    if (err) throw err;
  })
  

  // and load the index.html of the app.
  
console.log("Saved! in " + app.getPath(home));
});
}
function createWindow() {
  // Stwórz okno przeglądarki.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile("index.html");
  win.on("closed", () => {
    app.quit();
  });
}

app.on("ready", createWindow);
