import gql from 'graphql-tag';

const LOVESIGNUP_FRAGMENT = gql`
  fragment LoveSignUpFragment on LoveSignUp {
    id
    period
    city{
        code
        name
    }
    person{
        id
    }
  }
`
export default LOVESIGNUP_FRAGMENT;