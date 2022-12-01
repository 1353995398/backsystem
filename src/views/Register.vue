<template>
  <div class="box">
    <div class="innerbox">
      注册
      <p class="control has-icon">
        <input
          class="input"
          type="text"
          placeholder="用户名"
          v-model="Check.username"
          @blur="check"
        />
        <span class="bottom"></span>
        <span class="right"></span>
        <span class="top"></span>
        <span class="left"></span>
        <i class="fa fa-envelope"></i>
      </p>
      <p class="control has-icon">
        <input
          class="input"
          type="password"
          placeholder="密码"
          v-model="Check.password"
          @blur="check2"
        />
        <span class="bottom"></span>
        <span class="right"></span>
        <span class="top"></span>
        <span class="left"></span>
        <i class="fa fa-lock"></i>
      </p>
      <p class="control has-icon">
        <input
          class="input"
          type="password"
          placeholder="再次输入密码"
          v-model="Check.password2"
          @blur="check3"
        />
        <span class="bottom"></span>
        <span class="right"></span>
        <span class="top"></span>
        <span class="left"></span>
        <i class="fa fa-lock"></i>
      </p>
      <p class="control">
        <el-button class="button is-success" @click="open4">注册</el-button>
        <button class="button is-success" @click="$router.push('./Login')">
          去登录
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Check: {
        username: '',
        password: '',
        password2: ''
      }
    }
  },
  methods: {
    open4() {
      if (this.Check.username || this.Check.password === this.Check.password2) {
        console.log(this.Check)
        const { password, username } = this.Check
        this.$http
          .post('http://localhost:5000/api/v1/register', {
            username: username,
            password: password
          })

          .then((res) => {
            if (res.data.code === 0) {
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 1000
              }),
                this.$router.push('/Login')
            } else {
              this.$message({
                message: '注册失败',
                type: 'error',
                duration: 1000
              })
              this.Check.username = ''
              this.Check.password = ''
              this.Check.password2 = ''
            }
          })
      }
    },
    check() {
      if (!this.Check.username) {
        this.$message.error('请输入用户名')
      }
    },
    check2() {
      console.log(this.Check.password)
      if (this.Check.password.length < 6 || this.Check.password.length > 12) {
        this.$message.error('请输入6~12位密码')
      }
    },
    check3() {
      if (this.Check.password === this.Check.password2) {
      } else {
        this.$message.error('两次密码不一样')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-image: url('../assets/photo-1535224206242-487f7090b5bb.avif');
  height: 100vh;
  width: 100vw;
  background-size: cover;
  position: relative;
  > .innerbox {
    width: 400px;
    height: 300px;
    background-color: white;
    position: absolute;
    top: 100px;
    right: 100px;
    padding: 20px;
    text-align: center;
    font-size: 32px;
    border-radius: 30px;
  }
  span {
    position: absolute;
    background-color: #3cefff;
    transition: transform 0.5s ease;
  }

  .bottom,
  .top {
    height: 1px;
    left: 0;
    right: 0;
    transform: scaleX(0);
  }

  .left,
  .right {
    width: 1px;
    top: 0;
    bottom: 12px;
    transform: scaleY(0);
  }

  .bottom {
    bottom: 13px;
    transform-origin: bottom right;
  }

  input:focus ~ .bottom {
    transform-origin: bottom left;
    transform: scaleX(1);
  }

  .right {
    right: 0;
    transform-origin: top right;
  }

  input:focus ~ .right {
    transform-origin: bottom right;
    transform: scaleY(1);
  }

  .top {
    top: 0;
    transform-origin: top left;
  }

  input:focus ~ .top {
    transform-origin: top right;
    transform: scaleX(1);
  }

  .left {
    left: 0;
    transform-origin: bottom left;
  }

  input:focus ~ .left {
    transform-origin: top left;
    transform: scaleY(1);
  }
  button {
    margin-right: 10px;
  }
}
</style>