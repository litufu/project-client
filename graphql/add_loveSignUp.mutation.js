import gql from "graphql-tag";

import LOVESIGNUP_FRAGMENT from './loveSignUp.fragment'

const ADD_UPDATE_LOVESIGNUP = gql`
mutation AddOrUpdateLoveSignUp{
    addOrUpdateLoveSignUp{
    ...LoveSignUpFragment
  }
}
  ${LOVESIGNUP_FRAGMENT}
`;


export default ADD_UPDATE_LOVESIGNUP;
