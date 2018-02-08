import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


const Row = (props) => (
  <TableRow>
    <TableRowColumn>{props.name}</TableRowColumn>
    <TableRowColumn>{props.quantity}</TableRowColumn>
    <TableRowColumn>{props.price}</TableRowColumn>
    <TableRowColumn>{props.description}</TableRowColumn>
  </TableRow>

);

export default Row;
