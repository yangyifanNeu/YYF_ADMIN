<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-select v-model="columnOne" placeholder="" size="small" style="width:150px" @change="selectChange">
          <el-option v-for="item in searchTypeStore" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="columnTwo" placeholder="" size="small" style="width:150px" @change="selectChange">
          <el-option v-for="item in searchTypeStore" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="gridData" ref="grid">
          <el-table-column :label="columnOneName" :prop="columnOneStatic" min-width="20%"> </el-table-column>
          <el-table-column :label="columnTwoName">
            <template v-for="item in columnTwoStoreArray">
              <el-table-column :label="item.name" :min-width="columnWidth" :key="item.value" :prop="item.value">
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <v-chart :options="options" ref="chart" style="width:100%" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import restUtil from '../../../util/restUtil.js';
const restUrl = '/report/barAndLine';
const downLoadUrl = '/report/download';
// const downLoadUrl = '/report/download/get';
const mapToArray = function(object) {
  var result = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(object[key]);
    }
  }
  return result;
};
const getColumnTwoStoreFromArray = function(array) {
  let result = {};
  array.forEach((item) => {
    let name = item.columnTwo;
    if (!result[name]) {
      result[name] = {
        name: item.columnTwo,
        value: item.columnTwo,
      };
    }
  });
  return {columnTwoStoreArray: mapToArray(result), columnTwoStoreMap: result};
};
export default {
  props: {
    chartType: {
      type: String,
      default: function() {
        return 'line';
      },
    },
  },
  data: () => {
    return {
      columnOne: 'REGION',
      columnOneStatic: 'REGION',
      columnTwo: 'BRAND',
      columnOneName: '区域',
      columnTwoName: '品牌',
      columnWidth: '40%',
      searchTypeStore: [
        {
          value: 'REGION',
          name: '区域',
        },
        {
          value: 'BRAND',
          name: '品牌',
        },
      ],
      columnTwoStoreArray: [],
      gridData: [],
      mapGridData: {},
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: [],
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: [],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [],
      },
    };
  },
  computed: {},
  mounted() {
    this.getdataByCondition();
  },
  methods: {
    getdataByCondition() {
      let columnOne = this.columnOne;
      let columnTwo = this.columnTwo;
      let url = restUrl + `?columnNameOne=${columnOne}&columnNameTwo=${columnTwo}`;
      var $this = this;
      restUtil.get({url}).then((res) => {
        let data = res.data;
        let mapData = {};
        let dataTemplate = {};
        let {columnTwoStoreArray, columnTwoStoreMap} = getColumnTwoStoreFromArray(data);
        console.log(columnTwoStoreMap);
        for (const key in columnTwoStoreMap) {
          if (columnTwoStoreMap.hasOwnProperty(key)) {
            dataTemplate[key] = 0;
          }
        }
        $this.columnTwoStoreArray = columnTwoStoreArray;
        if (columnTwoStoreArray.length > 0) {
          $this.columnWidth = 80 / columnTwoStoreArray.length + '%';
        }
        data.forEach(function(item) {
          let columnNameOne = item.columnOne;
          let columnNameTwo = item.columnTwo;

          if (!mapData[columnNameOne]) {
            mapData[columnNameOne] = Object.assign({}, dataTemplate, {
              [columnOne]: columnNameOne,
            });
          }
          mapData[columnNameOne][columnNameTwo] = item.total;
        });
        window.console.log(mapData);
        $this.mapGridData = mapData;
        $this.gridData = mapToArray(mapData);
        $this.buildChartOptions();
      });
    },
    selectChange() {
      if (this.columnOne !== this.columnTwo) {
        this.getdataByCondition();
        this.columnOneStatic = this.columnOne;
        this.columnOneName = this.getStoreName(this.columnOne);
        this.columnTwoName = this.getStoreName(this.columnTwo);
      } else {
        this.$notify({
          title: '警告',
          message: '下拉列表中应该选择不同的值',
          type: 'warning',
        });
      }
    },
    getStoreName(value) {
      var array = this.searchTypeStore;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.value == value) {
          return element.name;
        }
      }
    },
    buildChartOptions() {
      const chartType = this.chartType;
      let legend = [];
      let xAxisData = [];
      let seriesData = [];
      for (let i = 0; i < this.columnTwoStoreArray.length; i++) {
        const element = this.columnTwoStoreArray[i];
        xAxisData.push(element.name);
      }
      for (const key in this.mapGridData) {
        if (this.mapGridData.hasOwnProperty(key)) {
          legend.push(key);
        }
      }
      for (const key in this.mapGridData) {
        if (this.mapGridData.hasOwnProperty(key)) {
          let mapDataItem = this.mapGridData[key];
          let seriesItem = {
            name: key,
            type: chartType,
            data: [],
          };
          for (let i = 0; i < xAxisData.length; i++) {
            let xkey = xAxisData[i];
            seriesItem.data.push(mapDataItem[xkey]);
          }
          seriesData.push(seriesItem);
        }
      }
      this.options.legend = {data: legend};
      this.options.xAxis[0].data = xAxisData;
      this.options.series = seriesData;
      this.options = JSON.parse(JSON.stringify(this.options));
    },
    downLoad() {
      let {columnOneName, columnTwoName, columnTwoStoreArray} = this;
      let head = [[columnOneName, columnOneName]];
      let headPropName = [this.columnOneStatic];
      let gridData = this.gridData;
      let data = [];
      for (let i = 0; i < columnTwoStoreArray.length; i++) {
        const element = columnTwoStoreArray[i];
        let headItem = [columnTwoName, element.name];
        head.push(headItem);
        headPropName.push(element.value);
      }
      for (let i = 0; i < gridData.length; i++) {
        const gridDataItem = gridData[i];
        let exporGridDataItem = [];
        data.push(exporGridDataItem);
        for (let j = 0; j < headPropName.length; j++) {
          const headName = headPropName[j];
          exporGridDataItem.push(gridDataItem[headName]);
        }
      }
      let baseImage = this.$refs.chart.getDataURL();
      baseImage = baseImage.slice(baseImage.indexOf(',') + 1);
      let option = {
        url: downLoadUrl,
        data: {
          head,
          data,
          baseImage,
          fileName: '线状图报表',
        },
      };
      restUtil.downLoad(option).then((res) => {
        console.log('response: ', res);
        // new Blob([data])用来创建URL的file对象或者blob对象
        let url = window.URL.createObjectURL(new Blob([res.data]));
        // 生成一个a标签
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        // 生成时间戳
        let timestamp = new Date().getTime();
        link.download = timestamp + '.xlsx';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); //释放url
        document.body.removeChild(link); //释放标签
      });
    },
  },
};
</script>

<style></style>
