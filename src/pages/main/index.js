import React, { Component } from 'react';
import { MainDivContainer } from '../../defComponents/styledComponents';
import { getCategories, getCategoryItems } from '../../GraphQL/Queries';
import { CategoryNameSC, ItemsParent } from './styledComponents';
import Item from '../../components/items';
import { useParams } from 'react-router-dom';

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
    const url = window.location.pathname;
    const currCategory = url.includes('category') ? url.split('/')[2] : 'all';
    const oldCurrCategory = prevState.currCategory;

    if (currCategory !== oldCurrCategory) {
      getCategoryItems(currCategory).then((result) => {
        const products = result.data.category.products;
        this.setState({
          products,
          currCategory: currCategory
        });
      });
    }
  }

  render() {
    return (
      <MainDivContainer>
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

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default withParams(Main);
