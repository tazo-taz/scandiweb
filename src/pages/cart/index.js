import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MainDivContainer } from '../../defComponents/styledComponents';
import Item from './Item';
import { MainDiv } from './styledComponents';

class Index extends Component {
  render() {
    const { cart } = this.props;
    return (
      <MainDivContainer>
        <MainDiv>
          <h1>Cart</h1>
          <br />
          <br />
          {cart.map((a) => (
            <Item key={a.myId} a={a} />
          ))}
        </MainDiv>
      </MainDivContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return state.general;
};

export default connect(mapStateToProps)(Index);
