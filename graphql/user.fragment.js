import gql from 'graphql-tag';

import SCHOOLEDU_FRAGMENT from './schooledu.fragment'
import WORK_FRAGMENT from './work.fragment'
import EXAMBASICINFO_FRAGMENT from './exam_basicInfo.fragment'
import REGSTATUS_FRAGMENT from './regStatus.fragment'
import LOCATION_FRAGMENT from './Location.fragment'
import LOCATIONGROUP_FRAGMENT from './locationGroup.fragment'
import PHOTO_FRAGMENT from './photo.fragment'
import Message_FRAGMENT from './message.fragment'
import GROUP_MESSAGE_FRAGMENT from './groupMessage.fragment'
import FAMILYGROUP_FRAGMENT from './familyGroup.fragment'
import CLASSGROUP_FRAGMENT from './classGroup.fragment'
import WORKGROUP_FRAGMENT from './workGroup.fragment'
import LOVESETTING_FRAGMENT from './loveSetting.fragment'
import LOVESIGNUP_FRAGMENT  from './loveSignUp.fragment'
import SKILL_FRAGMENT from './skill.fragment'

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    username
    gender
    avatar{
      ...PhotoFragment
    }
    birthdaycalendar
    birthday
    birthplace{
      ...LocationFragment
    }
    residence{
      ...LocationFragment
    }
    studies{
      ...SchoolEduFragment
    }
    works{
      ...WorkFragment
    }
    exam{
      ...ExamBasicInfoFragment
    }
    regStatus{
      ...RegStatusFragment
    }
    locationGroups{
      ...LocationGroupFragment
    }
    messages{
      ...MessageFragment
    }
    groupMessages{
      ...GroupMessageFragment
    }
    relativefamilyGroups{
      ...FamilyGroupFragment
    }
    classGroups{
      ...ClassGroupFragment
    }
    workGroups{
      ...WorkGroupFragment
    },
    loveSetting{
      ...LoveSettingFragment
    },
    signUpLove{
      ...LoveSignUpFragment
    },
    skills{
      ...SkillFragment
    },
 }
 ${PHOTO_FRAGMENT}
 ${LOCATION_FRAGMENT}
 ${LOCATION_FRAGMENT}
 ${SCHOOLEDU_FRAGMENT}
 ${WORK_FRAGMENT}
 ${EXAMBASICINFO_FRAGMENT}
 ${REGSTATUS_FRAGMENT}
 ${LOCATIONGROUP_FRAGMENT}
 ${Message_FRAGMENT}
 ${GROUP_MESSAGE_FRAGMENT}
 ${FAMILYGROUP_FRAGMENT}
 ${CLASSGROUP_FRAGMENT}
 ${WORKGROUP_FRAGMENT}
 ${LOVESETTING_FRAGMENT}
 ${LOVESIGNUP_FRAGMENT}
 ${SKILL_FRAGMENT}
`
export default USER_FRAGMENT;
