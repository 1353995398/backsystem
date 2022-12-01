<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }"
          >控制台</el-breadcrumb-item
        >
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input
        style="width: 200px"
        v-model="keywords"
        size="mini"
        placeholder="输入关键字搜索"
        @input="search"
      />
      <!-- 添加用户 -->
      <el-button
        type="primary"
        @click="openDialog"
        style="height: 30px; line-height: 5px"
        >添加用户</el-button
      >
      <el-dialog :title="this.title" :visible.sync="dialogFormVisible">
        <el-form>
          <div class="intext">
            用户名：
            <input
              type="text"
              placeholder="输入用户名"
              @blur="checkUname"
              style="height: 30px"
              v-model="form.username"
            />
            <i
              class="el-icon-circle-check"
              style="color: green"
              v-show="unameStatus === 2"
            ></i>
            <i
              class="el-icon-circle-close"
              style="color: red"
              v-show="unameStatus === 1"
            ></i>
            <div style="color: red" v-show="unameStatus === 1">
              请输入正确的用户名
            </div>
          </div>
          <div style="margin-bottom: 20px">
            性别：
            <el-radio v-model="form.sex" label="男" border>男</el-radio>
            <el-radio v-model="form.sex" label="女" border>女</el-radio>
          </div>
          <div class="intext">
            年龄：<input
              v-model="form.age"
              type="text"
              placeholder="输入年龄"
              style="height: 30px"
              @blur="checkAge"
            />
            <i
              class="el-icon-circle-check"
              style="color: green"
              v-show="ageStatus === 2"
            ></i>
            <i
              class="el-icon-circle-close"
              style="color: red"
              v-show="ageStatus === 1"
            ></i>
            <div style="color: red" v-show="ageStatus === 1">请输入年龄</div>
          </div>
          <div class="intext">
            手机号：
            <input
              type="text"
              v-model="form.phone"
              placeholder="输入手机号"
              style="height: 30px"
            />
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="addtableData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 表格渲染 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 10px"
      height="530"
    >
      <el-table-column sortable prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column sortable prop="sex" label="性别"> </el-table-column>
      <el-table-column sortable prop="age" label="年龄"> </el-table-column>
      <el-table-column sortable prop="phone" label="手机号"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            style="margin-right: 10px"
            >修改</el-button
          >
          <el-popconfirm
            title="确定删除吗？"
            @confirm="del(scope.$index, scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import url from '@/config/url'
import axios from '@/http/req'
export default {
  data() {
    return {
      keywords: '',
      title: '添加用户',
      visible: false,
      tableData: [],
      username: '',
      age: '',
      sex: '',
      phone: '',
      unameStatus: 0,
      ageStatus: 0,
      dialogFormVisible: false,
      form: {
        username: '',
        age: '',
        sex: '',
        phone: ''
        // delivery: false
      },
      formLabelWidth: '120px',
      members_bak: []
    }
  },
  methods: {
    // 搜索
    search() {
      axios.get(url.member + 'phone=' + this.keywords).then((res) => {
        console.log(res.data.code);
        if (res.data.code === 0) {
          this.tableData = res.data.data
        }
      })
    },
    // 取消的操作
    cancelForm() {
      this.dialogFormVisible = false
      window.location.reload()
    },
    // 打开弹窗
    openDialog() {
      this.dialogFormVisible = true
      this.form = {}
      this.title = '添加用户'
    },
    // 修改操作
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.title = '修改用户'
      this.form = row
    },
    // 删除操作
    del(index, row) {
      console.log('删除了')
      axios.delete(url.members + '/' + row.phone).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          window.location.reload()
        } else {
          this.$message({
            message: '删除失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    addtableData() {
      if (this.title === '修改用户') {
        console.log('修改')
        axios.put(url.members, this.form).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            })
            window.location.reload()
          } else {
            this.$message({
              message: '修改失败',
              type: 'error',
              duration: 1000
            })
          }
          console.log(res.data.code)
        })
      } else {
        console.log('添加')
        axios.post(url.members, this.form).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: '添加成功',
              type: 'success',
              duration: 1000
            })
            this.dialogFormVisible = false
            this.tableData.unshift(this.form)
          } else {
            alert('添加失败')
          }
        })
      }
    },
    checkUname() {
      if (/[\u4E00-\u9FA5]+/.test(this.form.username)) {
        this.unameStatus = 2
      } else {
        this.unameStatus = 1
      }
    },
    checkAge() {
      if (this.form.age) {
        this.ageStatus = 2
      } else {
        this.ageStatus = 1
      }
    }
  },
  created() {
    this.$http.get(url.members).then((res) => {
      this.tableData = res.data.data
    })
  }
}
</script>
<style lang="scss" scoped>
.intext {
  margin-bottom: 20px;
  //   width: 200px;
  //   height: 50px;
}
</style>