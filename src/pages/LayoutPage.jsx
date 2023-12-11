import React, { useEffect } from 'react'
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { StyledModal } from '../components/StyledModal';
import { getParkingsThunk } from '../components/getParkingsThunk';
import { getFavouriteThunk } from '../components/getFavouriteThunk';
import { BottomNavigation, BottomNavigationAction, Box, Button, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
export function LayoutPage() {
  const isModalOpen = useSelector(state => state.modal.isModalOpen);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [navigationValue, setNavigationValue] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    dispatch(getParkingsThunk());
    dispatch(getFavouriteThunk());
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem('fav', JSON.stringify(idFavourites))
  }, [idFavourites])
  const closeModal = () => {
    dispatch({ type: 'PASS_FALSE_TO_IS_MODAL_OPEN' })
  }
  return (
    <div className='container'>
      <div className='navbar'>
        {isSmallViewport ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => setIsOpenDrawer(true)}
            >
              <MenuIcon fontSize='large' />
            </Button>
            {location.pathname === '/map' && <Button
              onClick={() => { dispatch({ type: "TOGGLE_WINDOW_FIND" }) }}
            >
              <SearchIcon fontSize='large' />
            </Button>}
            <Drawer
              anchor={'left'}
              open={isOpenDrawer}
              onClose={() => setIsOpenDrawer(false)}
            >
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

            </Drawer>
          </div>
        ) : (
          <Box sx={{ width: 800 }} >
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
        )}  
      </div>
      <Outlet />
      <StyledModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      ></StyledModal>
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