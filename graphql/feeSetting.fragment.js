import gql from 'graphql-tag';

const FEESETTING_FRAGMENT = gql`
  fragment FeeSettingFragment on FeeSetting {
    id
    name
    fee
  }
`
export default FEESETTING_FRAGMENT;
