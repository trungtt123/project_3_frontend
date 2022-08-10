import * as React from 'react';
import {useEffect, useState}  from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { locale } from 'moment';
export default function FooterTab() {
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [userData, setUserData, removeCookie] = useCookies(['userData']);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = () => {
    removeCookie('userData', '/');
    window.location.reload('/');
  }
  let navigate = useNavigate();
  useEffect(() => {
    var pathname = location.pathname;
    //console.log(pathname);
    if (pathname === '/add-post') setValue(1);
    else if (pathname === '/infomation') setValue(2);
    else setValue(0);
  }, [location]);
  return (
    <Tabs 
     value={value} centered={true} style={{ backgroundColor: 'white' }} onChange={handleChange} aria-label="icon tabs example">
      <Tab sx={{
        '&.Mui-selected': {
          outline: 'none',
        }
      }}
      onClick={() =>{ 
      
        navigate('/home')}}
        icon={<HomeOutlinedIcon />} label="Home" style={{fontSize: 10}}/>
      <Tab sx={{
        '&.Mui-selected': {
          outline: 'none',
        }
      }} onClick={() =>{ 
      
        navigate('/add-post')}}
        icon={<NoteAddOutlinedIcon />}
         label="Bài viết" style={{fontSize: 10}}/>
      <Tab sx={{
        '&.Mui-selected': {
          outline: 'none',
        } 
      }} onClick={() =>{ 
      
        navigate('/infomation')}}
        icon={<PersonPinIcon />} label="Cá nhân" style={{fontSize: 10}}/>
      <Tab sx={{
        '&.Mui-selected': {
          outline: 'none',
        }
      }} onClick={() => handleLogout()}
        icon={<LogoutOutlinedIcon />} label="Đăng xuất" style={{fontSize: 10}}/>
        
        

    </Tabs>
  );
}
