<template>
  <div id="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <el-table
        :data="arr"
        style="width: 100%;height:450px"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <template>
                  <el-image :src="imgaddress+props.row.imgUrl" style="width:50px;height:50px" />
                </template>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <el-image :src="imgaddress+scope.row.imgUrl" style="width:100px;height:100px" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="clickchange(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="clickremove(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3,5,10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sum"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth" style="width:80%">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option
              :label="item.cateName"
              :value="item.cateName"
              v-for="(item,index) in list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth" style="width:80%">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片地址" :label-width="formLabelWidth" style="width:80%">
          <el-upload
            class="avatar-uploader"
            :action="getuploadimg"
            :on-success="handleAvatarSuccess"
          >
            <img v-show="form.imgUrl" :src="imgaddress+form.imgUrl" class="avatar" />
            <i v-show="!form.imgUrl" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth" style="width:80%">
          <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureadd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getprofductlist,
  removeproduct,
  allselect,
  changeproduct,
  imgaddress,
  getuploadimg,
} from "@/api/apis";
export default {
  data() {
    return {
      arr: [],
      fits: ["contain"],
      imgUrl: "",
      currentPage: 1,
      pageSize: 3,
      sum: 0,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      list: [],
      ids: "",
      loading: true,
      imgaddress: "",
      getuploadimg: "",
    };
  },
  methods: {
    getfun() {
      this.loading = true;
      setTimeout(() => {
        getprofductlist(this.currentPage, this.pageSize).then((res) => {
          this.arr = res.data.data;
          this.sum = res.data.total;
        });
        this.loading = false;
      },1000);
    },
    handleAvatarSuccess(res) {
      this.form.imgUrl = res.imgUrl;
    },
    clickremove(index, row) {
      //删除商品
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeproduct(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getfun();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(newpagesize) {
      this.pageSize = newpagesize;
      this.getfun();
    },
    handleCurrentChange(newcurrent) {
      this.currentPage = newcurrent;
      this.getfun();
    },
    clickchange(index, row) {
      this.dialogFormVisible = true;
      this.ids = row.id;
      this.form = { ...row };
      console.log(this.form);
    },
    sureadd() {
      changeproduct(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.dialogFormVisible = false;
          this.getfun();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },

  created() {
    this.getuploadimg = getuploadimg;
    this.imgaddress = imgaddress;
    this.loading = true;
    this.getfun();
    allselect().then((res) => {
      this.list = res.data.categories;
      this.list = res.data.categories;
    });
    this.loading = false;
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
  table {
    tr {
      th,
      td {
        border: 1px solid #000;
      }
    }
  }
}
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
.block {
  margin-top: 20px;
}
.bottom {
  display: flex;
  justify-content: flex-end;
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
  width: 100px;
  height: 100px;
  display: block;
}
</style>