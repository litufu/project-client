import gql from 'graphql-tag';

const COMPANY_FRAGMENT = gql`
  fragment CompanyFragment on Company {
    id
    name
  }
`
export default COMPANY_FRAGMENT;
