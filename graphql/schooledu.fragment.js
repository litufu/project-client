import gql from 'graphql-tag';
import SCHOOL_FRAGMENT from './school.fragment'
const SCHOOLEDU_FRAGMENT = gql`
  fragment SchoolEduFragment on SchoolEdu {
    id
    school{
        ...SchoolFragment
    }
    startTime
    major{
        id
        name
    }
    grade
    className
    students{
      id
      name
      avatar{
        id
        name
        url
      }
    }
  }
  ${SCHOOL_FRAGMENT}
`
export default SCHOOLEDU_FRAGMENT;
