import gql from "graphql-tag";
import FAMILY_FRAGMENT from './family.fragment'

import USER_FRAGMENT from './user.fragment'

const ADD_BASICKINFO = gql`
mutation AddBasicInfo(
  $name: String!,
  $gender: String!,
  $birthday:BirthdayInput!,
  $birthplace:PlaceInput!
  $residence:PlaceInput!

){
  addBasicInfo(
    name:$name,
    gender:$gender,
    birthday:$birthday,
    birthplace:$birthplace,
    residence:$residence
  ){
    families{
      ...FamilyFragment
    }
    ...UserFragment
  }
}
  ${FAMILY_FRAGMENT}
  ${USER_FRAGMENT}
`;


export default ADD_BASICKINFO;
