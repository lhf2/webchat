$(document).ready(function () {
    var userId=localStorage.getItem('userid');
    var classid=getQueryString('classid');
    eachclass(classid);
    //注册账号获取验证码
    $('.yzm-btn').click(function(){
        if($('#phone').val()==''){
            alert('手机号不能为空');
        }else{
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            var phoneNum = $('#phone').val();//手机号码
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
                alert('手机号不正确');
            }
        }
    })
    //验证信息
    $('.tj-btn').click(function(){
        var userName=$('#name').val();
        var phone=$('#phone').val();
        var drivingId=getQueryString('drivingId');
        var classId=getQueryString('classid');
        var classType=$('.summary-top').html();
        var content=$('#ly-con').val();
        var verification=$('#yzm').val();
        var sex1=$('.sex.cur').html(); var sex;
        var drivingtype1=$('.isTypeSel.cur').html(); var drivingtype;
        if(sex1=='女'){
            sex=0;
        }else{
            sex=1;
        }
        //驾照类型
        if(drivingtype1=='C1'){
            drivingtype="C1";
        }else{
            drivingtype="C2";
        }
        //姓名
        if($('#name').val()==''){
            alert('姓名不能为空');
            return false;
        }
        //手机号
        if($('#phone').val()==''){
            alert('手机号不能为空');
            return false;
        }
        if($('#name').val()&&$('#phone').val()&&$('#yzm').val()){
            console.log(userName+'%'+phone+'%'+classType+'%'+content+'%'+verification)
            signup(userId,userName,sex,phone,drivingId,classId,classType,content,verification,drivingtype)
        }
        
    })
    function signup(userId,userName,sex,phone,drivingId,classId,classType,content,verification,drivingtype){
        $.ajax({
            // type : 'post',
            // contentType : "application/json;charset=utf-8",
            url : 'http://dd.dingdongxueche.com/DDWeb/signup/insertRegistration.htm?userId='+userId+'&userName='+userName+'&sex='+sex+'&phone='+phone+'&drivingId='+drivingId+'&classId='+classId+'&classType='+classType+'&content='+content+'&verification='+verification+'&licenseLevel='+drivingtype+'&area='+localStorage.getItem('city'),
            cache : false,
            // dataType : 'jsonp',
            // jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //data : {id:recordid},//recordid
            success : function(msg) {
                console.log(msg)

                var titMsg = "";
                
                switch(msg){
                    case "fail":
                    titMsg = "信息提交失败！";
                    break;
                    case "timeout":
                    titMsg = "验证码超时！";
                    break;
                    case "error":
                    titMsg = "验证码错误！";
                    break;
                    case "phone":
                    titMsg = "请输入手机号！";
                    break;
                    case "fail":
                    titMsg = "信息提交失败！";
                    break;
                    case "sendcode":
                    titMsg = "请先发送验证码！";
                    break;
                    default :
                    titMsg = "信息提交成功！";
                    break;
                }
                $('.alertxz-hide .alertxz-text').html(titMsg);
                $('.mask-box').show();
                $('.alertxz-hide').show();
                
                
                $('.alertxz-btn').click(function () {
                    if(titMsg == "信息提交成功！"){
                        location.href='../zjx/bxxq.html?classid='+classid;
                    }else{
                        $('.mask-box').hide();
                        $('.alertxz-hide').hide();
                    }
                });

               
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
})

function eachclass(classid){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/class/selectClassDetails?classId='+classid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            console.log(msg)
            $('.summary-top').html(msg.classname);
            $('.topic1').html(msg.drivingtype);


            
            $('.isTypeSel').click(function(){
                $('.isTypeSel').removeClass('cur');
                $(this).addClass('cur');
            });

            if($('.topic1').text().length <= 2){
                $(".isTypeSel").eq(1).remove();
            }

            var strArr = msg.characteristic.split(",");
             for(var i = 0; i < strArr.length; i++){
                    var span = $("<span class='topic2'>"+strArr[i]+"</span>");
                    if(strArr[i] != "") span.appendTo('.topic2Content');
                }
            // if(msg.characteristic){
               
            //      $('.topic2').show().html(msg.characteristic);
            // }else{
            //     $('.topic2').hide();
            // }
            $('.summary-price').html('￥'+msg.price);


            var feeArr = [msg.driverfee,msg.icfree,msg.physicalfree,msg.testfree,msg.trainingfee];
            var feeText = ['工本费','IC卡费','体检费','考试费','培训费']
            for(var i = 0; i < feeArr.length; i++){
                if(feeArr[i] != 0){
                    $('<span>'+feeText[i]+'</span>').appendTo($(".include"))
                }else{
                    $('<span>'+feeText[i]+'</span>').appendTo($(".no-include"))
                }
            };
            //表格
            $('.price').html(msg.price+'元');
            $('.include').html(msg.include);
            $('.no-include').html(msg.disinclude);
            $('.jz-type').html(msg.drivingtype);
            $('.car-type').html(msg.trainingmodels);
            $('.class-time').html("<span>科二培训课时："+msg.coursehours2+"</span>&nbsp;<span>科三培训课时: "+msg.coursehours3+"</span>");
            $('.bus-type').html(msg.bustake);
            $('.car-person').html(msg.vehicle);
            $('.seveice-topic').html(msg.characters);
            $('.bx-fee').html("<p>科目一补考费："+msg.retakecost1+" 科目二补考费："+msg.retakecost1+"</p><p> 科目三补考费："+msg.retakecost1+" 科目四补考费："+msg.retakecost1+"</p>");
            $('.mn-fee').html('<span>科目二模拟费：'+msg.simulationcost2+'</span> <span>科目三模拟费：</span>'+msg.simulationcost3);
            $('.view-btn').click(function () {
                location.href='../zjx/qrmm.html?classid='+msg.id+'&drivingId='+msg.driving_id;
            })
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//验证码
function yzm(phoneNum){
    $.ajax({
        // type : 'post',
        // contentType : "application/json;charset=utf-8",
        url : 'http://dd.dingdongxueche.com/DDWeb/signup/sendVerifyCode.htm?phoneNum='+phoneNum,
        cache : false,
        // dataType : 'jsonp',
        // jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            if(msg == "fail" || msg == ""){
                alert("发送失败！")
            }else{
                alert("发送成功！")
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}

