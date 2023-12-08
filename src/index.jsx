import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <CssBaseline />
      <RouterProvider router={router} />
  </Provider>
)
