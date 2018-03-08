import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

const Logout = ({ secretData }) => (
  <Card className="container">
    {Auth.deauthenticateUser()}
    <CardTitle title="logout"/>
      <CardText style={{ fontSize: '16px', color: 'green' }}>You're logged out :D !!!</CardText>
  </Card>
);

Logout.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Logout;
