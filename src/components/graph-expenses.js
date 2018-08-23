import React from 'react';
import { ResponsivePie } from '@nivo/pie'


export default function GraphExpenses() {

  return (
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
    <div style={{height: '500px'}}>
      <ResponsivePie
          data={[
            {
              "id": "Netflix",
              "label": "Netflix",
              "value": 7,
              "color": "#FF927C"
            },
            {
              "id": "Phone",
              "label": "Phone",
              "value": 167,
              "color": "#005D70"
            },
            {
              "id": "Internet",
              "label": "Internet",
              "value": 71,
              "color": "#00AEA0"
            },
            {
              "id": "Insurance",
              "label": "Insurance",
              "value": 366,
              "color": "#A8009C"
            },
            {
              "id": "Rent",
              "label": "Rent",
              "value": 439,
              "color": "#6F0084"
            }
          ]}
          margin={{
            "top": 40,
            "right": 0,
            "bottom": 80,
            "left": 0
          }}
          sortByValue={true}
          innerRadius={0.65}
          padAngle={2}
          cornerRadius={3}
          colors={["#FF927C", "#005D70", "#00AEA0", "#A8009C", "#6F0084"]}
          colorBy="id"
          enableRadialLabels={false}
          isInteractive={false}
          theme={{
            "tooltip": {
              "container": {
                "fontSize": "13px"
              }
            },
            "labels": {
              "textColor": "#fff"
            }
          }}
          legends={[
            {
              "anchor": "bottom",
              "direction": "row",
              "translateY": 56,
              "itemWidth": 100,
              "itemHeight": 18,
              "symbolSize": 18,
              "symbolShape": "circle"
            }
          ]}
      />
    </div>
  );
}
