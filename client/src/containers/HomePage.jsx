import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import LoginForm from '../components/LoginForm.jsx';


const HomePage = () => (
  <div>
    <Card className="container">
      <CardTitle title="React Application" subtitle="This is the home page." />
    </Card>
  </div>
);

export default HomePage;
