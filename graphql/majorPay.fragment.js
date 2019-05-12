import gql from 'graphql-tag';

const MAJORPAY_FRAGMENT = gql`
  fragment MajorPayFragment on MajorPay {
    id
    median
    majorCn
    majorEn
    early
  }
`
export default MAJORPAY_FRAGMENT;