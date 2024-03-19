import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import NoImg from "../assets/images/soup.jpg";
import { apiUrl } from '../api/constants';
import Stack from '@mui/material/Stack';
import ProductControlQuantity from './ProductControlQuantity';
import Cart from './Cart';

export default function CardProduct({ product }: any) {
    const { _id, name, cost, measure, image, alt } = product;
    const imageUrl = `${apiUrl}/${image}`;

    function getQuantity(quantity: number) {
        console.log(quantity);
    }

    return (
        <Card sx={{ backgroundColor: "#fce4ec" }}>
            <CardMedia
                component="img"
                alt={alt}
                image={imageUrl || NoImg}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="h4" component="div">
                        {cost} {measure}
                    </Typography>
                    <CardActions>
                        <ProductControlQuantity id={_id} />
                    </CardActions>

                </Stack>
                <CardActions>
                    <Cart id={_id} />
                </CardActions>
            </CardContent >

        </Card >
    );
}
