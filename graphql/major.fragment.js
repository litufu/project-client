import gql from 'graphql-tag';

const MAJOR_FRAGMENT = gql`
  fragment MajorFragment on Major {
    id
    name
    category
    education
  }
`
export default MAJOR_FRAGMENT;