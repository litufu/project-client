import gql from 'graphql-tag';

const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    name
    url
  }
`
export default PHOTO_FRAGMENT;
