import gql from 'graphql-tag'

const GET_STREETS = gql`
  query Streets($code: String!) {
    streets(code: $code) {
      code
      name    }
  }
`;

export default GET_STREETS;
