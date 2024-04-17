import * as React from 'react';
import "./CardProduct.scss";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import noImg from "../assets/images/noimg.png";
import { apiUrl } from '../api/constants';
import Stack from '@mui/material/Stack';
import AddProductQty from './AddProductQty';
import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { deleteDishApi } from '../api/menuApi';
import DeleteIcon from '@mui/icons-material/Delete';

const CardContentNoPadding = styled(CardContent)(`
  padding: 20px;
  &:last-child {
    padding-bottom: 20px;
  };
`);

export default function CartItem({ product }: any) {

    // Remove dish
    async function DeleteDish(id: string) {
        console.log("DeleteDish ~ id:", id);

        // try {
        //     await deleteDishApi(id);
        //     setIsLoaded(true);
        //     updateMenu();
        // } catch (error) {
        //     setIsLoaded(true);
        //     setError(error);
        // }
    }

    console.log("CardProduct ~ product:", product);
    const { _id, name, cost, measure, image, alt } = product;
    const srcImg = `${apiUrl}/${image}`;

    // replace srcImg with noImg
    const onImageError = (e: any) => {
        e.target.src = noImg;
    };

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <div className="card-header">
                <img src={srcImg} alt={name} />
            </div>

            <Stack direction="row" justifyContent="space-between">

                <Stack direction="row" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div" sx={{ width: '25%' }} ml={2}>
                        {name}
                    </Typography>

                    <Typography component="p" color="text.secondary" sx={{ width: '75%' }} ml={'auto'}>
                        Рис, норі, лосось норвезький слабосолений, ікра тобіко, огірок, авокадо, спайс соус
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
                    <Typography sx={{ minWidth: 60 }}>
                        {cost} {measure}
                    </Typography>
                    <CardActions sx={{ pr: 0 }}>
                        <AddProductQty id={'_id'} />
                    </CardActions>
                    <IconButton
                        edge='end'
                        aria-label='delete'
                        color='error'
                        key={'product.id'}
                        onClick={() => DeleteDish('product._id')}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

            </Stack>

        </Stack>
    );
}
