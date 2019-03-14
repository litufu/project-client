import gql from "graphql-tag";

import FEESETTING_FRAGMENT from './feeSetting.fragment'

const GET_FEESETTINGS = gql`
{
feeSettings {
    ...FeeSettingFragment
  }
}
${FEESETTING_FRAGMENT}
`;

export default GET_FEESETTINGS;