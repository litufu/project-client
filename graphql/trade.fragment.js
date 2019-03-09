import gql from 'graphql-tag';
import PRODUCT_FRAGMENT from './product.fragment'

const TRADE_FRAGMENT = gql`
  fragment TradeFragment on Trade {
    id
    number
    product{
        ...ProductFragment
    }
    amount
    user{
        id
    }
    signedStr
  }
  ${PRODUCT_FRAGMENT}
`
export default TRADE_FRAGMENT;