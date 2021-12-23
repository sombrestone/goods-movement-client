import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter} from "react-router-dom";
import App from './App';


import themes from 'devextreme/ui/themes';
themes.initialized(() =>ReactDOM.render(
    <BrowserRouter>
          <App/>
    </BrowserRouter>,
  document.getElementById('root')
));

