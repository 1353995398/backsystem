<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 30px"
    >
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }"
        >控制台</el-breadcrumb-item
      >
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <!-- 添加用户 -->
      <el-button
        type="primary"
        @click="openDialog"
        style="height: 30px; line-height: 5px; margin-left: 500px"
        >添加用户</el-button
      >
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品款式">
              <span
                ><img :src="props.row.category2" width="150" /><img
                  :src="props.row.category"
                  width="150"
              /></span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="价格" prop="price"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
      <el-table-column label="销量" prop="buyCount"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            type="success"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-dialog :visible.sync="dialogFormVisible">
            <el-form>
              <div class="intext">
                ID:
                <input
                  type="text"
                  placeholder="id"
                  style="height: 30px; width: 300px"
                  v-model="Edit.id"
                  :disabled="idStatus"
                />
              </div>
              <div class="intext">
                商品名：
                <input
                  type="text"
                  placeholder="输入商品名"
                  style="height: 30px; width: 300px"
                  v-model="Edit.name"
                />
              </div>

              <div class="intext">
                价格：
                <input
                  v-model="Edit.price"
                  type="text"
                  placeholder="输入价格"
                  style="height: 30px; width: 300px"
                />
              </div>
              <div class="intext">
                销量：
                <input
                  type="text"
                  v-model="Edit.buyCount"
                  placeholder="输入销量"
                  style="height: 30px; width: 300px"
                />
              </div>
              <div class="intext">
                图片地址：
                <input
                  type="text"
                  v-model="Edit.category"
                  placeholder="输入款式图片地址"
                  style="height: 30px; width: 300px"
                />
              </div>
              <div class="intext">
                描述：
                <input
                  type="text"
                  v-model="Edit.desc"
                  placeholder="输入描述"
                  style="height: 30px; width: 300px"
                />
              </div>
              <div class="intext">
                商店名称：
                <input
                  type="text"
                  v-model="Edit.shop"
                  placeholder="输入商店名称"
                  style="height: 30px; width: 300px"
                />
              </div>
              <div class="intext">
                商店ID:
                <input
                  type="text"
                  v-model="Edit.shopId"
                  placeholder="输入商店ID"
                  style="height: 30px; width: 300px"
                />
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="addtableData">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/config/url'
export default {
  data() {
    return {
      tableData: [],
      idStatus: true,
      Edit: {
        id: '',
        name: '',
        price: '',
        buyCount: '',
        category: '',
        desc: '',
        shop: '',
        shopID: ''
      },
      dialogFormVisible: false
    }
  },
  methods: {
    // 添加操作
    openDialog() {
      this.dialogFormVisible = true
      this.idStatus = false
      this.Edit = {}
    },
    // 编辑确定操作
    addtableData() {
      if (this.idStatus === true) {
        axios.put(url.goods + '/' + this.Edit.id, this.Edit).then((res) => {
          // console.log(res)
          this.Edit = res.data
          this.dialogFormVisible = false
        })
      } else {
        axios.post(url.goods, this.Edit).then((res) => {
          console.log(res)
          window.location.reload()
        })
      }
    },
    // 编辑操作
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.Edit = row
      this.idStatus = true
    },
    cancelForm() {
      this.dialogFormVisible = false
    },
    // 删除操作
    handleDelete(index, row) {
      axios.delete(url.goods + '/' + row.id).then((res) => {
        this.tableData.splice(index, 1)
      })
    }
  },

  created() {
    axios.get(url.goods).then((res) => {
      // console.log(res)
      this.tableData = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.intext {
  margin-bottom: 20px;

  //   width: 200px;
  //   height: 50px;
}
</style>