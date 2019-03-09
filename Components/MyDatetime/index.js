import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFormat from 'dateformat';

export default class MyDatetime extends Component {
  state = {
    isDateTimePickerVisible: false,
    chosenDate:this.props.chosenDate || ''
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({chosenDate:date})
    this.props.handleDate(date)
    this._hideDateTimePicker();
  };

  render () {
    const {chosenDate} = this.state
    const {showtime} = this.props
    const formatDate = showtime ? dateFormat(chosenDate, "yyyy年mm月dd日h时") : dateFormat(chosenDate, "yyyy年mm月dd日")
    let date
    if(chosenDate===''){
      date = '请选择'
    }else{
      date = formatDate;
    }

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>{date}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={this.props.mode || "datetime"}
          locale='zh-Hans'
        />
      </View>
    );
  }

}
