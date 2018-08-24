import React from 'react';
import { ResponsivePie } from '@nivo/pie'


export default function PieChartExpenses(props) {
  // console.log(props.graphData);
  const dummyData = [
    {
      "id": "Netflix",
      "label": "Netflix",
      "value": 7
    },
    {
      "id": "Phone",
      "label": "Phone",
      "value": 167
    },
    {
      "id": "Internet",
      "label": "Internet",
      "value": 71
    },
    {
      "id": "Insurance",
      "label": "Insurance",
      "value": 366
    },
    {
      "id": "Rent",
      "label": "Rent",
      "value": 439
    }
  ]

  return (
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
    <div style={{height: '500px'}}>
      <ResponsivePie
          data={props.graphData}
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
          isInteractive={true}
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
          // legends={[
          //   {
          //     "anchor": "bottom",
          //     "direction": "row",
          //     "translateY": 56,
          //     "itemWidth": 100,
          //     "itemHeight": 18,
          //     "symbolSize": 18,
          //     "symbolShape": "circle"
          //   }
          // ]}
      />
    </div>
  );
}
