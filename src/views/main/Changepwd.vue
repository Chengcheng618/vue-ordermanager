<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <p>
      <span>原密码</span>
      <el-input v-model="oldpwd" @blur="pblur" clearable></el-input>
    </p>
    <span class="title">{{txt}}</span>
    <p>
      <span>新密码</span>
      <el-input placeholder="请输入新密码" show-password v-model="newpwd"></el-input>
    </p>
    <p>
      <span>确认新密码</span>
      <el-input placeholder="请再次输入新密码" v-model="surenewpwd" show-password></el-input>
    </p>
    <span class="twotitle">{{twopoint}}</span>
    <!-- <p style="margin-left:200px;font-size:14px;color:red">{{point}}</p> -->
    <p>
      <el-button type="primary" size="small" style="margin-left:110px" @click="clicksure">确定</el-button>
      <el-button size="small">重置</el-button>
    </p>
  </el-card>
</template>

<script>
import { inspectpwd, changepwd } from "@/api/apis";
export default {
  data() {
    return {
      oldpwd: "",
      txt: "",
      newpwd: "",
      surenewpwd: "",
      twopoint: "",
    };
  },
  methods: {
    pblur() {
      inspectpwd(this.oldpwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          this.txt = res.data.msg;
        } else {
          this.txt = res.data.msg;
        }
      });
    },
    clicksure() {
      if (this.newpwd == this.surenewpwd) {
        changepwd(this.surenewpwd, localStorage.id).then((res) => {
          if (res.data.code == 0) {
            this.$alert(res.data.msg, "", {
              confirmButtonText: "确定",
              callback: () => {
                this.$message({
                  type: "success",
                  message: "跳往登录页面",
                });
                this.$router.push("/");
              },
            });
          }
        });
      }else{
        this.twopoint='两次密码输入不一致'
        return
      }
    },
  },
};
</script>

<style lang="less" scoped>
p {
  display: flex;
  margin: 0 0 20px 60px;
  width: 320px;
  justify-content: space-between;
  align-items: center;
  .el-input {
    width: 200px;
    position: relative;
  }
  .el-button {
    margin-top: 20px;
  }
  span {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
}
.title {
  color: red;
  position: absolute;
  top: 160px;
  left: 620px;
  font-size: 14px;
}
.twotitle {
  color: red;
  position: absolute;
  top: 280px;
  left: 620px;
  font-size: 14px;
}
</style>