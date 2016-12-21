$(document).ready(function () {
    mnks(4);
});
function mnks(trainType){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/question/getQuestionsByInfo?subjectType=科目四&vehicleType=小车&city=北京&trainType='+trainType,
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
            var i=0;var swiperindex=parseInt($('.num-ling').html());var index=0;var t;
            question(0);
            function question(i){
                //类型 题目 图片
                $('.main-title span').html(msg[i].questionType);
                $('.main-title i').html(msg[i].details);
                if(msg[i].picture==''&&msg[i].gif==''){
                    $('.main-img').hide();
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
                //多选题
                console.log(swiperindex+'$$$$$$$$$$'+msg[swiperindex-1].questionType);
                if(msg[swiperindex-1].questionType=='多选题'){
                    $('.confirm-btn').show();
                    $('.circle-btn').click(function(){
                        $(this).css('background','linear-gradient(#c7c7c7 0%,#C1C1C1 50%,#B9B9B9 100%)')
                    })
                }else{
                    $('.confirm-btn').hide();
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