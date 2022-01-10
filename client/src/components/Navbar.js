import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';



const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: "20px",
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    // cursor: "pointer",
  },
  link: {
    textDecoration: 'none',
    color: "white",
    fontSize: "20px",
    marginLeft: "20px",    
    "&:hover": {
      color: "yellow",      
    },
  },
  selected: {
    color: "yellow",
  },
}));



export const Navbar = () => {  
  
  const links = [
    {name: "Test-Все посетители",path:"/test"},
    {name: "Все посетители",path:"/"},
    {name: "Создать заказ",path:"/user"},
    {name: "Создать меню",path:"/create"}
  ];

  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
              Menu
          </Typography>  
          <div className={classes.navlinks}>
              {/* {links.map((link,index) => (
                  <NavLink key={index} to={link.path} className={classes.link}
                  activeClassName={classes.selected} >
                    <li>{link.name}</li>
                  </NavLink>
              ))} */}
                <NavLink to="/test" className={classes.link}  activeClassName={classes.selected}>Test_Все посетители</NavLink>
                <NavLink to="/all-user" className={classes.link}  activeClassName={classes.selected}>Все посетители</NavLink>              
                <NavLink to="/user" className={classes.link}  activeClassName={classes.selected}>Создать заказ</NavLink>              
                <NavLink to="/create" className={classes.link}  activeClassName={classes.selected}>Создать меню</NavLink>             
          </div>                            
        </Toolbar>
      </AppBar>
    </Box>
  )
}
