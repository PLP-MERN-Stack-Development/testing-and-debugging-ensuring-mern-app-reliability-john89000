import React from 'react';
import Button from './components/Button';

export default function App() {
  return (
    <div>
      <header>
        <h1>Example MERN App</h1>
      </header>
      <main>
        <p>This is a minimal App component used for tests and demos.</p>
        <Button onClick={() => {}}>Click me</Button>
      </main>
    </div>
  );
}
