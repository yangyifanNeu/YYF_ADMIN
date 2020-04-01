<template>
  <div>
    <v-chart :options="options" ref="chart" autoresize="true" />
  </div>
</template>

<script>
import moment from 'moment';
const options = {
  title: {
    text: '动态数据',
    subtext: '纯属虚构',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56',
      },
    },
  },
  legend: {
    data: ['实际成交价', '预测成交价'],
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: [],
    },
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '价格',
      max: 10,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
  ],
  series: [
    {
      name: '实际成交价',
      type: 'bar',
      data: [],
    },
    {
      name: '预测成交价',
      type: 'line',
      data: [],
    },
  ],
};
export default {
  data: () => {
    return {
      options: options,
    };
  },
  mounted() {
    let $this = this;
    var socket = new WebSocket('ws://localhost:3000/socketTest');
    socket.addEventListener('open', function() {
      console.log('socket is open');
    });

    socket.addEventListener('message', function(event) {
      let data = JSON.parse(event.data);
      $this.options.xAxis[0].data = data.map((item) => moment(item.label).format('HH:mm:ss'));
      $this.options.series[0].data = data.map((item) => item.value_real);
      $this.options.series[1].data = data.map((item) => item.value);
    });
    this.socket = socket;
  },
  computed: {
    demo: () => {
      return 'demo';
    },
  },
  beforeDestroy() {
    this.socket.close();
  },
};
</script>

<style>
.echarts {
  width: 100%;
  height: 400px;
}
</style>
