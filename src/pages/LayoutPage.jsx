import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { TransitionsModal } from '../components/TransitionsModal';
import { getParkingsThunk } from '../components/getParkingsThunk';
import { getFavouriteThunk } from '../components/getFavouriteThunk';
import { BottomNavigation, BottomNavigationAction, Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchIcon from '@mui/icons-material/Search';



import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';



export function LayoutPage() {
  const isModalOpen = useSelector(state => state.modal.isModalOpen);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [navigationValue, setNavigationValue] = useState(0);
  const location = useLocation();
  console.log(location);
  // const [isFindInPageIcon, setIsFindInPageIcon] = useState(false);

  const dispatch = useDispatch();



  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log(isSmallViewport);

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

  console.log("Render LayoutPage");

  return (
    <div className='container'>
      <div className='navbar'
        style={{
          backgroundColor: '#dcecf5',
          borderRadius: '5px'
        }}>

        {/* <NavLink to="/" >Головна сторінка </NavLink>
        <NavLink to="list">Адреса парковок </NavLink>
        <NavLink to="map">Парковки на карті </NavLink>
        <NavLink to="fav">Обрані парковки </NavLink> */}

        {isSmallViewport ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              // aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsOpenDrawer(true)}
            >
              <MenuIcon fontSize='large' />
            </IconButton>

            {/* {location.pathname === '/list' && <IconButton > */}
            {location.pathname === '/map' && <IconButton
              onClick={() => { dispatch({ type: "TOGGLE_WINDOW_FIND" }) }}
            >
              <SearchIcon fontSize='large' />
            </IconButton>}

            <Drawer
              anchor={'left'}
              open={isOpenDrawer}
              onClose={() => setIsOpenDrawer(false)}
            >
              {/* <Box sx={{width: 800 }}> */}
              <BottomNavigationStyled
                showLabels
                value={navigationValue}
                onChange={(event, newValue) => {
                  setNavigationValue(newValue);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  marginTop: '70px'
                }}
              >
                <BottomNavigationAction label="Головна" component={RouterLink} to='/' onClick={() => setIsOpenDrawer(false)} />
                <BottomNavigationAction label="Парковки" component={RouterLink} to='list' onClick={() => setIsOpenDrawer(false)} />
                <BottomNavigationAction label="Карта" component={RouterLink} to='/map' onClick={() => setIsOpenDrawer(false)} />
                <BottomNavigationAction label="Обрані" component={RouterLink} to='/fav' onClick={() => setIsOpenDrawer(false)} />
              </BottomNavigationStyled>
              {/* </Box> */}

              {/* <List sx={{fontSize: 24}}>

                <ListItem disablePadding >
                  <ListItemButton component={RouterLink} to='/' onClick={() => setIsOpenDrawer(false)}>
                    Головна
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='list' onClick={() => setIsOpenDrawer(false)}>
                    Парковки
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='map' onClick={() => setIsOpenDrawer(false)}>
                    Карта
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to='fav' onClick={() => setIsOpenDrawer(false)}>                    
                    Обрані
                  </ListItemButton>
                </ListItem>

              </List> */}

            </Drawer>
          </div>
        ) : (
          // <div>
          <Box sx={{ width: 800 }}
          >
            <BottomNavigationStyled
              showLabels
              value={navigationValue}
              onChange={(event, newValue) => {
                setNavigationValue(newValue);
              }}
              sx={{ backgroundColor: 'inherit' }}
            >
              <BottomNavigationAction label="Головна" component={RouterLink} to='/' />
              <BottomNavigationAction label="Парковки" component={RouterLink} to='list' />
              <BottomNavigationAction label="Карта" component={RouterLink} to='/map' />
              <BottomNavigationAction label="Обрані" component={RouterLink} to='/fav' />
            </BottomNavigationStyled>
          </Box>
          // </div>
        )}

        {/* <Box sx={{ width: 800 }}
        >
          <BottomNavigationStyled
            showLabels
            value={navigationValue}
            onChange={(newValue) => {
              setNavigationValue(newValue);
            }}
            sx={{ backgroundColor: 'inherit' }}
          >
            <BottomNavigationAction label="Головна" component={RouterLink} to='/' />
            <BottomNavigationAction label="Парковки" component={RouterLink} to='list' />
            <BottomNavigationAction label="Карта" component={RouterLink} to='/map' />
            <BottomNavigationAction label="Обрані" component={RouterLink} to='/fav' />
          </BottomNavigationStyled>
        </Box> */}

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
  "& .MuiBottomNavigationAction-label": {
    fontSize: '24px',
  },
  "& .MuiBottomNavigationAction-label.Mui-selected": {
    fontSize: '26px',
  },
}))