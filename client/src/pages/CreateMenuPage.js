import React, { useState, useEffect } from 'react';

import { Loader } from '../components/Loader';

import {
  Button,
  IconButton,
  TextField,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const CreateMenuPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({ _id: 0, name: '', cost: '', measure: '' });

  // useEffect(() => {
  //   fetch('/api/menu')
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setMenu(result);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);

  function getData() {
    console.log('getData');
    fetch('https://cafe-mern.onrender.com/api/menu')
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setMenu(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  // Update
  function updateUser() {
    fetch('/api/menu')
      .then((res) => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          setMenu(result);
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
      headers: { Accept: 'application/json' }
    });
    if (response.ok === true) {
      const user = await response.json();
      setForm((prevState) => ({
        _id: user._id,
        name: user.name,
        cost: user.cost,
        measure: user.measure
      }));
    }
  }

  // Изменение пользователя
  async function EditUser() {
    const response = await fetch('/api/menu', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    if (response.ok === true) {
      updateUser();
    }
  }

  // Удаление пользователя
  async function DeleteUser(id) {
    const response = await fetch('/api/menu/' + id, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });
    if (response.ok === true) {
      updateUser();
    }
  }

  const changeHandler = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // отправка формы
  function Save() {
    if (form._id === 0) {
      submitUser();
    } else {
      console.log('EditUser');
      EditUser();
    }
  }

  // Отправка файла
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const saveFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const submitUser = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('form', JSON.stringify(form));

    fetch('/api/menu', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        updateUser();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // for striped table
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

  // return <h1>Create Menu</h1>;

  // if (error) {
  //   return <div>Ошибка: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <Loader />;
  // } else {
  return (
    <>
      <h2>Создать меню</h2>

      <Button
        size='small'
        variant='contained'
        component='span'
        onClick={getData}
      >
        Get Data
      </Button>
      <p />

      {/*  Input dish data  */}
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '30ch' }
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          InputLabelProps={{ shrink: true }}
          label='Название:'
          name='name'
          value={form.name}
          onChange={changeHandler}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label='Цена:'
          name='cost'
          value={form.cost}
          onChange={changeHandler}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label='Ед.изм:'
          name='measure'
          value={form.measure}
          onChange={changeHandler}
        />
      </Box>

      {/*  Input dish image  */}
      <Box
        sx={{
          '& > :not(style)': { mb: 2 }
        }}
      >
        <input
          accept='image/*'
          onChange={saveFile}
          style={{ display: 'none' }}
          id='raised-button-file'
          multiple
          type='file'
        />
        <label htmlFor='raised-button-file'>
          <Button size='small' variant='contained' component='span'>
            Upload
          </Button>
        </label>

        {/* Dish image data */}
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Choose a picture of a dish</p>
        )}

        {/*  Save dish data  */}
        <Button variant='contained' color='success' onClick={Save}>
          Сохранить
        </Button>
      </Box>

      {/*  Menu table  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#cceeff' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Название</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Цена
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Ед.изм
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Picture
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                Edit
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((product, id) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell align='center'>{product.cost}</StyledTableCell>
                <StyledTableCell align='center'>
                  {product.measure}
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold' }} align='center'>
                  <img
                    src={`http://localhost:3000/${product.image}`}
                    alt='dish'
                  />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Button
                    size='small'
                    variant='contained'
                    color='secondary'
                    key={product.id}
                    onClick={() => GetUser(product._id)}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    variant='contained'
                    color='error'
                    key={product.id}
                    onClick={() => DeleteUser(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
  // }
};
