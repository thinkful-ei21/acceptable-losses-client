import React from 'react';
import { ResponsiveBar } from '@nivo/bar'


export default function BarGraphExpenses() {

  return (
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
      <div style={{height: '500px'}}>
        <ResponsiveBar
            data={[{
                "account": "AD",
                "bill": 183,
                "billColor": "hsl(176, 70%, 50%)"
                // "burger": 24,
                // "burgerColor": "hsl(113, 70%, 50%)",
                // "sandwich": 189,
                // "sandwichColor": "hsl(141, 70%, 50%)",
                // "kebab": 137,
                // "kebabColor": "hsl(13, 70%, 50%)",
                // "fries": 98,
                // "friesColor": "hsl(135, 70%, 50%)",
                // "donut": 172,
                // "donutColor": "hsl(94, 70%, 50%)"
              },
              {
                "account": "AE",
                "bill": 170,
                "billColor": "hsl(225, 70%, 50%)"
                // "burger": 46,
                // "burgerColor": "hsl(277, 70%, 50%)",
                // "sandwich": 153,
                // "sandwichColor": "hsl(57, 70%, 50%)",
                // "kebab": 137,
                // "kebabColor": "hsl(69, 70%, 50%)",
                // "fries": 3,
                // "friesColor": "hsl(77, 70%, 50%)",
                // "donut": 137,
                // "donutColor": "hsl(348, 70%, 50%)"
              },
              {
                "account": "AF",
                "bill": 43,
                "billColor": "hsl(146, 70%, 50%)"
                // "burger": 59,
                // "burgerColor": "hsl(284, 70%, 50%)",
                // "sandwich": 84,
                // "sandwichColor": "hsl(136, 70%, 50%)",
                // "kebab": 148,
                // "kebabColor": "hsl(225, 70%, 50%)",
                // "fries": 123,
                // "friesColor": "hsl(292, 70%, 50%)",
                // "donut": 173,
                // "donutColor": "hsl(161, 70%, 50%)"
              },
              {
                "account": "AG",
                "bill": 13,
                "billColor": "hsl(123, 70%, 50%)"
                // "burger": 136,
                // "burgerColor": "hsl(78, 70%, 50%)",
                // "sandwich": 49,
                // "sandwichColor": "hsl(270, 70%, 50%)",
                // "kebab": 67,
                // "kebabColor": "hsl(103, 70%, 50%)",
                // "fries": 19,
                // "friesColor": "hsl(15, 70%, 50%)",
                // "donut": 18,
                // "donutColor": "hsl(90, 70%, 50%)"
              },
              {
                "account": "AI",
                "bill": 109,
                "billColor": "hsl(302, 70%, 50%)"
                // "burger": 119,
                // "burgerColor": "hsl(52, 70%, 50%)",
                // "sandwich": 97,
                // "sandwichColor": "hsl(146, 70%, 50%)",
                // "kebab": 61,
                // "kebabColor": "hsl(71, 70%, 50%)",
                // "fries": 6,
                // "friesColor": "hsl(255, 70%, 50%)",
                // "donut": 40,
                // "donutColor": "hsl(46, 70%, 50%)"
            }]}
            keys={[
                "bill"

            ]}
            indexBy="account"
            margin={{
                "top": 50,
                "right": 130,
                "bottom": 50,
                "left": 60
            }}
            padding={0.4}
            layout="horizontal"
            colors="nivo"
            colorBy="id"
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
