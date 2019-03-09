import gql from 'graphql-tag'

const FINDPASSWORDS = gql`
  {
    findPasswords{
        id
        times
        forgetter{
        id
        }
        remmember{
        id
        }
  }
  }
`;

export default FINDPASSWORDS;