import { BrowserWindow, MessageBoxOptions, OpenDialogOptions, SaveDialogOptions, dialog, ipcMain } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { EOL } from 'os';

export interface Api {
  startTimer: () => void;
  stopTimer: () => void;
  window: BrowserWindow;
}

export function createApi(): Api {
  let window: BrowserWindow;
  let timerId: ReturnType<typeof setInterval> | undefined;

  ipcMain.handle('delayResponse', async (_event, duration: number, value: string) => {
    console.log('received delayResponse:', duration, value);
    await new Promise<void>((resolve) => {
      setTimeout(resolve, duration);
    });
    console.log('responding to delayResponse:', value);
    return value;
  });
  ipcMain.handle('readFile', (_event, filePath: string) => {
    return readFile(filePath, 'utf8');
  });
  ipcMain.handle('showMessageBox', async (_event, request: MessageBoxOptions) => {
    const { response } = await dialog.showMessageBox(window, request);
    return response;
  });
  ipcMain.handle('showOpenDialog', async (_event, request: OpenDialogOptions) => {
    const response = await dialog.showOpenDialog(window, request);
    return response.filePaths[0];
  });
  ipcMain.handle('showSaveDialog', async (_event, request: SaveDialogOptions) => {
    const response = await dialog.showSaveDialog(window, request);
    return response.filePath;
  });
  ipcMain.on('startTimer', () => {
    startTimer();
  });
  ipcMain.on('stopTimer', () => {
    stopTimer();
  });
  ipcMain.handle('writeFile', (_event, filePath: string, data: string) => {
    if (process.platform === 'win32' && !~data.indexOf('\r\n')) {
      data = data.replace(/\n/g, EOL);
    }
    return writeFile(filePath, data, 'utf8');
  });

  return {
    startTimer,
    stopTimer,
    get window() {
      return window;
    },
    set window(value: BrowserWindow) {
      window = value;
    },
  };

  function startTimer() {
    if (!timerId) {
      timerId = setInterval(() => window.webContents.send('now', new Date().toString()), 1000);
    }
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = undefined;
    }
  }
}
