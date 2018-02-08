import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ItemRow from '../components/ItemRow.jsx';
import { Card, CardText } from 'material-ui/Card';
import Row from '../components/Row.jsx'

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */

export default class ItemTable extends React.Component{
constructor(props){
  super(props)
}


render(){

  console.log(this.props)
  return (

  <Card className='container'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>quantity</TableHeaderColumn>
          <TableHeaderColumn>price</TableHeaderColumn>
          <TableHeaderColumn>description</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          this.props.itemArray.map((item) =>{

          return <Row
                    key = {item._id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    description={item.description}
                  />
          })
        }
      </TableBody>
    </Table>
  </Card>
)
}
}
