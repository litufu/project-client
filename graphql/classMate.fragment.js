import gql from 'graphql-tag';

const CLASSGROUP_FRAGMENT = gql`
  fragment ClassGroupFragment on ClassGroup {
    id
    student{
        id
    }
    status
    group{
       id 
    }
  }
`