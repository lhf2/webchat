$(document).ready(function(){
    var cityname=localStorage.getItem('city');
    var numall;var subjectType=getQueryString('stype');var vehicleType=getQueryString('vtype');var testType=getQueryString('testtype');
    //模拟考试
    if(testType=='mnks'&&subjectType=='科目一'){
        numall=100;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,4);
    }else if(testType=='mnks'&&subjectType=='科目四'){
        numall=50;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,4);
    }
    //顺序练习
    if(testType=='sxlx'&&subjectType=='科目一'){
        numall=1311;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,0);
    }else if(testType=='sxlx'&&subjectType=='科目四'){
        numall=1121;
        $('.num-all').html('/'+numall);
        mnks(subjectType,vehicleType,cityname,0);
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
function mnks(subjectType,vehicleType,cityname,trainType){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/question/getQuestionsByInfo?subjectType='+subjectType+'&vehicleType='+vehicleType+'&city='+cityname+'&trainType='+trainType,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {id:recordid},//recordid
        success : function(msg){
            var header = 'http://101.201.146.79:8090/dts/picture/question-img/';
            var rightimghtml='<img src="../images/r.png"/>';
            var errorimghtml='<img src="../images/x.png"/>';
            //题型
            var i=0;var swiperindex=0;var index=0;var t;
            question(0);
            function question(i){
                //类型 题目 图片
                $('.main-title span').html(msg[i].questionType);
                $('.main-title i').html(msg[i].details);
                if(msg[i].picture==''&&msg[i].gif==''){
                    $('.main-img img').attr('src','');
                }else if(msg[i].picture!=''){
                    $('.main-img img').attr('src',header+msg[i].picture);
                }else if(msg[i].gif!=''){
                    $('.main-img img').attr('src',header+msg[i].gif);
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
                if(msg[swiperindex].questionType=='多选题'){
                    $('.confirm-btn').show();
                    $('.circle-btn').click(function(){
                        var index=$(this).index('.circle-btn');
                        $(this).css('background','linear-gradient(#c7c7c7 0%,#C1C1C1 50%,#B9B9B9 100%)');
                        clearTimeout(t);
                    });
                    console.log(swiperindex+'$$$$'+msg[swiperindex].questionType);
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
                        t=setTimeout(function () {
                            swiperindex++;
                            console.log(swiperindex+'$$$$'+msg[swiperindex].questionType);
                            question(swiperindex);
                            $('.num-ling').html(swiperindex);
                        },500);
                    });
                }else{
                    $('.confirm-btn').hide();
                    $('.circle-btn').click(function(){
                        var cur=parseInt($('.num-ling').html())-1;
                        var xnum=parseInt($('.error-detail i').html());
                        var rnum=parseInt($('.right-detail i').html());
                        var errornum=$('#error-num').html();
                        t=setTimeout(function () {
                            swiperindex++;
                            question(swiperindex);
                            $('.num-ling').html(swiperindex);
                            /*if(index<5){
                             que(questionarr[index-1]);
                             }else{
                             return
                             }
                             if(index==4){
                             $('.xz-btn').show();
                             }else{
                             $('.xz-btn').hide();
                             }*/
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
                                }
                            }
                        }
                    });
                }
                //点击题号
                var cur1;
                $('.num-list').click(function(){
                    cur1=$(this).index('.num-list');
                    question(cur1);
                    $('.num-ling').html(cur1+1);
                    swiperindex=parseInt($('.num-ling').html());
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
            }
            //左右滑动
            $("body").on("swipeleft",function(){
                swiperindex=parseInt($('.num-ling').html());
                i++;
                $(".main-width-box")
                question(i);
                swiperindex++;
                $('.num-ling').html(swiperindex);
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
                swiperindex=parseInt($('.num-ling').html());
                i--;
                question(i);
                swiperindex--;
                $('.num-ling').html(swiperindex);
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
                if(msg[swiperindex-1].questionType=='多选题'){
                    $('.confirm-btn').show();
                }else{
                    $('.confirm-btn').hide();
                }
            });
            //背题模式 练习模式切换
            var flag1=true;
            $('.set-botlist:nth-last-child(1)').click(function(index){
                console.log(swiperindex);
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

        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}