/* Project by makoteq https://github.com/makoteq*/

const { app, Menu, BrowserWindow } = require("electron");
const home = "desktop";
const fs = require("fs");
const { ipcMain } = require("electron");
const mkdirp = require("mkdirp");

let text = require("./src/indexmodule.js");
let name = "";
let description = "";
let isfacebook = "none";
let facebooklink = "https://www.facebook.com/";
let isinstagram = "none";
let instagramlink = "https://www.instagram.com/";
let isgithub = "none";
let githublink = "https://github.com/";

ipcMain.on("button", (event, arg) => {
  let input = new BrowserWindow({
    width: 600,
    height: 500,
    icon: __dirname + "./assets/logo.png",
    webPreferences: {
      nodeIntegration: true
    }
  });
  input.setMenuBarVisibility(false);
  input.loadFile("./src/input.html");
});
ipcMain.on("name", (event, arg) => {
  name = arg;
});
ipcMain.on("description", (event, arg) => {
  description = arg;
});
ipcMain.on("fbValue", (event, arg) => {
  facebooklink = arg;
  isfacebook = "";
});
ipcMain.on("igValue", (event, arg) => {
  instagramlink = arg;
  isinstagram = "";
});
ipcMain.on("gitValue", (event, arg) => {
  githublink = arg;
  isgithub = "";
});

ipcMain.on("submit", (event, arg) => {
  generate();
});

function generate() {
  mkdirp(app.getPath(home) + "/" + name + " portfolio", function(err) {
    if (err) console.error(err);
    fs.writeFile(
      app.getPath(home) + "/" + name + " portfolio/index.html",
      text.site(
        name,
        description,
        isfacebook,
        facebooklink,
        isinstagram,
        instagramlink,
        isgithub,
        githublink
      ),
      () => {}
    );
  /*  fs.copyFile(
      __dirname + "/assets/Desktop.png",
      app.getPath(home) + "/" + name + " portfolio/Desktop.png",
      err => {
        if (err) throw err;
      }
    );*/
    let info = new BrowserWindow({
      width: 600,
      height: 400,
      icon: __dirname + "./assets/logo.png",
      webPreferences: {
        nodeIntegration: true
      }
    });
    info.setMenuBarVisibility(false);
    info.loadFile("./src/info.html");
    ipcMain.on("path", (event, arg) => {
      event.reply("path", app.getPath(home));
    });
    info.on("closed", () => {
      app.quit();
    });
    // and load the index.html of the app.
    console.log("Saved! in " + app.getPath(home));
  });
}
function createWindow() {
  // Stwórz okno przeglądarki.
  let win = new BrowserWindow({
    width: 600,
    height: 500,
    icon: __dirname + "./assets/logo.png",
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile("./index.html");
  win.on("closed", () => {
    app.quit();
  });
}

app.on("ready", function() {
  createWindow();
});
