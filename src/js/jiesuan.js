$(function () {
    let a = location.search;
    if (a != "") {
        $(".list-head").css({
            display: "block"
        })
        $(".cart-bar").css({
            display: "block"
        })
    }

    let arr = [];
    let b = a.slice(1).split("&");
    console.log(b);
    let o = {};
    for (var i = 0; i < b.length; b++) {
        let a = b[i].split("=");
        key = a[0];
        value = a[1];
        o[key] = value;
        console.log(o);
    }
    let id = Number(o.id);
    $.ajax({
        url: "http://127.0.0.1:8080/chaxun?id=" + id,
        success(data) {
            console.log(data);
            let newItem = $(".item-table").clone(true).attr("id", "");
            newItem.appendTo(".goods-List");
            newItem.find($("img")).attr("src", data[0].pic);
            newItem.find($(".col-name")).html(data[0].name);
            newItem.find($(".col-price")).html(data[0].price);
        }
    })
    let sub = document.querySelector(".change-goods-num .one");
    let ipt = document.querySelector("#ipt");
    for (let i = 0; i < sub.length; i++) {
        console.log(sub);
        //获取所有减号
        sub.onclick = function () {
            if (ipt.value > 0) {
                ipt.value--;
            }
        }
    }
    let plus = document.querySelector(".change-goods-num .two");
    for (let i = 0; i < plus.length; i++) {
        console.log(plus);
        plus.onclick = function () {
            ipt.value++;
        }
    }
    let shanchu = $(".col-action");
    for (let i = 0; i < shanchu.length; i++) {
        shanchu.click(function () {
            alert(1);
            $(this).closest($(".goods-List")).find($(".item-table")).fadeOut();
        })
        let xiaoji = $(".col-total");
    }
})         