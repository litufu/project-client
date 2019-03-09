import gql from "graphql-tag";
import FAMILY_FRAGMENT from './family.fragment'

import USER_FRAGMENT from './user.fragment'


const GET_ME = gql`
{
  me {
    families{
      ...FamilyFragment
    }
    ...UserFragment
  }
}
${FAMILY_FRAGMENT}
${USER_FRAGMENT}

`;

export default GET_ME;
