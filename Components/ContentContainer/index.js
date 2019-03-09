import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import React from 'react';

import KeyBoardState from './KeyBoardState';
import MeasureLayout from './MeasureLayout';
import MyContainer, {
  INPUT_METHOD,
} from './MyContainer';

export default class ContentContainer extends React.Component {
  state = {
    inputMethod: INPUT_METHOD.NONE,
  };

  handleChangeInputMethod = inputMethod => {
    this.setState({ inputMethod });
  };


  render() {
    const { inputMethod } = this.state;
    const { children } = this.props;

    return (
      <View style={styles.container}>
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MyContainer>
                  {...keyboardInfo}
                  inputMethod={inputMethod}
                  onChangeInputMethod={this.handleChangeInputMethod}
                >
                  {children}
                </MyContainer>
              )}
            </KeyboardState>
          )}
        </MeasureLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
