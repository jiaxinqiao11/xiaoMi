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
})
$.ajax({
    url: "http://127.0.0.1:8080/goodsDetails",
    success(data) {
        // console.log(data);
        data.forEach(item => {
            // console.log(item);
            let newItem = $("#template").clone(true).attr("id", "");
            newItem.appendTo($(".item-children #one"));
            newItem.find($("#figgr img")).attr("src", item.pic);
            newItem.find($("#titl")).html(item.phonename);
            newItem.find($("#pri")).html(item.price + "元起");
        });
    }
})
$.ajax({
    url: "http://127.0.0.1:8080/serviceInfo",
    success(data) {
        // console.log(data);
        data.forEach(item => {
            let newItem = $("#template1").clone(true).attr("id", "");
            newItem.appendTo($("#serviceUl"));
            newItem.find($("img")).attr("src", item.pic);
            newItem.find($("h3")).html(item.title);
            newItem.find($("span")).html(item.desc);

        });
    }
})
$.ajax({
    url: "http://127.0.0.1:8080/productSupport",
    success(data) {
        console.log(data);
        data.forEach(item => {
            let newItem = $("#template2").clone(true).attr("id", "");
            newItem.appendTo($("#service-goodslist"));
            newItem.find($("img")).attr("src", item.pic);
            newItem.find($("span")).html(item.name);

        });
    }
})