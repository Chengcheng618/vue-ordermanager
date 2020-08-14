<template>
  <div>
    <div class="top">
      <p>时间范围</p>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickfind">查询</el-button>
    </div>
    <div id="echarts" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import { orderdata } from "@/api/apis";
import { getnewtime } from "@/utils/utils.js";
export default {
  data() {
    return {
      option: {},
      date: ["2020-01-01 00:00:00","2020-12-01 00:00:00"],
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("echarts"));
  },
  methods: {
    clickfind() {
      let time = JSON.stringify([
        getnewtime(this.date[0]),
        getnewtime(this.date[1]),
      ]);
      this.drawChart(time);
    },
    drawChart(str) {
      orderdata(str).then((res) => {
        console.log(res.data.data);
        let list = res.data.data;
        for (let obj of list) {
          obj.orderTime = getnewtime(obj.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: list.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: list.map((obj) => obj.orderAmount),
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)",
              },
            },
          ],
        };
        this.myChart.setOption(option);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  margin-top: 10px;
  p {
    margin: 0 10px;
  }
  .el-button {
    margin-left: 10px;
  }
}
#echarts {
  background: #fff;
  margin-top: 20px;
  padding: 20px 0;
}
</style>