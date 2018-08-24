import React from 'react';
import { ResponsiveBar } from '@nivo/bar'


export default function BarGraphExpenses(props) {

  return (
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
      <div style={{height: '500px'}}>
        <ResponsiveBar
            data={props.graphData}
            keys={[
                "bill"
            ]}
            indexBy="account"
            margin={{
                "top": 50,
                "right": 130,
                "bottom": 50,
                "left": 80
            }}
            padding={0.4}
            layout="horizontal"
            colors="#271672"
            colorBy="id"
            enableLabel={false}
            // labelTextColor="#271672"
            maxValue={props.max}
            legends={[
                {
                    "dataFrom": "keys",
                    "anchor": "bottom-right",
                    "direction": "column",
                    "translateX": 120,
                    "itemWidth": 100,
                    "itemHeight": 20,
                    "itemsSpacing": 2,
                    "symbolSize": 20
                }
            ]}
            theme={{
                "tooltip": {
                    "container": {
                        "fontSize": "13px",
                        "background": "#fff"
                    }
                },
                "labels": {
                    "textColor": "#fff"
                }
            }}
        />
      </div>
  );
}
