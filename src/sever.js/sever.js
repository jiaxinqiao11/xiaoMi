let express = require("express")();
const { request, response } = require("express");
let mysql = require("mysql");
const port = 8080;

// Node解决跨域问题
express.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})


// 规划mysql链接
let sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "stu",
    port: 3307
})

// 尝试链接
sql.connect();
// 获取商品信息数据
express.get("/goodsInfo", (request, response) => {
    const id = request.query.id;
    let s = id ? `SELECT * FROM info WHERE id="${id}"` : `SELECT * FROM info ORDER BY id`;
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})



// 接收来自前端的请求并查找数据库并向前端返回查找结果
//监听来自前端的login的路由请求
express.get("/login", (request, response) => {
    //接收到来自前端的请求参数
    let username = request.query.name;
    let password = request.query.password;
    // console.log(name);

    //后端接收到前端的参数在数据库中进行查询
    sql.query(`SELECT * FROM users WHERE name="${username}" AND password="${password}"`, (error, data) => {
        //若是没有连接成功就返回erro
        if (error) {
            //向前端返回一个error
            response.send("error");

        } else {
            console.log(data);
            //如果能在数据库中查到(没有这个人和有这个人，就返回success)

            //查到空信息或查到信息 
            if (!data.length) {
                //在数据库中查询若没有这个人就返回erro
                response.send("error");
            } else {
                //在数据库中查询有这个人就返回success
                response.send("success");
            }
        }

    });

})

// 注册
express.get("/register", (request, response) => {
    //接收到来自前端的请求参数
    let username = request.query.name;
    let password = request.query.password;
    //后端接收到前端的参数在数据库中进行查询

    sql.query(`SELECT * FROM users WHERE name="${username}" AND password="${password}"`, (error, data) => {
        if (data.length == 0) {
            console.log(2);
            // console.log(name);
            //后端接收到前端的参数在数据库中进行查询
            sql.query(`INSERT INTO users (name,password) VALUES ("${username}","${password}")`, (error, data) => {
                response.send("success");
            });
        } else {
            console.log(1);
            response.send("error");
        }
    })

})

// 获取商品信息数据
express.get("/goodsDetails", (request, response) => {
    const id = request.query.id;
    let s = id ? `SELECT * FROM info2 WHERE id="${id}"` : `SELECT * FROM info2 ORDER BY id`;
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})
//服务列表
express.get("/serviceInfo", (request, response) => {
    const id = request.query.id;
    let s = id ? `SELECT * FROM service WHERE id="${id}"` : `SELECT * FROM service ORDER BY id`;
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})
// 服务支持
express.get("/productSupport", (request, response) => {
    const id = request.query.id;
    let s = id ? `SELECT * FROM serproduct WHERE id="${id}"` : `SELECT * FROM serproduct ORDER BY id`;
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})
//购物车列表
express.get("/shopCarInfo", (request, response) => {
    const id = request.query.id;
    let s = id ? `SELECT * FROM shopcar WHERE id="${id}"` : `SELECT * FROM shopcar ORDER BY id`;
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})
//查询商品
express.get("/chaxun", (request, response) => {
    let id = request.query.id;
    sql.query(`SELECT * FROM shopcar WHERE id="${id}"`, (error, data) => {
        //若是没有连接成功就返回erro
        if (error) {
            //向前端返回一个error
            response.send("error");

        } else {
            response.send(data);
            console.log(data);
            //如果能在数据库中查到(没有这个人和有这个人，就返回success)
        }
    })
})
// 监听在哪一个8080端口上
express.listen(port)
console.log("server is running at " + port)