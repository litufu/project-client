import gql from 'graphql-tag'

const GET_SKILLS = gql`
  query Skills($name:String) {
    skills(name:$name) {
      id
      name
    }
  }
`;

export default GET_SKILLS;
