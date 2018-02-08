//Import packages
import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Row from './Row.jsx';

//Class ItemRow is the background
class ItemRow extends Component {

  constructor(props) {
    super(props);
  }

  //On component mount
  componentDidMount(){
  }

  //eventHandler

  render(){
    return(
      <TableBody>

      </TableBody>
    );
  }
};

//Export Form
export default ItemRow;
