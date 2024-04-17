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
    Stack,
    Grid,
    Container,
    Typography
} from '@mui/material';


import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { deleteDishApi, editDishApi, getDishById, getMenu, submitMenuApi } from '../api/menuApi';
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';

export const CartPage = () => {
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



    const cart = useSelector((state: any) => state.cart.cart);

    // add quantity of dishes to user menu by id
    function mergeObjectsByProperty(arr1: any[], arr2: any[], prop: string) {
        const mergedArray: any[] = [];

        arr1.forEach(obj1 => {
            console.log(obj1);
            const matchingObj = arr2.find(obj2 => obj2._id === obj1[prop]);
            console.log("mergeObjectsByProperty ~ matchingObj:", matchingObj);
            if (matchingObj) {
                mergedArray.push({ ...matchingObj, qty: obj1.qty });
            }
        });

        return mergedArray;
    }

    const cartMerged = mergeObjectsByProperty(cart, menu, 'id');



    return <Container maxWidth="md">
        <Typography gutterBottom variant="h4" component="div" py={2}>
            Твоє замовлення
        </Typography>

        {cartMerged?.map((product: any, index: number) => (
            <CartItem product={product} />
        ))}
    </Container>;

};
