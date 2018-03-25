import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';

const formStyle ={
  margin: "auto"
}

const UpdateForm = ({
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
        defaultValue={item.name}
      />
    </div>

    <div className="field-line">
      <TextField
        floatingLabelText="Description"
        name="description"
        errorText={errors.name}
        onChange={onChange}
        defaultValue={item.description}
      />
    </div>
    <div className="field-line">
      <TextField
        floatingLabelText="quantity"
        name="quantity"
        errorText={errors.name}
        onChange={onChange}
        defaultValue={item.quantity}
      />
    </div>

    <div className="field-line">
      <TextField
        floatingLabelText="price"
        type="number"
        name="price"
        onChange={onChange}
        errorText={errors.name}
        defaultValue={item.price}
      />
    </div>
  </form>
</Card>
);


export default UpdateForm;
