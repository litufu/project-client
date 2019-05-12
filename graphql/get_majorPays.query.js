import gql from "graphql-tag";

import MAJORPAY_FRAGMENT from './majorPay.fragment'

const GET_MAJORPAYS = gql`
query MajorPays($first: Int!,$skip:Int!) {
    majorPays(first: $first,skip:$skip) {
      ... MajorPayFragment
    }
  }
  ${MAJORPAY_FRAGMENT}
`;

export default GET_MAJORPAYS;