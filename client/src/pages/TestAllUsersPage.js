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

import DeleteIcon from '@mui/icons-material/Delete';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

export const TestAllUsersPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);
  const [users, setUsers] = useState([]);

  // const [allTableS, setAllTableS] = useState([]);

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

  let newMenuAll = [];
  if (menu.length) {
    console.log(menu);
    // let menuLenght = menu[0].length;
    // for (let i = 0; i < menuLenght; i++) {

    menu.map((item) => {
      let newMenu = [];
      newMenu.push(item.name);
      newMenu.push(item.cost);
      newMenu.push(item.measure);
      console.log('newMenu-');
      console.log(newMenu);
      newMenuAll.push(newMenu);
    });

    //     const numb3 = newArray.map(Number);
    console.log('newMenuAll-');
    console.log(newMenuAll);
    console.log('Users');
    console.log(users);

    //     finalArray.push(newArray.map(Number));
  }

  let finalArray = [];
  if (users.length) {
    let oderLenght = users[0].quantity.length;

    for (let i = 0; i < oderLenght; i++) {
      let newArray = [];
      users.map((user) => {
        return newArray.push(user.quantity[i]);
      });

      const numb3 = newArray.map(Number);

      finalArray.push(newArray.map(Number));
    }
  }
  console.log(newMenuAll);
  console.log(finalArray);

  let allTable = [];

  if (finalArray.length && newMenuAll.length) {
    for (let i = 0; i < newMenuAll.length; i++) {
      let all = [...newMenuAll[i], ...finalArray[i]];
      console.log('all--');
      console.log(all);
      allTable.push(all);
    }
    // setAllTableS(allTable);
    console.log('allTable---');
    console.log(allTable);
  }

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = allTable;

  // const rows = [
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  // for striped table
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

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <h2>TEST Все посетители</h2>
        <Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#cceeff' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Dish</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Cost
                  </TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Measure
                  </TableCell>
                  {users.map((user) => (
                    <TableCell
                      key={user._id}
                      align='center'                                         
                    >
                      Client&nbsp;<b>{user.name}</b>                      
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        variant='contained'
                        color='error'
                        key={user._id}
                        onClick={() => DeleteUser(user._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  
                    <StyledTableRow key={ (Math.random() + 1).toString(36).substring(7) }>
                      {row.map((item, index) => (                        
                        <StyledTableCell                          
                          align='center'
                          sx={{ '&:first-of-type': { textAlign: 'left' } }}
                          key={ (Math.random() + 1).toString(36).substring(7) }                          
                        >
                          {item}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>                  
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </>
    );
  }
};
