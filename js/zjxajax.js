$(document).ready(function(){
    var city=localStorage.getItem('city');
    var latitude=localStorage.getItem('latitude');
    var longitude=localStorage.getItem('longitude');
    var city1=sessionStorage.getItem('city1');
    var citycur;
    var citycur1=getQueryString('city');
    var myScroll;
    if(location.href.indexOf('zjx.html')>=0){
        if(sessionStorage.getItem('city1')){
            $('#city-detail').html(city1);
        }else{
            $('#city-detail').html(city);
        }
        citycur=$('#city-detail').text();
        $('.my-location').click(function(){
            $('#city-detail').html(localStorage.getItem('mylocation'));
        });
        $('#city-detail').click(function(){
            location.href='../zjx/xzcs.html'
        })
        $('.keyword-text').click(function () {
            location.href='../zjx/ssls.html?city='+citycur;
        })
       $('.search-btn').click(function () {
           var keyall=$('.keyword-text').text();
           if(keyall=='关键字/驾校名/行政区/特色'){
               keyall=''
           }
           var pricef=$('.price-main1.cur').text();
           if(pricef=='不限'){
               pricef=''
           }
           var womf=$('.wom-main1.cur').text();
           if(womf=='不限'){
               womf=''
           }
           var mylocal=$('#city-detail').text();
           if(mylocal==localStorage.getItem('mylocation')){
               mylocal=localStorage.getItem('mylocation');
           }else{
               mylocal='';
           }
           var urlSerch = '../zjx/cxym.html?city='+citycur+'&keyw='+keyall+'&price='+pricef+'&wom='+womf+'&myl='+mylocal;

           location.href = urlSerch;
       })
    }
    if(location.href.indexOf('cxym.html')>=0){
        localStorage.removeItem('conditions');
        localStorage.removeItem('haveBus');
        localStorage.removeItem('haveExamSite');
        localStorage.removeItem('agent');
        localStorage.removeItem('promotion');
        localStorage.removeItem('sortType');
    }
    if(location.href.indexOf('xzcs.html')>=0){
        $('#city-name').html(city);
        $('.number-list').click(function(){
            var city1=$(this).text();
            sessionStorage.setItem('city1','');
            sessionStorage.setItem('city1',city1);
            location.href='../zjx/zjx.html';
        })
    }
    area(citycur1);
    //筛选上部分
    var haveBus='';var haveExamSite='';var agent='';var promotion='';var areacur='';var sortType=0;var price=getQueryString('price');var district='';var wom=getQueryString('wom');var licenseLevel='';var distance='';var peopleNum='';var keyw=getQueryString('keyw');var mylocation=getQueryString('myl');
    searchconditions();
    //根据筛选条件来查询
    $('.key-confirm').click(function(){
        keyw=$('.search-all').val();
        searchconditions();
    })
    $('.condition-list').eq(0).click(function(){
        if(haveBus==''){
            haveBus=1;
            $(this).css({'background':'url("../images/check.png") no-repeat','border':'0','background-size':'100% 100%'});
        }else{
            haveBus='';
            $(this).css({'background':'none','border':'1px solid #A0A0A0'});
        }
        localStorage.setItem('haveBus','');
        localStorage.setItem('haveBus',haveBus);
        searchconditions();
    })
    $('.condition-list').eq(1).click(function(){
        if(haveExamSite==''){
            haveExamSite=1;
            $(this).css({'background':'url("../images/check.png") no-repeat','border':'0','background-size':'100% 100%'});
        }else{
            haveExamSite='';
            $(this).css({'background':'none','border':'1px solid #A0A0A0'});
        }
        localStorage.setItem('haveExamSite','');
        localStorage.setItem('haveExamSite',haveExamSite);
        searchconditions();
    })
    $('.condition-list').eq(2).click(function(){
        if(agent==''){
            agent=1;
            $(this).css({'background':'url("../images/check.png") no-repeat','border':'0','background-size':'100% 100%'});
        }else{
            agent='';
            $(this).css({'background':'none','border':'1px solid #A0A0A0'});
        }
        localStorage.setItem('agent','');
        localStorage.setItem('agent',agent);
        searchconditions();
    })
    $('.condition-list').eq(3).click(function(){
        if(promotion==''){
            promotion=1;
            $(this).css({'background':'url("../images/check.png") no-repeat','border':'0','background-size':'100% 100%'});
        }else{
            promotion='';
            $(this).css({'background':'none','border':'1px solid #A0A0A0'});
        }
        localStorage.setItem('promotion','');
        localStorage.setItem('promotion',promotion);
        searchconditions();
    })
    //筛选下部分
    $('.confirm-cx').click(function () {
        var distance=$('.jl-list.cur').html();
        var area1=$('.area-list.cur').html();
        price=$('.price-main.cur').html();
        wom=$('.wom-main.cur').html();
        var licenseLevel=$('.license-list.cur').html();
        var people_num=$('.people-num.cur').html();
        var obj={'distance':distance,'area1':area1,'price':price,'wom':wom,'licenseLevel':licenseLevel,'people_num':people_num};
        var str=JSON.stringify(obj);
        localStorage.setItem('conditions',str);
        searchconditions();
    })
    $('.order-list').click(function () {
        $('.order-list').removeClass('cur');
        $('.mask-box').hide();
        $(this).addClass('cur');
        $('.order-box').hide();
        var sortType=parseInt($(this).index('.order-list'))+1;
        localStorage.setItem('sortType','');
        localStorage.setItem('sortType',sortType);
        searchconditions();
    })
    //根据筛选条件来
    function searchconditions(){
        if(localStorage.getItem('haveBus')){
            haveBus=localStorage.getItem('haveBus');
        }
        if(localStorage.getItem('haveExamSite')){
            haveExamSite=localStorage.getItem('haveExamSite');
        }
        if(localStorage.getItem('agent')){
            agent=localStorage.getItem('agent');
        }
        if(localStorage.getItem('promotion')){
            promotion=localStorage.getItem('promotion');
        }
        if(localStorage.getItem('sortType')){
            sortType=localStorage.getItem('sortType');
        }
        var getconds=localStorage.getItem('conditions');
        var getobj=JSON.parse(getconds);
        if(getobj){
            areacur=getobj.area1;
            price=getobj.price;
            wom=getobj.wom;
            licenseLevel=getobj.licenseLevel;
            distance=getobj.distance;
            peopleNum=getobj.people_num;
            //距离
            if(distance=='不限'){
                distance=''
            }else if(distance=='500米'){
                distance=0.5
            }else if(distance=='1公里'){
                distance=1
            }else if(distance=='2公里'){
                distance=2
            }else if(distance=='4公里'){
                distance=4
            }else if(distance=='8公里'){
                distance=8
            }else if(distance=='10公里'){
                distance=10
            }
            if(areacur=='不限'){
                areacur=''
            }
            if(price=='不限'){
                price=''
            }
            if(wom=='不限'){
                wom=''
            }
            if(licenseLevel=='不限'){
                licenseLevel=''
            }else if(licenseLevel=='C1手动'){
                licenseLevel='C1';
            }else if(licenseLevel=='C2自动'){
                licenseLevel='C2';
            }
            if(peopleNum=='不限'){
                peopleNum=''
            }else if(peopleNum=='一人一车'){
                peopleNum=1
            }else if(peopleNum=='二人一车'){
                peopleNum=2
            }else if(peopleNum=='多人一车'){
                peopleNum=3
            }
        };
        zjxAJAX();
    }  

    var isRefreshheight = $("#isRefresh");
    var isRefreshheight2 = $("#isDownfresh");
    
     //下拉刷新
    myScroll = new IScroll('.main-detail-box', {
        mouseWheel: true,
        useTransform: true,//CSS转化
        useTransition: true,//CSS过渡
        momentum: true,
        preventDefault:false,
        scrollbars:true,
        fadeScrollbars:true,
        shrinkScrollbars:true,
        click:true,
        probeType:3,
    });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
/*----下拉刷新上拉加载------*/
    var main_detail_box =  $(".main-detail-box");
    

    var ismsg = "下拉刷新";
    var ismsg2 = "上拉加载";
    var xiala = true;
    var shangla = true;


    main_detail_box.on("touchstart",function(){
        ismsg = "下拉刷新";
        ismsg2 = "上拉加载";
        xiala = true;
        shangla = true;
    })


    myScroll.on("scroll",function(){
       
        
        var y = parseInt(this.y)
        var maxY = parseInt(this.maxScrollY)
        var deg = function(_a){
            var a = y*2;
            var b = (maxY-y)*2;
            var is;
           
            if(!_a){
                if(a >= 180){
                    a = 180
                }else if(a <= 0){
                    a = 0
                };

                is = a;
            }else{
                if(b >= 180){
                    b = 180
                }else if(b <= 0){
                    b = 0
                };
                is = b;
                
            }
            return is;
        }

        $("#DNF").css("transform","rotate("+deg()+"deg)");
        $("#WOW").css("transform","rotate("+(deg({}))+"deg)");
        isRefreshheight.css({
            "margin-top":(y/2-5)+"px",
            "opacity":(y/200)
        });

        isRefreshheight2.css({
            "bottom":((myScroll.maxScrollY-myScroll.y-10)/2+$(".bottom-box").height())+"px",
            "opacity":((myScroll.maxScrollY-myScroll.y)/100)
        });

        if(xiala){
            if(y >= 70){
             
             ismsg = "松开刷新"
            }else{
                ismsg = "下拉刷新"
            }

        }
        
        $("#LOL").text(ismsg);
        if(shangla){
            if(y <= (myScroll.maxScrollY-myScroll.y)-160){
             ismsg2 = "松开加载"
            }else{
                ismsg2 = "下拉加载"
            }

        }
        $("#upText").text(ismsg2);
        
    });

    
    var main_detail = $(".main-detail")
    main_detail_box.on("touchend",function(){
       main_detail_box.trigger('scroll');
       xiala = false;
       shangla = false;
        if(myScroll.y >= 70){
             
            ismsg = "松开刷新";
            $(".main-detail").attr("ispage",1);
             zjxAJAX()

        };

        if(myScroll.y <= myScroll.maxScrollY-70){
            ismsg2 = "松开加载";
            
            var ispage = parseInt($(".main-detail").attr("ispage"));
            ispage++
            $(".main-detail").attr("ispage",ispage);
             zjxAJAX({});
             
        };
        
    })  
       zjxAJAX();

        //找驾校
        //参数：有参数的话 为继续加载，没有则为刷新
        function zjxAJAX(_upOrDown){
            if(!_upOrDown){
                $('.main-detail').attr("ispage",1);  
            }
            var ispage = parseInt($(".main-detail").attr("ispage"));
            $.ajax({
                // type : 'post',
                // contentType : "application/json;charset=utf-8",
                url : 'http://dd.dingdongxueche.com/DDWeb/drivingInfo/selectByConditions.htm?city='+citycur1+'&keyword='+keyw+'&price='+price+'&area='+areacur+'&district='+mylocation+'&sortType='+sortType+'&wom='+wom+'&licenseLevel='+licenseLevel+'&haveBus='+haveBus+'&haveExamSite='+haveExamSite+'&authenticationAgent='+agent+'&promotion='+promotion+'&distance='+distance+'&latitude='+latitude+'&longitude='+longitude+'&peopleNum='+peopleNum+'&currentNum='+(ispage)+'&count='+(30),
                // cache : false,
                // dataType : 'jsonp',
                // jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                //data : {id:recordid},//recordid
                success : function(_msg) {
                    var price=getQueryString('price');
                    // console.log( 'http://192.168.1.110:9080/DDWeb/drivingInfo/selectByConditions.htm?city='+citycur1+'&keyword='+keyw+'&price='+price+'&area='+areacur+'&district='+mylocation+'&sortType='+sortType+'&wom='+wom+'&licenseLevel='+licenseLevel+'&haveBus='+haveBus+'&haveExamSite='+haveExamSite+'&authenticationAgent='+agent+'&promotion='+promotion+'&distance='+distance+'&latitude='+latitude+'&longitude='+longitude+'&peopleNum='+peopleNum+'&currentNum='+(1)+'&count='+(10))
                    var msg = eval(_msg);
                    var header='http://jx.dingdongxueche.com/JXWeb/editContent/logoupload/';
                    var header1='http://jx.dingdongxueche.com/JXWeb/editContent/logoupload';
                    if(!_upOrDown){
                        $('.main-detail').html('') 
                    };
                    if(msg.length==0){
                        $('.main-detail-hide').show();
                    }else{
                        $('.main-detail-hide').hide();
                        for(var i=0;i<msg.length;i++){
                                msg[i].index=i;
                                var html='<li class="main-detail-list" id="'+msg[i].id+'">'+
                                            '<a href="javascript:;">'+
                                                '<div class="detail-list detail-left">'+
                                                    '<img data-original="'+schoolimg()+'" alt="" />'+
                                                '</div>'+
                                                '<div class="detail-list detail-center">'+
                                                    '<div class="detail-c-1">'+
                                                        '<span class="dirver-name">'+msg[i].name+'</span>'+
                                                        '<span class="first-price">'+passrate()+'</span>'+
                                                    '</div>'+
                                                   '<div class="review-img"></div>'+
                                                    '<div class="detail-c-bot">'+
                                                        '<span class="sorce-text">'+msg[i].score+'分</span>'+
                                                        '<span class="comment-num"><i>'+msg[i].evaluateCount+'</i>个评价</span>'+
                                                    '</div>'+
                                                    '<div class="detail-c-3"></div>'+
                                                    authenticationAgent()+
                                                    '<div class="detail-c-4">'+
                                                        '距离您<i>'+msg[i].distance+'</i>公里<span class="havebus">'+haveBus()+'</span>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="detail-list detail-right">￥'+msg[i].startPrice+'</div>'+
                                            '</a>'+
                                        '</li>';

                                $('.main-detail').append(html);
                                //相册
                                // var header='http://101.201.146.79:8088/dts/';
                                // var header1='http://101.201.146.79:8088/dts';
                                
                                //驾校头像
                                function schoolimg(){
                                    var schoolimgS;
                                    if(msg[i].schoolimg==''){
                                        // $('.detail-left img').eq(i).attr('data-original','../images/school_default.png');
                                        schoolimgS = '../images/school_default.png';
                                    }else{
                                        if(msg[i].schoolimg.substring(0,1)=='/'){
                                            // $('.detail-left img').eq(i).attr('data-original',header1+msg[i].schoolimg);
                                            schoolimgS = header1+msg[i].schoolimg;
                                        }else{
                                            // $('.detail-left img').eq(i).attr('data-original',header+msg[i].schoolimg);
                                            schoolimgS = header+msg[i].schoolimg;
                                        }
                                    }
                                    return schoolimgS;

                                };

                                // $('.dirver-name').eq(i).html(msg[i].name);
                                
                                //通过率
                                function passrate(){
                                    var passrateS;
                                    if(msg[i].passrate==''){
                                        passrateS = "";
                                        // $('.first-price').eq(i).html("")
                                    }else{
                                         passrateS = "通过率"+msg[i].passrate;
                                        // $('.first-price').eq(i).html("通过率"+msg[i].passrate);
                                    }
                                    return passrateS;
                                };

                                //认证图标
                                function authenticationAgent(){
                                    var AgentS;
                                        if(msg[i].authenticationAgent==1 && msg[i].grantAgent == 1){
                                                // $(".Agent").eq(i).attr("src","../images/school_shouquan.png");
                                            AgentS = '<img class="Agent" src="../images/school_shouquan.png" />'
                                        }else if(msg[i].authenticationAgent==1){
                                            // $(".Agent").eq(i).attr("src","../images/yirenzheng.png");
                                            AgentS = '<img class="Agent" src="../images/yirenzheng.png" />'
                                        }else if(msg[i].grantAgent == 1){
                                             // $(".Agent").eq(i).attr("src","../images/school_shouquan.png");
                                            AgentS = '<img class="Agent" src="../images/school_shouquan.png" />'
                                        }else{
                                            AgentS = "";
                                        }
                                    return AgentS;
                                };
                                

                                // $('.sorce-text').eq(i).html(msg[i].score+'分');
                                // $('.detail-right').eq(i).html('￥'+msg[i].startPrice);
                                // $('.detail-c-4 i').eq(i).html(msg[i].distance);
                                // $('.comment-num i').eq(i).html(msg[i].evaluateCount);
                                try{
                                    $('.review-img').eq(i).raty({
                                        path:'../images',
                                        score:Math.round(msg[i].score),
                                        showHalf:  true,
                                        readOnly:  true
                                    });
                                }catch(e){};

                                //是否显示班车
                                function haveBus(){
                                    var haveBusS = "班车";
                                    if(msg[i].haveBus=='0'){
                                        haveBusS="";
                                    }
                                    return haveBusS;
                                }
                                
                                // if(msg[i].authenticationAgent=='0'){
                                //     $('.Agent').eq(i).hide();
                                // }else{
                                //     $('.Agent').eq(i).show();
                                // }

                                var $detailC3 = $(".detail-c-3");
                                var charactersArr = msg[i].characters.split(",")
                                if(charactersArr[0] != ''){
                                    
                                    var charactersLen = charactersArr.length;
                                    for(var k = 0; k < charactersLen; k++){
                                        var $spanCon = "<span>"+charactersArr[k]+"</span>";
                                        $detailC3.eq(i).append($spanCon)
                                    }
                                }else{
                                    //如果没有标签，则放大间距占空白的空间
                                    $(".detail-c-4").eq(i).css({
                                        "margin-top":"0.2rem",
                                        "font-size":"14px"
                                    })
                                    $(".review-img").eq(i).css("margin-top","0.2rem")
                                    $(".detail-c-bot").eq(i).css("margin-top","0.2rem")
                                   
                                }
                                
                                
                                // $(".detail-c-3").eq(i).append("<span>一费到底</span><span>一费到底</span><span>一费到底</span><span>一费到底</span>")

                                
                                
                        }
                    }
                    
                    //点击每一个进去
                    $('.main-detail-list').click(function () {
                        var index=$(this).index('.main-detail-list');
                        location.href='../zjx/jxxq.html?id='+$(this).attr("id");
                    });

                   
                    myScroll.refresh();
                   

                    //懒加载
                    $("img").lazyload({
                      effect: "fadeIn", // 载入使用何种效果
                        // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
                      threshold: 200, // 提前开始加载lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
                      container: $(".main-detail"), 
                    });

                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(XMLHttpRequest.status + ' '
                    + XMLHttpRequest.readyState + ' ' + textStatus);
                }
            })
        }


    


   



});

function area(city){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/drivingInfo/selectAreaByCitys?city='+city,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //data : {id:recordid},//recordid
            success : function(msg) {
                $('.area-right').html('')
                var areaarr=msg[0].areas;
                for(var i=0;i<areaarr.length+1;i++){
                    areaarr[i].index=i;
                    var arealist='<li class="jl-list1 area-list"></li>';
                    $('.area-right').append(arealist);
                    $('.area-right .area-list').eq(0).html('不限').addClass('cur');
                    $('.area-right .area-list').eq(i+1).html(areaarr[i]);
                    $('.jl-list1').click(function(){
                        $('.jl-list1').removeClass('cur');
                        $(this).addClass('cur');
                    })
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }


   