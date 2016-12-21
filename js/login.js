$(document).ready(function(){
    $('.mask-box').click(function () {
        $(this).hide();
        $('.yz-hide').hide();
    });
    $('.dl-btn').click(function(){
        var account=$('.phone-box').children('input').val().replace(/^\s+|\s+$/g,"");
        var pwd=$('.pass-box').children('input').val().replace(/^\s+|\s+$/g,"");
        console.log(account+'%%%'+pwd+'%%%%');
        if(account==''){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入手机号');
        }else{
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            var flag = reg.test(account); //true
            if(flag&&pwd){
                login(account,pwd);
            }else{
                $('.mask-box').show();
                $('.yz-hide').show().html('手机号不正确');
            }
        }
        if(pwd==''){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入密码');
        }
        if(account==""&&pwd==""){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入手机号和密码');
        }
    })
})
function login(account,pwd){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/user/getUserByNames?isGuest=0&account='+account+'&pwd='+pwd,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            if(msg.desc){
                $('.mask-box').show();
                $('.yz-hide').show().html(msg.desc);
            }else{
                $('.mask-box').hide();
                $('.yz-hide').hide();
            }
            if(msg.id){
                localStorage.setItem('userid',msg.id);
                history.back();
            }else{
                localStorage.setItem('userid','');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
