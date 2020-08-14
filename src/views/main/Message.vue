<template>
  <div class="containei">
    <p>管理员信息</p>
    <p>
      管理员ID:
      <span>{{id}}</span>
    </p>
    <p>
      账号:
      <span>{{acc}}</span>
    </p>
    <p>
      用户组:
      <span>{{group}}</span>
    </p>
    <p>
      创建时间:
      <span>{{time}}</span>
    </p>
    <p>
      管理员头像:
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :on-success="handleAvatarSuccess"
        :data="uploadimg"
        style="border: 1px dashed #d9d9d9;margin-left:10px;border-radius:10px;"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </p>
  </div>
</template>

<script>
import { getpersonal } from "@/api/apis";
import {getnewtime} from '@/utils/utils'
export default {
  data() {
    return {
      id: "",
      acc: "",
      group: "",
      time: "",
      url: "",
      uploadimg: {},
    };
  },
  created() {
    getpersonal(localStorage.id).then((res) => {
      (this.id = res.data.accountInfo.id),
        (this.acc = res.data.accountInfo.account),
        (this.group = res.data.accountInfo.userGroup);
      this.url = res.data.accountInfo.imgUrl;
      this.time = getnewtime(res.data.accountInfo.ctime);
    });
    this.uploadimg = { id: localStorage.id };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$bus.$emit("uolpadimgend")//传送给其他组件的值
        this.$message({
          message: res.msg,
          type: "success",
        });
      }else{
        this.$message.error(res.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.containei {
  background: #fff;
  padding: 20px;
  p {
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;
    font-weight: bold;
    display: flex;
    align-items: center;
    span {
      font-weight: normal;
      margin-left: 10px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>