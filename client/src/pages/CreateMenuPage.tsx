import React, { useState, useEffect } from 'react';

import { apiUrl } from '../api/constants';

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
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({ _id: 0, name: '', cost: '', measure: '' });

  console.log('Url -  ' + apiUrl);

  useEffect(() => {
    fetch(`${apiUrl}/api/menu`)
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

  console.log(process.env.NODE_ENV);

  // Update
  function updateUser() {
    fetch(`${apiUrl}/api/menu`)
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
  }

  // Get a dish from server
  async function GetDish(id: string) {
    const response = await fetch(`${apiUrl}/api/menu/` + id, {
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
    const response = await fetch(`${apiUrl}/api/menu`, {
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

  // Remove dish
  async function DeleteDish(id: string) {
    console.log("DeleteDish ~ id:", id);
    const response = await fetch(`${apiUrl}/api/menu/` + id, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });
    console.log("DeleteDish ~ response:", response);
    if (response.ok === true) {
      updateUser(); return;
    }
    console.log("Error");
  }

  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
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
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isSelected, setIsSelected] = useState(false);

  const saveFile = (event: any) => {
    console.log("🚀 ~ submitUser ~ selectedFile:", event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  console.log("🚀 ~ submitUser ~ selectedFile:", selectedFile);

  const getFormData = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('form', JSON.stringify(form));
    console.log("🚀 ~ submitUser ~ selectedFile:", selectedFile);
    console.log("🚀 ~ submitUser ~ form:", form);
    return formData;
  };

  const submitUser = () => {
    getFormData();
    fetch('/api/menu', {
      method: 'POST',
      body: getFormData()
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

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <h2>Create Menu</h2>

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
            type='file'
            name="images"
            accept='image/*'
            onChange={saveFile}
            style={{ display: 'none' }}
            id='raised-button-file'
            multiple
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
                lastModifiedDate:
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
              {menu.map((product: any, id) => (
                <StyledTableRow key={product._id}>
                  <StyledTableCell>{product.name}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.cost}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.measure}
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: 'bold' }} align='center'>
                    <img src={`${apiUrl}/${product.image}`} alt={product.image} />
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <Button
                      size='small'
                      variant='contained'
                      color='secondary'
                      key={product.id}
                      onClick={() => GetDish(product._id)}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      color='error'
                      key={product.id}
                      onClick={() => DeleteDish(product._id)}
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
  }
};
