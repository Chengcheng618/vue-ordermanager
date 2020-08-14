import axios from 'axios'

// 服务器IP
var IP='http://127.0.0.1:5000'

axios.defaults.baseURL = IP

// 图片上传接口
export var getuploadimg=IP+'/goods/goods_img_upload'

//图片地址
export var imgaddress=IP+'/upload/imgs/goods_img/'

//商品图片地址
export var shopimg= IP+ '/upload/shop/'

//店铺图片上传接口
export var uploadshopimg=IP+'/shop/upload'

//登录
export var login = (account,password)=>axios.post('/users/checkLogin',{account,password})
//token
export var checktoken = (token)=>axios.get('/users/checktoken',{params:{token}})
//添加账号
export var addnum=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})
//获取账号列表
export var getnum=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})
//删除账号
export var remove=(id)=>axios.get('/users/del',{params:{id}})
//批量删除
export var allremove=(ids)=>axios.get('/users/batchdel',{params:{ids}})
//修改账号
export var writenum=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})
//检查旧密码是否正确
export var inspectpwd=(oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})
//修改密码
export var changepwd=(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id})
//获取账号(个人中心)信息
export var getpersonal=(id)=>axios.get('/users/accountinfo',{params:{id}})

//---------------------------------商品管理------------------------------------------//

// 添加分类
export var productsort=(cateName,state)=>axios.post('/goods/addcate',{cateName,state})
//获取列表
export var getlist=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})
//删除分类
export var removeselect=(id)=>axios.get('/goods/delcate',{params:{id}})
//修改分类
export var changeselect=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})
//添加商品
export var productadd=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})
// 查询所有商品分类名称
export var allselect=()=>axios.get('/goods/categories')
//获取商品列表
export var getprofductlist=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})
//删除商品
export var removeproduct=(id)=>axios.get('/goods/del',{params:{id}})
//修改商品
export var changeproduct=(params)=>axios.post('/goods/edit',params)

//---------------------------------订单管理------------------------------------------//

//获取订单列表
export var getmanage=(params)=>axios.get('/order/list',{params})
//获取订单详情
export var getdetails=(id)=>axios.get('/order/detail',{params:{id}})
//修改订单
export var changedetails=(params)=>axios.post('/order/edit',params)

//---------------------------------店铺管理------------------------------------------//

//获取店铺详情
export var getshop=()=>axios.get('/shop/info')
//修改店铺详情
export var changeshop=(params)=>axios.post('/shop/edit',params)

//---------------------------------报表借款------------------------------------------//

//首页报表
export var indexata=()=>axios.get('/order/totaldata')
//订单报表
export var orderdata=(date)=>axios.get('/order/ordertotal',{params:{date}})