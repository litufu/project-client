import gql from 'graphql-tag';


const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    id
    name
    place{
        code
        name
    }
    content
    conditions{
        id
        skillName
        place
        partners{
            id
            name
            avatar{
                id
                url
            }
        }
        passedPartners{
            id
            name
            avatar{
                id
                url
            }
        }
    }
  }
`
export default PROJECT_FRAGMENT;