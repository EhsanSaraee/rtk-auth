// packages
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// files and components
import { store } from 'redux/app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
   <Provider store={store}>
      <BrowserRouter>
         <Routes>
            <Route path="/*" element={<App />} />
         </Routes>
      </BrowserRouter>
   </Provider>
);
