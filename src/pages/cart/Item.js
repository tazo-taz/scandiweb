import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BigSpecSizeSC,
  MiniCartItemsDeleteIconSC,
  MiniCartItemsSpecSizesSC
} from '../../components/navbar/styledComponents';
import {
  Center,
  Column,
  Flex,
  Relative
} from '../../defComponents/styledComponents';
import {
  DELETE_ITEM_IN_CART,
  UPDATE_ITEM_AMOUNT_IN_CART
} from '../../reducer/variables';
import { CartItemGrid, CartItemImg, CartItemIcon } from './styledComponents';
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currImage: 0
    };
  }
  render() {
    const { a, currency } = this.props;
    const { currImage } = this.state;

    const price = a.prices.find((c) => c.currency.label === currency);
    const currPrice = (price.amount * a.amount).toFixed(2);

    return (
      <CartItemGrid key={a.myId}>
        <Column gap={3} justifyContent="space-between">
          <h2>{a.name}</h2>
          <h3>{price.currency.symbol + currPrice}</h3>
          {a.allAttributes?.map((b, c) => (
            <Flex key={c} gap={2}>
              {b.items.map((d, e) => {
                const props = { key: e };
                const selected = a.attributes[b.id] === d.id;
                if (b.type === 'swatch') {
                  props.bg = d.value;
                  props.border = selected ? 'var(--green)' : d.value;
                  props.disableHover = true;
                  props.borderWidth = 3;
                } else {
                  props.children = d.value;
                  props.selected = selected;
                }
                return <BigSpecSizeSC {...props} />;
              })}
            </Flex>
          ))}
        </Column>
        <Column justifyContent="space-between">
          <MiniCartItemsSpecSizesSC
            onClick={() =>
              this.props.updateItemAmountInCart({
                myId: a.myId,
                amount: a.amount + 1
              })
            }
          >
            +
          </MiniCartItemsSpecSizesSC>
          <Center>{a.amount}</Center>
          <MiniCartItemsSpecSizesSC
            onClick={() => {
              if (a.amount === 1) return this.props.deleteItemInCart(a.myId);
              this.props.updateItemAmountInCart({
                myId: a.myId,
                amount: a.amount - 1
              });
            }}
          >
            -
          </MiniCartItemsSpecSizesSC>
        </Column>
        <Center position="relative">
          <CartItemIcon
            src="/assets/images/icons/right-arrow.png"
            right="10px"
            onClick={() => {
              const currImageInd =
                (this.state.currImage + 1) % a.gallery.length;
              this.setState({
                currImage: currImageInd
              });
            }}
          />
          <CartItemIcon
            onClick={() => {
              let currImageInd;
              if (this.state.currImage === 0)
                currImageInd = a.gallery.length - 1;
              else currImageInd = (this.state.currImage - 1) % a.gallery.length;
              this.setState({
                currImage: currImageInd
              });
            }}
            src="/assets/images/icons/left-arrow.png"
            left="10px"
          />
          <Relative>
            <MiniCartItemsDeleteIconSC
              onClick={() => this.props.deleteItemInCart(a.myId)}
            >
              <img src="/assets/images/icons/remove.png" alt="" />
            </MiniCartItemsDeleteIconSC>
            <CartItemImg src={a.gallery[currImage]} />
          </Relative>
        </Center>
      </CartItemGrid>
    );
  }
}

const updateItemAmountInCart = (data) => ({
  type: UPDATE_ITEM_AMOUNT_IN_CART,
  payload: data
});

const deleteItemInCart = (data) => ({
  type: DELETE_ITEM_IN_CART,
  payload: data
});

const mapStateToProps = (state) => state.general;

const mapDispatchToProps = () => ({
  updateItemAmountInCart,
  deleteItemInCart
});

export default connect(mapStateToProps, mapDispatchToProps())(Item);
