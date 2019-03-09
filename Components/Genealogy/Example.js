import React from 'react'
import { View, StyleSheet, ScrollView, Dimensions, Text } from 'react-native'
import { withNavigation } from 'react-navigation'

import Square from './Square'
import FatherAndMotherLine from './FatherAndMotherLine'
import FirstMiddleLevel from './FirstMiddleLevel'
import SecondLevelTop from './SecondLevelTop'
import ThirdLevelTop from './ThirdLevelTop'
import SecondMiddleLevel from './SecondMiddleLevel'
import { getRelationshipNameTwo } from '../../utils/tools'

import { SQURE_HEIGHT, SQURE_WIDTH, BORDER_WIDTH, SQURE_H_DISTANCE, SQURE_V_DISTANCE } from './settings'


class Example extends React.Component {

    state = {
        layouts: {}
    }

    has_child=(id,arr)=>{
        // arr:[{id1:[1,2,3],id2:[4,5,6]}]
        for(let obj  of arr){
            if(Object.keys(obj)[0]===id){
                return (obj[id]).length > 0
            }
        }
        return false
    }

    render() {
        // 家人数据整理
        const families = this.props.families
        if(families.length===0){
            return null
        }
        // 父母数据
        const father = families.filter(f => f.relationship === "father")
        const mother = families.filter(f => f.relationship === "mother")
        // 兄弟姐妹数据
        const sistersAndBrothersRelaionship = ["oldbrother", "youngbrother", "oldsister", "youngsister", 'sister', 'brother']
        const sistersAndBrothers = families.filter(f => !!~sistersAndBrothersRelaionship.indexOf(f.relationship))
        const brotherAndSisterNum = sistersAndBrothers.length
        // 配偶数据
        const spouseRelationship = ['wife', 'husband']
        const spouses = families.filter(f => !!~spouseRelationship.indexOf(f.relationship)).sort(
            (a,b)=>{
                if(a.id>b.id){
                    return 1
                }
                return -1
            })
            
        const spouseNum = spouses.length
        // 子女数据
        const sonAndDaughterRelationship = ['son', 'daughter']
        const sonAndDaughters = families.filter(f => !!~sonAndDaughterRelationship.indexOf(f.relationship))
        let sortedSonAndDaughters = []
        const spouseIdAndSonDaughter = []
        for(let spouse of spouses){
            let temp
            temp = sonAndDaughters.filter(sonAndDaughter=>sonAndDaughter.spouse.id===spouse.id)
            sortedSonAndDaughters = sortedSonAndDaughters.concat(temp)
            spouseIdAndSonDaughter.push({[spouse.id]:temp})
        }
        const sonAndDaughterNum = sonAndDaughters.length

        let { height,width} = Dimensions.get('window');
        height = height -200
        const width1 = (spouseNum+1+brotherAndSisterNum)>sonAndDaughterNum ? (spouseNum+1+brotherAndSisterNum)*120 :sonAndDaughterNum*120
        width1>width ? width=width1 : width

        // firstLevel
        const firstLevelMarginLeft = (width - 2 * SQURE_WIDTH - SQURE_H_DISTANCE) / 2
        const firstLevelMarginTop = (height - 3 * SQURE_HEIGHT - SQURE_V_DISTANCE * 2) / 2

        // firstMiddleLevel

        // secondLevel
        const secondLevelMarginLeft = (width - (brotherAndSisterNum + 1 + spouseNum) * SQURE_WIDTH - (brotherAndSisterNum + spouseNum) * SQURE_V_DISTANCE) / 2
        // secondMiddleLevel

        // thirdLevel
        const thirdLevelMarginLeft = (width - sonAndDaughterNum * SQURE_WIDTH - (sonAndDaughterNum - 1) * SQURE_H_DISTANCE) / 2
        return (
            <ScrollView
                horizontal={true}
            >
                <View style={{width,height}}>


                    <View style={{ flexDirection: 'row', marginLeft: firstLevelMarginLeft, marginTop: firstLevelMarginTop }}   >
                        <View >
                            <Square
                                relationship={getRelationshipNameTwo('father')}
                                name={father.length > 0 ? father[0].to.name : "未填写"}
                                isUser={father.length > 0 ? (father[0].status==='3' && !!father[0].to.user)  : false}
                                user = {father.length > 0 ? father[0].to.user : null}
                                handlePress={this.props.handlePress}
                            />
                        </View>

                        <FatherAndMotherLine
                            height={SQURE_HEIGHT}
                            width={SQURE_H_DISTANCE}
                            hasChild={true}
                        />

                        <View  >
                            <Square
                                relationship={getRelationshipNameTwo('mother')}
                                name={mother.length > 0 ? mother[0].to.name : "未填写"}
                                isUser={mother.length > 0 ? (mother[0].status==='3' && !!mother[0].to.user) : false}
                                user={mother.length > 0 ? mother[0].to.user : null}
                                handlePress={this.props.handlePress}
                            />
                        </View>
                    </View>

                    <View >
                        <FirstMiddleLevel
                            width={width}
                            firstLevelMarginLeft={firstLevelMarginLeft}
                            firstLevelMarginTop={firstLevelMarginTop}
                            secondLevelMarginLeft={secondLevelMarginLeft}
                            brotherAndSisterNum={brotherAndSisterNum}
                        />
                    </View>

                    <View style={{ marginLeft: secondLevelMarginLeft, flexDirection: 'row'}}>
                        {
                            sistersAndBrothers.map((family, index) => (
                                <View style={{ flexDirection: 'row' }} key={index}>
                                    <View key={index}>
                                        <SecondLevelTop />
                                        <Square
                                            relationship={getRelationshipNameTwo(family.relationship)}
                                            name={family.to.name}
                                            isUser={family.status==='3' && !!family.to.user}
                                            user={family.to.user}
                                            handlePress={this.props.handlePress}
                                        />
                                    </View>
                                    <View style={{ width: SQURE_H_DISTANCE }}></View>
                                </View>
                            ))
                        }

                        <View>
                            <SecondLevelTop />
                            <Square
                                relationship="我"
                                name={families[0].from.name}
                                isUser={false}
                                user={null}
                                handlePress={this.props.handlePress}
                            />
                        </View>

                        {
                            spouses.map((family,index) => (
                                <View style={{ flexDirection: 'row' }} key={index}>
                                    <View >
                                        <View style={{ height: SQURE_V_DISTANCE / 2 }}></View>
                                        <FatherAndMotherLine
                                            height={SQURE_HEIGHT}
                                            width={SQURE_H_DISTANCE}
                                            hasChild={this.has_child(family.id,spouseIdAndSonDaughter)}
                                        />
                                    </View>

                                    <View>
                                        <View style={{ height: SQURE_V_DISTANCE / 2 }}></View>
                                        <Square
                                            name={family.to.name}
                                            relationship={getRelationshipNameTwo(family.relationship)}
                                            isUser={family.status==='3' && !!family.to.user}
                                            user={family.to.user}
                                            handlePress={this.props.handlePress}
                                        />
                                    </View>
                                </View>
                            ))
                        }

                    </View>

                    <View >
                        <SecondMiddleLevel
                            width={width}
                            secondLevelMarginLeft={secondLevelMarginLeft}
                            thirdLevelMarginLeft={thirdLevelMarginLeft}
                            brotherAndSisterNum={brotherAndSisterNum}
                            sonAndDaughterNum={sonAndDaughterNum}
                            spouseIdAndSonDaughter={spouseIdAndSonDaughter}
                        />
                    </View>

                    <View style={{ marginLeft: thirdLevelMarginLeft, flexDirection: 'row' }}>

                        {
                            sortedSonAndDaughters.map((family,index)=>(
                                <View key={index} style={{flexDirection:'row'}}>
                                    <View >
                                        <ThirdLevelTop spouseNum={spouseNum} />
                                        <Square
                                        relationship={getRelationshipNameTwo(family.relationship)} 
                                        name={family.to.name}
                                        isUser={family.status==='3' && !!family.to.user}
                                        user={family.to.user}
                                        handlePress={this.props.handlePress}
                                        />
                                    </View>
                                    <View style={{ marginLeft: SQURE_H_DISTANCE }}></View>
                                </View>
                            ))
                        }
                        
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
 
    position1: {
        marginLeft: SQURE_H_DISTANCE
    },
    firstLevel: {
        flexDirection: 'row'
    },
    secondLevel: {
        flexDirection: 'row',
    },
    thirdLevel: {
        flexDirection: 'row'

    }

})

export default withNavigation(Example)






