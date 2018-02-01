import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import form.js from "../components/Form";


const HomePage = () => (
  <Card className="container">
    <CardTitle title="React Application" subtitle="This is the home page." />
  </Card>
 <div>
<row className = "form">
</row>
</div>
);
 componentDidMount: function() {
    window.addEventListener('scroll', this.handleOnScroll);
  },

 componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleOnScroll);
  },
  handleOnScroll: function() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.querySearchResult();
    }
  },

);

export default HomePage;
