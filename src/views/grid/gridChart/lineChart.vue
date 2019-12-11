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
      <el-col :span="12">
        <el-table :data="gridData">
          <el-table-column :label="columnOneName" :prop="columnOne" min-width="20%"> </el-table-column>
          <el-table-column :label="columnTwoName">
            <template v-for="item in columnTwoStoreArray">
              <el-table-column :label="item.name" :min-width="columnWidth" :key="item.value" :prop="item.value">
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <v-chart :options="options" ref="chart" style="width:100%" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import restUtil from '../../../util/restUtil.js';
const restUrl = '/report/barAndLine';
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
  data: () => {
    return {
      columnOne: 'REGION',
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
        this.columnOneName = this.getStoreName(this.columnOne);
        this.columnTwoName = this.getStoreName(this.columnTwo);
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
        debugger;
        if (this.mapGridData.hasOwnProperty(key)) {
          let mapDataItem = this.mapGridData[key];
          let seriesItem = {
            name: key,
            type: 'bar',
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
    },
  },
};
</script>

<style></style>
