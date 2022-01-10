import React, { useState, useEffect } from 'react';

import { Loader } from '../components/Loader';

import Snack from '../components/Snack';

import {
  CircularProgress,
  Button,
  IconButton,
  TextField,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const UserMenuPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState([]);
  const [arr, setArr] = useState([]);
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [isDisable, setDisable] = useState(false);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMenu(result);
          setArr(Array.from({ length: result.length }, () => 0));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // Добавление пользователя
  async function CreateUser() {
    const response = await fetch('api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name || (Math.random() + 1).toString(36).substring(7),
        quantity: quantity,
      }),
    });
    if (response.ok === true) {
      setDisable(true);
      setSnackOpen(true);
    }
  }

  const getName = (event) => {
    const n = event.target.value;
    setName(n);
  };

  const changeHandler = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    arr[event.target.id] = event.target.value;
    
    setQuantity( arr.map(Number) );

    console.log(arr);
    console.log(quantity);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // Условный рендеринг компонента
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
            '& > :not(style)': { m: 1, width: '30ch' },
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
            variant='contained' color='success'
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
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Цена</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Ед.изм</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Picture</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>Кол-во</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.map((product, index) => (
                <StyledTableRow
                  key={product._id}                
                >
                  <StyledTableCell>{product.name}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.cost}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.measure}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <img src={`http://localhost:3000/${product.image}`} />
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <TextField                      
                      sx={{
                        maxWidth: '70px',
                      }}
                      size='small'
                      name='quantity'
                      disabled={isDisable}
                      id={String(index)}
                      value={ quantity[index] || 0 }                                       
                      onChange={e => changeHandler(e)}                      
                      autoComplete='off'
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snack
            isOpen={isSnackOpen}
            handleClose={() => setSnackOpen(false)}
        />
      </>
    );
  }
};
