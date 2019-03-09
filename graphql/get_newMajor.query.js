import gql from 'graphql-tag'

const GET_NEWMAJOR = gql`
  {
    newMajor @client{
      id
      name
    }
  }
`;

export default GET_NEWMAJOR;