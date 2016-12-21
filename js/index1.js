$(function () {
    var getQueryString = function(key) {
        var search = decodeURIComponent(location.search);
        var reg = new RegExp(".*" + key + "\\=" + "([^&]*)(&?.*|)", "g");
        return search.replace(reg, "$1");
    };
    var id=getQueryString('id');
    var text=getQueryString('text');
    var img=getQueryString('img');
    var imgdetail=getQueryString('imgdetail');
    $('.icon-title').html(text);
    $('.icon-box img').attr('src',img);
    $('.img-title').html(imgdetail);
    $('.title-icon span').html(text);
    //返回键
    $('.top-return').click(function(){
        history.back();
    })
});