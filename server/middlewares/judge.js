/** 
 * 权限控制中间件
*/

const judge = async (ctx, next) => {
  const { role } = ctx.state.user
  if (role !== 'admin') { ctx.throw(403, '你没有权限执行此操作') }
  await next()
}

module.exports = judge