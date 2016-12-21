$(document).ready(function(){
    /*if(getQueryString('testtype')=='sjlx'){
        $('head title').html('随机练习');
    }*/
    var cityname=localStorage.getItem('city');
    var numall;var subjectType=getQueryString('stype');var vehicleType=getQueryString('vtype');var testType=getQueryString('testtype');var thisId = getQueryString('id');
   
    if(thisId){
       window.location.href = "kt-share.html?id="+thisId
    }else{

    //模拟考试
    if(testType=='mnks'){
        $('.jj-btn').click(function(){
            $('.mask-box').hide();
            var rightscore=$('.right-detail i').text();
            var min=parseInt($('#minute').text());
            var sec=parseInt($('#second').text());
            if(sec=='00'){
                min=min-1;
            }
            var minafter=44-min;
            var secafter=60-sec;
            if(secafter==60){
                secafter='00'
            }
            if(minafter<10){
                minafter='0'+minafter
            }
            if(secafter<10&&secafter!='00'){
                secafter='0'+secafter
            }
            if(rightscore<=90){
                location.href='../kmy/jj.html?score='+rightscore+'&time='+minafter+':'+secafter;
            }else{
                location.href='../kmy/jj1.html?score='+rightscore+'&time='+minafter+':'+secafter;
            }
        })
    }
    if(testType=='mnks'&&subjectType=='科目一'){
        numall=100;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,4,numall);
    }else if(testType=='mnks'&&subjectType=='科目四'){
        numall=50;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,4,numall);
    }
    //顺序练习
    if(testType=='sxlx'&&subjectType=='科目一'){
        numall=1311;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,0,numall);
    }else if(testType=='sxlx'&&subjectType=='科目四'){
        numall=1121;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,0,numall);
    }
	//随机练习
    if(testType=='sjlx'&&subjectType=='科目一'){
        $('.top-detail span').html('随机练习');
        numall=1311;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,1,numall);
    }else if(testType=='sjlx'&&subjectType=='科目四'){
        $('.top-detail span').html('随机练习');
        numall=1121;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,1,numall);
    }
    //点击数字键盘
    $('.topic-lists').html('');
    for(var i=1;i<=numall;i++){
        var numlist='<li class="num-list"><a href="javascript:;">'+i+'</a></li>';
        $('.topic-lists').append(numlist);
    }
    if(getQueryString('testtype')=='sjlx'){
        $('.top-detail span').html('随机练习');
    }
    }
});

function hasString(str,strArr){
    var state = false;
    if(strArr.indexOf(str)==-1){
        state = false;
    }
    else{
        state = true ;
    }
    return state;
}



