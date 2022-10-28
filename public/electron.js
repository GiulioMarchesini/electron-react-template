//file per il Back end
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 660,
        height: 800,
        icon: path.join(__dirname, 'logo256.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // Controllo di versione
    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.on("closed", () => (
        mainWindow = null
    ))

    if (isDev) mainWindow.webContents.openDevTools();//open dev tools
    else mainWindow.removeMenu();
}

//recive data from render.js (frontend)
ipcMain.on('FrontToBack', (event, arg) => {
    console.log(arg);
})

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit()
})
app.on("activate", () => {
    mainWindow === null && createWindow()
})

/*esempi di invio file a preload.js
mainWindow.webContents.send('nomeEvento', variabile);//invio dati a render.js
*/