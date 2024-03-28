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
  TableRow,
  Stack
} from '@mui/material';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { deleteDishApi, editDishApi, getDishById, getMenu, submitMenuApi } from '../api/menuApi';
import CreateDishButton from '../components/CreateDishButton';

export const CreateMenuPage = () => {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [menu, setMenu] = useState([]);

  const [form, setForm] = useState({ _id: 0, name: '', cost: '', measure: '', image: "" });
  console.log("CreateMenuPage ~ form:", form);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isSelected, setIsSelected] = useState(false);

  // Get Menu data
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

    // .then(
    //   (res) => {
    //     setIsLoaded(true);
    //     setMenu(res);
    //   },
    //   (error: any) => {
    //     console.log("useEffect ~ error:", error);

    //     setIsLoaded(true);
    //     setError(error);
    //   }
    // );
  }, []);


  console.log(process.env.NODE_ENV);

  // Update
  async function updateMenu() {
    try {
      const res = await getMenu();
      setIsLoaded(true);
      setMenu(res);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }


  // Get a dish from server
  async function getDish(id: string) {
    try {
      const res = await getDishById(id);
      console.log("getDish ~ res:", res);

      setIsLoaded(true);
      setForm({
        _id: res._id,
        name: res.name,
        cost: res.cost,
        measure: res.measure,
        image: res.image
      });
      setIsEdit(true);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };


  // Change Dish
  async function editDish() {
    console.log("editDish ~ form:", form);
    try {
      await editDishApi(form);
      setIsLoaded(true);
      updateMenu();
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  // Remove dish
  async function DeleteDish(id: string) {
    try {
      await deleteDishApi(id);
      setIsLoaded(true);
      updateMenu();
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // отправка формы
  function Save() {
    if (form._id === 0) {
      submitDish();
    } else {
      editDish();
    }
  }

  // Отправка файла

  const saveFile = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };


  const getFormData = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('form', JSON.stringify(form));
    return formData;
  };

  const submitDish = async () => {
    console.log("submitDish():", getFormData);
    try {
      await submitMenuApi(getFormData());
      setIsLoaded(true);
      updateMenu();
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
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
    return <div>Помилкака: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>

        <Stack direction="row" justifyContent="space-between" spacing={1} mb={2} p={2}>
          <h2>{!isEdit ? "Дії з меню" : "Редагування страви"}</h2>

          <CreateDishButton />
        </Stack>



        {isEdit &&
          <>
            {/* Input dish data */}
            < Box
              component='form'
              sx={{
                display: 'flex',
                alignItems: 'center',
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
              {isEdit && <img src={`${apiUrl}/${form.image}`} alt={form.image} />}

            </Box >

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
                  Додати зображення страви
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
                  <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" width="200" />

                </div>
              ) : (
                <p>Choose a picture of a dish</p>
              )}

              {/*  Save dish data  */}
              <Button variant='contained' color='success' onClick={Save}>
                Сохранить
              </Button>
            </Box>
          </>
        }

        {/* ------------------------------------------------------------------------------------------------- */}

        {/*  All Menu table  */}
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
                      onClick={() => getDish(product._id)}
                    >
                      Редагувати
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
