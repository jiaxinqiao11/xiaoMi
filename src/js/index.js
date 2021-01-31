
$(function () {
    $.ajax({
        url: "http://127.0.0.1:8080/goodsInfo",
        success(data) {
            // console.log(data);       
            data.forEach(Item => {
                console.log(Item)
                let newItem = $("#template").clone(true).attr("id", "");
                newItem.appendTo($(".right-xiaomiMax ul"))
                newItem.find($("img")).attr("src", Item.pic);
                newItem.find($(".one-1")).html(Item.phonename);
                newItem.find($(".one-2")).html(Item.details);
                newItem.find($(".one-3")).html(Item.price + "元起");
            });
        }
    })
    //动态生成小圆点
    let liList = $(".lunbo li");
    //在jquery获取的是jquery对象，要用到原生js中的方法，所以将jquery对象转换为node节点。
    let ol = $(".dotted ol")[0];
    for (let i = 0; i < liList.length; i++) {
        let dot = document.createElement("li");
        if (i === 0) {
            dot.className = "dt";
        }
        ol.appendChild(dot);
    }
    //轮播图右滑
    let Rarrow = $(".right-arrow");
    let Larrow = $(".left-arrow");
    let n = 0;
    Rarrow.click(function () {
        if (n < liList.length - 1) {
            n++;
            change();
        } else {
            n = 0;
            change();
        }
    })
    Larrow.click(function () {
        if (n === 0) {
            n = liList.length - 1;
            change();
        } else {
            n--;
            change();
        }
    })
    let ul = $(".lunbo ul");
    let dotList = $("#ols li");
    function change() {
        //对ul进行移动
        //animate({},执行时间,回调) 设置/获取元素的行内样式并执行动画
        ul.animate({
            marginLeft: -(n * 1226)
        })
        //让所有ol中的li的class类名去除
        dotList.removeClass("dt");
        //给ol中当前的li加上class类名
        dotList.eq(n).addClass("dt");
    }

    dotList.click(function () {
        //index()返回指定元素相对于其他指定元素的 index 位置
        n = $(this).index();
        change();
    })

    var timerId = setInterval(function () {
        Rarrow.click();
    }, 2000)

    let lunbo = document.querySelector(".lunbo");
    lunbo.onmouseenter = function () {
        clearInterval(timerId);
    }

    //秒杀中的倒计时
    function computedDate1(time1, time2) {
        var now = new Date(time1);
        var now2 = new Date(time2);
        var minus = parseInt((now2.getTime() - now.getTime()) / 1000);
        var hour = parseInt(minus / 3600);
        var minute = parseInt((minus - hour * 3600) / 60);
        var second = minus % 60;
        return (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second);

    }
    let hour = document.querySelector("#hour");
    let minutes = document.querySelector("#minutes");
    let seconds = document.querySelector("#seconds");
    setInterval(function () {
        var newYear = new Date();
        function getMiao() {
            var c = computedDate1(new Date(), "2021-2-1 00:00:00");
            var a = c.split(":");
            for (var i = 0; i < a.length; i++) {
                hour.innerHTML = a[0];
                minutes.innerHTML = a[1];
                seconds.innerHTML = a[2];
            }
        }
        getMiao();
    }, 1000)



    // 导航栏的二级菜单栏
    //遍历循环item-child
    let itemList = document.querySelector(".nav-ul").querySelectorAll(".item-child");
    console.log(itemList);
    //遍历循环
    let aList = document.querySelector(".nav-ul").querySelectorAll("#aaa");
    console.log(aList);
    for (let i = 0; i < aList.length; i++) {
        aList[i].setAttribute("index", i);
        aList[i].onmouseover = function () {
            let index = this.getAttribute("index");
            for (var i = 0; i < itemList.length; i++) {
                itemList[index].style.display = "block";
            }
        }
        aList[i].onmouseleave = function () {
            let index = this.getAttribute("index");
            for (var i = 0; i < itemList.length; i++) {
                itemList[index].style.display = "none";
            }
        }
    }

    //点击登录，跳转到另一个页面
    let login = $("#login");
    login.click(function () {
        $(this).attr("href", "login.html");
    })

    //点击注册，跳转到另一个页面
    let register = $("#register");
    register.click(function () {
        $(this).attr("href", "register.html");
    })

    //播放
    //获取所有的i
    let vids = document.querySelectorAll(".shipin i");
    let mask = document.querySelector(".mask");
    // console.log(vids);
    for (var i = 0; i < vids.length; i++) {
        vids[i].onclick = function () {
            this.parentNode.querySelector(".autoplay").style.display = "block";
            mask.style.display = "block";
        }
    }
    let sp = document.querySelectorAll(".autoplay span");
    for (var i = 0; i < sp.length; i++) {
        sp[i].onclick = function () {
            this.parentNode.style.display = "none";
            mask.style.display = "none";
            this.parentNode.querySelector("video").pause();
        }
    }
})