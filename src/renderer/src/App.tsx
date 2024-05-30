import { useEffect, useRef, useState } from 'react';
import './App.css';
import { delayResponse, readFile, showMessageBox, showOpenDialog, showSaveDialog, startTimer, stopTimer, subscribe, unsubscribe, writeFile } from './api';
import electronViteLogo from './assets/electron-vite.svg';
import reactLogo from './assets/react.svg';
import { Versions } from './components/Versions';
import viteLogo from '/vite.svg'; // Absolute references refer to the src/renderer/public folder.
export function App() {
  const value = useRef(0);
  const [result, setResult] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    subscribe(onMessage);
    return () => {
      unsubscribe(onMessage);
    };

    function onMessage(time: string) {
      setTime(time);
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://electron-vite.org" rel="noopener noreferrer" target="_blank">
          <img src={electronViteLogo} className="App__logo" alt="Electron-Vite logo" />
        </a>
        <a href="https://vitejs.dev" rel="noopener noreferrer" target="_blank">
          <img src={viteLogo} className="App__logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" rel="noopener noreferrer" target="_blank">
          <img src={reactLogo} className="App__logo App__logo--react" alt="React logo" />
        </a>
      </div>
      <div className="App__header">Electron-Vite + Vite + React</div>
      <div className="App__content">
        Edit <code>src/main/index.ts</code>, <code>src/renderer/src/App.tsx</code>, or any other file in the <code>src</code> folder and save to reload with HMR.
      </div>
      <div className="App__content">
        Click the Electron-Vite, Vite, and React logos to learn more.
      </div>
      <div className="App__buttons">
        <button onClick={mainReadFile}>Read File</button>
        <button onClick={mainShowMessageBox}>Show Message Box</button>
        <button onClick={mainShowOpenDialog}>Show Open Dialog</button>
        <button onClick={mainShowSaveDialog}>Show Save Dialog</button>
        <button onClick={mainWriteFile}>Write File</button>
        <button onClick={testDelayResponse}>Test Delay Response</button>
        <button onClick={fiveSeconds}>Five Seconds</button>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
      </div>
      <div className="App__content">
        <textarea onChange={onChange} value={result} />
      </div>
      <div>Time from main: <span id="time">{time}</span></div>
      <Versions />
    </>
  );

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const result = event.currentTarget.value;
    setResult(result);
  }

  async function fiveSeconds() {
    ++value.current;
    const result = await delayResponse(5555, value.current.toString());
    setResult(result);
  }

  async function testDelayResponse() {
    const promise5 = delayResponse(5555, 'five');
    const promise4 = delayResponse(4444, 'four');
    const promise3 = delayResponse(3333, 'three');
    const promise2 = delayResponse(2222, 'two');
    const promise1 = delayResponse(1111, 'one');
    const responses = await Promise.all([promise1, promise2, promise3, promise4, promise5]);
    const result = `one is ${responses[0]}\ntwo is ${responses[1]}\nthree is ${responses[2]}\nfour is ${responses[3]}\nfive is ${responses[4]}`;
    setResult(result);
  }

  async function mainReadFile() {
    try {
      const filePath = await showOpenDialog();
      if (filePath) {
        const result = await readFile(filePath);
        setResult(result);
      }
    } catch (ex: unknown) {
      setResult((ex as Error).message);
    }
  }

  async function mainShowMessageBox() {
    try {
      const options: Parameters<typeof showMessageBox>[0] = {
        message: 'Hello from renderer process',
        buttons: ['OK', 'Cancel'],
        title: 'App',
        type: 'info'
      };
      const result = await showMessageBox(options);
      setResult(`Button at position ${result} pressed`);
    } catch (ex: unknown) {
      setResult((ex as Error).message);
    }
  }

  async function mainShowOpenDialog() {
    try {
      const result = await showOpenDialog();
      setResult(result || '');
    } catch (ex: unknown) {
      setResult((ex as Error).message);
    }
  }

  async function mainShowSaveDialog() {
    try {
      const result = await showSaveDialog();
      setResult(result || '');
    } catch (ex: unknown) {
      setResult((ex as Error).message);
    }
  }

  async function mainWriteFile() {
    if (result) {
      try {
        const filePath = await showSaveDialog();
        if (filePath) {
          await writeFile(filePath, result);
        }
      } catch (ex: unknown) {
        setResult((ex as Error).message);
      }
    }
  }
}
