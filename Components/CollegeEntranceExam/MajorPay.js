import React from 'react';
import { FlatList, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Container, Header, Title, Content,  Button, Left, Right, Body, Icon,} from 'native-base';
import { graphql } from 'react-apollo';
import { ListItem } from 'react-native-elements';
import GET_MAJORPAYS from '../../graphql/get_majorPays.query'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

const PAGE_SIZE = 20;

const MajorPays = graphql(
    GET_MAJORPAYS,
  {
    options: {
      notifyOnNetworkStatusChange: true,
      variables: { first: PAGE_SIZE, skip: 0 },
    },
  }
)(MajorPay);

function MajorPayList({ data }) {
  if (data.networkStatus === 1) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (data.error) {
    return <Text>Error: {data.error.message}</Text>;
  }

  _keyExtractor = (item, index) => index.toString();

  return (
    <FlatList
      data={data.majorPays}
      keyExtractor={this._keyExtractor}
      refreshing={data.networkStatus === 4}
      onRefresh={() => data.refetch()}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        // The fetchMore method is used to load new data and add it
        // to the original query we used to populate the list
        data.fetchMore({
          variables: { skip: data.majorPays.length + 1 },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            if (!fetchMoreResult || fetchMoreResult.majorPays.length === 0) {
              return previousResult;
            }

            return {
              // Concatenate the new feed results after the old ones
              majorPays: previousResult.majorPays.concat(fetchMoreResult.majorPays),
            };
          },
        });
      }}
      renderItem={({ item,index }) => {
        if (!item.early) {
          return;
        }
      
        return (
          <ListItem
            hideChevron
            title={`${index}:${item.majorCn}/${item.majorEn}`}
            subtitle={`刚毕业薪酬${item.early}美元，10年后平均薪酬${item.median}美元`}
            containerStyle={{ backgroundColor: 'white' }}
          />
        );
      }}
    />
  );
}

function MajorPay({ data,navigation }) {
  return (
    <Container>
                <Header style={{ marginTop: statusBarHeight }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title >专业薪酬排行榜</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.container} >
                  <Text style={styles.title}>专业对薪酬的影响远大于学校</Text>
                  <MajorPayList data={data} />
                  <Text style={styles.fullApp}>数据来源：payscale.com。仅供参考，本网未验证数据的真实性。</Text>
                </Content>
            </Container>
    
  );
}

export default MajorPays

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    margin: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  loading: {
    margin: 50,
  },
  fullApp: {
    margin: 15,
    textAlign: 'center',
  },
});

