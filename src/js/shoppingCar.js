$(function () {
    $.ajax({
        url: "http://127.0.0.1:8080/shopCarInfo",
        success(data) {
            console.log(data);
            data.forEach(item => {
                let template = $("#template");
                let newItem = template.clone(true).attr("id", "");
                newItem.find("img").attr("src", item.pic);
                newItem.find(".recommend-name").html(item.name);
                newItem.find(".recommend-price").html(item.price + "元");
                newItem.find(".recommend-tips").html(item.tips);
                newItem.appendTo($("#recommend"));
                newItem.click(function () {
                    let id = item.id;
                    location.href = "http://127.0.0.1/小米项目/Jiesuan.html?id=" + id;
                })
            });
        }
    })
})


