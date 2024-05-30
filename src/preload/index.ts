import { contextBridge, ipcRenderer, MessageBoxOptions } from 'electron';

(() => {
  let messageHandler: ObserverFn = () => { };

  ipcRenderer.on('now', (_event, message: string) => {
    // Do not include the event since it includes the sender.
    messageHandler(message);
  });

  // Expose functions that send requests to the main process for the renderer process.
  const main: Main = {
    delayResponse: (duration: number, value: string) => {
      return ipcRenderer.invoke('delayResponse', duration, value);
    },
    readFile: (filePath: string) => {
      return ipcRenderer.invoke('readFile', filePath);
    },
    showMessageBox: (options: MessageBoxOptions) => {
      return ipcRenderer.invoke('showMessageBox', options);
    },
    showOpenDialog: (defaultPath?: string, title?: string) => {
      return ipcRenderer.invoke('showOpenDialog', { defaultPath, title });
    },
    showSaveDialog: (defaultPath?: string, title?: string) => {
      return ipcRenderer.invoke('showSaveDialog', { defaultPath, title });
    },
    setMessageHandler: (fn: ObserverFn): void => {
      messageHandler = fn;
    },
    startTimer: (): void => {
      ipcRenderer.send('startTimer');
    },
    stopTimer: (): void => {
      ipcRenderer.send('stopTimer');
    },
    versions: {
      chrome: process.versions.chrome,
      node: process.versions.node,
      electron: process.versions.electron,
    },
    writeFile: (filePath: string, data: string) => {
      return ipcRenderer.invoke('writeFile', filePath, data);
    },
  };
  contextBridge.exposeInMainWorld('main', main);
})();
