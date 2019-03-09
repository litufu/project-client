import gql from 'graphql-tag';

const COLLEAGUES_ADDED_SUBSCRIPTION = gql`
    subscription onColleaguesAdded{
        colleaguesAdded{
            text
        }
    }
`   

export default COLLEAGUES_ADDED_SUBSCRIPTION;