import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from '../pages/LayoutPage'
import { MainPage } from '../pages/MainPage'
import { ListPage } from '../pages/ListPage'
import { MapPage } from '../pages/MapPage'
import { FavouritePage } from '../pages/FavouritePage';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <div>Sorry, this page doesn't exist</div>,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/fav",
        element: <FavouritePage />,
      },
    ]
  }
])
