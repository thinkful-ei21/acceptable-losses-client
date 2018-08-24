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
                // "id": "Netflix",
                "account": "Netflix",
                "bill": 10
                // "billColor": "#A8009C"
              },
              {
                // "id": "Rent",
                "account": "Rent",
                "bill": 500
                // "billColor": "#00AEA0"
              },
              {
                // "id": "Phone",
                "account": "Phone",
                "bill": 35
                // "billColor": "#005D70"
              },
              {
                // "id": "Insurance",
                "account": "Insurance",
                "bill": 83.33
                // "billColor": "#FF927C"
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
            colors="#271672"
            colorBy="id"
            labelTextColor="#fff"
            maxValue={628.33}
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
