import gql from 'graphql-tag';

import LOVESETTING_FRAGMENT from './loveSetting.fragment'

const LOVEMATCHING_FRAGMENT = gql`
  fragment LoveMatchingFragment on LoveMatching {
    id
    period
    city{
        code
        name
    }
    woman{
        id
        name
        avatar{
            id
            url
        }
        loveSetting{
            ...LoveSettingFragment
        },

    }
    man{
        id
        name
        avatar{
            id
            url
        }
        loveSetting{
            ...LoveSettingFragment
        },
    }
  }
  ${LOVESETTING_FRAGMENT}
  ${LOVESETTING_FRAGMENT}
`
export default LOVEMATCHING_FRAGMENT;