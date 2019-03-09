import React, {
    Component
} from 'react';

import { Svg } from 'expo';
const {
    Line
} = Svg;
import { SQURE_HEIGHT, SQURE_WIDTH, BORDER_WIDTH, SQURE_H_DISTANCE, SQURE_V_DISTANCE } from './settings'

export default class ThirdLevelTop extends Component{

    render() {
        return <Svg
            height={SQURE_V_DISTANCE/(this.props.spouseNum + 1)}
            width={SQURE_WIDTH}
        >
            <Line
                x1={SQURE_WIDTH/2}
                y1={0}
                x2={SQURE_WIDTH/2}
                y2={SQURE_V_DISTANCE/(this.props.spouseNum + 1)}
                stroke="green"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </Svg>;
    }
}

