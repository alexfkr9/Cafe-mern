import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function Snack({isOpen, handleClose = Function.prototype}) {
    return (
        <Snackbar            
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}           
            open={isOpen}
            onClose={handleClose}
            autoHideDuration={4000}            
        >
            
            <Alert                          
                severity="success"                                
            >Товар добавлен в корзину!</Alert>
        </Snackbar>
    )
}

export default Snack