const mongoose = require('mongoose')
const fetch = require('cross-fetch')
const { performance } = require('perf_hooks');
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

//Setup database
const uri = 'mongodb://localhost:27017/tikiCrawl'
mongoose.Promise = global.Promise
const db = mongoose.connection
mongoose.connect(process.env.DB_CONNECTION || uri, { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
//End DB Section

//Electron
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#4d4d4d',
            symbolColor: '#999999'
        },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    mainWindow.loadFile(path.join(__dirname, '/browser/index.html'))
}
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    mainWindow.on('close', function (e) { //   <---- Catch close event
        mainWindow.webContents.send('open-exit-modal', ``);
        e.preventDefault();
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('crawl', async (event, req) => {
    let time = await crawl(req.page, req.limit, req.category)
    event.reply('time', time)
})
ipcMain.on('exit', async (event, req) => {
    app.exit()
})

function crawl(page, limit, category) {

}