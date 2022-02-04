import React, { Component } from 'react';
import { Flex, MainDivContainer } from '../../defComponents/styledComponents';
import { getCategories, getCategoryItems } from '../../GraphQL/Queries';
import { CategoryNameSC, ItemsParent } from './styledComponents';
import styles from './style.module.css';
import Item from '../../components/items';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currCategory: '',
      products: []
    };
  }

  componentDidMount() {
    getCategories().then((result) => {
      const { categories } = result.data;
      if (categories.length) {
        this.setState({
          categories,
          currCategory: categories[0].name
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const oldCurrCategory = prevState.currCategory;
    const newCurrCategory = this.state.currCategory;
    if (oldCurrCategory !== newCurrCategory) {
      getCategoryItems(newCurrCategory).then((result) => {
        const products = result.data.category.products;
        this.setState({
          products
        });
      });
    }
  }

  render() {
    return (
      <MainDivContainer>
        <h3>Please select a category</h3>
        <Flex gap={2}>
          {this.state.categories.map(({ name }, b) => (
            <p
              className={
                this.state.currCategory === name
                  ? styles.activeNavLink + ' ' + styles.NavLink
                  : styles.NavLink
              }
              key={b}
              onClick={() => {
                this.setState({
                  currCategory: name
                });
              }}
            >
              {name}
            </p>
          ))}
        </Flex>
        <br />
        <CategoryNameSC>{this.state.currCategory}</CategoryNameSC>
        <ItemsParent>
          {this.state.products.map((a, b) => (
            <Item data={a} key={a.id} />
          ))}
        </ItemsParent>
      </MainDivContainer>
    );
  }
}

export default Main;
