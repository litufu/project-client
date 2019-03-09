import gql from 'graphql-tag';

const FAMILY_CHANGED_SUBSCRIPTION = gql`
    subscription onFamilyChanged{
        familyChanged{
            text
        }
    }
`   

export default FAMILY_CHANGED_SUBSCRIPTION;