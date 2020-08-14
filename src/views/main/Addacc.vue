<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加账号</span>
    </div>
    <p>
      <span>账号</span>
      <el-input v-model="usernum" clearable></el-input>
    </p>
    <p>
      <span>密码</span>
      <el-input v-model="pwd" show-password></el-input>
    </p>
    <p>
      <span>用户组</span>
      <el-select v-model="user" placeholder="请选择用户组">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </p>
    <p>
      <el-button type="primary" size="small" style="margin-left:110px" @click="clickbtn">添加</el-button>
      <el-button size="small" @click="removebtn">重置</el-button>
    </p>
  </el-card>
</template>

<script>
import { addnum } from "@/api/apis";
export default {
  data() {
    return {
      usernum: "",
      pwd: "",
      user: "",
      options: [
        { value: "超级管理员", label: "超级管理员" },
        { value: "普通管理员", label: "普通管理员" },
      ],
    };
  },
  methods: {
    clickbtn() {
      addnum(this.usernum, this.pwd, this.user).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          (this.usernum = ""), (this.pwd = ""), (this.user = "");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    removebtn() {
      (this.usernum = ""), (this.pwd = ""), (this.user = "");
    },
  },
};
</script>

<style lang="less" scoped>
p {
  display: flex;
  margin-left: 60px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 320px;
  .el-input,
  .el-select {
    width: 200px;
  }
  span {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
}
</style>