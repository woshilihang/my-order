import React, { Component } from 'react';
import './App.css';
import OrderList from '../OrderList/index'
import Header from '../Header/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <OrderList />
      </div>
    );
  }
}

export default App;
