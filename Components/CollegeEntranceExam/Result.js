import React, { Component } from 'react';
import { Alert, View } from 'react-native'
import { Container, Header, Content, Title, Button, Left, Right, Body, Icon, Spinner, Text } from 'native-base';
import { Query } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { errorMessage } from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query'
import GET_REGSTATUSAPPLICANTSBYID from '../../graphql/get_regStatusApplicantsById.query'
import ApplicationCard from './ApplicationCard'
import { subjects } from './settings'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

class Result extends Component {

  _renderApplicationResult = (me) => (

    <Query
      query={GET_REGSTATUSAPPLICANTSBYID}
      variables={{ regStatusId: me.regStatus.id }}
      fetchPolicy="network-only"
    >
      {
        ({ loading, error, data }) => {
          if (loading) return <Spinner />
          if (error) return <Text>{errorMessage(error)}</Text>

          const applicants = data.getRegStatusApplicantsById
          const personNum = applicants.length
          let lowwestScore
          let proLowwestScore
          if (personNum === 0) {
            lowwestScore = 0
            proLowwestScore = 0
          } else {
            lowwestScore = applicants.sort((a, b) => a.exam.culscore - b.exam.culscore)[0].exam.culscore
            proLowwestScore = applicants.sort((a, b) => a.exam.proscore - b.exam.proscore)[0].exam.proscore
          }

          return (
            <ApplicationCard
              education={me.regStatus.education === 'Undergraduate' ? "本科" : "专科"}
              subjectName={subjects[me.exam.subject]}
              universityName={me.regStatus.university.name}
              majorName={me.regStatus.major.name}
              provinceName={me.exam.province.name}
              personNum={personNum}
              lowwestScore={lowwestScore}
              proLowwestScore={proLowwestScore}
              twoBtn={true}
              handleToChat={() => this.props.navigation.navigate('GroupChat', {
                group: me.regStatus, me, type: "RegStatus",
                groupName: `${me.regStatus.university.name}${me.regStatus.major.name}-${me.exam.province.name}${subjects[me.exam.subject]}`
              })}
              handleToApplicants={() => this.props.navigation.navigate('Applicants', { applicants })}
              id={me.regStatus.id}
            />
          )
        }
      }
    </Query>
  )

  render() {
    return (
      <Container>
        <Header style={{ marginTop: statusBarHeight }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('CollegeEntranceExam')}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title >报名结果</Title>
          </Body>
          <Right />
        </Header>
        <Query
          query={GET_ME}
          onError={(error) => Alert.alert(errorMessage(error))}
        >
          {
            ({ loading, data }) => {
              if (loading) return <Spinner />
              const me = data.me
              return (
                <Content>
                  {me && me.regStatus && me.regStatus.id
                    ? this._renderApplicationResult(me)
                    : <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}><Text>请先报名然后查看结果</Text></View>
                  }
                </Content>
              )
            }
          }
        </Query>
      </Container>
    );
  }
}

export default withNavigation(Result)