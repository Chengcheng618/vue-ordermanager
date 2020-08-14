<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
        <el-button style="float: right;" type="primary" size="mini" @click="clickadd">添加分类</el-button>
      </div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;height:313px"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="分类名称" prop="cateName"></el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              disabled
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="name">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- ---------------------  编辑修改弹框   ---------------------------- -->
    <el-dialog title="稻草人系统提示" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth" style="width:80%">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类状态" :label-width="formLabelWidth">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch v-model="open" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureget">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ---------------------  添加分类弹框   ---------------------------- -->
    <el-dialog title="添加分类" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth" style="width:80%">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch v-model="twoopen" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-tooltip>
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
import { getlist, removeselect, changeselect, productsort } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      value: true,
      search: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false, //修改弹框
      dialogVisible: false, //添加分类弹框
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
      ids: "",
      cateNames: "",
      states: "",
      open: "",
      twoopen: "",
      loading: true,
    };
  },
  methods: {
    handleEdit(index, row) {
      //点击编辑
      this.ids = row.id;
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    handleDelete(index, row) {
      //删除
      this.$confirm("此操作将永久删除该商品, 是否继续?", "稻草人系统提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "保留数据",
        type: "warning",
      }).then(() => {
        removeselect(row.id)
          .then((res) => {
            if (res.data.code == 0) {
              this.getfun();
            } else {
              this.$message.error(res.data.msg);
            }
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
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
    //获取商品列表
    getfun() {
      this.loading = true;
      setTimeout(() => {
        getlist(this.currentPage, this.pageSize).then((res) => {
          this.tableData = res.data.data;
          for (let obj of this.tableData) {
            obj.state = obj.state == 1 ? true : false;
          }
          this.total = res.data.total;
        });
        this.loading = false;
      }, 1000);
    },
    sureget() {
      //修改
      changeselect(this.ids, this.form.name, this.open).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.form.name = "";
          this.dialogFormVisible = false;
          this.getfun();
        } else {
          this.$message.error(res.data.msg);
          this.form.name = "";
        }
      });
    },
    //添加分类
    clickadd() {
      this.dialogVisible = true;
    },
    sureadd() {
      productsort(this.form.name, JSON.stringify(this.twoopen)).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.dialogVisible = false;
          this.form.name = "";
          this.getfun();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    this.getfun();
  },
};
</script>

<style lang="less" scoped>
.block {
  background: #fff;
  padding: 10px 0 20px 0;
}
.bottom {
  display: flex;
  justify-content: flex-end;
}
</style>