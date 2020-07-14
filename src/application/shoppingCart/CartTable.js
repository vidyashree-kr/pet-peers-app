import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    border: "none",
    background: "none",
    cursor: "pointer"
  }
});

export default function CartTable(props) {
  const classes = useStyles();

  //handles delete button click in shopping cart page
  const handleDelete = (e, id) => {
    e.preventDefault();
    props.handleItemDelete(id);
  };

  return (
    <div>
      <table >
        <tr>
          <th style={{ color: 'blue', fontWeight: 'bold' }}>{props.cartItem.length} ITEMS</th>
          <th style={{ color: 'blue', fontWeight: 'bold', paddingLeft: 40 }}> Name</th>
          <th style={{ color: 'blue', fontWeight: 'bold', paddingLeft: 50 }}> PRICE($)</th>
        </tr>
        <tbody>
          {props.cartItem.map((row, index) => (
            <tr key={row.id}>
              <td>
                <img src={require(`../../assets/${row.src.toLowerCase()}.jpg`)}
                  width="250px"
                  height="150px" />
              </td>
              <td style={{ paddingLeft: 50 }}>
                <b>{row.name.toUpperCase()}</b>
                <div >
                  <button
                    onClick={e => handleDelete(e, row.id)}
                    className={classes.button}
                  >
                    X REMOVE
                      </button>
                </div>
              </td>
              <td style={{ paddingLeft: 50 }}>${row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
