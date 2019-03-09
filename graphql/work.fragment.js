import gql from 'graphql-tag';

import COMPANY_FRAGMENT from './company.fragment'

const WORK_FRAGMENT = gql`
  fragment WorkFragment on Work {
    id
    startTime
    endTime
    department
    post{
      id
      name
    }
    company{
      ...CompanyFragment
    }
    worker{
      id
    }
  }
  ${COMPANY_FRAGMENT}
`
export default WORK_FRAGMENT;
