import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { graphql, compose, withApollo } from 'react-apollo';
import React, { Component } from 'react';
import { map } from 'lodash';
import update from 'immutability-helper';

import { Spinner } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import { wsClient } from '../apollo'

import GET_ME from '../graphql/get_me.query'
import GET_CLASSGROUPS from '../graphql/get_classGroups.query'
import GET_WORKGROUPS from '../graphql/get_workGroups.query'
import GET_LOCATIONGROUPS from '../graphql/get_locationGroups.query'
import GET_FAMILYGROUPS from '../graphql/get_familyGroups.query'
import GET_FAMILIES from '../graphql/get_families.query'

import MESSAGE_ADDED_SUBSCRIPTION from '../graphql/message_added.subscription'
import FAMILYGROUP_CHANGED_SUBSCRIPTION from '../graphql/familyGroup_changed.subscription'
import GROUPMESSAGE_ADDED_SUBSCRIPTION from '../graphql/groupMessage_added.subscription'
import CLASSGROUP_CHANGED_SUBSCRIPTION from '../graphql/classGroup_changed.subscription'
import WORKGROUP_CHANGED_SUBSCRIPTION from '../graphql/workGroup_changed.subscription'
import LOCATIONGROUP_CHANGED_SUBSCRIPTION from '../graphql/locationGroup_changed.subscription'
import FAMILY_CHANGED_SUBSCRIPTION from '../graphql/family_changed.subscription'

import Group from '../screens/Group'
import Home from '../screens/MyHome'
import Profile from '../screens/Profile'

// 引入home
//1、高考
import CollegeEntranceExam from '../Components/CollegeEntranceExam'
import QueryExamBasicInfo from '../Components/CollegeEntranceExam/QueryExamBasicInfo'
import UniversityAndMajor from '../Components/CollegeEntranceExam/UniversityAndMajor'
import SearchMajor from '../Components/CollegeEntranceExam/SearchMajor'
import SelectUniversity from '../Components/CollegeEntranceExam/SelectUniversity'
import QueryResult from '../Components/CollegeEntranceExam/QueryResult'
import Applicants from '../Components/CollegeEntranceExam/Applicants'
import Guide from '../Components/CollegeEntranceExam/Guide'
import FillForm from '../Components/CollegeEntranceExam/FillForm'
import MajorPay from '../Components/CollegeEntranceExam/MajorPay'
import MajorTest from '../Components/CollegeEntranceExam/MajorTest'

// 3、同城热恋
import FallInLove from '../Components/FallInLove'
import FallInLoveSettings from '../Components/FallInLove/Settings'
import FallInLoveRules from '../Components/FallInLove/Rules'
// 4、创业组团
import FoundTeam from '../Components/FoundTeam'
import SkillSetting from '../Components/FoundTeam/SkillSetting'
import AddPartner from '../Components/FoundTeam/AddPartner'
import ProjectIntroduce from '../Components/FoundTeam/ProjectIntroduce'
// 5、一起玩耍
import Activity from '../Components/Activity'
import ActivityDetail from '../Components/Activity/ActivityDetail'
import ActivityList from '../Components/Activity/ActivityList'
import CreateActivity from '../Components/Activity/CreateActivity'
import MyActivities from '../Components/Activity/MyActivities'
import ActivityRules from '../Components/Activity/ActivityRules'
import Members from '../Components/Activity/Members'

// 引入group
import FamilyGroup from '../Components/Groups/FamilyGroup'
import ClassGroup from '../Components/Groups/ClassGroup'
import LocationGroup from '../Components/Groups/LocationGroup'
import WorkGroup from '../Components/Groups/WorkGroup'
import FamilyContent from '../Components/Groups/FamilyContent'
import FamilyList from '../Components/Groups/FamilyList'
import ClassContent from '../Components/Groups/ClassContent'
import ClassList from '../Components/Groups/ClassList'
import WorkContent from '../Components/Groups/WorkContent'
import WorkList from '../Components/Groups/WorkList'
import OldWorkList from '../Components/Groups/OldWorkList'
import LocationContent from '../Components/Groups/LocationContent'
import LocationList from '../Components/Groups/LocationList'
import Chat from '../Components/Chat'
import ChatSettings from '../Components/Chat/Settings'
import GroupChat from '../Components/GroupChat'
import GroupChatSettings from '../Components/GroupChat/Settings'

