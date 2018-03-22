import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';

const formStyle ={
  margin: "auto"
}

const ItemForm = ({
  onChange,
  errors,
  item,
}) => (
  <Card className={'container'}>
  <form style={formStyle}>
    <h2 className="card-heading">Update {item.name}</h2>

    {errors.summary && <p className="error-message">{errors.summary}</p>}

    <div className="field-line">
      <TextField
        floatingLabelText="Name"
        name="name"
        errorText={errors.name}
        onChange={onChange}
        value={item.name}
      />
    </div>

    <div className="field-line">
      <TextField
        floatingLabelText="Description"
        name="description"
        errorText={errors.name}
        onChange={onChange}
        value={item.description}
      />
    </div>
    <div className="field-line">
      <TextField
        floatingLabelText="quantity"
        name="quantity"
        errorText={errors.name}
        onChange={onChange}
        value={item.quantity}
      />
    </div>

    <div className="field-line">
      <TextField
        floatingLabelText="price"
        type="number"
        name="price"
        onChange={onChange}
        errorText={errors.name}
        value={item.price}
      />
    </div>
  </form>
</Card>
);


export default ItemForm;
