import React, { Component } from 'react';
import {
  Btn1,
  Btn2,
  Center,
  Column,
  Div2Children,
  FHCenter,
  Flex,
  Flex1,
  PushRight,
  Relative
} from '../../defComponents/styledComponents';
import {
  CartDivSC,
  CartItemsLengthSC,
  CartItemsParentSC,
  CartSC,
  CurrenciesDivSC,
  CurrencyP,
  CurrentcySC,
  ExpandSC,
  Logo,
  MainDiv,
  MiniCartBG,
  MiniCartItemsDeleteIconSC,
  MiniCartItemsGridSC,
  MiniCartItemsLengthSC,
  MiniCartItemsSpecHeaderSC,
  MiniCartItemsSpecImgSC,
  MiniCartItemsSpecSizesSC,
  MiniCartSC,
  NavLiSC,
  NavUlSC,
  VerticalCenter
} from './styledComponents';
import { getCategories, getCurrencies } from '../../GraphQL/Queries';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  DELETE_ITEM_IN_CART,
  SET_CURRENCY,
  UPDATE_ITEM_AMOUNT_IN_CART
} from '../../reducer/variables';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCart: false,
      openCurrency: false,
      currencies: [],
      categories: []
    };
  }

  componentDidMount() {
    getCurrencies().then((result) => {
      const { currencies } = result.data;
      this.setState({
        currencies
      });
      this.props.setCurrency(currencies[0].label);
    });

    getCategories().then((result) => {
      const { categories } = result.data;
      if (categories.length) {
        this.setState({
          categories
        });
      }
    });
  }

  render() {
    const {
      general: { currency, cart }
    } = this.props;
    const currCurrency = this.state.currencies.find(
      (a) => a.label === currency
    );
    const sum = cart
      .map(
        ({ amount, prices }) =>
          amount *
          prices.find((b) => b.currency.label === currCurrency?.label)?.amount
      )
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    return (
      <MainDiv>
        <Flex className="myContainer" position="relative">
          <Flex1>
            <NavUlSC>
              {this.state.categories.map(({ name }, b) => (
                <NavLink
                  key={b}
                  to={name === 'all' ? '' : '/category/' + name}
                  className="navLink"
                >
                  <NavLiSC iSC>{name}</NavLiSC>
                </NavLink>
              ))}
            </NavUlSC>
          </Flex1>
          <Flex1>
            <FHCenter>
              <Link to="/">
                <Logo
                  onClick={() => {
                    if (window.location.pathname !== '/')
                      this.setState({
                        redirect: '/'
                      });
                  }}
                  src="/assets/images/logo/logo.png"
                  alt=""
                />
              </Link>
            </FHCenter>
          </Flex1>
          <Flex1>
            <PushRight className="h-100">
              <Flex>
                <VerticalCenter>
                  <Flex gap="2">
                    <VerticalCenter
                      onClick={() =>
                        this.setState({
                          openCurrency: !this.state.openCurrency,
                          openCart: false
                        })
                      }
                    >
                      <CurrentcySC>{currCurrency?.symbol}</CurrentcySC>
                      <ExpandSC
                        src="/assets/images/others/expand-more.png"
                        alt=""
                      />
                    </VerticalCenter>
                    <CartDivSC
                      onClick={() =>
                        this.setState({
                          openCart: !this.state.openCart,
                          openCurrency: false
                        })
                      }
                    >
                      <CartSC src="/assets/images/others/cart.png" alt="" />
                      <CartItemsLengthSC>{cart.length}</CartItemsLengthSC>
                    </CartDivSC>
                  </Flex>
                </VerticalCenter>
              </Flex>
            </PushRight>
          </Flex1>
          {this.state.openCurrency && (
            <>
              <CurrenciesDivSC>
                {this.state.currencies.map((a, b) => (
                  <CurrencyP
                    active={currency === a.label}
                    key={b}
                    onClick={() => {
                      this.props.setCurrency(a.label);
                      this.setState({
                        openCurrency: false
                      });
                    }}
                  >
                    {a.symbol + ' ' + a.label}
                  </CurrencyP>
                ))}
              </CurrenciesDivSC>
              <MiniCartBG
                bg="transparent"
                onClick={() =>
                  this.setState({
                    openCurrency: false
                  })
                }
              />
            </>
          )}
          {this.state.openCart && (
            <>
              <MiniCartSC>
                <Flex alignItems="flex-end" gap={1}>
                  <h4>My bag,</h4>
                  <MiniCartItemsLengthSC>
                    {cart.length} item{cart.length > 1 && 's'}
                  </MiniCartItemsLengthSC>
                </Flex>
                <CartItemsParentSC>
                  {cart.map((a, b) => {
                    const price = a.prices.find(
                      (b) => b.currency.label === currency
                    );

                    const priceFixed = price.amount.toFixed(2);
                    return (
                      <MiniCartItemsGridSC key={a.myId}>
                        <Column gap={3} justifyContent={'space-between'}>
                          <Column gap={3}>
                            <MiniCartItemsSpecHeaderSC>
                              {a.name}
                            </MiniCartItemsSpecHeaderSC>
                            <h5>{price.currency.symbol + priceFixed}</h5>
                          </Column>
                          {a.allAttributes.map((c, d) => (
                            <Flex gap={1} key={d}>
                              {c.items.map((e, f) => {
                                const selected = a.attributes[c.id] === e.id;
                                const props = { key: f };
                                if (c.type === 'swatch') {
                                  props.bg = e.value;
                                  if (selected) {
                                    props.border = 'var(--green)';
                                    props.borderWidth = 2;
                                  }
                                } else {
                                  props.disabled = selected;
                                  props.children = e.value;
                                }
                                return <MiniCartItemsSpecSizesSC {...props} />;
                              })}
                            </Flex>
                          ))}
                        </Column>
                        <Center
                          justifyContent="space-between"
                          flexDirection="column"
                        >
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
                          <p>{a.amount}</p>
                          <MiniCartItemsSpecSizesSC
                            onClick={() => {
                              if (a.amount === 1)
                                return this.props.deleteItemInCart(a.myId);
                              this.props.updateItemAmountInCart({
                                myId: a.myId,
                                amount: a.amount - 1
                              });
                            }}
                          >
                            -
                          </MiniCartItemsSpecSizesSC>
                        </Center>
                        <Relative>
                          <MiniCartItemsSpecImgSC image={a.gallery[0]} />
                          <MiniCartItemsDeleteIconSC
                            onClick={() => this.props.deleteItemInCart(a.myId)}
                          >
                            <img src="/assets/images/icons/remove.png" alt="" />
                          </MiniCartItemsDeleteIconSC>
                        </Relative>
                      </MiniCartItemsGridSC>
                    );
                  })}
                </CartItemsParentSC>
                <h4>
                  <Flex justifyContent="space-between">
                    <span>Total</span>
                    <span>{currCurrency?.symbol + sum}</span>
                  </Flex>
                </h4>
                <Div2Children gap={2}>
                  <Link
                    to="/cart"
                    onClick={() => {
                      this.setState({
                        openCart: false
                      });
                    }}
                  >
                    <Btn1 className="w-100">VIEW BAG</Btn1>
                  </Link>
                  <Btn2>CHECK OUT</Btn2>
                </Div2Children>
              </MiniCartSC>
              <MiniCartBG
                onClick={() =>
                  this.setState({
                    openCart: false
                  })
                }
              />
            </>
          )}
        </Flex>
      </MainDiv>
    );
  }
}

const setCurrency = (data) => ({
  type: SET_CURRENCY,
  payload: data
});

const updateItemAmountInCart = (data) => ({
  type: UPDATE_ITEM_AMOUNT_IN_CART,
  payload: data
});

const deleteItemInCart = (data) => ({
  type: DELETE_ITEM_IN_CART,
  payload: data
});

const mapStateToProps = (state) => ({ general: state.general });

const mapDispatchToProps = () => ({
  setCurrency,
  updateItemAmountInCart,
  deleteItemInCart
});

export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
