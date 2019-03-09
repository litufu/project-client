import gql from 'graphql-tag';

const FAMILYGROUP_CHANGED_SUBSCRIPTION = gql`
    subscription onFamilyGroupChanged{
        familyGroupChanged{
            text
        }
    }
`   

export default FAMILYGROUP_CHANGED_SUBSCRIPTION;