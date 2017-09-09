import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Grid, Col, Row } from 'react-bootstrap';
import App from './App';
import './index.css';

import Navbar from './components/Navbar';

ReactDOM.render((
  <BrowserRouter>
    <Grid>
      <Row>
        <Col md={ 3 } xs={ 4 }>
          <Navbar />
        </Col>
        <Col md={ 9 } xs={ 8 }>
          <App />
        </Col>
      </Row>
    </Grid>
  </BrowserRouter>
), document.getElementById('root'));
