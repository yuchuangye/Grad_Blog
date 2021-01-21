/** 
 * 权限控制中间件
*/

const judge = (ctx, next) => {
  const { user } = ctx.state
  if (user.username !== 'kayano') { ctx.throw(403, '你没有权限执行此操作') }
  next()
}

module.exports = judge