// 引入profile
import UserProfile from '../Components/UserProfile'
import ChangePassword from '../Components/ChangePassword'
import BasicInfo from '../Components/BasicInfo'
import Region from '../Components/Region'
import MyDatetime from '../Components/MyDatetime'
import FamilyRelationship from '../Components/FamilyRelationship'
import StudyHistroy from '../Components/StudyHistroy'
import Work from '../Components/Work'
import AddFamily from '../Components/Family/AddFamily'
import SearchFamily from '../Components/SearchFamily'
import SelectSchool from '../Components/StudyHistroy/SelectSchool'
import SelectMajor from '../Components/StudyHistroy/SelectMajor'
import SelectClass from '../Components/StudyHistroy/SelectClass'
import CreateClass from '../Components/StudyHistroy/CreateClass'
import Events from '../Components/StudyHistroy/Events'
import Study from '../Components/StudyHistroy/Study'
import MyIcon from '../Components/MyIcon'
import AddPhoto from '../Components/AddPhoto'
import Settings from '../Components/Settings'
import FindPassword from '../Components/FindPassword'
import Product from '../Components/Product'
import Trade from '../Components/Trade'
import Pay from '../Components/Pay'
import Help from '../Components/Help'

import { storeMessage, retrieveMessages } from '../utils/tools'

const HomeNavigation = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        CollegeEntranceExam: {
            screen: CollegeEntranceExam,
        },
        QueryExamBasicInfo: {
            screen: QueryExamBasicInfo
        },
        UniversityAndMajor: {
            screen: UniversityAndMajor
        },
        SearchMajor: {
            screen: SearchMajor
        },
        SelectUniversity: {
            screen: SelectUniversity
        },
        QueryResult: {
            screen: QueryResult
        },
        Applicants: {
            screen: Applicants
        },
        Guide: {
            screen: Guide
        },
        FillForm: {
            screen: FillForm
        },
        MajorPay: {
            screen: MajorPay
        },
        MajorTest: {
            screen: MajorTest
        },
        Chat: {
            screen: Chat,
        },
        GroupChat: {
            screen: GroupChat,
        },
        ChatSettings: {
            screen: ChatSettings,
        },
        GroupChatSettings: {
            screen: GroupChatSettings,
        },
        UserProfile: {
            screen: UserProfile,
        },
        FallInLove: {
            screen: FallInLove,
        },
        FallInLoveSettings: {
            screen: FallInLoveSettings,
        },
        FallInLoveRules: {
            screen: FallInLoveRules,
        },
        FoundTeam: {
            screen: FoundTeam,
        },
        SkillSetting: {
            screen: SkillSetting,
        },
        AddPartner: {
            screen: AddPartner,
        },
        ProjectIntroduce: {
            screen: ProjectIntroduce,
        },
        Activity: {
            screen: Activity,
        },
        ActivityDetail: {
            screen: ActivityDetail,
        },
        ActivityList: {
            screen: ActivityList,
        },
        CreateActivity: {
            screen: CreateActivity,
        },
        MyActivities: {
            screen: MyActivities,
        },
        ActivityRules: {
            screen: ActivityRules,
        },
        Members: {
            screen: Members,
        }
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            header: null
        },
    }
)


