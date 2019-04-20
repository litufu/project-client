import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import {TouchableWithoutFeedback} from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_STUDENTS from '../../graphql/get_students.query'
import STUDENTS_ADDED_SUBSCRIPTION from '../../graphql/students_added.subscription'
import { defaultAvatar } from '../../utils/settings';

class QureyStudents extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: STUDENTS_ADDED_SUBSCRIPTION,
            updateQuery: (prev) => {
                refetch();
                return prev;
            },
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    _getMyGroups = (classGroups, myId) => {
        const myGroups = classGroups.filter(classGroup => {
          for (const member of classGroup.members) {
            if (member.student.id === myId && member.status === '1') {
              return true
            }
          }
          return false
        })
        if (myGroups.length > 0) {
          return myGroups
        }
        return []
      }
    
      _getMyWillGroups = (classGroups, myId) => {
        const myGroups = classGroups.filter(classGroup => {
          for (const member of classGroup.members) {
            if (member.student.id === myId && member.status === '0') {
              return true
            }
          }
          return false
        })
        if (myGroups.length > 0) {
          return myGroups
        }
        return []
      }

      _checkStudentInGroup = (myGroup, studentId) => {

        for (const member of myGroup.members) {
          if (member.student.id === studentId) {
            return member.status
          }
        }
        return '-1'
      }
    
      _checkStudentInWillGroup = (myWillGroups, studentId) => {
        for (const myWillGroup of myWillGroups) {
          for (const member of myWillGroup.members) {
            if (member.student.id === studentId && member.status === '1') {
              return '2'
            }
          }
        }
        return '-1'
      }

    render() {
        const { data: { students, loading, error } } = this.props;
        const { schoolEdu, schoolEduName, me, renderButton, classGroups } = this.props
        const myGroups = this._getMyGroups(classGroups, me.id)
        const myWillGroups = this._getMyWillGroups(classGroups,  me.id)
    
        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    students.map(student => {
                        return (
                            <ListItem 
                            thumbnail 
                            key={student.id}
                            onPress={()=>{
                                let studentStatus
                                if (myGroups.length > 0) {
                                  studentStatus = this._checkStudentInGroup(myGroups[0], student.id)
                                }
                                if (!(studentStatus === '1' || studentStatus === '0')) {
                                  studentStatus = this._checkStudentInWillGroup(myWillGroups, student.id)
                                }
                                if(studentStatus==="1"){
                                    this.props.navigation.navigate('UserProfile', { id: student.id })
                                }
                            }
                            }
                            >
                                <Left>
                                    <TouchableWithoutFeedback
                                    >
                                        <Thumbnail source={{ uri: student.avatar ? student.avatar.url : defaultAvatar }} />
                                    </TouchableWithoutFeedback>
                                </Left>
                                <Body>
                                    <Text>{student.name}</Text>
                                    <Text note numberOfLines={1}>{student.username}</Text>
                                </Body>
                                <Right>
                                    {
                                        student.id !== me.id && (
                                            renderButton(classGroups, student.id, me.id, schoolEdu.id, schoolEduName)
                                        )
                                    }
                                </Right>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
}


export default graphql(GET_STUDENTS, {
    options: (props) => ({
        variables: {
            schoolEduId: props.schoolEdu.id,
        },
        fetchPolicy: "cache-and-network",
    }),
})(QureyStudents)
