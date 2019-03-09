import gql from 'graphql-tag';

const SKILL_FRAGMENT = gql`
  fragment SkillFragment on Skill {
    id
    name
  }
`
export default SKILL_FRAGMENT;