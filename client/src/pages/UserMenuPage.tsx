import React, { useState, useEffect } from 'react';

import { apiUrl } from '../api/constants';

import { Loader } from '../components/Loader';

import Snack from '../components/Snack';

import {
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getMenu } from '../api/menuApi';

export const UserMenuPage = () => {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);
  console.log("🚀 ~ UserMenuPage ~ menu:", menu);
  const [name, setName] = useState('');

  const [isSnackOpen, setSnackOpen] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [order, setOrder] = useState<any>({});
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
        order: order
      })
    });
    if (response.ok === true) {
      setDisable(true);
      setSnackOpen(true);
    }
  }

  const getName = (event: { target: { value: any; }; }) => {
    const n = event.target.value;
    setName(n);
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { id: dishId, value: quantity } = e.target;

    setOrder({ ...order, [dishId]: Number(quantity) });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <h2>Создать заказ</h2>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '30ch' }
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#cceeff' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Блюдо</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Цена
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Ед.изм
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Picture
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Кол-во
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.map((product: any, index: number) => (
                <StyledTableRow key={product._id}>
                  <StyledTableCell>{product.name}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.cost}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.measure}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <img src={`${apiUrl}/${product.image}`} alt={product.image} />
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <TextField
                      sx={{
                        maxWidth: '70px'
                      }}
                      size='small'
                      name='quantity'
                      disabled={isDisable}
                      id={product._id}
                      placeholder='0'
                      value={order[product._id]}
                      onChange={changeHandler}
                      autoComplete='off'
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snack isOpen={isSnackOpen} handleClose={() => setSnackOpen(false)} />
      </>
    );
  }
};
