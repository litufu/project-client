import gql from 'graphql-tag'
import PROJECT_FRAGMENT from './project.fragment'

const GET_PROJECTS = gql`
  query Projects {
    projects {
      ...ProjectFragment   
      }
  }
  ${PROJECT_FRAGMENT}
`;

export default GET_PROJECTS;
