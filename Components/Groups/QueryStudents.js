import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_STUDENTS from '../../graphql/get_students.query'
import STUDENTS_ADDED_SUBSCRIPTION from '../../graphql/students_added.subscription'

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

    render() {
        const { data: { students, loading, error } } = this.props;
        const {schoolEdu,schoolEduName,me,renderButton,classGroups} = this.props

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <List>
                {
                    students.map(student => {
                        return (
                            <ListItem thumbnail key={student.id}>
                                <Left>
                                    <Avatar
                                        medium
                                        overlayContainerStyle={{ backgroundColor: "blue" }}
                                        title="水滴"
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}
                                    />
                                </Left>
                                <Body>
                                    <Text>{student.name}</Text>
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
        fetchPolicy:"cache-and-network",
    }),
})(QureyStudents)
