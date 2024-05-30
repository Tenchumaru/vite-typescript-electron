import { useState } from 'react';
import './Versions.css';

export function Versions() {
  const [versions] = useState(window.main.versions);

  return (
    <div className="Versions">
      <div>Electron v{versions.electron}</div>
      <div>Chromium v{versions.chrome}</div>
      <div>Node v{versions.node}</div>
    </div>
  );
}
