import React, { useState, useEffect } from 'react';

import { Loader } from '../components/Loader';

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';

export const AllUsersPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);
  const [users, setUsers] = useState([]);

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

  // Delete User
  async function DeleteUser(id) {
    const response = await fetch('/api/user/' + id, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });
    if (response.ok === true) {             
      updateUser();
    }
  }

  // Create array for joint table

  let newMenuAll = [];
  if (menu.length) {
    menu.map((item) => {      
        let newMenu = [];
        newMenu.push(item.name);
        newMenu.push(item.cost);
        newMenu.push(item.measure);
        return ( newMenuAll.push(newMenu) )     
    });
  }

  let finalArray = [];
  if (users.length) {
    let oderLenght = users[0].quantity.length;

    for (let i = 0; i < oderLenght; i++) {
      let newArray = [];
      users.map((user) => {
        return newArray.push(user.quantity[i]);
      });      
      newArray.map(Number);
      finalArray.push(newArray.map(Number));
    }
  }

  let allTable = [];

  if (finalArray.length && newMenuAll.length) {
    for (let i = 0; i < newMenuAll.length; i++) {
      let all = [...newMenuAll[i], ...finalArray[i]];

      allTable.push(all);
    }
  }

  const rows = allTable;

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
        <h2>Все посетители</h2>
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
                    <TableCell key={user._id} align='center'>
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
                  <StyledTableRow
                    key={(Math.random() + 1).toString(36).substring(7)}
                  >
                    {row.map((item, index) => (
                      <StyledTableCell
                        align='center'
                        sx={{ '&:first-of-type': { textAlign: 'left' } }}
                        key={(Math.random() + 1).toString(36).substring(7)}
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
