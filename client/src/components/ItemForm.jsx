import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const ItemForm = ({
  onSubmit,
  onChange,
  errors,
  item,
}) => (
  <Card className="container">
    <form  onSubmit={onSubmit}>
      <h2 className="card-heading">Add New Item</h2>

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

      <div className="button-line">
        <RaisedButton type="submit" label="Submit" primary />
      </div>
    </form>
  </Card>
);

ItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default ItemForm;
