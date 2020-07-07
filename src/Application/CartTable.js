import React, {useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 350
  },
  button: {
    border: "none",
    background: "none",
    cursor: "pointer"
  }
});

export default function CartTable(props) {
  const classes = useStyles();
  const [cartItem, setcartItem] = useState("");
  const handleCartItem = item => {
    setcartItem(item);
  };
  const handleDelete = (e, index) => {
    e.preventDefault();
    props.handleItemDelete(index);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{color:'blue',fontWeight:'bold'}}>{props.cartItem.length} ITEMS</TableCell>
              <TableCell style={{color:'blue',fontWeight:'bold'}}> Name</TableCell>
              <TableCell style={{color:'blue',fontWeight:'bold'}}> PRICE($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cartItem.map((row, index) => (
              <TableRow key={row.name} style={{ cursor: "pointer" }}>
                <TableCell><img src={row.src} width="70px" height="70px" /></TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "150px" }}
                >
                  <div style={{ display: "inline", float: "left" }}>
                  </div>
                  <div
                    style={{
                      display: "inline",
                      float: "left",
                      marginLeft: "10px"
                    }}
                  >
                    <div>
                      <b>{row.name.toUpperCase()}</b>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <button
                        onClick={e => handleDelete(e, index)}
                        className={classes.button}
                      >
                        X REMOVE
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>${row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
