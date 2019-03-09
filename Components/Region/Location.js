import React, {Component} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity,StyleSheet} from 'react-native';
import {Spinner} from 'native-base'
import { Query,graphql,compose } from "react-apollo";

import CHINA_REGION from './china_region';
import GET_STREETS from '../../graphql/get_streets.query'
import GET_VILLAGES from '../../graphql/get_villages.query'

class ProvinceCityArea extends Component{
    constructor(p) {
        super(p);
        let provinces=[];
        for (let province of CHINA_REGION.data.provinces) {
            provinces.push({code:province.code,name:province.name});
        }
        this.state={
            openProvinceCityArea:this.props.openProvinceCityArea||false,
            selectStatus:{s1:1,s2:0,s3:0,s4:0,s5:0},
            address:{
                province: {code:"",name:""},
                city:{code:"",name:""},
                area:{code:"",name:""},
                street:{code:"",name:""},
                village:{code:"",name:""},
            },
            provinces:provinces,
            cities:[],
            areas:[],
            streets:[],
            villages:[],
        };
        if(this.props.color){
            style.selectStatusTrue.color=this.props.color;
        }
        this.setProvince=this.setProvince.bind(this);
        this.setCity=this.setCity.bind(this);
        this.setArea=this.setArea.bind(this);
        this.setStreet = this.setStreet.bind(this);
        this.setVillage=this.setVillage.bind(this);
    }
    setProvince(x){
        if(x!=this.state.address.province){
            let a=this.state.address;
            a.province=Object.assign(a.province,x);
            a.city={code:'',name:''};
            a.area={code:'',name:''};
            a.street={code:'',name:''};
            a.village={code:'',name:''};
            let cities=[];
            let display = true
            for (let province of CHINA_REGION.data.provinces) {
                if(x.code === province.code){
                  for (let city of province.cities){
                    cities.push({code:city.code,name:city.name})
                  }
                }
            }
            this.setState({
                address:a,
                cities:cities,
                areas:[],
                streets:[],
                villages:[],
                selectStatus:{s1:0,s2:1,s3:0,s4:0,s5:0}
            },()=>{
                this.props.callback&&this.props.callback(this.state.address,display);
            });
        }
    }

    setCity(x){
        if(x!=this.state.address.city){
            let a=this.state.address;
            a.city=Object.assign(a.city,x);
            a.area={code:'',name:''};
            a.street={code:'',name:''};
            a.village={code:'',name:''};
            let display = true
            let areas=[];
            for (let province of CHINA_REGION.data.provinces) {
                if(province.code===a.province.code){
                  for (let city of province.cities){
                    if(city.code===a.city.code){
                      for(let area of city.areas){
                        areas.push({code:area.code,name:area.name})
                      }
                    }
                  }
                }
            }
            this.setState({
                address:a,
                areas:areas,
                streets:[],
                villages:[],
                selectStatus:{s1:0,s2:0,s3:1,s4:0,s5:0}
            },()=>{
                this.props.callback&&this.props.callback(this.state.address,display);
            });
        }
    }

    setArea(x){
        if(x!=this.state.address.area){
            let a=this.state.address;
            a.area=Object.assign(a.area,x);
            a.street={code:'',name:''};
            a.village={code:'',name:''};
            let display = true
            this.setState({
                address:a,
                selectStatus:{s1:0,s2:0,s3:0,s4:1,s5:0},
            },()=>{
                this.props.callback&&this.props.callback(this.state.address,display);
            });
        }
    }

    setStreet(x){
        if(x!=this.state.address.street){
            let a=this.state.address;
            a.street=Object.assign(a.street,x);
            a.village={code:'',name:''};
            let display = true
            this.setState({
                address:a,
                selectStatus:{s1:0,s2:0,s3:0,s4:0,s5:1},
            },()=>{
                this.props.callback&&this.props.callback(this.state.address,display);
            });
        }
    }

    setVillage(x){
        if(x!=this.state.address.village){
            let a=this.state.address;
            a.village=Object.assign(a.village,x);
            let display = false
            this.setState({
                address:a,
                selectStatus:{s1:0,s2:0,s3:0,s4:0,s5:1},
            },()=>{
                this.props.callback&&this.props.callback(this.state.address,display);
            });
        }
    }

    _keyExtractor = (item, index) => item.code;

    componentWillReceiveProps(nextProps){
        this.setState({
            openProvinceCityArea:nextProps.openProvinceCityArea
        })
    }

