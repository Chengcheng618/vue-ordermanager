<template>
  <div class="contarner">
    <div class="order">
      <div class="name">
        <span>订单号</span>
        <el-input placeholder="订单号" class="txt" v-model="orderNo"></el-input>
      </div>
      <div class="name">
        <span>收货人</span>
        <el-input placeholder="收货人" class="txt" v-model="consignee"></el-input>
      </div>
      <div class="name">
        <span>手机号</span>
        <el-input placeholder="手机号" class="txt" v-model="phone"></el-input>
      </div>
      <div class="name">
        <span>订单状态</span>
        <el-select v-model="orderState">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div style="margin:30px 0px">
      <div class="block">
        <span class="demonstration" style="margin-right:20px">选择时间</span>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button
          type="primary"
          style="margin-left:20px; width:80px;height:40px;"
          @click="clickfound"
        >查询</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;height:350px"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="200"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="clickdel(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form" :disabled="use">
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form.orderNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="form.orderTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input v-model="form.deliveryTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-select v-model="form.orderState">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-show="isshow">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clicksure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getmanage, changedetails, getdetails } from "@/api/apis";
import { getnewtime } from "@/utils/utils.js";
export default {
  methods: {
    handleClick(row) {
      //查看
      this.dialogFormVisible = true;
      this.use = true;
      getdetails(row.id).then((res) => {
        this.form = res.data.data;
        this.form.deliveryTime = getnewtime(this.form.deliveryTime);
        this.forgetnewtimem.orderTime = getnewtime(this.form.orderTime);
      });
    },
    clickdel( row) {
      //编辑
      this.dialogFormVisible = true;
      this.use = false;
      this.isshow = true;
      this.form = { ...row };
      changedetails();
      this.userid = row.id;
    },
    handleSizeChange(newpagesize) {
      this.pageSize = newpagesize;
      this.loading = true;
      setTimeout(() => {
        this.getfun(this.gettime);
        this.loading = false;
      }, 1000);
      // 在点击翻页时, 把额外的查询数据一起带过去
    },
    handleCurrentChange(newcurrent) {
      this.currentPage = newcurrent;
      this.loading = true;
      setTimeout(() => {
        this.getfun(this.gettime);
        this.loading = false;
      }, 1000);
      // 在点击翻页时, 把额外的查询数据一起带过去
    },
    clickfound() {
      //查询
      let gettime = {};
      if (this.orderNo != "") gettime.orderNo = this.orderNo;
      if (this.consignee != "") gettime.consignee = this.consignee;
      if (this.phone != "") gettime.phone = this.phone;
      if (this.orderState != "")
        gettime.orderState = this.orderState;
      if (this.date)
        gettime.date = JSON.stringify([
          getnewtime(this.date[0]),
          getnewtime(this.date[1]),
        ]);
      this.gettime = gettime;
      this.getfun(this.gettime);
    },
    getfun(gettime) {
      getmanage({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...gettime,
      }).then((res) => {
        this.tableData = res.data.data;
        for (const obj of this.tableData) {
          obj.orderTime = getnewtime(obj.orderTime);
          obj.deliveryTime = getnewtime(obj.deliveryTime);
        }
        this.total = res.data.total;
      });
    },
    clicksure() {
      //修改订单
      changedetails(this.form).then((res) => {
        if (res.data.code == 0) {
          this.dialogFormVisible = false;
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getfun(this.gettime);
        }
      });
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      gridData: [],
      date: null,
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
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      use: true,
      isshow: false,
      options: [
        { value: "全部", label: "全部" },
        { value: "已完成", label: "已完成" },
        { value: "已受理", label: "已受理" },
        { value: "派送中", label: "派送中" },
      ],
      loading: true,
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.getfun();
      this.loading = false;
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
.contarner {
  background-color: #fff;
  padding: 20px;
  .order {
    display: flex;
    justify-content: space-between;
    .name {
      display: flex;
      margin-top: 20px;
      align-items: center;
      .txt {
        width: 200px;
        height: 30px;
        margin: 0 10px;
      }
      span {
        vertical-align: center;
      }
    }
  }
}
</style>