function mnks(subjectType,vehicleType,cityname,trainType,numall){
              

    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        //http://101.201.146.79:8088/dts/question/questionInfo?id=427031114633183240&callbackparam=aaa&id
        url : 'http://101.201.146.79:8088/dts/question/getQuestionsByInfo?subjectType='+subjectType+'&vehicleType='+vehicleType+'&city='+cityname+'&trainType='+trainType,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        // data : {"id":"433879232846757888"},//recordid
        success : function(msg){
           
            var header = 'http://101.201.146.79:8090/dts/picture/question-img/';
            var rightimghtml='<img src="../images/r.png"/>';
            var errorimghtml='<img src="../images/x.png"/>';
            var state = {};
            
                //题型
                var i=0;var t;
                var swiperindex=getQueryString('swiperindex');
                question(swiperindex);
                $('.num-ling').html(parseInt(swiperindex)+1);
                function question(i){
                    var queflag=true;
                    //类型 题目 图片
                    

                  
                   
                    

                    $('.main-title span').html(msg[i].questionType);
                    $('.main-title i').html(msg[i].details);
                    if(msg[i].picture==''&&msg[i].gif==''){
                        $('.main-img img').attr('src','').css({'width':0,'height':0});
                    }else if(msg[i].picture!=''){
                        $('.main-img img').attr('src',header+msg[i].picture).css({'width':'auto','max-width':'100%','height':'150px'});
                    }else if(msg[i].gif!=''){
                        $('.main-img img').attr('src',header+msg[i].gif).css({'width':'auto','max-width':'100%','height':'150px'});

                    }
                    //选项
                    var html='<li class="answer-list"> <a href="javascript:;" class="ui-link"> <span class="circle-btn">A</span> <span class="option-detial"></span> </a> </li>';
                    var arr=msg[i].optionsValue.split(';');
                    var arr1=['A','B','C','D'];
                    $('.answer-box').html('');
                    for(var j=0;j<arr.length-1;j++){
                        arr[j].index=j;
                        $('.answer-box').append(html);
                        $('.circle-btn').eq(j).html(arr1[j]);
                        $('.option-detial').eq(j).html(arr[j]);
                    }
                    //是否正确
                    //多选题
                    var multiselect=msg[swiperindex].rightAnswers.split('');
                    /*if(msg[0].questionType=='多选题'){
                        $('.confirm-btn').show();
                    }*/
                    if(msg[swiperindex].questionType=='多选题'){
                        $('.confirm-btn').show();
                        $('.circle-btn').click(function(){
                            $(this).css('background','linear-gradient(#c7c7c7 0%,#C1C1C1 50%,#B9B9B9 100%)');
                            clearTimeout(t);
                        });
                        $('.confirm-btn').click(function(){
                            for(var k=0;k<$('.circle-btn').length;k++){
                                $('.circle-btn')[k].index=k;
                                var html1=$($('.circle-btn')[k]).html();
                                if($($('.circle-btn')[k]).css('background')=='rgba(0, 0, 0, 0) linear-gradient(rgb(199, 199, 199) 0%, rgb(193, 193, 193) 50%, rgb(185, 185, 185) 100%) repeat scroll 0% 0% / auto padding-box border-box'){
                                    var html=$($('.circle-btn')[k]).html();
                                    console.log(html);
                                    console.log(hasString(html,multiselect));
                                    if(hasString(html,multiselect)){
                                        $($('.circle-btn')[k]).css('background','#0DC810').html(rightimghtml);
                                    }else{
                                        $($('.circle-btn')[k]).css('background','#FC3838').html(errorimghtml);
                                    }
                                }else{
                                    if(hasString(html1,multiselect)){
                                        $($('.circle-btn')[k]).css('background','#0DC810');
                                    }
                                }
                            }
                        });
                    }else{
                        $('.confirm-btn').hide();
                        $('.circle-btn').click(function(){
                            queflag=false;
                            var cur=parseInt($('.num-ling').html())-1;
                            var xnum=parseInt($('.error-detail i').html());
                            var rnum=parseInt($('.right-detail i').html());
                            var errornum=$('#error-num').html();
                            t=setTimeout(function () {
                                swiperindex++;
                                question(swiperindex);
                                $('.num-ling').html(swiperindex+1);
                            },500);
                            //未答题
                            $('#mn-none').html(100-xnum-rnum);
                            $('#sx-none').html(1311-xnum-rnum);
                            if($(this).html()==msg[cur].rightAnswers){
                                $(this).css('background','#0DC810').html(rightimghtml);
                                $('.analyze-box .analyze-list .line').hide();
                                $('.ans').hide();
                                $('.num-list a').eq(cur).css('background','#0DC810');
                                rnum++;
                                $('.right-detail i').html(rnum);
                            }else{
                                $(this).css('background','#FC3838').html(errorimghtml);
                                //解析
                                $('.analyze-box .analyze-list .line').show();
                                $('.ans').show();
                                $('.ans-top i').html(msg[cur].rightAnswers);
                                $('.ans-detail').html(msg[cur].analysis);
                                $('.num-list a').eq(cur).css('background','#FC3838');
                                xnum++;errornum++;
                                $('.error-detail i').html(xnum);
                                $('#error-num').html(errornum);
                                for(var k=0;k<$('.circle-btn').length;k++){
                                    $('.circle-btn')[k].index=k;
                                    if($('.circle-btn').eq(k).html()==msg[cur].rightAnswers){
                                        $('.circle-btn').css('background','#FC3838').html(errorimghtml);
                                        $('.circle-btn').eq(k).css('background','#0DC810').html(rightimghtml);
                                    }else{
                                        if(location.href.indexOf('mnks.html')<0){
                                            clearTimeout(t);
                                        }
                                    }
                                }
                            }
                            if(queflag==false){
                                $('.circle-btn').off('click');
                            }
                        });
                    }
                    //点击题号
                    var cur1;
                    $('.num-list').click(function(){
                        cur1=$(this).index('.num-list');
                        $('.num-ling').html(cur1+1);
                        swiperindex=parseInt($('.num-ling').html())-1;
                        //更改url
                        var stateObject = {};
                        var title = "Wow Title";
                        var newUrl;
                        var stype1=getQueryString('stype');
                        if(getQueryString('testtype')=='sxlx'){
                            newUrl = '../kmy/sxlx.html?testtype=sxlx&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                        }else if(getQueryString('testtype')=='sjlx'){
                            newUrl = '../kmy/sjlx.html?testtype=sjlx&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                        }else if(getQueryString('testtype')=='mnks'){
                            newUrl = '../kmy/mnks.html?testtype=mnks&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                        }
                        history.pushState(stateObject,title,newUrl);
                        question(cur1);
                        if($('.mode-text').html()=='背题'){
                            $('.ans-top i').html(msg[swiperindex].rightAnswers);
                            $('.ans-detail').html(msg[swiperindex].analysis);
                            for(var k=0;k<$('.circle-btn').length;k++){
                                $('.circle-btn')[k].index=k;
                                if($('.circle-btn').eq(k).html()==msg[cur1].rightAnswers){
                                    $('.circle-btn').css('background','#FC3838').html(errorimghtml);
                                    $('.circle-btn').eq(k).css('background','#0DC810').html(rightimghtml);
                                }
                            }
                        }
                    });
                };
                //左右滑动
                $("body").on("swipeleft",function(){
                    swiperindex++;
                    if(swiperindex>=numall){
                        swiperindex=numall-1;
                    }
                    //更改url
                    var stateObject = {};
                    var title = "Wow Title";
                    var newUrl;
                    var stype1=getQueryString('stype');
                    if(getQueryString('testtype')=='sxlx'){
                        newUrl = '../kmy/sxlx.html?testtype=sxlx&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                    }else if(getQueryString('testtype')=='sjlx'){
                        newUrl = '../kmy/sjlx.html?testtype=sjlx&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                    }else if(getQueryString('testtype')=='mnks'){
                        newUrl = '../kmy/mnks.html?testtype=mnks&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                    }
                    history.pushState(stateObject,title,newUrl);
                    $('.num-ling').html(swiperindex+1);
                    question(swiperindex);
                    if(getQueryString('testtype')!='mnks'){
                        //练习
                        if($('.mode-text').html()=='练习'){
                            question(swiperindex);
                            $('.analyze-box .analyze-list .line').hide();
                            $('.ans').hide();
                        }else{
                            $('.ans-top i').html(msg[swiperindex].rightAnswers);
                            $('.ans-detail').html(msg[swiperindex].analysis);
                            for(var k=0;k<$('.circle-btn').length;k++){
                                $('.circle-btn')[k].index=k;
                                if($('.circle-btn').eq(k).html()==msg[swiperindex].rightAnswers){
                                    $('.circle-btn').css('background','#FC3838').html(errorimghtml);
                                    console.log($('.circle-btn').eq(k))
                                    $('.circle-btn').eq(k).css('background','#0DC810').html(rightimghtml);
                                }
                            }
                        }
                    }
            });
                
                $("body").on("swiperight",function (){
                    swiperindex=parseInt($('.num-ling').html())-1;
                    swiperindex--;
                    if(swiperindex<=0){
                        swiperindex=0;
                    }
                    //更改url
                    var stateObject = {};
                    var title = "Wow Title";
                    var newUrl;
                    var stype1=getQueryString('stype');
                    if(getQueryString('testtype')=='sxlx'){
                       newUrl = '../kmy/sxlx.html?testtype=sxlx&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                    }else if(getQueryString('testtype')=='sjlx'){
                        newUrl = '../kmy/sjlx.html?testtype=sjlx&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                    }else if(getQueryString('testtype')=='mnks'){
                        newUrl = '../kmy/mnks.html?testtype=mnks&stype='+stype1+'&vtype=小车&swiperindex='+swiperindex+'&id='+msg[swiperindex].id;
                    }
                    history.pushState(stateObject,title,newUrl);
                    question(swiperindex);
                    $('.num-ling').html(swiperindex+1);
                    question(swiperindex);
                    if(getQueryString('testtype')!='mnks'){
                        //练习
                        if($('.mode-text').html()=='练习'){
                            $('.analyze-box .analyze-list .line').hide();
                            $('.ans').hide();
                        }else{
                            $('.ans-top i').html(msg[swiperindex].rightAnswers);
                            $('.ans-detail').html(msg[swiperindex].analysis);
                            for(var k=0;k<$('.circle-btn').length;k++){
                                $('.circle-btn')[k].index=k;
                                if($('.circle-btn').eq(k).html()==msg[swiperindex].rightAnswers){
                                    $('.circle-btn').css('background','#FC3838').html(errorimghtml);
                                    $('.circle-btn').eq(k).css('background','#0DC810').html(rightimghtml);
                                }
                            }
                        }
                    }
            });
            //背题模式 练习模式切换
            var flag1=true;
            $('.set-botlist:nth-last-child(1)').click(function(index){
                var id=$(this).children('a').children('.set-img').children('img').attr('id');
                var id1=id+'1';
                if(flag1){
                    $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id1+'.png');
                    $(this).children('a').children('.set-text').html('背题');
                    $('.line').show();
                    $('.ans').show();
                    $('.ans-top i').html(msg[swiperindex].rightAnswers);
                    $('.ans-detail').html(msg[swiperindex].analysis);
                    for(var k=0;k<$('.circle-btn').length;k++){
                        $('.circle-btn')[k].index=k;
                        if($('.circle-btn').eq(k).html()==msg[swiperindex].rightAnswers){
                            $('.circle-btn').css('background','#FC3838').html(errorimghtml);
                            $('.circle-btn').eq(k).css('background','#0DC810').html(rightimghtml);
                        }
                    }
                    flag1=false;
                }else{
                    $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id+'.png');
                    $(this).children('a').children('.set-text').html('练习');
                    $('.line').hide();
                    $('.ans').hide();
                    var arr1=['A','B','C','D'];
                    for(var k=0;k<$('.circle-btn').length;k++){
                        $('.circle-btn')[k].index=k;
                        $($('.circle-btn')[k]).css('background','linear-gradient(#FEFEFE 0%,#F9F9F9 50%,#F5F5F5 100%)').html(arr1[k]);
                    }
                    flag1=true;
                }
            })
            $("body").swiperight();
           
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}