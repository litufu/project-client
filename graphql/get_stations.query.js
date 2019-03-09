import gql from 'graphql-tag'

const GET_STATIONS = gql`
  query Stations($text: String!) {
    stations(text: $text) {
      id
      code
      name    }
  }
`;

export default GET_STATIONS;
