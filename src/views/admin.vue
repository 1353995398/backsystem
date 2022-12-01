<template>
  <div>
    <el-container>
      <!-- 左侧 -->
      <transition name="el-zoom-in-center">
        <el-aside width="200px" v-show="isCollapse"
          ><el-row class="tac">
            <el-col :span="24">
              <el-menu
                :default-active="default_active"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
              >
                <img src="../assets/log.webp" alt="" />
                <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组二">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu> -->
                <el-menu-item index="/admin/dashboard">
                  <i class="el-icon-setting"></i>
                  <span slot="title">控制台</span>
                </el-menu-item>
                <el-menu-item index="/admin/user">
                  <i class="el-icon-user"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/goods">
                  <i class="el-icon-goods"></i>
                  <span slot="title">商品管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="24"> </el-col>
          </el-row>
        </el-aside>
      </transition>
      <!-- 右侧 -->
      <el-container>
        <el-header>
          <div>
            <i
              :class="a ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
              style="font-size: 24px; cursor: pointer"
              @click="Collapse"
            >
            </i>
            <span style="margin-left: 20px; font-size: 20px"
              >欢迎【{{ username }}】登录!</span
            >
            <i class="el-icon-user-solid" @click="quit"> 退出</i>
          </div>
        </el-header>
        <el-main>
          <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            ><router-view></router-view>
          </transition>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem('username'),
      default_active: this.$route.fullPath,
      a: true,
      isCollapse: true
    }
  },
  updated() {
    this.default_active = this.$route.fullPath
  },
  methods: {
    quit() {
      this.$message({
        message: '退出成功',
        type: 'success',
        duration: 1000
      })
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$router.push('/login')
    },
    Collapse() {
      ;(this.isCollapse = !this.isCollapse), (this.a = !this.a)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-user-solid {
  float: right;
  margin-top: 20px;
  cursor: pointer;
}
.el-container {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #e5efee;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #efeee5;
  color: #333;
  text-align: left;
  line-height: 0px;
}

.el-main {
  margin: 20px;
  background-color: #eee5ef;
  color: #333;
  text-align: center;
  // line-height: 160px;
  //   height: 100vh;
}
// .el-row{
//     width: 200px;
// }
.el-menu {
  background-color: #efeee5;
}
</style>