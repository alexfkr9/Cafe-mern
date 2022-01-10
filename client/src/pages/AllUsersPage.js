import React, { useState, useEffect, useRef } from 'react';

import { Loader } from '../components/Loader';

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

import Grid from '@mui/material/Grid';

export const AllUsersPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    quantity: '',
  });

  const [black, setBlack] = useState(true);
  let btn_class = 'pink';

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMenu(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch('/api/user')
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

  function updateUser() {
    fetch('/api/user')
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
  }

  // Получение одного пользователя
  async function GetUser(id) {
    const response = await fetch('/api/menu/' + id, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (response.ok === true) {
      const user = await response.json();
      setForm((prevState) => ({
        _id: user._id,
        name: user.name,
        cost: user.cost,
        measure: user.measure,
      }));
    }
  }

  // Получение одного пользователя
  // async function GetUser(id) {
  //     const response = await fetch("/api/menu/" + id, {
  //         method: "GET",
  //         headers: { "Accept": "application/json" }
  //     });
  //     if (response.ok === true) {
  //         const user = await response.json();
  //         setForm(user);
  //         console.log("user"); console.log(user);
  //     }
  // };

  // Добавление пользователя
  async function CreateUser() {
    const response = await fetch('api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        quantity: form.quantity,
      }),
    });
    if (response.ok === true) {
      // const user = await response.json();
      // reset();
      // document.querySelector("tbody").append(row(user));
    }
  }

  // Удаление пользователя
  async function DeleteUser(id) {
    const response = await fetch('/api/user/' + id, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });
    if (response.ok === true) {
      updateUser();
    }
  }

  const inputRef = useRef(true);

  // const changeFocus = () => {console.log(inputRef.current.name)
  //     inputRef.current.disabled = false;
  //     inputRef.current.focus();
  // };

  const update = (id, value, e) => {
    if (e.which === 13) {
      console.log(id);
      console.log(value);
      console.log(e);
      //here 13 is key code for enter key
      // updateTodo({ id, item: value });
      // inputRef.current.disabled = true;
    }
  };

  const changeFocus = () => {
    setBlack(!black);
    // inputRef.current.btn_class = black ? "pink" : "red";
    // inputRef.current.focus();
  };

  // Ввод формы
  const changeHandler = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // let btn_class = black ? "pink" : "red";
  // const changeColor = () => {
  //     setBlack(!black)
  // }

  // Условный рендеринг компонента

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <h2>Все посетители</h2>
        <Grid container alignItems='flex-start' spacing={2}>
          <Grid item xs={3} sm={3} md={3}>
            <Table>
              <TableHead color='secondary'>
                <TableRow color='secondary'>
                  <TableCell>Блюдо</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Ед.изм</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menu.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.cost}</TableCell>
                    <TableCell>{product.measure}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={5} sm={5} md={5}>
            {/*Users list*/}

            <Table>
              <TableHead>
                <TableRow>
                  {users.map((user) => (
                    <TableCell key={user._id}>{user.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {users.map((user, index) => (
                    <TableCell key={user._id}>
                      {user.quantity.map((value, index) => (
                        <TextField
                          key={index}
                          size='small'
                          ref={inputRef}
                          // disabled={inputRef}
                          defaultValue={value}
                          onKeyPress={(e) =>
                            update(user._id, inputRef.current.value, e)
                          }
                        ></TextField>
                      ))}
                      <Button
                        // className={ inputRef }
                        key={index}
                        name={user._id}
                        onClick={() => changeFocus(user._id)}
                      >
                        Edit
                      </Button>
                      <p />
                      <Button
                        className='pink lighten-3'
                        variant='contained'
                        color='secondary'
                        key={user._id}
                        onClick={() => DeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </>
    );
  }
};
