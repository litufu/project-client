import gql from 'graphql-tag'
import USER_FRAGMENT from './user.fragment'

const GET_STUDENTS = gql`
  query Students($schoolEduId: String!) {
    students(schoolEduId: $schoolEduId) {
          id
          name
          username
          birthday
          gender
          avatar{
              id
              name
              url
          }
          birthplace{
              id
              name
          }
          residence{
              id
              name
          }
          studies{
              id
              school{
                  id
                  kind
                  name
              }
          }
          works{
              id
              company{
                  id
                  name
              }
          }
      }
  }
`;

export default GET_STUDENTS;
