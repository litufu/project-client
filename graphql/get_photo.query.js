import gql from "graphql-tag";

import PHOTO_FRAGMENT from './photo.fragment'

const GET_PHOTO = gql`
query Photo(
    $id: String,
    $name:String
) {
photo(
    id: $id,
    name:$name
        ) {
      ... PhotoFragment
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default GET_PHOTO;