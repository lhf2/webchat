$(document).ready(function(){
    var vty1=localStorage.getItem('vtype');
    $('#kmy-btn').click(function () {
        location.href='../index.html?vtype='+vty1;
    })
    $('#kms-btn').click(function () {
        location.href='../index.html?vtype='+vty1;
    })
    $('.city-se-list:nth-last-child(1)').click(function () {
        $('.mask-box').show();
        $('.price-hide').show();
    })
    //找驾校
    $('.price-main').click(function () {
        $('.price-main').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.wom-main').click(function () {
        $('.wom-main').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.price-main1').click(function () {
        $('.price-main1').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.wom-main1').click(function () {
        $('.wom-main1').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.license-list').click(function () {
        $('.license-list').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.people-num').click(function () {
        $('.people-num').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.main-list').click(function(){
        $(this).css({'background':'url("../images/check.png") no-repeat','border':'0','background-size':'100% 100%'});
    });
    $('.bottom-lists').click(function () {
        var index=$(this).index('.bottom-lists');
        $('.mask-box').show();
        $('.hide-box').eq(index).show();
    });
    $('.confirm-btn').click(function(){
        $('.mask-box').hide();
        var index=$(this).index('.confirm-btn');
        $('.hide-box').eq(index).hide();
    });
    $('.confirm-btn1').click(function () {
        $('.mask-box').hide();
        $('.price-hide').hide();
    });
    $('.mask-box').click(function () {
        $(this).hide();
        $('.price-hide').hide();
        $('.hide-box').hide();
        $('.alertxz-hide').hide();
    })
    $('.jl-all:nth-child(1)').addClass('cur');
    $('.jl-list:nth-child(1)').addClass('cur');
    $('.order-list:nth-child(1)').addClass('cur');
    $('.jl-all').click(function(){
        $('.jl-all').removeClass('cur');
        $(this).addClass('cur');
        var index=$(this).index('.jl-all');
        $('.jl-right').hide();
        $('.jl-right').eq(index).show();
    })
    $('.jl-list').click(function(){
        $('.jl-list').removeClass('cur');
        $(this).addClass('cur');
    })
    /*$('.order-list').click(function () {
        $('.order-list').removeClass('cur');
        $('.main-box').hide();
        $(this).addClass('cur');
        $('.order-box').hide();
    })*/
    $('.sex').click(function(){
        $('.sex').removeClass('cur');
        $(this).addClass('cur');
    })
    $('.title-list').click(function(){
        $('.title-list').removeClass('cur');
        $(this).addClass('cur');
        var index=$(this).index('.title-list');
        $('.car-hide').hide();
        $($('.car-hide')[index]).show();
    })
    //星星评分
    $('.score').click(function(){
        var num = $(this).attr('value');
        $(this).parent('.star_bg').next('.review-star').html(''+num+'星')
    })
    //照相
    $('.add-btn').click(function () {
        $('.mask-box').show();
        $('.camera-box').show();
    })
    $('.camera-list').click(function () {
        $('.camera-list').removeClass('cur');
        $(this).addClass('cur');
    })
    $('.mask-box').click(function(){
        $(this).hide();
        $('.camera-box').hide();
    })
    $('.cancel-btn').click(function () {
        $('.camera-box').hide();
        $('.mask-box').hide();
    })
    //点击查看大图
    var scolltop;
    $(window).scroll(function(){
        scolltop=$(document).scrollTop();
        $('.bigimg-box img').hide();
        $('.bigimg-box').hide();
    });
    if(!scolltop){
        scolltop=0;
    }
    $('.de-img').click(function(){
        var imgsrc=$(this).attr('src');
        $('.bigimg-box').show().css('top',scolltop);
        $('.bigimg-box').html('<img src='+imgsrc+' alt="">');
    });
    $('.bigimg-box').click(function () {
        $('.bigimg-box img').hide();
        $(this).hide();
    });
    //返回
    $('.top-return').click(function(){
        history.back();
    });
    //搜索
    //关键词
    var keyhtml;
    

    if(location.href.indexOf("zjx.html")>=0){
        keyhtml=getQueryString('keyword');
    }
    
    $('.close-img').eq(0).click(function (e) {
        e.preventDefault();
        window.location.href = "zjx.html"
        $(this).prev('.ling-text').html('关键字/驾校名/行政区/特色').css('color','#A0A0A0');
    })

    $('.close-img').eq(1).click(function (e) {
        e.stopPropagation();
        sessionStorage.pricehtml = "价格/口碑";
        $(this).prev('.ling-text').html('价格/口碑').css('color','#A0A0A0');
    })
    //价格/口碑
    var price;var mouth;var pricehtml;
    $('.confirm-btn1').click(function () {
        price=$('.alert-main-list.cur').html();
        mouth=$('.alert-main-list1.cur').html();
        if(price!='不限'&&mouth!='不限'){
            pricehtml='￥'+price+','+mouth;
            $('.price-mouth').css('color','#434343');
        }else if(price=='不限'&&mouth!='不限'){
            pricehtml=mouth;
            $('.price-mouth').css('color','#434343');
        }else if(price!='不限'&&mouth=='不限'){
            pricehtml='￥'+price;
            $('.price-mouth').css('color','#434343');
        }else{
            pricehtml='价格/口碑';
            $('.price-mouth').css('color','#a0a0a0');
        }
        $('.price-mouth').html(pricehtml);
        
        
        sessionStorage.pricehtml = pricehtml;  
        
    })
    if(sessionStorage.pricehtml && sessionStorage.pricehtml!='价格/口碑'){
        $('.price-mouth').css("color","#434343").html(sessionStorage.pricehtml);
    }
    sessionStorage.keyhtml = keyhtml;
    if(keyhtml){
        $('.keyword-text').html(sessionStorage.keyhtml).css('color','#434343');
    }
    //弹出
    $('.alert-xz').click(function () {
        $('.mask-box').show();
        $('.alertxz-hide').show();
    });




   
})