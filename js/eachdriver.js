$(document).ready(function () {
    //判断是否登陆
    var userId=localStorage.getItem('userid');
    var did=getQueryString('id');
    if(location.href.indexOf('jxxq.html')>=0||location.href.indexOf('jx-detail.html')>=0){
        eachdriving(did);
        picallnum(did);
        classall(did);
    }
    if(location.href.indexOf('wzfbx.html')>=0){
        schoolbus(did);
        $('.bus-list:nth-child(1)').click(function(){
            schoolbus(did);
        })
        $('.bus-list:nth-child(2)').click(function(){
            transitbus(did);
        })
    }
    ////查询单个驾校信息
    function eachdriving(did){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/drivingInfo/selectByIds?dId='+did,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //data : {id:recordid},//recordid
            success : function(msg) {
                var header='http://www.dingdongxueche.com:9080/JXWeb/editContent/logoupload/';
                $('.jx-name').html(msg.name);
                if(msg.passrate==''){
                    $('.nopass-box').hide();
                }else{
                    $('.nopass-box').show();
                    $('.nopass-box i').html(msg.passrate);
                }
                $('.comment-num i').html(msg.evaluateCount);
                if(msg.schoolimg){
                    $('.jx-img img').attr('src',header+msg.schoolimg);
                }else{
                    $('.jx-img img').attr('src','../images/notify_title.png');
                }
                if(msg.haveBus=='0'){
                    $('.havebus').hide();
                }else{
                    $('.havebus').show();
                }
                if(msg.authenticationAgent=='0'){
                    $('.Agent').hide();
                }else{
                    $('.Agent').show();
                }
                $('.adr').html(msg.address);
                $('.bus-direct').click(function(){
                    location.href='../zjx/wzfbx.html?id='+did;
                })
                $('.Driving-details').click(function () {
                    location.href='../zjx/jxwz.html?latitude='+msg.latitude+'&longitude='+msg.longitude;
                })
                $('.jx-detail').click(function(){
                    location.href='../zjx/jx-detail.html?id='+did;
                })
                $('.review-title').click(function () {
                    location.href='../zjx/wydp.html?id='+did;
                })
                $('.jx-comment').click(function(){
                    location.href='../zjx/wydp.html?id='+did;
                })
                $('.jx-img img').click(function () {
                    location.href='../zjx/jxxc.html?id='+did;
                })
                //驾校详细信息
                $('.list-all').eq(0).html(msg.tarinaddress);
                var trainMes = eval(msg.trainAddress)
                var len = trainMes.length;
                var trainStr = '';
                for(var i = 0; i < len; i++){
                    trainStr+='<p>'+trainMes[i].tarinaddress+'</p>';
                }
                $(".list-all").eq(0).html(trainStr)
                $('.list-all').eq(1).html(msg.trainVehicle+'辆');
                $('.list-all').eq(2).html(msg.staffPersons+'人');
                $('.list-all').eq(3).html(msg.schoolHonor);
                $('.detail-con').html(msg.description);
                $('.review-img').raty(
                    {
                        path:'../images',
                        score:Math.round(msg.score),
                        showHalf:  true,
                        readOnly:  true
                    }
                )
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }

     //我要点评
    $('.review-btn').click(function(){
        if(userId){
            location.href='../zjx/xydp.html?id='+did;
        }else{
            location.href='../login/login.html'
        }
    })

    //班级
    function classall(did){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/class/selectClassess?drivingId='+did+'&currentNum=1&count=100',
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //data : {id:recordid},//recordid
            success : function(msg) {
                console.log(msg)
                var classhtml=' <li class="sign-list">'+
                                   '<div class="detail-summary">'+
                                    '<div class="detail-summary-left">'+
                                     '<div class="summary-top"></div>'+
                                     '<div class="summary-topic">'+
                                      '<span class="topic1"></span>'+
                                      '<span class="topic2"></span>'+
                                     '</div>'+
                                    '</div>'+
                                    '<div class="detail-summary-right">'+
                                     '<div class="pirce-summary">'+
                                        '<span class="pirce1"></span>'+
                                        '<span class="pirce2"></span>'+
                                     '</div>'+
                                     '<div class="sign-btn">'+
                                      '<a href="javascript:;">我要报名</a>'+
                                     '</div>'+
                                    '</div>'+
                                   '</div>'+
                                '</li>';
                $('.sign-detail').html(' ');
      
                for(var i=0;i<msg.length;i++){
                    msg[i].index=i;
                    var msgarr = msg[i].characteristic.split(",")
                    $('.sign-detail').append(classhtml);
                    $('.summary-top').eq(i).html(msg[i].classname);
                    $('.topic1').eq(i).html(msg[i].drivingtype);
                    if(msg[i].floaprice == null || parseInt(msg[i].floaprice)<=0)$('.pirce-summary').eq(i).find(".pirce2").remove();
                    $('.pirce-summary').eq(i).find(".pirce2").html('￥'+(parseInt(msg[i].price)+parseInt(msg[i].floaprice)));
                    $('.pirce-summary').eq(i).find(".pirce1").html('￥'+msg[i].price);

                    
                    for(var j = 0; j < msgarr.length; j++){
                        var $topic2Content = $("<span class='topic2Content'>"+msgarr[j]+"</span>");
                        if(msgarr[j] != "") $('.topic2').eq(i).append($topic2Content);
                    }
                
                    if(msg[i].characters==''){
                        $('.topic2').eq(i).hide();
                    }else{
                        $('.topic2').eq(i).show();
                    }
                    $('.sign-btn').click(function(){
                        if(userId){
                            var index=$(this).index('.sign-btn');
                            location.href='../zjx/bxxq.html?classid='+msg[index].id;
                        }else{
                            location.href='../login/login.html'
                        }
                    })
                }
                console.log()
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
    //驾校公告-tab
    $(".tab-button").click(function(){
         $(this).addClass("cur").siblings().removeClass("cur");
         var typeNum = 0;
         if($(this).text() == "驾校公告"){
            typeNum = 0;
         }else{
            typeNum = 1;
         };
         notice(did,typeNum)
    });
    $(".tab-button.cur").click();
    //驾校公告
    function notice(did,type){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/drivingInfo/selectNoticeDynamics?drivingId='+did+'&type='+type,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",
            success : function(data){
                console.log(data)
                var $typeContent = $(".type-content"),
                    len = data.length;
                $typeContent.html("");
                for(var i = 0; i < len; i++){
                    $("<li class='listNotice'><span class='title'>"+data[i].title+"</span><span class='pubTime'>"+data[i].pubTime+"</span></li>").appendTo($typeContent);
                };
                var $popBox = $(".popBox")
                $(".listNotice").on("click",function(){
                var index = $(this).index();
                   $popBox.find(".title_1").text($(".tab-button.cur").text());
                   $popBox.find(".title_2").text($(this).find(".title").text());
                   $popBox.find(".date_time").text($(this).find(".pubTime").text());
                   $popBox.find(".content").text(data[index].content);
                   $popBox.fadeIn(200);
                })
                $popBox.find(".popUp_close").click(function(){
                    $(this).parent().parent().fadeOut(200);
                })
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }

        });
    };

});
//相册
function picallnum(did){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivPicture/selectPicsCounts?drivingId='+did,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            if(msg==''){
                $('.jx-img span').html(0+'张');
                $('.jx-img img').attr('src','../images/notify_title.png');
            }else{
                $('.jx-img span').html(msg+'张');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//查询公交
function transitbus(did){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivingInfo/selectTraffics?drivingId='+did+'&busType=2',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            $('.transit-box').html('');
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                //公交
                var gjhtml='<li class="transit-list"><div class="transit-left"><div class="transit-num"></div><div class="transit-text">路</div></div><div class="transit-center"><div class="transit-loc"><span class="start-station"></span><img src="../images/kw.png" alt=""><span class="end-station"></span></div><div class="transit-time"><span class="start-time"></span>-<span class="end-time"></span></div><div class="transit-detail"></div></div><div class="transit-right"><div class="transit-Destination"></div><div class="Destination-btn">目的地</div></div></li>';
                $('.transit-box').append(gjhtml);
                $('.transit-num').eq(i).html(msg[i].busRoute);
                $('.start-station').eq(i).html(msg[i].startStation);
                $('.end-station').eq(i).html(msg[i].endStation);
                $('.start-time').eq(i).html(msg[i].startTime);
                $('.end-time').eq(i).html(msg[i].endTime);
                $('.transit-detail').eq(i).html(msg[i].posDirect);
                $('.transit-Destination').eq(i).html(msg[i].destination);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//查询班车
function schoolbus(did){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivingInfo/selectTraffics?drivingId='+did+'&busType=1',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            if(msg==''){
                $('#school-bus').hide();
            }
            $('.car-box').html('');
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                //班车
                var bchtml='<li class="car-list"></li>';
                $('.car-box').append(bchtml);
                $('.car-list').eq(i).html(msg[i].busRoute);
                $('.car-list:nth-child(1)').addClass('cur');
            }
            eachschoolbus(msg[0].id);
            $('.car-list').click(function(){
                $('.car-list').removeClass('cur');
                $(this).addClass('cur');
                var index=$(this).index('.car-list');
                var routeId=msg[index].id;
                eachschoolbus(routeId);
            })
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//查询班车详细信息
function eachschoolbus(routeId){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivingInfo/selectBusDetails?routeId='+routeId,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            $('tbody').html('');
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                var eachbus='<tr><td class="stations">大钟寺</td><td class="position">公交车站西过街天桥下</td><td class="time1">13:07</td><td class="time2">10:07</td><td class="time3">03:27</td></tr>';
                $('tbody').append(eachbus);
                $('.stations').eq(i).html(msg[i].stations);
                $('.position').eq(i).html(msg[i].position);
                $('.class-time1 div').html(msg[i].classTimeOne);
                $('.class-time2 div').html(msg[i].classTimeTwo);
                $('.class-time3 div').html(msg[i].classTimeThree);
                $('.time1').eq(i).html(msg[i].stationTimeOne);
                $('.time2').eq(i).html(msg[i].stationTimeTwo);
                $('.time3').eq(i).html(msg[i].stationTimeThree);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}




