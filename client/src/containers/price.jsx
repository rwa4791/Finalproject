import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import TabsExampleSimple from '../components/priceform.jsx';


class Price extends React.Component {

render() {
    return (
      <div>
        <TabsExampleSimple
        />
     </div>
    );
  }

}

export default Price;
