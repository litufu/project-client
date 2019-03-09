import gql from "graphql-tag";

import SKILL_FRAGMENT from './skill.fragment'

const ADD_SKILL = gql`
mutation AddSkill(
  $name:String!
){
addSkill(
    name:$name
  ){
    ...SkillFragment
  }
}
  ${SKILL_FRAGMENT}
`;


export default ADD_SKILL;
