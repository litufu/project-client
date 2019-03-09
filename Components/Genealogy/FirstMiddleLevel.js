import React, {
    Component
} from 'react';

import { Svg } from 'expo';
const {
    Line
} = Svg;

import { SQURE_HEIGHT, SQURE_WIDTH, BORDER_WIDTH, SQURE_H_DISTANCE, SQURE_V_DISTANCE } from './settings'

export default class FirstMiddleLevel extends Component{

    state={
        brotherAndSisterNum : 0,
        spouseNum:0,
    }

    render() {
        const {firstLevelMarginLeft,secondLevelMarginLeft,brotherAndSisterNum,width} = this.props
        // 父母向下
        const fm_x1 = firstLevelMarginLeft + SQURE_WIDTH + SQURE_H_DISTANCE / 2
        const fm_y2 = SQURE_V_DISTANCE/2
        // 水平线
        const h_x1 = secondLevelMarginLeft + SQURE_WIDTH /2
        const distance = SQURE_WIDTH + SQURE_H_DISTANCE
        const h_x2 = h_x1 + brotherAndSisterNum * distance
        const h_y1 = SQURE_V_DISTANCE/2
        // 子女向上
        return <Svg
            height={SQURE_V_DISTANCE/2}
            width={width}
        >
              <Line
                x1={fm_x1}
                y1={0}
                x2={fm_x1}
                y2={fm_y2}
                stroke="green"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <Line
                x1={h_x1}
                y1={h_y1}
                x2={h_x2>fm_x1?h_x2:fm_x1}
                y2={h_y1}
                stroke="green"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </Svg>;
    }
}
