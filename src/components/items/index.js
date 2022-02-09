import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column, Relative } from '../../defComponents/styledComponents';
import {
  SET_ITEM_IN_CART,
  UPDATE_ITEM_AMOUNT_IN_CART
} from '../../reducer/variables';
import { getDefaultAttributes } from '../../services/item';
import {
  InCart,
  InCartImg,
  ItemImg,
  ItemNameSC,
  ItemParent,
  ItemPrice,
  MainItem,
  NotInStockSC
} from './styledComponents';
const compareObjects = (obj1, obj2) =>
  Object.keys(obj1).every((a) => obj1[a] === obj2[a]);
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.data
    };
  }
  render() {
    const { item } = this.state;
    const { currency } = this.props.general;

    const price = item.prices.find((a) => a.currency.label === currency);
    const attributes = getDefaultAttributes(item);

    return (
      <MainItem>
        <Link to={'/product/' + item.id}>
          <ItemParent>
            <Relative>
              <ItemImg src={item.gallery[0]} />
              {!item.inStock && <NotInStockSC>OUT OF STOCK</NotInStockSC>}
            </Relative>
            <Column gap={1}>
              <ItemNameSC disabled={!item.inStock}>{item.name}</ItemNameSC>
              <ItemPrice disabled={!item.inStock}>
                {price.currency.symbol + ' ' + price.amount}
              </ItemPrice>
            </Column>
          </ItemParent>
        </Link>
        {item.inStock && (
          <InCart
            className="addIcon"
            onClick={() => {
              const currCartItem = this.props.general.cart.find(
                (a) =>
                  a.id === item.id && compareObjects(a.attributes, attributes)
              );
              if (currCartItem) {
                if (!compareObjects(attributes, currCartItem.attributes)) {
                  this.props.addItemInCart({
                    myId: Math.random(),
                    id: item.id,
                    attributes,
                    amount: 1,
                    gallery: item.gallery,
                    prices: item.prices,
                    name: item.name,
                    allAttributes: item.attributes
                  });
                } else
                  this.props.updateItemAmountInCart({
                    myId: currCartItem.myId,
                    amount: currCartItem.amount + 1
                  });
              } else
                this.props.addItemInCart({
                  myId: Math.random(),
                  id: item.id,
                  attributes,
                  amount: 1,
                  gallery: item.gallery,
                  prices: item.prices,
                  name: item.name,
                  allAttributes: item.attributes
                });
            }}
          >
            <InCartImg
              alt="In cart"
              title="In cart"
              src="/assets/images/icons/cart.png"
            />
          </InCart>
        )}
      </MainItem>
    );
  }
}

const addItemInCart = (data) => ({
  type: SET_ITEM_IN_CART,
  payload: data
});

const updateItemAmountInCart = (data) => ({
  type: UPDATE_ITEM_AMOUNT_IN_CART,
  payload: data
});

const mapStateToProps = (state) => ({ general: state.general });

const mapDispatchToProps = () => ({ addItemInCart, updateItemAmountInCart });

export default connect(mapStateToProps, mapDispatchToProps())(Item);
