import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

ipcMain.on('message', (event: any, message: any) => {
    console.log('Message received');
    if (win) {
        console.log('message received in main.js: ', message);
        console.log(`Printer list: ${JSON.stringify(win.webContents.getPrinters())}`);

        const win1 = new BrowserWindow({ width: 800, height: 600, frame: true, show: false });
        win1.loadURL(`https://www.google.com`);

        const options = {
            silent: true,
            deviceName: message || 'HP_LaserJet_Pro_MFP_M126nw'
        };

        console.log(`Going to print with option ${JSON.stringify(options)}`);
        win1.webContents.print(options, success => {
            win1.close();
            console.log(`Print response success, errorType: ${success}`);
            if (success) {
                console.log('Print Success');
            } else {
                console.log('Error while printing: ');
            }
        });
    }
});

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false
    });

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools();
        });
    }

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
