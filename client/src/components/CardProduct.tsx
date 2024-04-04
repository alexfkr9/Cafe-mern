import * as React from 'react';
import "./CardProduct.scss";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import NoImg from "../assets/images/soup.jpg";
import { apiUrl } from '../api/constants';
import Stack from '@mui/material/Stack';
import Cart from './AddProductQty';
import styled from '@emotion/styled';
import { AspectRatio } from '@mui/icons-material';
import { Box } from '@mui/material';

const CardContentNoPadding = styled(CardContent)(`
  padding: 20px;
  &:last-child {
    padding-bottom: 20px;
  };
`);

export default function CardProduct({ product }: any) {
    const { _id, name, cost, measure, image, alt } = product;
    const imageUrl = `${apiUrl}/${image}`;


    return (

        <Card className="cafe-card">
            <div className="card-header">
                <CardMedia
                    component="img"
                    alt={alt}
                    image={imageUrl || NoImg}
                    className="card-img" />
            </div>

            < CardContentNoPadding >
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography component="p" color="text.secondary">
                    Рис, норі, лосось норвезький слабосолений, ікра тобіко, огірок, авокадо, спайс соус
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="h4" component="div">
                        {cost} {measure}
                    </Typography>
                    <CardActions sx={{ pr: 0 }}>
                        <Cart id={_id} />
                    </CardActions>
                </Stack>

            </CardContentNoPadding >

        </Card >
    );
}
