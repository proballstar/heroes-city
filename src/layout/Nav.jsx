import React from 'react';
import Navbar from './Navbar';
// Take in a component as argument WrappedComponent
const Nav = (WrappedComponent) => {
// And return another component
  class HOC extends React.Component {
    render() {
      return (
        <>
            <Navbar />
            <WrappedComponent />
        </>
      )
    }
  }
  return HOC;
};

export default Nav;