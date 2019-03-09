import gql from 'graphql-tag';

const CLASSGROUP_CHANGED_SUBSCRIPTION = gql`
    subscription onClassGroupChanged{
        classGroupChanged{
            text
        }
    }
`   

export default CLASSGROUP_CHANGED_SUBSCRIPTION;