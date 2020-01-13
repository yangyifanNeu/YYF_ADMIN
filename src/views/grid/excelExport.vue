<template>
  <div>
    <el-button type="primary" @click="exportExcel">表格导出</el-button>
    <v-chart :options="options" ref="chart" />
  </div>
</template>

<script>
var Excel = require('exceljs');
export default {
  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed',
                },
              },
              data: [[{type: 'min'}, {type: 'max'}]],
            },
          },
          {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      },
    };
  },
  mounted() {},
  computed: {
    demo: () => {
      return 'demo';
    },
  },
  methods: {
    exportExcel() {
      var wb = new Excel.Workbook();
      var ws = wb.addWorksheet('blort');
      var imagews = wb.addWorksheet('image');
      ws.columns = [
        {
          header: 'Id',
          key: 'id',
          width: 10,
        },
        {
          header: 'Name',
          key: 'name',
          width: 32,
        },
        {
          header: 'D.O.B.',
          key: 'dob',
          width: 10,
        },
      ];
      ws.addRow({id: 1, name: 'John Doe', dob: '2015-11-16'});
      let imageId = wb.addImage({
        base64: this.$refs.chart.getDataURL(),
        extension: 'png',
      });
      imagews.addImage(imageId, 'B2:D6');
      wb.xlsx
        .writeBuffer({
          base64: true,
        })
        .then(function(xls64) {
          // build anchor tag and attach file (works in chrome)
          var a = document.createElement('a');
          var data = new Blob([xls64], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          var url = URL.createObjectURL(data);
          a.href = url;
          a.download = 'export.xlsx';
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        });
      console.log('is ok');
    },
  },
};
</script>

<style></style>
