<template>
  <div class="container">
    <div class="center">
      <h3>稻草人系统登录</h3>
      <div>
        <el-input placeholder="用户名" v-model="user" clearable prefix-icon="el-icon-user-solid"></el-input>
      </div>
      <div>
        <el-input placeholder="密码" v-model="pwd" show-password prefix-icon="el-icon-lock"></el-input>
      </div>
      <P style="font-size:12px;color:red;margin-top:10px">{{txt}}</P>
      <el-button type="primary" style="width:100%;height:35px" @click="clickbtn">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "../api/apis";

export default {
  methods: {
    clickbtn() {
      login(this.user, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.token = res.data.token; //存入token
          localStorage.user = this.user; //存入用户名
          localStorage.role=res.data.role;//存入用户权限
          localStorage.id=res.data.id;//存入用户id
          this.$router.push("/main/Index"); //改変hash地址
          this.$message({
            //消息成功弹框
            message: "恭喜您,登录成功",
            type: "success",
          });
        } else {
          this.txt = res.data.msg;
        }
        console.log(res.data);
      });
    },
  },
  data() {
    return {
      user: "",
      pwd: "",
      txt: "",
    };
  },
};
</script>
<style lang="less">
.container {
  background: #2d3a4b;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .center {
    width: 300px;
    height: 200px;
    border-radius: 10px;
    position: relative;
    .el-button {
      margin-top: 20px;
    }
    h3 {
      color: #fff;
      text-align: center;
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    .el-input__inner {
      background-color: transparent;
      color: #fff;
    }
    i {
      color: #fff;
    }
  }
}
</style>