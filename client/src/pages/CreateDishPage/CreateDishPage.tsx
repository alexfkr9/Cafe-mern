import React, { useState, useEffect } from 'react';

import { apiUrl } from '../.././api/constants';

import { Loader } from '../../components/Loader';

import {
    Button,
    TextField,
} from '@mui/material';


import Box from '@mui/material/Box';
import { editDishApi, getMenu, submitMenuApi } from '../../api/menuApi';

export const CreateDishPage = () => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [menu, setMenu] = useState([]);

    const [form, setForm] = useState({ _id: 0, name: '', cost: '', measure: '', image: "" });

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


    // Change Dish
    async function editDish() {
        try {
            await editDishApi(form);
            setIsLoaded(true);
            updateMenu();
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
        console.log("editDish ~ form:", form);
    }



    const changeHandler = (e: { target: { name: any; value: any; }; }) => {
        setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    // отправка формы
    function Save() {
        if (form._id === 0) {
            submitUser();
        } else {
            console.log('editDish');
            editDish();
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
        return formData;
    };

    const submitUser = async () => {
        console.log("submitUser ~ getFormData:", getFormData());
        try {
            const res = await submitMenuApi(getFormData());
            console.log("submitUser ~ res:", res);
            setIsLoaded(true);
            updateMenu();
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    };



    // return <h1>Create Menu</h1>;

    if (error) {
        return <div>Помилкака: {error.message}</div>;
    } else if (!isLoaded) {
        return <Loader />;
    } else {
        return (
            <>

                <h2>{!isEdit ? "Зробити меню" : "Редагування страви"}</h2>

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
                    {isEdit && <img src={`${apiUrl}/${form.image}`} alt={form.image} />}

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
        );
    }
};
