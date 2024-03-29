import React, { useState, useEffect } from 'react';

import { apiUrl } from '../.././api/constants';

import { Loader } from '../../components/Loader';

import {
    Button,
    TextField,
} from '@mui/material';

import { Link, NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import { submitMenuApi } from '../../api/menuApi';

import "./CreateDishPage.scss";

// {
//     "_id": "6606b10cfcb01d0fa461b64e",
//     "name": "nameDish",
//     "cost": 43,
//     "measure": "p",
//     "image": "nameImg.jpeg"
// }

export const CreateDishPage = () => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [isCreated, setIsCreated] = useState(false);

    const [form, setForm] = useState({ _id: 0, name: '', cost: '', measure: '', image: "" });


    const changeHandler = (e: { target: { name: any; value: any; }; }) => {
        setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };


    const [selectedFile, setSelectedFile] = useState<any>();
    const [isSelected, setIsSelected] = useState(false);

    // select Image and put in state
    const selectImage = (event: any) => {
        console.log("🚀 ~ submitUser ~ selectedFile:", event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    // create Form Data before sending
    const getFormData = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('form', JSON.stringify(form));
        return formData;
    };

    // Send form
    const submitUser = async () => {
        console.log("submitUser ~ getFormData:", getFormData());
        try {
            setIsLoaded(false);
            const res = await submitMenuApi(getFormData());
            console.log("submitUser ~ res:", res);
            setIsLoaded(true);
            setIsCreated(true);
        } catch (error) {
            setIsLoaded(true);
            setError(error);

        }
    };


    // IsCreatedMessage Component
    const IsCreatedMessage = () => {

        // Reset form fields after submit
        const refreshPage = () => {
            window.location.reload();
        };

        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight={`calc(100vh - 102px)`} // Set the minimum height of the box to fill the viewport
            >
                <Box
                    textAlign="center"
                    p={5}
                    sx={{ border: '2px solid grey', bgcolor: 'success.light' }}>
                    <h1 color="primary.dark">Страва додана в меню</h1>
                    <Button variant="contained" onClick={refreshPage}>
                        Додати ще страву
                    </Button>
                    <p></p>
                    <Button component={Link} to="/create-menu" variant="contained" color="secondary">
                        Повернутися на сторінку меню
                    </Button>
                </Box>
            </Box >
        );
    };

    if (error) {
        return <div>Помилкака: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <Loader />;
    }
    else if (isCreated) {
        return <IsCreatedMessage />;
    }
    else {
        return (
            <>
                <h2>Зробити нову страву</h2>

                {/*  Input dish data  */}
                <Box
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
                    <img src={`${apiUrl}/${form.image}`} alt={form.image} />

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
                        onChange={selectImage}
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
                    <Button variant='contained' color='success' onClick={submitUser}>
                        Сохранить
                    </Button>
                </Box>

            </>
        );
    }
};
