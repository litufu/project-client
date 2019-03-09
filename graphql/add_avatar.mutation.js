import gql from "graphql-tag";

import PHOTO_FRAGMENT from './photo.fragment'

const ADD_AVATAR = gql`
mutation AddAvatar(
  $uri: String!,
){
addAvatar(
    uri:$uri,
  ){
    ...PhotoFragment
  }
}
  ${PHOTO_FRAGMENT}
`;


export default ADD_AVATAR;
