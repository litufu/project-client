import gql from 'graphql-tag'

const GET_SEARCHNEWUNIVERSITY = gql`
  {
    searchNewUniversity @client{
      id
      name
    }
  }
`;

export default GET_SEARCHNEWUNIVERSITY;