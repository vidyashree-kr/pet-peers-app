import React from "react";

export default function OrdersTable(props) {
  return (
    <div>
      <table >
        <tr>
          <th style={{ color: 'blue', fontWeight: 'bold' }}>{props.myOrder.length} ITEMS</th>
          <th style={{ color: 'blue', fontWeight: 'bold', paddingLeft: 40 }}> Name</th>
          <th style={{ color: 'blue', fontWeight: 'bold', paddingLeft: 50 }}> PRICE($)</th>
        </tr>
        <tbody>
          {props.myOrder.map((row, index) => (
            <tr key={row.id}>
              <td>
                <img src={require(`../../assets/${row.src.toLowerCase()}.jpg`)}
                  width="250px"
                  height="150px" />
              </td>
              <td style={{ paddingLeft: 50 }}>
                <b>{row.name.toUpperCase()}</b>
              </td>
              <td style={{ paddingLeft: 50 }}>${row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
