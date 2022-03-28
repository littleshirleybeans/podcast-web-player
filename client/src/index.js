import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import AudioProvider from './contexts/audio-context'
import MessageProvider from './contexts/message-context';
import QueueProvider from './contexts/queue-context'
import './i18n'

ReactDOM.render(
    <MessageProvider>
      <AudioProvider>
        <QueueProvider>
          <App />
        </QueueProvider>
      </AudioProvider>
    </MessageProvider>,
  document.getElementById('root')
);
