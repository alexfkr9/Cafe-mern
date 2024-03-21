import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { setCurrentOrder } from '../../../redux/orderSlice';

import { apiUrl } from '../../../api/constants';

import "./OrdersList.css";

import { Loader } from '../../../components/Loader';

import { Button, IconButton, ListItemButton } from '@mui/material';

import {
  Paper
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const centeredStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px'
};


export const OrdersList = () => {

  const dispatch = useDispatch();

  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState({ menu: false, user: false });
  const [menu, setMenu] = useState([]);

  const [users, setUsers] = useState<any>([]);


  useEffect(() => {
    fetch(`${apiUrl}/api/menu`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded({ ...isLoaded, menu: true });
          setMenu(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded({ ...isLoaded, menu: true });
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/user`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded({ ...isLoaded, user: true });
          setUsers(result);
          // getUserOrder(users[0]);
          // setActiveItem(result[0]._id);
        },
        (error) => {
          setIsLoaded({ ...isLoaded, user: true });
          setError(error);
        }
      );
  }, []);


  // set first order active
  if (users.length && menu.length) {
    console.log(users);
  }

  const [activeItem, setActiveItem] = useState(1);

  const handleClick = (index: React.SetStateAction<number>) => {
    console.log("handleClick ~ item:", index);

    setActiveItem(index);
  };


  // add complete dish details to the short order form
  function getUserOrder(userOrder: any) {
    console.log("getUserOrder ~ userOrder:", userOrder);

    const userOrderDishId = userOrder.order.map((item: { id: any; }) => item.id);

    const userMenu = menu.filter((item: any) => userOrderDishId.includes(item._id));

    // add quantity of dishes to user menu
    const dishes = userMenu.map((dish: any) => {
      const found: any = userOrder.order.find((item: any) => item.id === dish._id);
      return { ...dish, quantity: found.qty };
    });

    const Order = { ...userOrder, order: dishes };

    dispatch(setCurrentOrder(Order));

  };


  function updateUser() {
    fetch(`${apiUrl}/api/user`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded({ ...isLoaded, user: true });
          setUsers(result);
        },
        (error) => {
          setIsLoaded({ ...isLoaded, user: true });
          setError(error);
        }
      );
  };

  // Delete User
  async function DeleteUser(id: string) {
    const response = await fetch(`${apiUrl}/api/user/` + id, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });
    if (response.ok === true) {
      updateUser();
    }
  }

  // Create array for joint table

  let newMenuAll: any[] = [];
  if (menu.length) {
    menu.map((item: any) => {
      let newMenu = [];
      newMenu.push(item.name);
      newMenu.push(item.cost);
      newMenu.push(item.measure);
      return newMenuAll.push(newMenu);
    });
  }

  let finalArray = [];
  // if (users.length) {
  //   let oderLenght = users[0].quantity.length;

  //   for (let i = 0; i < oderLenght; i++) {
  //     let newArray: any[] = [];
  //     users.map((user: { quantity: any[]; }) => {
  //       // return newArray.push(user.quantity[i]);
  //     });
  //     newArray.map(Number);
  //     finalArray.push(newArray.map(Number));
  //   }
  // }

  let allTable = [];

  if (finalArray.length && newMenuAll.length) {
    for (let i = 0; i < newMenuAll.length; i++) {
      // let all = [...newMenuAll[i], ...finalArray[i]];
      let all = [...newMenuAll[i]];


      allTable.push(all);
    }
  }


  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded.user && !isLoaded.menu) {
    return <Loader />;
  } else {
    return (
      < Item >
        <div style={centeredStyle}>
          <h2>Orders</h2>
        </div>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {users.map((user: any) => (
            <div key={user._id}
              onClick={() => getUserOrder(user)}
            >
              <ListItemButton
                onClick={(event) => handleClick(user._id)}
                selected={activeItem === user._id}
              // className={user._id === activeItem ? "active-order" : ""}
              >
                <Typography variant="body1" component='span' sx={{ fontSize: '14px', flexGrow: 1, pl: 2 }}>
                  Client&nbsp;<b>{user.name}</b>
                </Typography>
                <Button variant="outlined">Details</Button>
                <Typography variant="body1"><IconButton
                  edge='end'
                  aria-label='delete'
                  color='error'
                  key={user._id}
                  onClick={() => DeleteUser(user._id)}
                >
                  <DeleteIcon />
                </IconButton></Typography>

              </ListItemButton>
              <Divider component="li" /></div>
          ))}

        </List>
      </Item >
    );
  }
};
