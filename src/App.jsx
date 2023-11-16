// import { useState } from 'react'
import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import CssBaseline from '@mui/material/CssBaseline';


export function App() {

  return (
    <Provider store={store}>
      <CssBaseline />
      <RouterProvider router={router} />
    </Provider>
  )
}

