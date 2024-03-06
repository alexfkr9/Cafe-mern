import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setCurrentOrder } from '../../../redux/orderSlice';

import { apiUrl } from '../../../api/constants';

import { Loader } from '../../../components/Loader';

import { Button, IconButton } from '@mui/material';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);


  const [users, setUsers] = useState<any>([]);


  const [userOrder, setUserOrder] = useState<any>({ name: '', order: [{}] });


  useEffect(() => {
    fetch(`${apiUrl}/api/menu`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMenu(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/user`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // add complete dish details to the short order form
  function getUserOrder(userOrder: any) {

    const oderDishIdAndQuontity = Object.entries(userOrder.order);

    const userOrderDishId = Object.keys(userOrder.order);

    const userOrderData = menu.filter((item: any) => userOrderDishId.includes(item._id));

    const dishes = userOrderData.map((dish: any) => {
      const found: any = oderDishIdAndQuontity.find((element) => element[0] === dish._id);
      return { ...dish, quantity: found[1] };
    });

    console.log("🚀 ~ allMenu ~ allMenu:", dishes);

    const order = { ...userOrder, order: dishes };

    setUserOrder(order);

    dispatch(setCurrentOrder(order));

    return order;
  };


  function updateUser() {
    fetch(`${apiUrl}/api/user`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },
        (error) => {
          setIsLoaded(true);
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
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      < Item >
        <div style={centeredStyle}>
          <Typography variant="h6" component='h2'>Orders</Typography>
        </div>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {users.map((user: any) => (
            <div key={user._id}>
              <ListItem>
                <Typography variant="body1" component='span' sx={{ fontSize: '14px', flexGrow: 1, pl: 2 }}>
                  Client&nbsp;<b>{user.name}</b>
                </Typography>

                {/* <Button variant="outlined" onClick={() => setUserOrder(user)}>Outlined</Button> */}
                <Button variant="outlined" onClick={() => getUserOrder(user)}>Details</Button>
                <Typography variant="body1"><IconButton
                  edge='end'
                  aria-label='delete'
                  color='error'
                  key={user._id}
                  onClick={() => DeleteUser(user._id)}
                >
                  <DeleteIcon />
                </IconButton></Typography>

              </ListItem>
              <Divider variant="inset" component="li" /></div>
          ))}

        </List>
      </Item >
    );
  }
};
