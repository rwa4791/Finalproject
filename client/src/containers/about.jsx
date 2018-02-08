import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';




const backgroundImg = 'https://i.ytimg.com/vi/fZF3xDld69s/maxresdefault.jpg';
const divStyle ={
  backgroundSize: 'cover',
  backgroundImage: `url(${backgroundImg})`
};

const About = () =>
 <div style={ divStyle }>
   <h1> Sale Assistant </h1>
     <h2> Keep Track of your Inventory </h2>
  </div>

<div>
	<h3> What is Sale Assistant? </h3>
		<p>
		The Sale Assistant is a easy to use application for freelancers and small businesses.
		It provides them with the tools they need to track, record, and study their business trends.
		Multiple levels of support are also available depending on the monthly subscription fee. chosen by the user.
		</p>
</div>

<div> 
	<h3> Who Are We? </h3>
		<p> Sale Assistant was founded by Robert Angus, Hector Candelaria, and Christian Vasquez. while attending the Rutgers Bootcamp.
		It was launched on February 14th 2018.
		</p>
</div>

<div>
	<h3> Getting Started </h3>
        <RaisedButton type="submit" label="Get Started" primary  /> <Link to={'/signup'}> </Link>
</div>


export default About;