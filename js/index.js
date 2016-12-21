$(function(){
    if(location.href.indexOf('index.html')>=0){
        var vtype1=getQueryString('vtype');
        localStorage.setItem('vtype','');
        localStorage.setItem('vtype',vtype1);
    }
    //**************************模拟考试********************************
    $('.set-botnum a img').click(function(){
        $('.mask-box').show();
        $('.topic-num').show().css('z-index','3000');
    })
    $('.topic-close a img').click(function(){
        $('.mask-box').hide();
        $('.topic-num').hide().css('z-index','100');
    })
    //收藏 取消收藏
    var flag2=true;
    $('.sc-btn').click(function(){
        var id=$(this).children('a').children('.set-img').children('img').attr('id');
        var id1=id+'1';
        if(flag2){
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id1+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('收藏成功');
            $('.sc-img img').attr('src','../images/like1.png');
            flag2=false;
        }else{
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('取消收藏');
            $('.sc-img img').attr('src','../images/like.png');
            flag2=true;
        }
        var t=setTimeout(function(){
            $('.sc-box').hide();
        },3000)
    })
    //屏蔽 取消屏蔽
    var flag3=true;
    $('.set-botlist:nth-child(1)').click(function(){
        var id=$(this).children('a').children('.set-img').children('img').attr('id');
        var id1=id+'1';
        if(flag3){
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id1+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('屏蔽成功');
            $('.sc-img img').attr('src','../images/pb1.png');
            flag3=false;
        }else{
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('取消屏蔽');
            $('.sc-img img').attr('src','../images/pb.png');
            flag3=true;
        }
        var t=setTimeout(function(){
            $('.sc-box').hide();
        },3000)
    })
    //返回键 交卷 弹窗
    $('.alert-show').click(function(){
        $('.mask-box').show();
        $('.alert-box1').show();
    })
    $('.jj-btn').click(function(){
        $('.mask-box').show();
        $('.alert-box1').show();
    })
    //倒计时
    var min=$('#minute');var sec=$('#second');
    var time=function(){
        if(sec.html()=='00'){
            var mthtml=parseInt(min.html())-1;
            if(mthtml<10){
                min.html('0'+mthtml)
            }else{
                min.html(mthtml);
            }
            sec.html('60');
        }
        var sechtml=parseInt(sec.html())-1;
        if(sechtml<10){
            sec.html('0'+sechtml)
        }else{
            sec.html(sechtml);
        }
    };
    var st=setInterval(time,1000);
    //闹钟
    $('.clock-box').click(function () {
        $('.mask-box').show();
        $('.alert-box').show();
        clearInterval(st);
    });
    //继续考试
    $('.jxks-btn').click(function(){
        $('.mask-box').hide();
        $('.alert-box').hide();
        st=setInterval(time,1000);
    });
    $('.rtn-box').click(function () {
        history.back();
    });
    $('.top-return').click(function () {
        history.back();
    })
    //设置
    $('.set-box').click(function(){
        $('.mask-box').show();
        $('.setting-box').show().css('z-index','3000');
    })
    $('.set-close').click(function(){
        $('.mask-box').hide();
        $('.setting-box').hide().css('z-index','100');
    })
    //夜间模式
    $('[id^="checkbox-10-"]').click(function(){
        $('.mask-box').hide();
        $('.setting-box').hide().css('z-index','100');
        if($('[id^="checkbox-10-"]').attr('checked')){
            //top开始
            $('.top-box').css('background','#1A303C');
            $('.top-box span').css('color','#D6D8D9');
            var id=$('.top-box .top-detail .rtn-box img').attr('id');
            var id1=id+'1';
            $('.top-box .top-detail .rtn-box img').attr('src','../images/'+id1+'.png');
            var k=$('.top-box .top-detail .set-box img').attr('id');
            var k1=k+'1';
            $('.top-box .top-detail .set-box img').attr('src','../images/'+k1+'.png');
            //main开始
            $('.main-box').css({background:'#294A5D',color:'#D7DBDE'});
            $('.main-box .answer-box .answer-list a').css('color','#D7DBDE')
            //底部开始
            $('.set-bottom').css('background','#1C323F');
            $('.set-bottom .set-botnum span').css('color','#fff');
            $('.set-botlists .set-botlist a .set-text').css('color','#626262')
        }else{
            //top开始
            $('.top-box').css('background','linear-gradient(#FBFBFB 0%,#F7F7F7 50%,#F4F4F4 100%)');
            $('.top-box span').css('color','#434343');
            var id=$('.top-box .top-detail .rtn-box img').attr('id');
            $('.top-box .top-detail .rtn-box img').attr('src','../images/'+id+'.png');
            var k=$('.top-box .top-detail .set-box img').attr('id');
            $('.top-box .top-detail .set-box img').attr('src','../images/'+k+'.png');
            //main开始
            $('.main-box').css({background:'#fff',color:'#434343'});
            $('.main-box .answer-box .answer-list a').css('color','#434343')
            //底部开始
            $('.set-bottom').css('background','linear-gradient(#FEFEFE 0%,#F9F9F9 50%,#F5F5F5 100%)');
            $('.set-bottom .set-botnum span').css('color','#313131');
            $('.set-botlists .set-botlist a .set-text').css('color','#434343')
        }
    })
    //题型显示正确与否
    //正确
    $('.right-btn').click(function(){
        $(this).removeClass('circle-btn').html('<img class="right-erorr" src="../images/r.png">').css({background:'#0DC810'});
        $(this).parent('a').parent('.answer-list').siblings().children('a').children('.circle-btn').html('<img class="right-erorr" src="../images/x.png">').css({background:'#FC3838'});
        $('.line').show();
        $('.ans').show();
    })
    //错题
    $('.main-box .main-inner-box .answer-box .answer-list a .circle-btn').click(function(){
        $(this).html('<img class="right-erorr" src="../images/x.png">').css({background:'#FC3838'});
        $(this).parent('a').parent('.answer-list').siblings().children('a').children('.right-btn').html('<img class="right-erorr" src="../images/r.png">').css({background:'#0DC810'});
        $('.line').show();
        $('.ans').show();
    })
    //显示解析
    var flag=[];
    for(var i=0;i<2;i++){
        flag[i]=true;
    }
    $('.show-btn').click(function () {
        var index=$(this).parent('.line').parent('.analyze-list').index();
        if(flag[index]){
            $(this).parent('.line').next('.ans').hide();
            $(this).children().children('.jiantou').css('-webkit-transform','rotate(180deg)')
            flag[index]=false;
        }else{
            $(this).parent('.line').next('.ans').show();
            $(this).children().children('.jiantou').css('-webkit-transform','rotate(0deg)');
            flag[index]=true;
        }
    })
    //字体大小
    $('.zt-list').click(function(){
        $('.mask-box').hide();
        $('.setting-box').hide();
    });
    $('.zt-list:nth-child(1)').click(function(){
        $('.main-inner-box').css('font-size','20px');
    });
    $('.zt-list:nth-child(2)').click(function(){
        $('.main-inner-box').css('font-size','18px');
    });
    $('.zt-list:last-child').click(function(){
        $('.main-inner-box').css('font-size','16px');
    });
    //**************************章节练习********************************
    $('.zj-list').click(function () {
        $('.mask-box').show();
        $('.topic-alert').show();
    })
    //**************************专项练习********************************
    $('.title-box li').click(function () {
        var index=$('.title-box li').index(this);
        $('.icon-box').hide();
        $($('.icon-box')[index]).show();
    })
    //清除答题记录
    $('.clear-record').click(function(){
        $('.topic-num').hide();
        $('.clearrecord-hide').show();
    })
    //取消
    $('.qx-btn').click(function(){
        $('.mask-box').hide();
        $('.clearrecord-hide').hide();
    })
    //选择驾考类型
    var vtype;
    $('.option-detail').each(function(){
        $(this).click(function(){
            reloadimg();
            $('.option-detail').removeClass('cur');
            $(this).addClass('cur');
            var j=$(this).children('img').attr('id');
            var j1=j+'1';
            $(this).children('img').attr('src','images/'+j1+'.png');
            vtype=$('.option-detail.cur span').html();
        })
        if(vtype==undefined){
            vtype='小车'
        }
    });
    $('.bottom-btn').click(function () {
        $(this).children('a').attr('href','index.html?vtype='+vtype);
    });
    //重制图片
    function reloadimg(){
        $('.option-detail img').each(function(index){
            var vid = $(this).attr('id');
            $(this).attr('src','images/'+ vid +'.png')
        })
        $('.set-botlist a .set-ling-img img').each(function(index){
            var vid = $(this).attr('id');
            $(this).attr('src','../images/'+  vid +'.png')
        })
        $('.bottom-lists a img').each(function(index){
            var vid = $(this).attr('id');
            $(this).attr('src','../images/'+  vid +'.png')
        })
    }
    //导航栏
    var stype;
    var pages = $(".page").attr("page");//当前页数
    switch(pages){
        case "1":
        $('#fix-both ul li:nth-child(2) a').addClass('cur');
        break;
        case "4":
        $('#fix-both ul li:nth-child(5) a').addClass('cur');
        break;
        default:;
    }
    $('#fix-both ul li:nth-child(2),#fix-both ul li:nth-child(5)').each(function(){
        $(this).click(function(){
            var index = $(this).index();
            $(".page").attr("page",index);
            $('#fix-both ul li a').removeClass('cur');
            $(this).children('a').addClass('cur');
            stype=$('#fix-both ul li a.cur').html();
        })
        if(stype==' '||stype==undefined){
            stype='科目一'
        }
    });
    
    // $('#fix-both ul li:nth-child(2),#fix-both ul li:nth-child(5)').click(function(){
    //     $(this).children('a').addClass("cur").parents().siblings().children('a').removeClass("cur");
    // })
    //科目
    var vehicleType=getQueryString('vtype');
    //模拟考试
    $('.big-circle').click(function () {
        $(this).children('.score').attr('href','kmy/mnks.html?testtype=mnks&stype='+stype+'&vtype='+vehicleType+'&swiperindex=0')
    });
    //顺序练习
    $('.ling1').click(function(){
        $(this).children('a').attr('href','kmy/sxlx.html?testtype=sxlx&stype='+stype+'&vtype='+vehicleType+'&swiperindex=0')
    })
    //随机练习
    $('.ling2').click(function(){
        $(this).children('a').attr('href','kmy/sjlx.html?testtype=sjlx&stype='+stype+'&vtype='+vehicleType+'&swiperindex=0')
    })
    //章节练习
    $('.ling3').click(function(){
        $(this).children('a').attr('href','kmy/zjlx.html?testtype=zjlx&stype='+stype+'&vtype='+vehicleType)
    })
    //专项练习
    $('.ling4').click(function(){
        $(this).children('a').attr('href','kmy/zxlx.html?testtype=zxlx&stype='+stype+'&vtype='+vehicleType)
    })
    $('.mask-box').click(function () {
        $(this).hide();
        $('.topic-num').hide();
        $('.alertxz-hide').hide();
    })
    //弹出
    $('.alert-xz').click(function () {
        $('.mask-box').show();
        $('.alertxz-hide').show();
    })
})



