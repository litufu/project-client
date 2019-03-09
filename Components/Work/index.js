import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text, Spinner } from 'native-base';
import { Query } from 'react-apollo'

import Works from './Works'
import Job from './Job'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'
import GET_ME from '../../graphql/get_me.query'
import { errorMessage } from '../../utils/tools'


export default class MyWork extends Component {

  render() {
    return (
      <Query
        query={GET_ME}
      >
        {({ loading, error, data }) => {
          if (loading) return <Spinner />
          if (error) return <Text>{errorMessage(error)}</Text>
          return (
            <Example data={data} navigation={this.props.navigation} />
          )

        }}
      </Query>
    )
  }
}


class Example extends Component {

  state = {
    selected: 1,
    modify: false,
  }


  render() {
    const { selected, modify } = this.state
    const { data } = this.props
    let nowWork = []
    let startTime = ""
    let endTime = ""
    let companyName = ""
    let department = ""
    let postName = ""
    let postId = ""
    let now = false
    let updateId = ""


    if (data.me && data.me.works) {
      nowWork = data.me.works.filter(work => new Date(work.endTime).getFullYear() === 9999)
    }

    if (nowWork.length > 0 && modify) {
      startTime = nowWork[0].startTime
      companyName = nowWork[0].company.name
      department = nowWork[0].department
      postName = nowWork[0].post.name
      postId = nowWork[0].post.id
      now = true
      updateId = nowWork[0].id
    }

    return (
      <Container>
        <Header hasSegment style={{ marginTop: statusBarHeight }}>
          <Left style={{ justifyContent: 'flex-end' }}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ alignItems: 'center' }}>
            <Title >工作经历</Title>
          </Body>
          <Right>
            {
              (this.state.selected === 1 && nowWork.length > 0 ) &&(
                <Button
                  onPress={() => this.setState({ modify: true ,selected:2})}
                >
                  <Text>修改</Text>
                </Button>)
            }
          </Right>
        </Header>
        <Segment >
          <Button
            first
            active={selected === 1}
            onPress={() => this.setState({ selected: 1 })}
          >
            <Text  >工作经历</Text>
          </Button>
          <Button
            last
            active={selected === 2}
            onPress={() => this.setState({ selected: 2 })}
          >
            <Text >{this.state.modify ? "修改经历" : "添加经历"}</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.selected === 1 && <Works data={data} />}
          {this.state.selected === 2 &&
            (<Job
              startTime={startTime}
              endTime={endTime}
              companyName={companyName}
              department={department}
              postName={postName}
              postId={postId}
              now={now}
              updateId={updateId}
              confirm={() => this.setState({ modify: false,selected:1 })}
            />)}
        </Content>
      </Container>

    );
  }
}

