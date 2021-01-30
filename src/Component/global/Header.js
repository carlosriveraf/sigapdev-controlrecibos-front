import React, { Component } from 'react';

import './css/Header.css';


class Header extends Component {

  render() {
    return (
      <div className="header1">
        <header className="Logo">
          <h1 className="titulo1">Modulo control de recibo{this.props.title}</h1>
        </header>
      </div>
    );
  }
}

export default Header;
