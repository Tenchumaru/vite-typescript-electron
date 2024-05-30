interface Main {
  delayResponse: (duration: number, value: string) => Promise<string>;
  readFile: (filePath: string) => Promise<string>;
  showMessageBox: (options: MessageBoxOptions) => Promise<number>;
  showOpenDialog: (defaultPath?: string, title?: string) => Promise<string | undefined>;
  showSaveDialog: (defaultPath?: string, title?: string) => Promise<string | undefined>;
  setMessageHandler: (fn: ObserverFn) => void;
  startTimer: () => void;
  stopTimer: () => void;
  versions: {
    chrome: string;
    node: string;
    electron: string;
  };
  writeFile: (filePath: string, data: string) => Promise<void>;
}

interface Window {
  main: Main;
}

type ObserverFn = (message: string) => void;
