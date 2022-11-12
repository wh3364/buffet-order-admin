const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  addRoutes: state => state.permission.addRouters,
  orderTimes: state => state.orderTime.createTimes
}
export default getters
