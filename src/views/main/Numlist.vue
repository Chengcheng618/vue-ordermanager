<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;height:330px"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="120">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="small" @click="clickwrite(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="clickremove(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sum"
        ></el-pagination>
      </div>
      <el-button type="danger" size="medium" @click="cliallremove">批量删除</el-button>
      <el-button type="primary" size="medium" @click="toggleSelection()">取消选择</el-button>
    </el-card>
    <!-- ---------------------  编辑弹框   ---------------------------- -->
    <el-dialog title="稻草人系统提示" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账户名" :label-width="formLabelWidth" style="width:80%">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureget">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getnum, remove, allremove, writenum } from "@/api/apis";
import {getnewtime} from '@/utils/utils'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
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
      newid: "",
      loading:true
    };
  },
  created() {
    //获取列表
    this.loading=true
    this.getfun();
    this.loading=false
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    handleSizeChange(newpage) {
      //改变当前条数
      this.pageSize = newpage;
      this.getfun();
    },
    handleCurrentChange(newcurrent) {
      //改变当前页数
      this.currentPage = newcurrent;
      this.getfun();
    },
    clickremove(index) {
      //删除
      this.$confirm("此操作将永久删除该用户, 是否继续?", "稻草人系统提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          remove(this.tableData[index].id).then((res) => {
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
    cliallremove() {
      //批量删除
      let arr = [];
      this.multipleSelection.forEach((item) => {
        arr.push(item.id);
      });
      this.$confirm("此操作将批量删除用户, 是否继续?", "稻草人系统提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          allremove(JSON.stringify(arr)).then((res) => {
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
    clickwrite(index) {
      //修改账号
      this.dialogFormVisible = true;
      this.newid = this.tableData[index].id;
    },
    sureget() {
      writenum(this.newid, this.form.name, this.form.region).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功!",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.getfun()
        }else{
          this.$message.error('修改账号失败,请稍后再试!')
        }
      });
    },
    getfun() {
      //封装获取列表函数
      getnum(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        for (let obj of this.tableData) {
          obj.ctime=getnewtime(obj.ctime)
        }
        this.sum = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  padding: 15px 0;
}
.bottom {
  display: flex;
  justify-content: flex-end;
}
</style>