import gql from 'graphql-tag'

const GET_SEARCHNEWMAJOR = gql`
  {
    searchNewMajor @client{
      id
      name
    }
  }
`;

export default GET_SEARCHNEWMAJOR;