<template>
  <div id="main">
    <p class="title">商品添加</p>
    <p class="items">
      <span>商品名称</span>
      <el-input v-model="name" placeholder="商品名称"></el-input>
    </p>
    <p class="items">
      <span>商品分类</span>
      <el-select v-model="value" placeholder="请选择商品分类">
        <el-option
          v-for="item in options"
          :key="item.cateName"
          :label="item.cateName"
          :value="item.cateName"
        ></el-option>
      </el-select>
    </p>
    <p class="items">
      <span>商品价格</span>
      <el-input-number
        v-model="price"
        @change="handleChange"
        :precision="2"
        :step="0.5"
        :min="1"
        :max="200"
        label="描述文字"
      ></el-input-number>
    </p>
    <p class="items">
      <span>商品图片</span>
      <el-upload :action="getuploadimg" list-type="picture-card" :on-success="handleAvatarSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </p>
    <p class="items">
      <span>商品描述</span>
      <el-input type="textarea" :rows="2" v-model="goodsDesc" class="text_area"></el-input>
    </p>
    <el-button type="primary" @click="clickadd">添加商品</el-button>
  </div>
</template>

<script>
import { allselect, productadd, getuploadimg } from "@/api/apis";
export default {
  data() {
    return {
      options: [],
      dialogImageUrl: "",
      dialogVisible: false,
      name: "",
      price: 1,
      goodsDesc: "",
      uploadimg: "",
      value: "",
      getuploadimg: "",
    };
  },
  methods: {
    handleChange(value) {
      this.price = value;
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.uploadimg = res.imgUrl;
    },
    clickadd() {
      productadd(
        this.name,
        this.value,
        this.price,
        this.uploadimg,
        this.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.name='', this.value='', this.price='', this.uploadimg='', this.goodsDesc='';
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    this.getuploadimg = getuploadimg;
    allselect().then((res) => {
      this.options = res.data.categories;
      this.options = res.data.categories;
    });
  },
};
</script>

<style lang="less" scoped>
#main {
  background: #fff;
  margin: 0 10px;
  .title {
    border-bottom: 1px solid #ccc;
    text-indent: 20px;
    padding: 15px 0;
  }
  .el-button {
    margin: 30px 0 30px 100px;
  }
  .items {
    margin: 10px 0 0 20px;
    display: flex;
    .el-input {
      width: 300px;
    }
    span {
      display: inline-block;
      margin-right: 20px;
      line-height: 40px;
    }
    .text_area {
      width: 300px;
    }
  }
}
</style>