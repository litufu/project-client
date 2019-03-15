import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import Sentry from 'sentry-expo';
import client from './apollo'
import { AppLoading, Asset, Font, Icon } from 'expo'
import Navigation from './Navigation/SwitchNavigator'

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://7fa79f5a7e1f4c8d807e8cb0446104ab@sentry.io/1416155').install();

class App extends Component {
    state = {
        isLoadingComplete: false,
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
          return (
            <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
            />
          );
        } else {
          return (
            <ApolloProvider client={client}>
                <Navigation />
            </ApolloProvider>
          );
        }
      }
    
      _loadResourcesAsync = async () => {
        return Promise.all([
          Asset.loadAsync([
            require('./assets/icon.png'),
          ]),
          Font.loadAsync({
            "montserratRegular": require('./assets/fonts/montserratRegular.ttf'),
            "montserratMedium": require('./assets/fonts/montserratMedium.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          }),
        ]);
      };
    
      _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
      };
    
      _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
      };
}

export default App
