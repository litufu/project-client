import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { SecureStore } from 'expo'
import { Container, Content, Spinner } from 'native-base';

class Loading extends Component {
    constructor(props) {
        super(props)
        this.bootstrapAsync()
    }

    bootstrapAsync = async () => {
        const userToken = await SecureStore.getItemAsync('token')
        
        this.props.navigation.navigate(userToken ? 'App' : 'Login')
    }

    render() {
        return (
          <Container style={styles.container}>
            <Content>
              <Spinner color='blue' />
            </Content>
          </Container>
        )
    }
}

export default Loading


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : "center",
    alignItems:"center",
  },
});
