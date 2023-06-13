import React from 'react';
import '../normal.scss';
import './App.scss';
import Chat from '../features/Chat';

function App(): JSX.Element {
  return (
    <div className="App">
      {/*<ChatbotApp />*/}
      <Chat />
    </div>
  );
}

export default App;
