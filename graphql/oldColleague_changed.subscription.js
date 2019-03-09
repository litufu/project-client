import gql from 'graphql-tag';

const OLDCOLLEAGUE_CHANGED_SUBSCRIPTION = gql`
    subscription onMyOldcolleaguesChanged{
        myOldcolleaguesChanged{
            text
        }
    }
`   

export default OLDCOLLEAGUE_CHANGED_SUBSCRIPTION;