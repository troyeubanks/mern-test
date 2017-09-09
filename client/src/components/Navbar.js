import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, Col, Row } from 'react-bootstrap';
import '../styles/navbar.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getNavbarElements() {
    return [
      {
        id: 'home',
        text: 'Home',
        icon: 'fa-home',
        link: '/'
      },
      {
        id: 'frequency',
        text: 'Grid - Frequency',
        icon: 'fa-send',
        link: '/frequency'
      },
      {
        id: 'colors',
        text: 'Grid - Colors',
        icon: 'fa-flask',
        link: '/colors'
      }
    ];
  }

  buildNavbar() {
    const elements = this.getNavbarElements();

    return elements.map((element) => {
      return (
        <Row>
          <NavItem eventKey={ element.id } href={ element.link }>
            <Link to={ element.link }>
              <Col xs={ 3 } md={ 2 }>
                <i className={ `fa ${element.icon}` }></i>
              </Col>
              <Col xs={ 9 } md={ 10 }>
                <span>{ element.text }</span>
              </Col>
            </Link>
        </NavItem>
        </Row>
      );
    });
  }

  render() {
    return (
      <Nav bsStyle="pills" onSelect={ this.handleSelect } stacked={ true }>
        { this.buildNavbar() }
      </Nav>
    );
  }
}

export default Navbar;