const GroupNavigation = createStackNavigator(
    {
        Group: {
            screen: Group,
        },
        FamilyGroup: {
            screen: FamilyGroup,
        },
        ClassGroup: {
            screen: ClassGroup,
        },
        LocationGroup: {
            screen: LocationGroup,
        },
        WorkGroup: {
            screen: WorkGroup,
        },
        FamilyList: {
            screen: FamilyList,
        },
        FamilyContent: {
            screen: FamilyContent,
        },
        ClassContent: {
            screen: ClassContent,
        },
        ClassList: {
            screen: ClassList,
        },
        WorkContent: {
            screen: WorkContent,
        },
        WorkList: {
            screen: WorkList,
        },
        OldWorkList: {
            screen: OldWorkList,
        },
        LocationContent: {
            screen: LocationContent,
        },
        LocationList: {
            screen: LocationList,
        },
        Chat: {
            screen: Chat,
        },
        GroupChat: {
            screen: GroupChat,
        },
        ChatSettings: {
            screen: ChatSettings,
        },
        GroupChatSettings: {
            screen: GroupChatSettings,
        },
        UserProfile: {
            screen: UserProfile,
        },

    },
    {
        initialRouteName: "Group",
        navigationOptions: {
            header: null
        },
    }
)

const ProfileNavigation = createStackNavigator(
    {
        Profile: {
            screen: Profile,
        },
        ChangePassword: {
            screen: ChangePassword,
        },
        BasicInfo: {
            screen: BasicInfo,
        },
        StudyHistroy: {
            screen: StudyHistroy,
        },
        Work: {
            screen: Work,
        },
        SelectSchool: {
            screen: SelectSchool,
        },
        SelectMajor: {
            screen: SelectMajor,
        },
        CreateClass: {
            screen: CreateClass,
        },
        Events: {
            screen: Events,
        },
        Study: {
            screen: Study,
        },
        SelectClass: {
            screen: SelectClass,
        },
        FamilyRelationship: {
            screen: FamilyRelationship,
        },
        AddFamily: {
            screen: AddFamily,
        },
        SearchFamily: {
            screen: SearchFamily,
        },
        Region: {
            screen: Region,
        },
        MyDatetime: {
            screen: MyDatetime,
        },
        MyIcon: {
            screen: MyIcon,
        },
        AddPhoto: {
            screen: AddPhoto,
        },
        UserProfile: {
            screen: UserProfile,
        },
        Chat: {
            screen: Chat,
        },
        ChatSettings: {
            screen: ChatSettings,
        },
        Settings: {
            screen: Settings,
        },
        FindPassword: {
            screen: FindPassword,
        },
        Product: {
            screen: Product,
        },
        Trade: {
            screen: Trade,
        },
        Pay: {
            screen: Pay,
        },
        Help: {
            screen: Help,
        }
    },
    {
        initialRouteName: "Profile",
        navigationOptions: {
            header: null
        },
    }
)

const AppNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigation
        },
        Group: {
            screen: GroupNavigation
        },
        Profile: {
            screen: ProfileNavigation
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'md-home';
                } else if (routeName === 'Group') {
                    iconName = 'md-people';
                } else if (routeName === 'Profile') {
                    iconName = 'md-person';
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            showLabel: false,
        },
    }
)

class AppWithNavigationState extends Component {
    static router = AppNavigator.router;
    static navigationOptions = {
        header: null,
    };

    // async componentDidMount() {
    //     const { subscribeToMore, client } = this.props;
    //     if (!this.familyGroupSubscription) {
    //         this.familyGroupSubscription = await subscribeToMore({
    //             document: FAMILYGROUP_CHANGED_SUBSCRIPTION,
    //             updateQuery: (prev) => {
    //                 client.query({
    //                     query: GET_FAMILYGROUPS,
    //                     fetchPolicy: "network-only"
    //                 }).then(({ data }) => {
    //                     const newMe = {
    //                         ...prev.me,
    //                         relativefamilyGroups: data.getFamilyGroups
    //                     }
    //                     const result = { ...prev, me: newMe }
    //                     return result
    //                 });
    //             },
    //         });
    //     }

    //     if (!this.classGroupSubscription) {
    //         this.classGroupSubscription = await subscribeToMore({
    //             document: CLASSGROUP_CHANGED_SUBSCRIPTION,
    //             updateQuery: (prev) => {
    //                 client.query({
    //                     query: GET_CLASSGROUPS,
    //                     fetchPolicy: "network-only"
    //                 }).then(({ data }) => {
    //                     const newMe = {
    //                         ...prev.me,
    //                         classGroups: data.classGroups
    //                     }
    //                     const result = { ...prev, me: newMe }
    //                     return result
    //                 });
    //             },
    //         });
    //     }

