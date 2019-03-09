import gql from 'graphql-tag'
import USER_FRAGMENT from './user.fragment'

const GET_STUDENTS = gql`
  query Students($schoolEduId: String!) {
    students(schoolEduId: $schoolEduId) {
      ...UserFragment   
      }
  }
  ${USER_FRAGMENT}
`;

export default GET_STUDENTS;
