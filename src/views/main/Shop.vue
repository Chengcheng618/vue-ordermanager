<template>
  <div style="background:#fff">
    <div slot="header" class="clearfix box">
      <span>店铺管理</span>
      <el-button type="primary" size="small" @click="cliclkeep">保存</el-button>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="店铺名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="form.bulletin"
          style="width:500px;"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload :action="uploadshopimg" :on-success="avatarsuccess">
          <img
            v-if="form.avatar"
            :src="shopimg + form.avatar"
            alt
            style="width:100px;margin-left:10px"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          :action="uploadshopimg"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="配送费">
        <el-input v-model="form.deliveryPrice" placeholder="4"></el-input>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input v-model="form.deliveryTime" placeholder="4"></el-input>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-rate v-model="form.score" show-text></el-rate>
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="form.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="form.supports">
          <el-checkbox>在线支付满28减5</el-checkbox>
          <el-checkbox>VC无限橙果汁全场8折</el-checkbox>
          <el-checkbox>单人精彩套餐</el-checkbox>
          <el-checkbox>特价饮品8折抢购</el-checkbox>
          <el-checkbox>单人特色套餐</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          placeholder="选择时间范围"
          style="width:500px;margin-bottom:30px"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getshop, shopimg, uploadshopimg, changeshop } from "@/api/apis";
import { getnewtime } from "@/utils/utils";
export default {
  data() {
    return {
      form: {
        supports:[]
      },
      fileList: [],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.form.pics.push(res.imgUrl);
      } else {
        this.$message.error(res.msg);
      }
    },
    handleRemove(res) {
      this.form.pics.splice(this.form.pics.indexOf(res.name), 1);
    },
    avatarsuccess(res) {
      if (res.code == 0) {
        this.form.avatar = res.imgUrl;
        this.$message({
          message: res.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.msg);
      }
    },
    cliclkeep() {
      changeshop({
        ...this.form,
        pics: JSON.stringify(this.form.pics),
        supports: JSON.stringify(this.form.supports),
        date: JSON.stringify([
          getnewtime(this.form.date[0]),
          getnewtime(this.form.date[1]),
        ]),
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getfun();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getfun() {
      getshop().then((res) => {
        this.form = res.data.data;
        this.fileList = this.form.pics.map((item) => {
          return { name: item, url: shopimg + item };
        });
      });
    },
  },
  created() {
    this.uploadshopimg = uploadshopimg;
    this.shopimg = shopimg;
    this.getfun();
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-between;
  color: #606266;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 14px;
  line-height: 30px;
}
.el-rate {
  padding-top: 10px;
}
.el-input {
  width: 500px;
}
</style>