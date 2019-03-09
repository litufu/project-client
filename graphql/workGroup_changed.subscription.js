import gql from 'graphql-tag';

const WORKGROUP_CHANGED_SUBSCRIPTION = gql`
    subscription onWorkGroupChanged{
        workGroupChanged{
            text
        }
    }
`   

export default WORKGROUP_CHANGED_SUBSCRIPTION;