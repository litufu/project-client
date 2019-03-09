import gql from 'graphql-tag'
import PRODUCT_FRAGMENT from './product.fragment'

const GET_PRODUCTS = gql`
  query Products {
    products {
      ...ProductFragment   
      }
  }
  ${PRODUCT_FRAGMENT}
`;

export default GET_PRODUCTS;
