import gql from "graphql-tag";

import PROJECT_FRAGMENT from './project.fragment'

const CREATE_PROJECT = gql`
mutation CreateProject($name: String!, $content: String!){
    createProject(name:$name,content:$content){
    ...ProjectFragment
  }
}
${PROJECT_FRAGMENT}
`

export default CREATE_PROJECT;