    //     if (!this.workGroupSubscription) {
    //         this.workGroupSubscription = await subscribeToMore({
    //             document: WORKGROUP_CHANGED_SUBSCRIPTION,
    //             updateQuery: (prev) => {
    //                 client.query({
    //                     query: GET_WORKGROUPS,
    //                     fetchPolicy: "network-only"
    //                 }).then(({ data }) => {
    //                     const newMe = {
    //                         ...prev.me,
    //                         workGroups: data.workGroups
    //                     }
    //                     const result = { ...prev, me: newMe }
    //                     return result
    //                 });
    //             },
    //         });
    //     }

    //     if (!this.locationGroupSubscription) {
    //         this.locationGroupSubscription = await subscribeToMore({
    //             document: LOCATIONGROUP_CHANGED_SUBSCRIPTION,
    //             updateQuery: (prev) => {
    //                 client.query({
    //                     query: GET_LOCATIONGROUPS,
    //                     fetchPolicy: "network-only"
    //                 }).then(({ data }) => {
    //                     const newMe = {
    //                         ...prev.me,
    //                         locationGroups: data.locationGroups
    //                     }
    //                     const result = { ...prev, me: newMe }
    //                     return result
    //                 });
    //             },
    //         });
    //     }

    //     if (!this.familyChangeSubscription) {
    //         console.log('familychanged')
    //         this.familyChangeSubscription = await subscribeToMore({
    //             document: FAMILY_CHANGED_SUBSCRIPTION,
    //             updateQuery: (prev) => {
    //                 client.query({
    //                     query: GET_FAMILIES,
    //                     fetchPolicy: "network-only"
    //                 }).then(({ data }) => {
    //                     const newMe = {
    //                         ...prev.me,
    //                         families: data.families
    //                     }
    //                     console.log('newMe', newMe)
    //                     const result = { ...prev, me: newMe }
    //                     return result
    //                 });
    //             },
    //         });
    //     }
    // }

    // componentWillUnmount() {


    // }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.me) {
            //   如果新的props当中没有me，则取消订阅
            if (this.messagesSubscription) {
                this.messagesSubscription();
            }

            if (this.groupMessagesSubscription) {
                this.groupMessagesSubscription()
            }

            if (this.familyGroupSubscription) {
                this.familyGroupSubscription();
            }
            if (this.locationGroupSubscription) {
                this.locationGroupSubscription()
            }
            if (this.workGroupSubscription) {
                this.workGroupSubscription()
            }
            if (this.classGroupSubscription) {
                this.classGroupSubscription()
            }
            if (this.familyChangeSubscription) {
                this.familyChangeSubscription()
            }

