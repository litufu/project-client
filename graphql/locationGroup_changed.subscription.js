import gql from 'graphql-tag';

const LOCATIONGROUP_CHANGED_SUBSCRIPTION = gql`
    subscription onLocationGroupChanged{
        locationGroupChanged{
            toId,
            groupId,
            userid,
            username,
            userAvatar,
            type,
        }
    }
`   

export default LOCATIONGROUP_CHANGED_SUBSCRIPTION;