import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import TabsExampleSimple from '../components/priceform.jsx';
const backgroundImg = 'https://i.ytimg.com/vi/fZF3xDld69s/maxresdefault.jpg';


const divStyle ={
  backgroundSize: 'cover',
  backgroundImage: `url(${backgroundImg})`
};


class Price extends React.Component {

render() {
    return (
      <div style={ divStyle }>
      <TabsExampleSimple
      />
     </div>
    );
  }

}

export default Price;