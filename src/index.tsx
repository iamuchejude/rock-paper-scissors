import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from './store';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('__root__'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
