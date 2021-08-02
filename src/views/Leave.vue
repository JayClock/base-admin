<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="formRef" :inline="true" :model="queryForm">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="queryForm.applyState">
            <el-option value="" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getApplyList">查询</el-button>
          <el-button @click="handleReset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">申请休假</el-button>
      </div>
      <el-table :data="applyList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template>
            <el-button size="mini">查看</el-button>
            <el-button type="danger" size="mini">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import api from '../api'
import utils from '../utils/utils'

export default {
  name: 'user',
  setup() {
    const queryForm = reactive({
      applyState: ''
    })
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })
    // 定义动态表格-格式
    const columns = reactive([
      {
        label: '单号',
        prop: 'orderNo'
      },
      {
        label: '休假时间',
        prop: '',
        formatter(row) {
          return `${utils.formateDate(new Date(row.startTime), 'yyyy-MM-dd')}到${utils.formateDate(
            new Date(row.endTime),
            'yyyy-MM-dd'
          )}`
        }
      },
      {
        label: '休假时长',
        prop: 'leaveTime'
      },
      {
        label: '休假类型',
        prop: 'applyType',
        formatter(row, column, value) {
          return {
            1: '事假',
            2: '调休',
            3: '年假'
          }[value]
        }
      },
      {
        label: '休假原因',
        prop: 'reason'
      },
      {
        label: '申请时间',
        prop: 'createTime',
        width: 180,
        formatter: (row, column, value) => utils.formateDate(new Date(value))
      },
      {
        label: '审批人',
        prop: 'auditUser'
      },
      {
        label: '当前审批人',
        prop: 'curAuditUserName'
      },
      {
        label: '审批状态',
        prop: 'applyState',
        formatter: () =>
          // 1:待审批 2:审批中 3:审批拒绝 4:审批通过 5:作废
          ({
            1: '待审批',
            2: '审批中',
            3: '审批拒绝',
            4: '审批通过',
            5: '作废'
          })
      }
    ])
    const applyList = ref([])
    // 初始化接口调用
    onMounted(() => {
      getApplyList()
    })

    // 加载申请列表
    const getApplyList = async () => {
      const params = { ...queryForm, ...pager }
      const { list, page } = await api.getApplyList(params)
      applyList.value = list
      pager.total = page.total
    }
    const formRef = ref()
    // 重置查询表单
    const handleReset = (form) => {
      form.resetFields()
    }
    // 分页事件处理
    const handleCurrentChange = (current) => {
      pager.pageNum = current
      // getUserList()
    }

    return {
      queryForm,
      pager,
      columns,
      handleCurrentChange,
      handleReset,
      getApplyList,
      applyList,
      formRef
    }
  }
}
</script>
