$(document).ready(function () {
    $('.mask-box').click(function () {
        $(this).hide();
        $('.yz-hide').hide();
    });
    $('.yzm-btn').click(function () {
        var phoneNum=$('.phone-box').children('input').val().replace(/^\s+|\s+$/g,"");
        if(phoneNum==''){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入手机号');
        }else{
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            var flag = reg.test(phoneNum); //true
            if(flag){
                yzm(phoneNum);
                $(this).hide();
                $('.yzm-btn1').show();
                var a=parseInt($('.yzm-btn1 span').html());
                var t=setInterval(function(){
                    a--;
                    $('.yzm-btn1 span').html(a);
                    if(a<=0){
                        clearInterval(t);
                        $('.yzm-btn1').hide();
                        $('.yzm-btn').show();
                    }
                },1000)
            }else{
                $('.mask-box').show();
                $('.yz-hide').show().html('手机号不正确');
            }
        }
    });
    $('.complete-btn').click(function(){
        var account=$('.phone-box').children('input').val().replace(/^\s+|\s+$/g,"");
        var pwd=$('.mm-box1').children('input').val().replace(/^\s+|\s+$/g,"");
        var yzm=$('.yzm-box').children('input').val().replace(/^\s+|\s+$/g,"");
        var pwd1=$('.mm-box2').children('input').val().replace(/^\s+|\s+$/g,"");
        console.log(account+'%%%'+pwd+'%%%%'+pwd1);
        if(account==' '){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入手机号');
        }else{
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            var flag = reg.test(account); //true
            if(flag&&pwd&&pwd==pwd1){
                if(location.href.indexOf('zczh.html')>=0){
                   zczh(account,yzm,pwd);
                }else if(location.href.indexOf('wjmm.html')>=0){
                    wjmm(account,yzm,pwd);
                }
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
        if(pwd!=pwd1){
            $('.mask-box').show();
            $('.yz-hide').show().html('两次输入的密码不一致');
        }
        console.log(account+'%%%'+pwd+'%%%%'+pwd1);
    })
});
function wjmm(account,flag,pwd){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/user/updatePasswords?account='+account+'&flag='+flag+'&pwd='+pwd,
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
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function zczh(account,flag,pwd){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/user/addUsers?account='+account+'&flag='+flag+'&pwd='+pwd,
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
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function yzm(phoneNum){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/user/sendVerifyCodes?phoneNum='+phoneNum,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {},
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
