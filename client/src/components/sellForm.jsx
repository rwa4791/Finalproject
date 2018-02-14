import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';

const formStyle ={
  margin: "auto"
}

const SellForm = ({
  onChange,
  errors,
  item,
}) => (
  <Card className={'container'}>
  <form style={formStyle}>
    <h2 className="card-heading">Sell Item</h2>

    {errors.summary && <p className="error-message">{errors.summary}</p>}

    <div className="field-line">
      <p><b>Item:</b> {item.name} <b>Quantity: </b> {item.quantity}</p>
    </div>

  </form>
</Card>
);

SellForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default SellForm;