            // clear the event subscription
            // 关闭连接
            if (this.reconnected) {
                this.reconnected();
            }
        } else if (!this.reconnected) {
            //   重新连接，检查数据完整性。
            this.reconnected = wsClient.onReconnected(() => {
                this.props.refetch(); // check for any data lost during disconnect
            }, this);
        }

        const { subscribeToMore, client } = nextProps;
        if (!this.familyGroupSubscription) {
            this.familyGroupSubscription = subscribeToMore({
                document: FAMILYGROUP_CHANGED_SUBSCRIPTION,
                updateQuery: (prev) => {
                    // client.query({
                    //     query: GET_FAMILYGROUPS,
                    //     fetchPolicy: "network-only"
                    // }).then(({ data }) => {
                    //     const newMe = {
                    //         ...prev.me,
                    //         relativefamilyGroups: data.getFamilyGroups
                    //     }
                    //     console.log('relativefamilyGroup-newMe',newMe)
                    //     const result = { ...prev, me: newMe }
                    //     return result
                    // });
                    this.props.refetch()
                    return prev
                },
            });
        }

        if (!this.classGroupSubscription) {
            this.classGroupSubscription = subscribeToMore({
                document: CLASSGROUP_CHANGED_SUBSCRIPTION,
                updateQuery: (prev) => {
                    // client.query({
                    //     query: GET_CLASSGROUPS,
                    //     fetchPolicy: "network-only"
                    // }).then(({ data }) => {
                    //     const newMe = {
                    //         ...prev.me,
                    //         classGroups: data.classGroups
                    //     }
                    //     const result = { ...prev, me: newMe }
                    //     return result
                    // });
                    this.props.refetch()
                    return prev
                },
            });
        }

        if (!this.workGroupSubscription) {
            this.workGroupSubscription = subscribeToMore({
                document: WORKGROUP_CHANGED_SUBSCRIPTION,
                updateQuery: (prev) => {
                    // client.query({
                    //     query: GET_WORKGROUPS,
                    //     fetchPolicy: "network-only"
                    // }).then(({ data }) => {
                    //     const newMe = {
                    //         ...prev.me,
                    //         workGroups: data.workGroups
                    //     }

                    //     const result = { ...prev, me: newMe }
                    //     return result
                    // });
                    this.props.refetch()
                    return prev
                },
            });
        }

        if (!this.locationGroupSubscription) {
            this.locationGroupSubscription = subscribeToMore({
                document: LOCATIONGROUP_CHANGED_SUBSCRIPTION,
                updateQuery: (prev) => {
                    // client.query({
                    //     query: GET_LOCATIONGROUPS,
                    //     fetchPolicy: "network-only"
                    // }).then(({ data }) => {
                    //     const newMe = {
                    //         ...prev.me,
                    //         locationGroups: data.locationGroups
                    //     }
                    //     const result = { ...prev, me: newMe }
                    //     return result
                    // });
                    this.props.refetch()
                    return prev
                },
            });
        }

        if (!this.familyChangeSubscription) {
            this.familyChangeSubscription = subscribeToMore({
                document: FAMILY_CHANGED_SUBSCRIPTION,
                updateQuery: (prev) => {
                    // client.query({
                    //     query: GET_FAMILIES,
                    //     fetchPolicy: "network-only"
                    // }).then(({ data }) => {
                    //     const newMe = {
                    //         ...prev.me,
                    //         families: data.families
                    //     }
                    //     console.log('newMe', newMe)
                    //     const result = { ...prev, me: newMe }
                    this.props.refetch()
                    return prev
                    // });
                },
            });
        }

        if(!this.messagesSubscription){
            this.messagesSubscription = nextProps.subscribeToMore({
                document: MESSAGE_ADDED_SUBSCRIPTION,
                variables: { userId: nextProps.me.id },
                updateQuery: (prev, { subscriptionData }) => {
                    const newMessage = subscriptionData.data.messageAdded;
                    prev.me.messages.push(newMessage)
                    storeMessage(`${prev.me.id}User${newMessage.from.id}`, newMessage)
                    return prev
                },
            });
        }
      
        let groupIds
        let thisGroupIds
        let equal
        if(nextProps.me){
            groupIds = map(nextProps.me.relativefamilyGroups, 'id'
            ).concat(
                map(nextProps.me.classGroups, 'id')
            ).concat(
                map(nextProps.me.locationGroups, 'id')
            ).concat(
                map(nextProps.me.workGroups, 'id')
            ).concat(
                map(nextProps.me.activities, 'id')
            )

            if (nextProps.me.regStatus) {
                groupIds.push(nextProps.me.regStatus.id)
            }
        }
        
       
        if(this.props.me){
            thisGroupIds = map(this.props.me.relativefamilyGroups, 'id'
            ).concat(
                map(this.props.me.classGroups, 'id')
            ).concat(
                map(this.props.me.locationGroups, 'id')
            ).concat(
                map(this.props.me.workGroups, 'id')
            ).concat(
                map(this.props.me.activities, 'id')
            )
            if (this.props.me.regStatus) {
                thisGroupIds.push(this.props.me.regStatus.id)
            }
        }

        if(groupIds instanceof Array && thisGroupIds instanceof Array){
            if(groupIds.sort().toString()== thisGroupIds.sort().toString()){
                equal = true
            }
        }

        if (!this.groupMessagesSubscription || !equal ) {
            this.groupMessagesSubscription = nextProps.subscribeToMore({
                document: GROUPMESSAGE_ADDED_SUBSCRIPTION,
                variables: {
                    userId: nextProps.me.id,
                    groupIds,
                },
                updateQuery: (prev, { subscriptionData }) => {
                    const newMessage = subscriptionData.data.gMessageAdded;
                    console.log('newMessage',newMessage)
                    if (newMessage.type === 'Family') {
                        const index = prev.me.relativefamilyGroups.map(group => group.id).indexOf(newMessage.to)
                        const result = update(prev, {
                            me: {
                                relativefamilyGroups: relativefamilyGroups =>
                                    update(relativefamilyGroups || [], {
                                        [index]: group =>
                                            update(group || {}, {
                                                messages: messages => update(messages || [], { $push: [newMessage] })
                                            })
                                    })
                            }

                        });
                        storeMessage(`${prev.me.id}Family${newMessage.to}`, newMessage)
                        return result
                    } else if (newMessage.type === 'ClassMate') {
                        const index = prev.me.classGroups.map(group => group.id).indexOf(newMessage.to)
                        const result = update(prev, {
                            me: {
                                classGroups: classGroups =>
                                    update(classGroups || [], {
                                        [index]: group =>
                                            update(group || {}, {
                                                messages: messages => update(messages || [], { $push: [newMessage] })
                                            })
                                    })
                            }

                        });
                        storeMessage(`${prev.me.id}ClassMate${newMessage.to}`, newMessage)
                        return result

                    } else if (newMessage.type === 'Colleague') {
                        const index = prev.me.workGroups.map(group => group.id).indexOf(newMessage.to)
                        const result = update(prev, {
                            me: {
                                workGroups: workGroups =>
                                    update(workGroups || [], {
                                        [index]: group =>
                                            update(group || {}, {
                                                messages: messages => update(messages || [], { $push: [newMessage] })
                                            })
                                    })
                            }

                        });
                        storeMessage(`${prev.me.id}Colleague${newMessage.to}`, newMessage)
                        return result
                    } else if (newMessage.type === 'FellowTownsman') {
                        const index = prev.me.locationGroups.map(group => group.id).indexOf(newMessage.to)
                        const result = update(prev, {
                            me: {
                                locationGroups: locationGroups =>
                                    update(locationGroups || [], {
                                        [index]: group =>
                                            update(group || {}, {
                                                messages: messages => update(messages || [], { $push: [newMessage] })
                                            })
                                    })
                            }

                        });
                        storeMessage(`${prev.me.id}FellowTownsman${newMessage.to}`, newMessage)
                        return result
                    } else if (newMessage.type === 'RegStatus') {
                        if (prev.me.regStatus.id === newMessage.to) {
                            const result = update(prev, {
                                me: {
                                    regStatus: {
                                        messages: { $push: [newMessage] }
                                    }
                                }
                            })
                            storeMessage(`${prev.me.id}RegStatus${newMessage.to}`, newMessage)
                            return result
                        }
                        return prev
                    } else if (newMessage.type === 'Activity') {
                        const index = prev.me.activities.map(group => group.id).indexOf(newMessage.to)
                        const result = update(prev, {
                            me: {
                                activities: activities =>
                                    update(activities || [], {
                                        [index]: group =>
                                            update(group || {}, {
                                                messages: messages => update(messages || [], { $push: [newMessage] })
                                            })
                                    })
                            }

                        });
                        storeMessage(`${prev.me.id}Activity${newMessage.to}`, newMessage)
                        return result
                    }
                },
            });
        }
    }

    render() {
        if (this.props.loading) return <Spinner />
        if (this.props.error) return <Text>{"error"}</Text>
        return (
            <AppNavigator navigation={this.props.navigation} />
        );
    }
}

export default compose(
    withApollo,
    graphql(GET_ME, {
        props: ({ data: { loading, me, refetch, subscribeToMore } }) => ({ loading, me, refetch, subscribeToMore })
    }),
)(AppWithNavigationState);
