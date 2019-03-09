import React, {
    Component
} from 'react';

import { Svg } from 'expo';
const {
    Line
} = Svg;


export default class FatherAndMotherLine extends Component{

    render() {
        const height=this.props.height
        const width=this.props.width
        const hasChild = this.props.hasChild
        return <Svg
            height={height}
            width={width}
        >
            <Line
                x1='0'
                y1={height/2}
                x2={width}
                y2={height/2}
                stroke="green"
                strokeWidth="3"
                strokeLinecap="round"
            />
            {hasChild &&
            <Line
                x1={width/2}
                y1={height/2}
                x2={width/2}
                y2={height}
                stroke="green"
                strokeWidth="3"
                strokeLinecap="round"
            />}

        </Svg>;
    }
}