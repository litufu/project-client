import gql from 'graphql-tag';


const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    subject
    info
    price
  }
`
export default PRODUCT_FRAGMENT;