import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { TransitionsModal } from '../components/TransitionsModal';
import { getParkingsThunk } from '../components/getParkingsThunk';
import { getFavouriteThunk } from '../components/getFavouriteThunk';
import { BottomNavigation, BottomNavigationAction, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';



export function LayoutPage() {
  const isModalOpen = useSelector(state => state.modal.isModalOpen);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [navigationValue, setNavigationValue] = useState(0);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log(isMatch);

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
          borderRadius: '50px'
        }}>

        {/* <NavLink to="/" >Головна сторінка </NavLink>
        <NavLink to="list">Адреса парковок </NavLink>
        <NavLink to="map">Парковки на карті </NavLink>
        <NavLink to="fav">Обрані парковки </NavLink> */}

        {isMatch ? (
          <div>
            <IconButton
              size="large"
              // edge="start"
              color="inherit"
              // aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={'right'}
              open={isOpenDrawer}
              onClose={() => setIsOpenDrawer(false)}
            >
              {/* <Box 
              // sx={{ width: 800 }}
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

              <List sx={{fontSize: 24}}>

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
                    <ListItemText primary={'Обрані'} />
                  </ListItemButton>
                </ListItem>

              </List>

            </Drawer>
          </div>
        ) : (
          // <div>
          <Box sx={{ width: 800 }}
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