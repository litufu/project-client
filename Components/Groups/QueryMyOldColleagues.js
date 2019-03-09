import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_MYOLDCOLLEAGUES from '../../graphql/get_myOldColleagues.query'
import OLDCOLLEAGUE_CHANGED_SUBSCRIPTION from '../../graphql/oldColleague_changed.subscription'
import QueryOldColleagues from './QueryOldColleagues'


class QueryMyOldColleagues extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: OLDCOLLEAGUE_CHANGED_SUBSCRIPTION,
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
        const { data: { myOldColleagues, loading, error } } = this.props;
        const {work,me,renderButton} = this.props

        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>

        return (
            <QueryOldColleagues 
            work={work}
            me={me}
            renderButton={renderButton}
            myOldColleagues={myOldColleagues}
            />
        )
    }
}


export default graphql(
    GET_MYOLDCOLLEAGUES, {
        options: (props) => ({
            variables: {
                companyId: props.work.company.id,
            },
            fetchPolicy:"cache-and-network",
        }),
    }
)(QueryMyOldColleagues)
