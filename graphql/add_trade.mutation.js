import gql from "graphql-tag";
import TRADE_FRAGMENT from './trade.fragment'

const ADD_TRADE = gql`
mutation NewTrade(
  $productId: String!,
  $number:Int,
  $amount:Float
){
newTrade(
    productId:$productId,
    number:$number,
    amount:$amount,
  ){
    ...TradeFragment
  }
}
${TRADE_FRAGMENT}
`;


export default ADD_TRADE;