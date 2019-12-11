<template>
  <el-container>
    <el-aside width="400px">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>查询</span>
        </div>
        <el-form ref="form" :model="form" label-width="80px" label-position="top" size="mini" class="search-form">
          <el-form-item label="车架号">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="十七位车架号（最多不超过十个）">
            <el-input v-model="form.region" type="textarea"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="upload">上传</el-button>
            <el-button>清除</el-button>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="form.supplier" placeholder="" size="small" style="width:100%">
              <el-option v-for="item in supplierCode" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="UC类别">
            <el-select v-model="form.uckind" placeholder="" size="small" style="width:100%">
              <el-option v-for="item in uckindCode" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.uckind" placeholder="" size="small" style="width:100%">
              <el-option v-for="item in uckindCode" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="CBU编号">
            <el-select v-model="form.uckind" placeholder="" size="small" style="width:100%">
              <el-option v-for="item in uckindCode" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="CKD编号">
            <el-select v-model="form.uckind" placeholder="" size="small" style="width:100%">
              <el-option v-for="item in uckindCode" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Ecode">
            <el-select v-model="form.uckind" placeholder="" size="small" style="width:100%">
              <el-option v-for="item in uckindCode" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交车日期起止日期">
            <el-date-picker
              v-model="form.jcDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="申请日期起至日期">
            <el-date-picker
              v-model="form.sqDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-aside>
    <el-main height="100%" style="padding:0 20px">
      <el-card class="grid-title box-card" shadow="never">
        <div slot="header">
          <span>
            <el-button type="primary" @click="pieChart" size="small">饼状图</el-button>
            <el-button type="primary" @click="barChart" size="small">柱状图</el-button>
            <el-button type="primary" @click="lineChart" size="small">线状图</el-button>
          </span>
        </div>
        <!-- card body -->
        <el-table :data="gridInfo.result" style="width: 100%" v-loading.fullscreen.lock="gridInfo.loading">
          <el-table-column label="查看" width="80">
            <template slot-scope="scope">
              <i class="el-icon-search" @click="showDetail(scope.row, scope.$index)"></i>
            </template>
          </el-table-column>
          <template v-for="item in ucReportStructure">
            <el-table-column
              :label="item.label"
              :width="item.width || 300"
              :key="item.name"
              :prop="item.name"
              :formatter="dataFormatter"
            >
            </el-table-column>
          </template>
        </el-table>

        <el-row :gutter="24">
          <el-col :span="4" class="export-col">
            <i class="el-icon-download" @click="exportGrid"></i>
          </el-col>
          <el-col :span="20">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="gridInfo.pageNo"
              :page-size="gridInfo.pageSize"
              layout="prev, pager, next, jumper, ->, total"
              :total="gridInfo.total"
            />
          </el-col>
        </el-row>
      </el-card>
      <el-dialog title="饼状图" :visible.sync="dialogVisible" width="60%" :before-close="handleCloseDialog">
        <pieChartComponent ref="pieChart" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        <span slot="title" class="dialog-header">
          <h1 style="width: auto;display: inline-block;">饼状图</h1>
          <el-button @click="downloadGridAndChart" type="primary" style="float: right;margin-right: 46px" size="small"
            >下载</el-button
          >
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';
import {createNamespacedHelpers} from 'vuex';
import pieChartComponent from './gridChart/pieChart';
const API_PREFIX_URL = 'http://10.4.50.59:8999';
const GRID_DATA_URL = '/report/list';
const pageSize = 10;
const {mapGetters} = createNamespacedHelpers('bmw/unReport');
export default {
  components: {
    pieChartComponent,
  },
  data: () => {
    return {
      tableData: [],
      tableStructure: [],
      currentPage: 1,
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        supplier: null,
        uckind: null,
        jcDate: '',
        sqDate: '',
      },
      supplierCode: [
        {
          name: '供应商A',
          value: 'supplierA',
        },
        {
          name: '供应商B',
          value: 'supplierB',
        },
        {
          name: '供应商C',
          value: 'supplierC',
        },
      ],
      uckindCode: [
        {
          name: 'UC类别A',
          value: 'uckindA',
        },
        {
          name: 'UC类别B',
          value: 'uckindB',
        },
        {
          name: 'UC类别C',
          value: 'uckindC',
        },
      ],
      gridInfo: {
        total: 0,
        pageSize: 10,
        pageNo: 1,
        result: [],
        loading: false,
      },
    };
  },
  mounted() {},
  created() {
    const pageInfo = {
      pageNo: 1,
      pageSize: pageSize,
    };
    this.getGridDataByPage(pageInfo);
  },
  computed: {
    ...mapGetters(['ucReportStructure']),
  },
  methods: {
    dataFormatter(row, column, cellValue, index) {
      if (typeof index !== 'undefined') {
        var date = row[column.property];
        return date;
      }
      return cellValue;
    },
    onSubmit(event) {
      window.console.log(event);
    },
    pieChart() {
      this.dialogVisible = true;
    },
    lineChart() {},
    barChart() {},
    upload() {},
    handleSizeChange() {},
    handleCurrentChange(pageIndex) {
      const pageInfo = {
        pageNo: pageIndex,
        pageSize: pageSize,
      };
      this.getGridDataByPage(pageInfo);
    },
    exportGrid() {
      window.console.log('导出表格');
    },
    getGridDataByPage(pageInfo) {
      var $this = this;
      $this.gridInfo.loading = true;
      const resetUrl = API_PREFIX_URL + GRID_DATA_URL + `?pageSize=${pageInfo.pageSize}&pageNo=${pageInfo.pageNo}`;
      axios.get(resetUrl).then((res) => {
        $this.gridInfo.loading = false;
        if (res.data.code == '200') {
          this.gridInfo = Object.assign(this.gridInfo, res.data.data);
        }
        $this.$forceUpdate();
      });
    },
    showDetail() {
      window.console.log(...arguments);
    },
    handleCloseDialog() {
      this.dialogVisible = false;
    },
    downloadGridAndChart() {
      this.$refs.pieChart.downLoad();
    },
  },
};
</script>

<style lang="less">
.grid-title .el-card__header {
  padding: 12px 20px;
}
.search-form {
  .el-form-item {
    margin-bottom: 10px;
    .el-form-item__label {
      padding-bottom: 0px;
    }
  }
}
.export-col {
  line-height: 32px;
  text-align: right;
  .el-icon-download {
    cursor: pointer;
  }
}
</style>
