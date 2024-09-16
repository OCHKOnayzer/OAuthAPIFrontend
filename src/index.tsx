import React,{createContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './components/store';

const store = new Store();

export const Context = createContext({ 
  store
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Context.Provider value ={{ 
      store
     }}>
      <BrowserRouter  basename={process.env.PUBLIC_URL}>
        <App/>
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
);