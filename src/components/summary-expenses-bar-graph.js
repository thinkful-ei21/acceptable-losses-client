import React from 'react';
import { ResponsiveBar } from '@nivo/bar'


export default function BarGraphExpenses() {

  return (
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
      <div style={{height: '500px'}}>
        <ResponsiveBar
            data={[
              {
                "account": "Netflix",
                "bill": 10,
                "billColor": "hsl(176, 70%, 50%)"
              },
              {
                "account": "Rent",
                "bill": 500,
                "billColor": "hsl(225, 70%, 50%)"
              },
              {
                "account": "Phone",
                "bill": 35,
                "billColor": "hsl(146, 70%, 50%)"
              },
              {
                "account": "Insurance",
                "bill": 83.33,
                "billColor": "hsl(123, 70%, 50%)"
              }
            ]}
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
            colors="nivo"
            colorBy="id"
            maxValue={628.33}
            // borderColor="inherit:darker(1.6)"
            // enableGridY={false}
            // labelSkipWidth={12}
            // labelSkipHeight={12}
            // labelTextColor="inherit:darker(1.6)"
            // animate={false}
            // motionStiffness={90}
            // motionDamping={15}
            // tooltip={function(e){}}
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
                    "textColor": "#555"
                }
            }}
        />
      </div>
  );
}
