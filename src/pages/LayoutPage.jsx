import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { TransitionsModal } from '../components/TransitionsModal';
import { getParkingsThunk } from '../components/getParkingsThunk';
import Link from '@mui/material/Link';
import { getFavouriteThunk } from '../components/getFavouriteThunk';




export function LayoutPage() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpen = useSelector(state => state.modal.isModalOpen);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParkingsThunk());
    dispatch(getFavouriteThunk());
  }, [dispatch]);

  useEffect(() => {
    // console.log(idFavourites);
    localStorage.setItem('fav', JSON.stringify(idFavourites))
  }, [idFavourites])

  const closeModal = () => {
    dispatch({ type: 'PASS_FALSE_TO_IS_MODAL_OPEN' })
  }

  // console.log("Render LayoutPage");

  return (
    <div className='container'>
      <div className='navbar'>
        {/* <Link href="/">Головна сторінка</Link>
        <Link href="list">Адреси парковок</Link>
        <Link href="map">Парковки на карті</Link>
        <Link href="fav">Обрані парковки</Link> */}
        <NavLink to="/" >Головна сторінка </NavLink>
        <NavLink to="list">Адреса парковок </NavLink>
        <NavLink to="map">Парковки на карті </NavLink>
        <NavLink to="fav">Обрані парковки </NavLink>
      </div>

      <Outlet />

      <TransitionsModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      ></TransitionsModal>

    </div>
  )
}
