import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { TransitionsModal } from '../components/TransitionsModal';
import { getParkingsThunk } from '../components/getParkingsThunk';
import { getFavouriteThunk } from '../components/getFavouriteThunk';
import { BottomNavigation, BottomNavigationAction, Box, Link } from '@mui/material';

import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';






export function LayoutPage() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpen = useSelector(state => state.modal.isModalOpen);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const [navigationValue, setNavigationValue] = useState(0);
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

  const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/material-ui/getting-started/installation/" {...props} />
  ));

  function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
      return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return <MemoryRouter>{children}</MemoryRouter>;
  }

  Router.propTypes = {
    children: PropTypes.node,
  };

  return (
    <div className='container'>
      <div className='navbar'>

        {/* <Box sx={{ typography: 'body1' }}>
          <Router>
            <Link component={RouterLink} to="/">
              With prop forwarding
            </Link>
            <Link component={RouterLink} to="list">
              With prop forwarding
            </Link>
            <br />
            <Link component={LinkBehavior} to="fav" >Without prop forwarding</Link>
          </Router>
        </Box> */}

        {/* <Link href="/">Головна сторінка</Link>
        <Link href="list">Адреси парковок</Link>
        <Link href="map">Парковки на карті</Link>
        <Link href="fav">Обрані парковки</Link> */}

        {/* <NavLink to="/" >Головна сторінка </NavLink>
        <NavLink to="list">Адреса парковок </NavLink>
        <NavLink to="map">Парковки на карті </NavLink>
        <NavLink to="fav">Обрані парковки </NavLink> */}

        {/* <Link to="/" >Головна сторінка </Link>
        <Link to="list">Адреса парковок </Link>
        <Link to="map">Парковки на карті </Link>
        <Link to="fav">Обрані парковки </Link> */}

        <Box
          sx={{ width: 800 }}
        >
          <BottomNavigationStyled
            showLabels
            value={navigationValue}
            onChange={(event, newValue) => {
              setNavigationValue(newValue);
            }}
          >
            <BottomNavigationAction label="Головна" component={RouterLink} to='/' />
            <BottomNavigationAction label="Парковки" component={RouterLink} to='list' />
            <BottomNavigationAction label="Карта" component={RouterLink} to='/map' />
            <BottomNavigationAction label="Обрані" component={RouterLink} to='/fav' />
          </BottomNavigationStyled>
        </Box>

      </div>

      <Outlet />

      <TransitionsModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      ></TransitionsModal>

    </div>
  )
}

const BottomNavigationStyled = styled(BottomNavigation)(() => ({
  // "& .MuiBottomNavigationAction-root": {
  "& .MuiBottomNavigationAction-label": {
    fontSize: '24px',
  },
  "& .MuiBottomNavigationAction-label.Mui-selected": {
    fontSize: '26px',
  },

  // }
}))