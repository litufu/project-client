import React, {
    Component
} from 'react';

import { Svg } from 'expo';
const {
    Line
} = Svg;

import { SQURE_HEIGHT, SQURE_WIDTH, BORDER_WIDTH, SQURE_H_DISTANCE, SQURE_V_DISTANCE } from './settings'


const getLength=(obj,index)=>{
    // obj为数组[{'a':[1,2,3]},{'b':[4,5,6]}]
    const newArr = obj.slice(0,index)
    let length = 0
    for(let obj of newArr){
        
        length += Object.values(obj)[0].length
    }
    
    return length
}

export default class FirstMiddleLevel extends Component{

    state={
        brotherAndSisterNum : 0,
        spouseNum:0,
    }

    render() {
        // 需要画四条线
        // 1、配偶中间向下
        // 2、配偶中间到子女中间
        // 3、子女中间到子女水平线的垂直线
        // 4、子女间的水平线
        const {secondLevelMarginLeft,
            thirdLevelMarginLeft,
            brotherAndSisterNum,
            sonAndDaughterNum,
            width,
            spouseIdAndSonDaughter
        } = this.props
        const  spouseNum = spouseIdAndSonDaughter.length
        // 父母向下
        const fm_x1 = secondLevelMarginLeft + brotherAndSisterNum*(SQURE_WIDTH+SQURE_H_DISTANCE)+ SQURE_WIDTH + SQURE_H_DISTANCE/2
        const fm_distance = SQURE_WIDTH + SQURE_H_DISTANCE
        const fm_y2 = SQURE_V_DISTANCE/2

        return <Svg
            height={(SQURE_V_DISTANCE*spouseNum)/(spouseNum+1)}
            width={width}
        >
            {spouseIdAndSonDaughter.map((spouse,index)=>{
                if(Object.values(spouse)[0].length>0){
                    return <Line
                        key={index}
                        x1={fm_x1 + fm_distance*index}
                        y1={0}
                        x2={fm_x1 + fm_distance*index}
                        y2={SQURE_V_DISTANCE*(index+1)/(spouseNum+1)}
                        stroke="green"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                }
            })}

            {spouseIdAndSonDaughter.map((spouse,index)=>{
               const leftSonAndDaughterNum = getLength(spouseIdAndSonDaughter,index)
               const ownSonAndDaughterNum = Object.values(spouse)[0].length
               const xa = (
                   thirdLevelMarginLeft + 
                   leftSonAndDaughterNum*(SQURE_WIDTH +SQURE_H_DISTANCE/2) +
                    ownSonAndDaughterNum/2*SQURE_WIDTH+(ownSonAndDaughterNum-1)*SQURE_H_DISTANCE/2
                )
               const xb = fm_x1 + fm_distance*index
               let x1
               let x2
               if(xa>xb){
                   x1 = xb
                   x2 = xa
               }else{
                   x1 = xa
                   x2 = xb
               }
               if(Object.values(spouse)[0].length>0){
                return <Line
                    key={index}
                    x1={x1}
                    y1={SQURE_V_DISTANCE*(index+1)/(spouseNum+1)}
                    x2={x2}
                    y2={SQURE_V_DISTANCE*(index+1)/(spouseNum+1)}
                    stroke="green"
                    strokeWidth="3"
                    strokeLinecap="round"
                    />
                }
            })}

            {spouseIdAndSonDaughter.map((spouse,index)=>{
                const leftSonAndDaughterNum = getLength(spouseIdAndSonDaughter,index)
                const ownSonAndDaughterNum = Object.values(spouse)[0].length
                const xa = (
                    thirdLevelMarginLeft + 
                    leftSonAndDaughterNum*(SQURE_WIDTH +SQURE_H_DISTANCE/2) +
                     ownSonAndDaughterNum/2*SQURE_WIDTH+(ownSonAndDaughterNum-1)*SQURE_H_DISTANCE/2
                 )
                 if(Object.values(spouse)[0].length>0){
                    return <Line
                    key={index}
                    x1={xa}
                    y1={SQURE_V_DISTANCE*(index+1)/(spouseNum+1)}
                    x2={xa}
                    y2={SQURE_V_DISTANCE*spouseNum/(spouseNum+1)}
                    stroke="green"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                }
            })}

            {spouseIdAndSonDaughter.map((spouse,index)=>{
                const leftSonAndDaughterNum = getLength(spouseIdAndSonDaughter,index)
                const ownSonAndDaughterNum = Object.values(spouse)[0].length
                const x1 = (
                    thirdLevelMarginLeft + 
                    leftSonAndDaughterNum*(SQURE_WIDTH +SQURE_H_DISTANCE) + SQURE_WIDTH/2
                 )
                const x2 = (
                    thirdLevelMarginLeft + 
                    leftSonAndDaughterNum*(SQURE_WIDTH +SQURE_H_DISTANCE) + 
                    (ownSonAndDaughterNum-1)*(SQURE_H_DISTANCE + SQURE_WIDTH) + SQURE_WIDTH/2
                )
                if(Object.values(spouse)[0].length>0){
                    return <Line
                    key={index}
                    x1={x1}
                    y1={SQURE_V_DISTANCE*spouseNum/(spouseNum+1)}
                    x2={x2}
                    y2={SQURE_V_DISTANCE*spouseNum/(spouseNum+1)}
                    stroke="green"
                    strokeWidth="3"
                    strokeLinecap="round"
                />}
        })}
        
        </Svg>;
    }
}
