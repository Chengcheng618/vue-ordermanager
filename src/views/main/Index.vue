<template>
  <div>
    <div id="top_div">
      <div v-for="(item,index) in arr" :key="index">
        <i :class="item.cl"></i>
        <div class="money_div">
          <p class="total_p">{{item.info}}</p>
          <h4>{{item.num}}</h4>
        </div>
      </div>
    </div>
    <div id="bottom_div" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import { indexata } from "@/api/apis";
export default {
  data() {
    return {
      arr: [],
      option: {},
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      var myChart = this.$echarts.init(document.getElementById("bottom_div"));
      indexata().then((res) => {
        myChart.setOption({
          title: {
            text: "数据统计",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["稻草人订单数据", "稻草人金额数据"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: res.data.xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "稻草人订单数据",
              type: "line",
              stack: "总量",
              data: res.data.orderData,
            },
            {
              name: "稻草人金额数据",
              type: "line",
              stack: "总量",
              data: res.data.amountData,
            },
          ],
        });
        this.arr = [
          { cl: "el-icon-document", info: "总订单", num: res.data.totalOrder },
          { cl: "el-icon-coin tomato", info: "总销售额", num: res.data.totalAmount },
          { cl: "el-icon-document", info: "今日订单数", num:res.data.todayOrder },
          { cl: "el-icon-coin green", info: "今日销售额", num: res.data.totayAmount },
        ];
      });
    },
  },
};
</script>

<style lang="less" scoped>
#top_div {
  display: flex;
  justify-content: space-around;
  div {
    background: #fff;
    width: 23%;
    display: flex;
    justify-content: space-between;
    height: 30%;
    padding: 10px 0;
    .money_div {
      display: flex;
      flex-direction: column;
      width: 40%;
      .total_p {
        color: #ccc;
        margin: 0;
      }
      h4 {
        margin: 0;
      }
    }
    i {
      font-size: 60px;
      align-self: center;
      color: skyblue;
      text-indent: 40px;
    }
    .tomato {
      color: tomato;
    }
    .green {
      color: greenyellow;
    }
  }
}
#bottom_div {
  background: #fff;
  margin-top: 20px;
  padding: 20px 0;
}
</style>