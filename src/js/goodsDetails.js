$(function () {
    let allProducts = $(".allProducts");
    let lunboLeft = $(".lunbo-left");
    let oneLi = $(".one-li");
    allProducts.mouseenter(function () {
        lunboLeft.fadeIn();
    })
    oneLi.mouseleave(function () {
        lunboLeft.fadeOut();
    })
    //页面滚动事件
    let tops = document.querySelector("#top");
    document.addEventListener("scroll", function () {
        if (window.pageYOffset >= 203) {
            tops.style.display = "block";
        } else {
            tops.style.display = "none";
        }
    })

    let aa = $(".nav-ul #aaa");
    let children = $(".item-children");
    let navLi = $(".nav-ul #nav-li");
    // console.log(navLi)
    // console.log(children);
    // console.log(aa);
    for (var i = 0; i < aa.length; i++) {
        aa.eq(i).mouseenter(function () {
            let index = aa.index($(this));
            for (var j = 0; j < children.length; j++) {
                children.eq(index).fadeIn();
            }
        })
    }

    //获取播放按钮
    let bofang = document.querySelector("#bofang");
    let bigVideo = document.querySelector(".bigVideo");
    bofang.onclick = function () {
        bigVideo.style.display = "block";
    }
})

$.ajax({
    url: "http://127.0.0.1:8080/goodsDetails",
    success(data) {
        console.log(data);
        data.forEach(item => {
            console.log(item);
            let newItem = $("#template").clone(true).attr("id", "");
            newItem.appendTo($(".item-children #one"));
            newItem.find($("#figgr img")).attr("src", item.pic);
            newItem.find($("#titl")).html(item.phonename);
            newItem.find($("#pri")).html(item.price + "元起");
        });
    }
})




