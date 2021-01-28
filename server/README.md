# Grad_Blog-Server

**grad_blog-server是 grad_blog 项目的 API 接口**

```javascript
1、响应合理的状态码和数据
   HTTP状态码：

        200（请求成功） -> 请求成功，正确处理并返回
           
        500（服务器内部错误） -> JS运行时错误，比如操作数据库出错，读取不存在的属性或变量，验证token出错 

        401（未授权) -> 无token/token无效/token过期

        403（没权限，拒绝访问）-> 用户身份验证成功（token有效），但该用户无权操作该接口

        404（请求的资源/接口不存在）-> 客户端请求的资源或接口服务器中不存在

        405（请求方式错误）-> 请求地址是正确的，但不支持当前请求方式

		422（参数不合法）-> 请求时传的参数格式是正确的，但其类型或长度等其它要求不合法

   响应数据：
        200（无需手动抛出）：
        {
			code: 0,
            msg: 'success',
            data: {
            	p_page: 1,   // 上一页
                n_page: 3,  // 下一页
                data: [{}] / {} // 比如列表数据
                token: 'efafds121a2sd1.sadasd151111.yyyis222sdasd'
            }
        }
		或
        {
			code: 0,
            msg: 'success',
            data: {}  // 没数据返回
        }
		或
        {
			code: 0,
            msg: 'success',
            data: [{}]  // 只有列表数据，没额外数据
        }
        
		或
        {
			code: 1,
            msg: '用户名或密码错误',
            data: {}  // 没数据返回
        }
        {
			code: 1,
            msg: '用户/文章/问题已存在',
            data: {}  // 没数据返回
        }

        500
		（无需手动抛出，有些第三方中间件可能会自己抛出500,自己处理并响应它定义的数据格式）：
        {
            code: 10,
            status: 500,
            msg: 'error'
        }

        4xx
        （404无需手动抛出，其他需要 ctx.throw(4xx) 手动抛出，
		  有些第三方中间件可能会自己抛出4xx,自己处理并响应它定义的数据格式）
        {
            code: 10,
            status: 4xx,
            msg: 'error'  
        }

		例如：
        koa-parameter（抛出422）：
            {
                "message": "Validation Failed",
                "errors": [
                    {
                        "message": "should be a number",
                        "code": "invalid",
                        "field": "age"
                    }
                ],
                "params": {
                    "name": "kayano",
                    "age": "23"
                }
            }

        app.use(webRouter.allowedMethods())
		app.use(adminRouter.allowedMethods())
		抛出（405）
		请求方式错误时（服务器返回的数据只有一个字符串）： data: 'Method Not Allowed'

		
```



​	