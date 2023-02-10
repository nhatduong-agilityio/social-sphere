import React from 'react';
import ReactDOM from 'react-dom/client';

// Style.
import '~/assets/styles/index.scss';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
