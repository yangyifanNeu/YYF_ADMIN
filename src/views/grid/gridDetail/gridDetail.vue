<template>
  <div>
    <el-row>
      <el-col :span="15">
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>经销商信息</span>
              </div>
              <el-form ref="dealerInfoForm" label-width="80px" label-position="top" size="mini" class="search-form">
                <el-row>
                  <div v-for="item in dealerInfoStructure" :key="item.name">
                    <el-col :span="6">
                      <el-form-item :label="item.label">
                        <el-input :value="formData[item.name]" size="small" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>车辆信息</span>
              </div>
              <el-form ref="carInfoForm" label-width="80px" label-position="top" size="mini" class="search-form">
                <el-row>
                  <div v-for="item in carInfoStructure" :key="item.name">
                    <el-col :span="6">
                      <el-form-item :label="item.label">
                        <el-input :value="formData[item.name]" size="small" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>销售及收益信息</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>库存报表</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>保修信息</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="9">
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>文件</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>操作记录</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapGetters} = createNamespacedHelpers('bmw/unReport');
export default {
  props: ['formData'],
  computed: {
    ...mapGetters(['dealerInfoStructure', 'carInfoStructure']),
  },
  updated() {
    window.console.log(this.formData);
  },
};
</script>

<style></style>
