import React, { Component } from 'react';
import { BigSpecSizeSC } from '../../components/navbar/styledComponents';
import {
  Btn2,
  Column,
  Flex,
  MainDivContainer
} from '../../defComponents/styledComponents';
import { getItem } from '../../GraphQL/Queries';
import { getDefaultAttributes } from '../../services/item';
import { GalleryImg, MainDiv, MainImg } from './styledComponents';
import { connect } from 'react-redux';
import {
  SET_ITEM_IN_CART,
  UPDATE_ITEM_AMOUNT_IN_CART
} from '../../reducer/variables';
const HtmlToReactParser = require('html-to-react').Parser;

const htmlToReactParser = new HtmlToReactParser();
const toHtml = (htmlInput) => htmlToReactParser.parse(htmlInput);
const compareObjects = (obj1, obj2) =>
  Object.keys(obj1).every((a) => obj1[a] === obj2[a]);

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      chosenImage: ''
    };
  }

  componentDidMount() {
    getItem(window.location.pathname.split('/').slice(-1)[0]).then((result) => {
      const { product } = result.data;
      this.setState({
        product: product,
        loading: false,
        chosenImage: product?.gallery[0],
        attributes: product ? getDefaultAttributes(product) : {}
      });
    });
  }
  render() {
    const { loading, product, chosenImage, attributes } = this.state;
    if (loading) return <MainDivContainer>loading</MainDivContainer>;
    if (!loading && !product)
      return <MainDivContainer>Product doesn't exist</MainDivContainer>;
    return (
      <MainDivContainer>
        <MainDiv>
          <Column gap={5}>
            {product.gallery.map((a, b) => (
              <GalleryImg
                key={b}
                src={a}
                onClick={() => this.setState({ chosenImage: a })}
              />
            ))}
          </Column>
          <MainImg src={chosenImage} />
          <Column gap={6}>
            <h1>{product.name}</h1>
            {product.attributes?.map((a, b) => (
              <Column gap={1} key={b}>
                <h4>{a.name.toUpperCase()}:</h4>
                <Flex gap={2}>
                  {a.items?.map((c, d) => {
                    const props = { key: d };
                    if (a.type === 'swatch') {
                      props.bg = c.value;
                      props.disableHover = true;
                    } else props.children = c.value;
                    const selected = attributes[a.id] === c.id;
                    return (
                      <BigSpecSizeSC
                        onClick={() => {
                          const tempAttribues = { ...attributes };
                          tempAttribues[a.id] = c.id;
                          this.setState({
                            attributes: tempAttribues
                          });
                        }}
                        selected={a.type === 'swatch' ? false : selected}
                        border={
                          selected && a.type === 'swatch'
                            ? 'var(--green)'
                            : 'black'
                        }
                        {...props}
                      />
                    );
                  })}
                </Flex>
              </Column>
            ))}
            <Column gap={1}>
              <h4>PRICE:</h4>
              <h4>$40.00</h4>
            </Column>
            <Btn2
              onClick={() => {
                const currCartItem = this.props.general.cart.find(
                  (a) =>
                    a.id === product.id &&
                    compareObjects(a.attributes, attributes)
                );
                if (currCartItem) {
                  if (!compareObjects(attributes, currCartItem.attributes)) {
                    this.props.addItemInCart({
                      myId: Math.random(),
                      id: product.id,
                      attributes,
                      amount: 1,
                      gallery: product.gallery,
                      prices: product.prices,
                      name: product.name,
                      allAttributes: product.attributes
                    });
                  } else
                    this.props.updateItemAmountInCart({
                      myId: currCartItem.myId,
                      amount: currCartItem.amount + 1
                    });
                } else
                  this.props.addItemInCart({
                    myId: Math.random(),
                    id: product.id,
                    attributes,
                    amount: 1,
                    gallery: product.gallery,
                    prices: product.prices,
                    name: product.name,
                    allAttributes: product.attributes
                  });
              }}
              disabled={!product.inStock}
            >
              ADD TO CART
            </Btn2>
            <div>{toHtml(product.description)}</div>
          </Column>
        </MainDiv>
      </MainDivContainer>
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

export default connect(mapStateToProps, mapDispatchToProps())(Product);
