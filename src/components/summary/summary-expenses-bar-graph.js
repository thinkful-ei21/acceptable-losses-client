import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

import styles from '../styles/graphs.module.css';

export default function BarGraphExpenses(props) {
  return (
    <div className={styles.expensesBar}>
      <ResponsiveBar
        data={props.graphData}
        keys={props.keys}
        indexBy={props.indexBy}
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 80
        }}
        padding={0.4}
        layout="horizontal"
        colors="#271672"
        colorBy="id"
        enableLabel={false}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -70
        }}
        maxValue="auto"
        theme={{
          tooltip: {
            container: {
              fontSize: '13px',
              background: '#fff'
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
