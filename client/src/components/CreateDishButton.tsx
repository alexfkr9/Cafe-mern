import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function CreateDishButton() {

    return (
        <>
            <Button component={Link} to="/create-dish" variant="outlined" color="secondary">
                нова страва
            </Button>
        </>
    );
}