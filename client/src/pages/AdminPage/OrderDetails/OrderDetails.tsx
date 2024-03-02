
import { useSelector } from 'react-redux';



import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { styled } from '@mui/material/styles';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export const OrderDetails = () => {

  const userOrder = useSelector((state: any) => state.order.order);

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


  return (
    <Item> {/* Order details */}
      {userOrder.name !== undefined &&

        <> <h2>Order details</h2>{userOrder.name}
          <Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#cceeff' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Dish</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                      Cost
                    </TableCell>
                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                      Measure
                    </TableCell>
                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                      Quantity
                    </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>

                  {userOrder?.order.map((item: any) => (
                    <StyledTableRow
                      key={(Math.random() + 1).toString(36).substring(7)}
                    >
                      {/* {userOrder.order.map((item: any, index: number) => ( */}
                      <StyledTableCell
                        align='center'
                        sx={{ '&:first-of-type': { textAlign: 'left' } }}
                        key={(Math.random() + 1).toString(36).substring(7)}
                      >
                        {item?.name}
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        key={(Math.random() + 1).toString(36).substring(7)}
                      >
                        {item?.cost}
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        key={(Math.random() + 1).toString(36).substring(7)}
                      >
                        {item?.measure}
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        key={(Math.random() + 1).toString(36).substring(7)}
                      >
                        {item?.quantity}
                      </StyledTableCell>
                      {/* ))} */}
                    </StyledTableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      }
    </Item >
  );

};
