//Import packages
import React, {Component} from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */

export default class ItemTable extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <Table
        onRowSelection={this.props.handleRowSelection}
        fixedHeader={true}
        selectable={true}
        multiSelectable={true}
      >
        <TableHeader
          displaySelectAll={true}
          adjustForCheckbox={true}
          enableSelectAll={true}
        >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>quantity</TableHeaderColumn>
            <TableHeaderColumn>price</TableHeaderColumn>
            <TableHeaderColumn>description</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
        >
          {
            this.props.itemArray.map((item) =>{
            return(
              <TableRow key={item._id} id ={item._id}>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.quantity}</TableRowColumn>
                <TableRowColumn>{item.price}</TableRowColumn>
                <TableRowColumn>{item.description}</TableRowColumn>
              </TableRow>
            )
            })
          }
        </TableBody>
      </Table>
    )
  }
}
