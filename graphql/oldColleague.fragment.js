import gql from 'graphql-tag';


const OLDCOLLEAGUE_FRAGMENT = gql`
  fragment OldColleagueFragment on OldColleague {
    id
    from{
        id
    }
    to{
        id
        name
        avatar{
            id
            url
        }
    }
    company{
        id
        name
    }
    status
  }
`
export default OLDCOLLEAGUE_FRAGMENT;