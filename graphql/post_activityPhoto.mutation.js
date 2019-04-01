import gql from "graphql-tag";

import PHOTO_FRAGMENT from './photo.fragment'

const POST_ACTIVITYPHOTO = gql`
mutation PostActivityPhoto(
  $uri: String!,
){
postActivityPhoto(
    uri:$uri,
  ){
    ...PhotoFragment
  }
}
  ${PHOTO_FRAGMENT}
`;


export default POST_ACTIVITYPHOTO;
