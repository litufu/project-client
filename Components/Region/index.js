import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Location from './Location'
import {display} from '../../utils/tools'

export default class Region extends Component{
  state={
  place:this.props.place||{},
  openProvinceCityArea:this.props.openProvinceCityArea || false,
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.place !== this.props.place) {
      this.setState({
        place:nextProps.place
    })
    }
    if (nextProps.openProvinceCityArea !== this.props.openProvinceCityArea) {
      this.setState({
        openProvinceCityArea:nextProps.openProvinceCityArea
    })
    }
  }

  handlePlace=(place,closeModal)=>{
    const newplace = Object.assign(this.state.place,place)
    this.setState({place:newplace,openProvinceCityArea:closeModal})
    this.props.handlePlace(newplace)
  }

  render(){
    const {place} = this.state
    const displayPlace = display(place)
    return(
      <View>
        {/* <TouchableOpacity
         onPress={()=>this.setState({openProvinceCityArea:true})}
       >
       <Text >
        {displayPlace}
       </Text>
     </TouchableOpacity> */}
        <Location
        callback={this.handlePlace}
        openProvinceCityArea={this.state.openProvinceCityArea}
        />
      </View>
    )
  }
}
