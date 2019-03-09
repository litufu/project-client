import gql from 'graphql-tag'

const GET_NEWGRADEANDCLASSES = gql`
  {
    newGradeAndClasses @client{
      id
      grade
      className
    }
  }
`;

export default GET_NEWGRADEANDCLASSES;