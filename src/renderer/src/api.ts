import { MessageBoxOptions } from 'electron';

const observers: ObserverFn[] = [];

function onMessage(message: string) {
  for (const observer of observers) {
    observer(message);
  }
}

window.main.setMessageHandler(onMessage);

export function delayResponse(duration: number, value: string): Promise<string> {
  return window.main.delayResponse(duration, value);
}

export function readFile(filePath: string): Promise<string> {
  return window.main.readFile(filePath);
}

export function showMessageBox(options: MessageBoxOptions): Promise<number> {
  return window.main.showMessageBox(options);
}

export function showOpenDialog(defaultPath?: string, title?: string): Promise<string | undefined> {
  return window.main.showOpenDialog(defaultPath, title);
}

export function showSaveDialog(defaultPath?: string, title?: string): Promise<string | undefined> {
  return window.main.showSaveDialog(defaultPath, title);
}

export function subscribe(fn: ObserverFn): void {
  if (!~observers.indexOf(fn)) {
    observers.push(fn);
  }
}

export function unsubscribe(fn: ObserverFn): void {
  const index = observers.indexOf(fn);
  if (~index) {
    observers.splice(index, 1);
  }
}

export function startTimer() {
  window.main.startTimer();
}

export function stopTimer() {
  window.main.stopTimer();
}

export function writeFile(filePath: string, data: string): Promise<void> {
  return window.main.writeFile(filePath, data);
}
