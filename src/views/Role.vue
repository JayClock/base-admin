<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini">设置权限</el-button>
            <el-button type="danger" size="mini" @click="handleDel(scope.row._id)">删除</el-button>
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
    <el-dialog title="用户新增" v-model="showModal">
      <el-form ref="dialogForm" :model="roleForm" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="2" v-model="roleForm.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import api from '../api'
import utils from '../utils/utils'

export default {
  name: 'role',
  data() {
    return {
      queryForm: {
        roleName: ''
      },
      columns: [
        {
          label: '角色名称',
          prop: 'roleName'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '权限列表',
          prop: 'menuType'
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          formatter(row, column, value) {
            return utils.formateDate(new Date(value))
          }
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter(row, column, value) {
            return utils.formateDate(new Date(value))
          }
        }
      ],
      roleList: [],
      pager: {
        total: 0,
        pageNum:1,
        pageSize: 2
      },
      showModal: false,
      action: 'create',
      roleForm: {},
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色角色名称'
          }
        ]
      }
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    // 菜单列表初始化
    async getRoleList() {
      try {
        const { list, page } = await api.getRoleList({ ...this.queryForm, ...this.pager })
        this.roleList = list
        this.pager.total = page.total
      } catch (e) {
        throw new Error(e)
      }
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields()
    },
    // 角色添加
    handleAdd() {
      this.action = 'create'
      this.showModal = true
    },
    // 角色编辑
    handleEdit({ _id, roleName, remark }) {
      this.action = 'edit'
      this.showModal = true
      this.$nextTick(() => {
        this.roleForm = { _id, roleName, remark }
      })
    },
    // 角色删除
    async handleDel(_id) {
      await api.roleOperate({ _id, action: 'delete' })
      this.$message.success('删除成功')
      this.getRoleList()
    },
    // 弹框关闭
    handleClose() {
      this.handleReset('dialogForm')
      this.showModal = false
    },
    // 角色提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          const { roleForm, action } = this
          const params = { ...roleForm, action }
          const res = await api.roleOperate(params)
          if (res) {
            this.showModal = false
            this.$message.success('创建成功')
            this.handleReset('dialogForm')
            this.getRoleList()
          }
        }
      })
    },
    handleCurrentChange(current) {
      this.pager.pageNum = current
      this.getRoleList()
    }
  }
}
</script>

<style lang="scss"></style>