    render (){
        let selectProvinceBtn=[style.selectBtn],selectCityBtn=[style.selectBtn],selectAreaBtn=[style.selectBtn],
            selectStreetBtn=[style.selectBtn],selectVillageBtn=[style.selectBtn],
            selectProvinceArea=[style.selectArea],selectCityArea=[style.selectArea],selectAreaArea=[style.selectArea],
            selectStreetArea=[style.selectArea],selectVillageArea=[style.selectArea];
        if(this.state.selectStatus.s1){
            selectProvinceBtn.push(style.selectStatusTrue);
            selectProvinceArea.push(style.show);
        }else{
            selectProvinceArea.push(style.hide);
        }
        if(this.state.selectStatus.s2){
            selectCityBtn.push(style.selectStatusTrue);
            selectCityArea.push(style.show);
        }else{
            selectCityArea.push(style.hide);
        }
        if(this.state.selectStatus.s3){
            selectAreaBtn.push(style.selectStatusTrue);
            selectAreaArea.push(style.show);
        }else{
            selectAreaArea.push(style.hide);
        }
        if(this.state.selectStatus.s4){
            selectStreetBtn.push(style.selectStatusTrue);
            selectStreetArea.push(style.show);
        }else{
            selectStreetArea.push(style.hide);
        }
        if(this.state.selectStatus.s5){
            selectVillageBtn.push(style.selectStatusTrue);
            selectVillageArea.push(style.show);
        }else{
            selectVillageArea.push(style.hide);
        }
        if(this.state.address.province.code){
            selectCityBtn.push(style.show);
        }else{
            selectCityBtn.push(style.hide);
        }
        if(this.state.address.city.code){
            selectAreaBtn.push(style.show);
        }else{
            selectAreaBtn.push(style.hide);
        }
        if(this.state.address.area.code){
            selectStreetBtn.push(style.show);
        }else{
            selectStreetBtn.push(style.hide);
        }
        if(this.state.address.street.code){
            selectVillageBtn.push(style.show);
        }else{
            selectVillageBtn.push(style.hide);
        }
        return <Modal transparent={true} visible={this.state.openProvinceCityArea}
                      onRequestClose={() => this.setState({openProvinceCityArea:false})}>
                <View style={style.sku}>
                    <TouchableOpacity style={style.skuBackImg} onPress={() => this.setState({openProvinceCityArea:false})}></TouchableOpacity>
                    <View style={style.openProvinceCityAreaContentWarp}>
                        <View style={style.skuTitle}>
                            <Text style={style.skuTitleTxt}>所在地区</Text>
                            {/* <TouchableOpacity style={style.skuContentClose}
                                              onPress={() => {
                                              this.setState({openProvinceCityArea:false})
                                              this.props.callback(this.state.address,false)
                                              }}>
                                <Text style={style.skuContentCloseIcon}>关闭</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={style.openProvinceCityAreaContent}>
                            <View style={style.openProvinceCityAreaContentA} >
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:1,s2:0,s3:0,s4:0,s5:0}});
                                }} style={selectProvinceBtn}>{this.state.address.province.name||'请选择'}</Text>
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:0,s2:1,s3:0,s4:0,s5:0}});
                                }} style={selectCityBtn}>{this.state.address.city.name||'请选择'}</Text>
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:0,s2:0,s3:1,s4:0,s5:0}});
                                }} style={selectAreaBtn}>{this.state.address.area.name||'请选择'}</Text>
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:0,s2:0,s3:0,s4:1,s5:0}});
                                }} style={selectStreetBtn}>{this.state.address.street.name||'请选择'}</Text>
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:0,s2:0,s3:0,s4:0,s5:1}});
                                }} style={selectVillageBtn}>{this.state.address.village.name||'请选择'}</Text>
                            </View>
                            <View style={selectProvinceArea}>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={this._keyExtractor}
                                    data={this.state.provinces}
                                    initialNumToRender={8}
                                    getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                    renderItem={({item, separators}) => {
                                        let s=[style.selectProvinceAreaTxt];
                                        if(item==this.state.address.province){
                                            s.push(style.selectStatusTrue);
                                        }
                                        return <Text numberOfLines={1} style={s} onPress={()=>{
                                            this.setProvince(item);
                                        }}>
                                            {item.name}
                                        </Text>
                                    }}
                                />
                            </View>
                            <View style={selectCityArea}>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={this._keyExtractor}
                                    data={this.state.cities}
                                    initialNumToRender={8}
                                    getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                    renderItem={({item, separators}) => {
                                        let s=[style.selectProvinceAreaTxt];
                                        if(item==this.state.address.city){
                                            s.push(style.selectStatusTrue);
                                        }
                                        return <Text numberOfLines={1} style={s} onPress={()=>{
                                            this.setCity(item);
                                        }}>
                                            {item.name}
                                        </Text>
                                    }}
                                />
                            </View>
                            <View style={selectAreaArea}>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={this._keyExtractor}
                                    data={this.state.areas}
                                    initialNumToRender={8}
                                    getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                    renderItem={({item, separators}) => {
                                        let s=[style.selectProvinceAreaTxt];
                                        if(item==this.state.address.area){
                                            s.push(style.selectStatusTrue);
                                        }
                                        return <Text numberOfLines={1} style={s} onPress={()=>{
                                            this.setArea(item);
                                        }}>
                                            {item.name}
                                        </Text>
                                    }}
                                />
                            </View>

                        <Query query={GET_STREETS}  variables={ {code:this.state.address.area.code} }>
                            {({ loading, error, data }) => {
                                if(loading) return <Spinner />
                                if (error){ return <Text>{error.message}</Text>};

                                return(
                                  <View style={selectStreetArea}>
                                      <FlatList
                                          extraData={this.state}
                                          keyExtractor={this._keyExtractor}
                                          data={data.streets}
                                          initialNumToRender={8}
                                          getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                          renderItem={({item, separators}) => {
                                              let s=[style.selectProvinceAreaTxt];
                                              if(item==this.state.address.street){
                                                  s.push(style.selectStatusTrue);
                                              }
                                              return <Text numberOfLines={1} style={s} onPress={()=>{
                                                  this.setStreet(item);
                                              }}>
                                                  {item.name}
                                              </Text>
                                          }}
                                      />
                                  </View>
                                )
                              }}
                            </Query>

                            {
                                !!this.state.address.street.code  && (
                                    <Query query={GET_VILLAGES}  variables={ {code:this.state.address.street.code} }>
                                {({ loading, error, data }) => {
                                    if(loading) return <Spinner />
                                    if (error){ return <Text>{error.message}</Text>};

                                    return(
                                      <View style={selectVillageArea}>
                                          <FlatList
                                              extraData={this.state}
                                              keyExtractor={this._keyExtractor}
                                              data={data.villages}
                                              initialNumToRender={8}
                                              getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                              renderItem={({item, separators}) => {
                                                  let s=[style.selectProvinceAreaTxt];
                                                  if(item==this.state.address.village){
                                                      s.push(style.selectStatusTrue);
                                                  }
                                                  return <Text numberOfLines={1} style={s} onPress={()=>{
                                                      this.setVillage(item);
                                                  }}>
                                                      {item.name}
                                                  </Text>
                                              }}
                                          />
                                      </View>
                                    )
                                  }}
                                </Query>
                                )   
                            }
                        </View>
                    </View>
                </View>
            </Modal>
    }
}

const style = StyleSheet.create({
    selectBtn:{paddingLeft:10,paddingRight:10,},
    selectArea:{paddingBottom:50},
    selectStatusTrue:{color:"#05a5d1"},
    selectProvinceAreaTxt:{height:30,paddingLeft:15,lineHeight:30,paddingRight:15,},
    hide:{display:"none"},
    show:{},
    FashionAddLine: {
        height:60,
        borderBottomWidth:2,
        borderBottomColor:"rgba(224,224,224,0.50)",
        flexDirection:"row"
    },
    FashionAddLineLabel: {
        width:95,
        paddingLeft:15,
        justifyContent:"center",
        alignItems:"flex-start",
    },
    FashionAddLine2:{
        height:75,
        borderBottomColor:"#F8F8F8",
        borderBottomWidth:10,
    },
    sku: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.5)"
    },
    skuBackImg: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    openProvinceCityAreaContentWarp:{
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height:310,
        backgroundColor: "#ffffff",
    },
    skuTitle: {
        height: 50,
        position: "relative",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(224,224,224,0.50)",
        alignItems: "center",
        justifyContent: "center",
    },
    skuTitleTxt: {
        fontSize: 16,
        color: "#4f4f4f",
    },
    skuContentClose: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
    },
    skuContentCloseIcon: {
        color: "#9B9B9B",
        fontSize: 12,
    },
    openProvinceCityAreaContent:{
        height:260,
    },
    openProvinceCityAreaContentA:{
        height:40,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:"center",
    },
});

/**
 * 使用方法 import 之后直接加载本包
 * 接受四个参数
 * color string，非必填，表示选择文本的颜色，默认浅蓝
 * callback 方法，必填，在组件内选择了地址后回调给父组件
 * initData 对象{province:"浙江省",city:"衢州市",area:"柯城区",}，非必填，初始数据
 * openProvinceCityArea 布尔，是否显示，非必填，默认false
 * */
export default ProvinceCityArea;
