import gql from 'graphql-tag';

const EXAMBASICINFO_FRAGMENT = gql`
  fragment ExamBasicInfoFragment on CollegeEntranceExam {
    id
    province{
        id
        code
        name
    }
    subject
    culscore
    proscore
    candidatenum
    times
    student{
      id
      name
    }
  }
`
export default EXAMBASICINFO_FRAGMENT;
