import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Card, CardText } from 'material-ui/Card';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    textAlign: 'center'
  },
  font:{
    textAlign: 'center'
  }
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

const TabsExampleSimple = () => (
  <Tabs>
    <Tab label="Basic Subscription" >
      <div>
        <Card className="container">
        <h2 style={styles.headline}>Subscription includes</h2>
        <p style={styles.font}>
        <p> Username and Login Access</p>
        <p> Live Updates of Inventory Uploaded to the Platform </p>
        <p> Sale Tracking of Recent Sales </p>
        <p> Monthly Cost: $10 </p>
        </p>
        </Card>
      </div>
    </Tab>
    <Tab label="Premium Subscription" >
      <div>
        <Card className="container">
        <h2 style={styles.headline}>Subscription includes</h2>
        <p>
        Coming Soon 
        </p>
        </Card>
      </div>
    </Tab>

  </Tabs>
);

export default TabsExampleSimple;