<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="curpage"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <div id="title_div">
          <div>
            <i class="el-icon-dish"></i>
          </div>
          <p class="title_p">外卖商家中心</p>
        </div>
        <div v-for="(item,index) in arr" :key="index">
          <el-menu-item :index="item.url" v-if="!item.children">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu :index="item.url" v-else>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item
              :index="son.url"
              v-for="(son,index) in item.children"
              :key="index"
            >{{son.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="right_div" @click="clickimg">
          <span>{{username}}</span>
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, getpersonal } from "../api/apis";
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    errorHandler() {
      return true;
    },
    clickimg() {
      this.$router.push("/main/Message");
    },
    getfun() {
      getpersonal(localStorage.id).then((res) => {
        this.circleUrl = res.data.accountInfo.imgUrl;
      });
    },
  },
  created() {
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = "欢迎您," + localStorage.user;
      } else {
        this.username = "登录已失效";
        this.$router.push("/");
      }
    });
    this.$bus.$on("uolpadimgend", () => {//接收组件传过来的值
      this.getfun();
    });
    this.curpage = this.$route.path; //刷新保持active激活状态 $route表示获取当前hash对象
    this.getfun();
    //监听面包屑
    this.breadlist=this.$route.meta.breadlist //刷新时依旧监听当前页面
  },
  data() {
    return {
      username: "",
      circleUrl: "",
      list: [
        {
          url: "/main/Index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/Manage",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "xxx",
          icon: "el-icon-shopping-bag-2",
          name: "商品管理",
          children: [
            { url: "/main/Productlist", name: "商品列表" },
            { url: "/main/Productadd", name: "商品添加" },
            { url: "/main/Productselect", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/main/Shop",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "xxxxx",
          icon: "el-icon-user",
          name: "账号管理",
          children: [
            { url: "/main/Numlist", name: "账号列表" },
            { url: "/main/Addacc", name: "添加账号" },
            { url: "/main/Changepwd", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/main/Index",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/main/Stat", name: "商品统计" },
            { url: "/main/Order", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      curpage: "",
      breadlist:''
    };
  },
  computed: {
    arr() {
      return this.list.filter((item) => item.roles.includes(localStorage.role)); //权限
    },
  },
  watch:{//监听网页数据变化
    $route(to){//监听hash变化
    console.log(to);
      this.breadlist=to.meta.breadlist
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right_div {
    display: flex;
    align-items: center;
  }
  .el-avatar {
    margin-left: 10px;
  }
}
.el-aside {
  background-color: #515c64;
  height: 100%;
  overflow: hidden;
  .title_p {
    line-height: 50px;
  }
}
.el-main {
  background-color: #f0f2f5;
  padding: 10px;
}
.el-container {
  height: 100%;
}
.el-menu {
  border: 0;
}
#title_div {
  display: flex;
  justify-content: center;
  .title_p {
    color: #fff;
  }
  div {
    background: skyblue;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    vertical-align: center;
    margin: 10px 10px 0 0;
    i {
      font-size: 25px;
      line-height: 40px;
    }
  }
}
</style>