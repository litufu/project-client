import gql from 'graphql-tag';

const LOCATIONGROUPUSERS_CHANGED_SUBSCRIPTION = gql`
    subscription onLocationGroupUsersChanged{
        locationGroupUsersChanged{
            text
        }
    }
`   

export default LOCATIONGROUPUSERS_CHANGED_SUBSCRIPTION;