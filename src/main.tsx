import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.js'
import { Provider } from 'react-redux'
import {store} from './store/store.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <Provider store={store}>

    <App />
        </Provider>

  </React.StrictMode>,
)
