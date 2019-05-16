const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win;

/* console.log(path.join(__dirname, '/../', '/dist/ng-electron/', 'index.html'));
console.log(path.join(__dirname, '../', '/dist/ng-electron/', 'index.html'));
console.log(path.join(__dirname, '/dist/ng-electron/', 'index.html')); */

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '/../', '/dist/ng-electron/assets/', 'logo.png')
  })

   win.loadURL(
     url.format({
       pathname: path.join(__dirname, '/../', '/dist/ng-electron/', 'index.html'),
       protocol: 'file',
       slashes: true
     })
   )
  // or
  // win.loadURL(`file://${__dirname}/../dist/ng-electron/index.html`)

  win.webContents.openDevTools();

  // Event when window is closed
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', function () {

  // onMac close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
