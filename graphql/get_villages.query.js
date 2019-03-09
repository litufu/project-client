import gql from 'graphql-tag'

const GET_VILLAGES = gql`
  query Village($code: String!) {
    villages(code: $code) {
      code
      name    }
  }
`;

export default GET_VILLAGES;
