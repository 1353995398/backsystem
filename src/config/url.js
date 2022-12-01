/***
 *  所有的接口地址进行汇总
 *  方便后续修改
 */
const prefix = 'http://localhost:5000/api/v1'
const json_prefix = 'http://localhost:3000'
const url = {
  // 注册
  register: prefix + '/register',
  // 登录
  login: prefix + '/login',
  // 获取管理员信息
  profile: prefix + '/profile',
  //  查询会员
  member: prefix + '/member?',
  // 会员列表
  members: prefix + '/members',
  // 商品管理
  goods: json_prefix + '/goods',
  //  七日销量
  saleCount: json_prefix + '/saleCount',
  //  商品支付情况
  count: json_prefix + '/count',
}
export default url
