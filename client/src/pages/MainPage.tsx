import React, { useState, useEffect } from 'react';

import { apiUrl } from '../api/constants';

import { Loader } from '../components/Loader';

import Snack from '../components/Snack';

import {
  Button,
  TextField,
  Grid,
  Container
} from '@mui/material';

import Box from '@mui/material/Box';
import { getMenu } from '../api/menuApi';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';

export const MainPage = () => {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);

  const [name, setName] = useState('');

  const [isSnackOpen, setSnackOpen] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [order, setOrder] = useState<any>([]);
  console.log("🚀 ~ UserMenuPage ~ order:", order);

  useEffect(() => {
    getMenu()
      .then(
        (res) => {
          setIsLoaded(true);
          setMenu(res);
        })
      .catch((error: any) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);


  // get user oder from the State
  const cart = useSelector((state: any) => state.cart.items);

  // Добавление пользователя
  async function CreateUser() {
    const response = await fetch(`${apiUrl}/api/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name || (Math.random() + 1).toString(36).substring(7),
        order: cart
      })
    });
    if (response.ok === true) {
      console.log(response);
      setDisable(true);
      setSnackOpen(true);
    }
  }


  const getName = (event: { target: { value: any; }; }) => {
    const n = event.target.value;
    setName(n);
  };

  // const changeHandler = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {

  //   const { id, value: qty } = e.target;

  //   const currentId = order.find((item: { id: string; }) => item.id === id);

  //   if (currentId) {
  //     // change dish quantity if dish was edded
  //     const arr = order.map((element: any) => {
  //       if (element.id === id) {
  //         console.log(element);
  //         return { ...element, qty: Number(qty) };
  //       }
  //       return element;
  //     });
  //     console.log(arr);
  //     setOrder(arr);
  //   }
  //   // add dish to order if is`t this dish
  //   else {
  //     setOrder([...order, { id, qty: Number(qty) }]);
  //   }

  // };

  console.log(order);


  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <Container maxWidth="lg">
        <h2>Создать заказ</h2>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { my: 1, mr: 2, width: '30ch' }
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id='outlined-name'
            label='Ваше Имя:'
            value={name}
            disabled={isDisable}
            onChange={getName}
          />
          <Button
            variant='contained'
            color='success'
            disabled={isDisable}
            onClick={CreateUser}
          >
            Создать заказ
          </Button>
        </Box>

        {/* Product items */}
        {/* <Grid container maxWidth="1140px" mx="auto" p={2} spacing={2} > */}
        <Grid container spacing={2} >
          {menu.map((product: any, index: number) => (
            <Grid item xs={6} md={4}>
              <CardProduct product={product} />
            </Grid>
          ))}
        </Grid>

        <Snack isOpen={isSnackOpen} handleClose={() => setSnackOpen(false)} />
      </Container>
    );
  }
};
