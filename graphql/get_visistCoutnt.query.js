import gql from 'graphql-tag'

const GET_VISITCOUNT = gql`
  {
    visitCount{
      userNum
      addNum
      visits
    }
  }
`;

export default GET_VISITCOUNT;