import gql from "graphql-tag";

import PHOTO_FRAGMENT from './photo.fragment'

const POST_PHOTO = gql`
mutation PostPhoto(
  $uri: String!,
){
postPhoto(
    uri:$uri,
  ){
    ...PhotoFragment
  }
}
  ${PHOTO_FRAGMENT}
`;


export default POST_PHOTO;
