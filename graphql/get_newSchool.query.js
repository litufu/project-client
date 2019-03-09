import gql from 'graphql-tag'

const GET_NEWSCHOOL = gql`
  {
    newSchool @client{
      id
      name
    }
  }
`;

export default GET_NEWSCHOOL;