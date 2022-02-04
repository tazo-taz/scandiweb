import { gql } from '@apollo/client';
import { client } from '../App';

export const getCurrencies = () =>
  client.query({
    query: gql`
      query {
        currencies {
          label
          symbol
        }
      }
    `
  });

export const getCategories = () =>
  client.query({
    query: gql`
      query {
        categories {
          name
        }
      }
    `
  });

export const getCategoryItems = (category) =>
  client.query({
    query: gql`
      query {
        category(input: { title: "${category}" }) {
          name
          products {
            name
            id
            inStock
            gallery
            description
            category
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
            brand
          }
        }
      }
    `
  });

export const getItem = (id) =>
  client.query({
    query: gql`
    query {
      product(id: "${id}"){
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    `
  });
