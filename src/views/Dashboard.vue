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
    </el-breadcrumb>
    <div>
      <div class="top">
        <el-card class="box-card" style="margin-bottom: 30px;">
          <div class="left">
            <img src="../assets/头像.jpg" alt="" />
            <div>
              <p style="font-size: 18px">{{ username }}</p>
              <p style="font-size: 12px; color: gray">管理员</p>
            </div>
          </div>
        </el-card>
        <div class="right">
          <el-card
            v-for="item in count"
            :key="item.name"
            :body-style="{ display: 'flex' }"
          >
            <i
              :class="`el-icon-${item.icon}`"
              style="
                width: 80px;
                height: 80px;
                font-size: 30px;
                color: white;
                line-height: 80px;
              "
              :style="{ background: item.color }"
            ></i>
            <div>
              <p style="font-size: 30px">￥{{ item.value }}</p>
              <p>{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="bottom" style="display:flex">
      <el-card class="box-card" style="width: 500px;margin-top:60px;margin-right:20px">
        <Bar
          :xdata="xdata"
          :ydata="ydata"
          id="salecount"
          v-if="xdata.length > 0"
        ></Bar>
      </el-card>
      <el-card class="box-card" style="width: 350px;margin-top:60px">
        <LineMap
          :xdata="xdata"
          :ydata="ydata"
          id="salecount2"
          v-if="xdata.length > 0"
        ></LineMap>
      </el-card>
      <el-card class="box-card" style="width: 450px;margin-top:60px;margin-left:20px">
       <Time id="main1"></Time>
      </el-card>
    </div>
  </div>
</template>

<script>
import Bar from '@/components/Bar.vue'
import Time from '@/components/Time.vue'
import LineMap from '@/components/Line.vue'
import axios from 'axios'
import url from '@/config/url'
export default {
  components: { Bar, LineMap,Time },
  data() {
    return {
      username: localStorage.getItem('username'),
      count: [],
      xdata: [],
      ydata: []
    }
  },
  created() {
    this.getSaleCount(), this.loadData()
  },
  methods: {
    loadData() {
      axios.get(url.count).then((res) => {
        console.log(res)
        this.count = res.data
      })
    },
    getSaleCount() {
      axios.get(url.saleCount).then((res) => {
        res.data.forEach((item) => {
          this.xdata.push(item.name)
          this.ydata.push(item.num)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  height: 180px;
  .right {
    margin-left: 30px;
    width: 900px;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 10px;
    }
  }
}
.bottom {
  margin-top: 30px;
}
.left {
  width: 250px;
  height: 100px;
  display: flex;
  align-items: center;
  

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-left: 20px;
  }
}
</style>