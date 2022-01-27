const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { fromEvent } = require('rxjs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let messageWindow;
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'opayPreload.js'),
      backgroundThrottling: false
    }
  });

  mainWindow.loadURL("https://payment.opay.tw/Broadcaster/DonateList");

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  createMessageWindow();
};

const createMessageWindow = () => {
  messageWindow = new BrowserWindow({
    width: 616,
    height: 358,
    webPreferences: {
      preload: path.join(__dirname, 'messagePreload.js'),
      backgroundThrottling: false
    }
  });

  messageWindow.removeMenu();
  messageWindow.loadFile(path.join(__dirname, 'message.html'));

}

ipcMain.on("openMessageWindow", (event, {author, message}) => {
  let fillContent = () => {
    messageWindow.webContents.send("fillContent", {
      author: author,
      message: message
    });
  }
  
  try {
    fillContent();
  } catch(_) {
    createMessageWindow();
    fillContent();
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
