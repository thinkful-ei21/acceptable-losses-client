import React from 'react';
import { ResponsivePie } from '@nivo/pie';

import styles from '../styles/graphs.module.css';

export default function PieChartExpenses(props) {
  return (
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
    <div className={styles.pieChart} aria-label="Expenses pie chart">
      <ResponsivePie
        data={props.graphData}
        margin={{
          top: 40,
          right: 0,
          bottom: 80,
          left: 0
        }}
        sortByValue={true}
        innerRadius={0.65}
        padAngle={2}
        cornerRadius={3}
        colors={['#FF927C', '#005D70', '#00AEA0', '#A8009C', '#6F0084']}
        colorBy="id"
        enableRadialLabels={false}
        isInteractive={true}
        theme={{
          tooltip: {
            container: {
              fontSize: '13px'
            }
          },
          labels: {
            textColor: '#fff'
          }
        }}
      />
    </div>
  );
}
