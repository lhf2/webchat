$(document).ready(function () {
    var id = getQueryString('id');
    var header = 'http://101.201.146.79:8088/dts/picture/question-img/';
    var question=[{analysis: "违反道路交通安全法，就是违法行为",chapterId: "419660005109661712", details: "驾驶机动车在道路上违反道路交通安全法的行为，属于什么行为？",gif:"", id: "433879232846757888", optionsValue: "违章行为;违法行为;过失行为;违规行为;", picture: "", qid: 1, questionType: "单选题", rightAnswers: "B",score: 1, specificId: "", subjectType: "科目一", vehicleTypeId:"419659248327196672"},{analysis: "《实施条例》第五十七条，机动车应当按照下列规定使用转向灯：↵（一）向左转弯、向左变更车道、准备超车、驶离停车地点或者掉头时，应当提前开启左转向灯；↵（二）向右转弯、向右变更车道、超车完毕驶回原车道、靠路边停车时，应当提前开启右转向灯。",chapterId:"419660005109661712",details:"驾驶机动车在道路上超车时可以不使↵用转向灯。",gif:"",id:"433879232846757961",optionsValue:"正确;错误;",picture:"",qid:74,questionType:"判断题",rightAnswers:"B",score:1,specificId:"灯光题",subjectType:"科目一",vehicleTypeId:"419659248327196672"},{"analysis":"安全驾驶，减速慢行。凹凸不平的路面减速慢行不仅对车有好处而且不会因颠簸影响驾驶。\n","chapterId":"419660005113856001","details":"车辆通过凹凸路面时，应怎样做？\n","gif":"","id":"433879232863535141","optionsValue":"低速缓慢平稳通过\n\n;挂空挡滑行驶过\n;保持原速通过\n;依靠惯性加速冲过\n;","picture":"","qid":954,"questionType":"单选题","rightAnswers":"A","score":1,"specificId":"","subjectType":"科目一","vehicleTypeId":"419659248327196672"},{"analysis":"驾驶机动车遇到右侧车辆强行变道，应减速慢行，让右前方车辆顺利变道。\n","chapterId":"419660005109661712","details":"如图所示，驾驶机动车遇到右侧车辆强行变道，应减速慢行，让右前方车辆顺利变道。\n","gif":"","id":"433879232855146552","optionsValue":"正确;错误;","picture":"446.jpg","qid":446,"questionType":"判断题","rightAnswers":"A","score":1,"specificId":"路况题","subjectType":"科目一","vehicleTypeId":"419659248327196672"},{"analysis":"杆上的飘带被横风吹起，是注意横风标志。此标志设在经常有很强的侧风并有必要引起注意的路段前适当位置。\n","chapterId":"419660362640523279","details":"这个标志是何含义？","gif":"","id":"433879232855146707","optionsValue":"气象台;注意横风;风向标;隧道入口;","picture":"601.jpg","qid":601,"questionType":"单选题","rightAnswers":"B","score":1,"specificId":"标志题","subjectType":"科目一","vehicleTypeId":"419659248327196672"},{"analysis":"由动画可知，黄车发出超车信号，前方红车却加速不予让行。此时应放弃超车，减速靠道路右侧让行。\n","chapterId":"419660362640523280","details":"如动画所示，前车遇到这种情况要如何处置？\n","gif":"4-102.gif","id":"427031114637377589","optionsValue":"减速靠道路右侧让行\n;让出适当空间加速行驶\n;迅速减速或紧急制动\n;靠道路右侧加速行驶\n;","picture":"4-102.gif","qid":102,"questionType":"单选题","rightAnswers":"A","score":2,"specificId":"动画题","subjectType":"科目四","vehicleTypeId":"419659248327196672"}, {"analysis":"《道路交通安全法》第五十三条规定：警车、消防车、救护车、工程救险车执行紧急任务时，可以使用警报器、标志灯具；在确保安全的前提下，不受行驶路线、行驶方向、行驶速度和信号灯的限制，其他车辆和行人应当让行不得超车。\n","chapterId":"419660362640523278","details":"驾驶机动车遇到同车道行驶的执行紧急任务的特种车辆时不得超车。\n","gif":"","id":"427031114649960522","optionsValue":"正确;错误;","picture":"","qid":748,"questionType":"判断题","rightAnswers":"A","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"}, {"analysis":"\n雨天路滑影响制动效果，在交叉路口加速容易造成事故。\n","chapterId":"419660362640523282","details":"如图所示，驾驶机动车在雨天行经交叉口时必须鸣喇叭，并加速通过，以免造成交通混乱。\n","gif":"","id":"427031114654154761","optionsValue":"正确;错误;","picture":"4-935.jpg","qid":935,"questionType":"判断题","rightAnswers":"B","score":2,"specificId":"路况题","subjectType":"科目四","vehicleTypeId":"419659248327196672"}, {"analysis":"由于是结冰的道路，说明路面易滑，因此在这样的路面上会车时，要注意减速慢行。\n","chapterId":"419660362640523282","details":"驾驶机动车在结冰的道路上怎样会车？\n","gif":"","id":"427031114649960609","optionsValue":"两车临近时减速\n;提前减速缓慢交会\n;适当加速交会\n;尽量靠近中线交会\n;","picture":"","qid":835,"questionType":"单选题","rightAnswers":"B","score":2,"specificId":"路况题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"“车距确认”“前方200m”并且路面上的白色折线是车距确认线，右侧标志提示前方200米是车距确认路段.\n","chapterId":"419660005113856002","details":"右侧标志提示前方200米是车距确认路段。\n","gif":"","id":"427031114645766170","optionsValue":"正确;错误;","picture":"4-506.jpg","qid":506,"questionType":"判断题","rightAnswers":"A","score":2,"specificId":"标志题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"驾驶机动车遇弯道会车时，应当减速靠右通过。\n","chapterId":"419660362640523280","details":"如图所示，驾驶机动车遇弯道会车时，以下做法正确的是什么？\n","gif":"","id":"427031114641571933","optionsValue":"加速通过;减速靠右通过\n;靠边停车\n;占用对向车道\n;","picture":"4-355.jpg","qid":355,"questionType":"单选题","rightAnswers":"B","score":2,"specificId":"路况题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"若是在行驶中突然打方向，车子会飘或者翻侧的。用紧急制动有可能会发生侧滑或侧翻。  爆胎后，先稳住方向保持直线行驶，再慢慢减速停车。","chapterId":"419660362640523283","details":"后轮胎爆裂时，驾驶人要如何处置？","gif":"","id":"427031114654154808","optionsValue":"迅速转动转向盘调整;迅速采取制动措施;迅速向相反方向转动转向盘;控制行驶方向并慢慢减速;","picture":"","qid":982,"questionType":"单选题","rightAnswers":"D","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"当车辆驶出隧道时，需要一个适应过程，要与前车保持安全距离，降低行驶车速，驶出隧道。\n","chapterId":"419660362640523282","details":"当车辆驶出隧道时，驾驶人易出现图中所示的“明适应”现象，以下做法正确的是什么？\n","gif":"","id":"427031114649960534","optionsValue":"变更至车辆较少的车道，迅速驶出隧道\n;与前车保持安全距离，降低行驶车速，驶出隧道\n;加速驶出隧道\n;减少与前车距离，利用前车挡住强光\n;","picture":"4-760.jpg","qid":760,"questionType":"单选题","rightAnswers":"B","score":2,"specificId":"路况题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"遇到有行人横穿马路，还是跑动着的，必须及时减速或停车让行，确保安全。\n","chapterId":"419660362640523278","details":"驾驶机动车突然遇到这种情况怎样做？\n","gif":"","id":"427031114645766268","optionsValue":"从行人前方绕行\n;减速或停车让行\n;持续鸣喇叭提醒\n;从行人后方绕行\n;","picture":"4-604.jpg","qid":604,"questionType":"单选题","rightAnswers":"B","score":2,"specificId":"路况题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"通过积水路面时，会进水，若持续轻踏制动踏板，磨擦后会产生污物，粘附在轮毂内后会影响制动效果。因此本题正确。\n","chapterId":"419660362640523282","details":"机动车涉水后，驾驶人要间断轻踩制动踏板，以恢复制动效能。\n","gif":"","id":"427031114649960650","optionsValue":"正确;错误;","picture":"","qid":876,"questionType":"判断题","rightAnswers":"A","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"这样做能避免吸入有害气体或被烟呛着。","chapterId":"419660362640523283","details":"救火时不要张嘴呼吸或高声呐喊，以免烟火灼伤上呼吸道。","gif":"","id":"427031114654154863","optionsValue":"正确;错误;","picture":"","qid":1037,"questionType":"判断题","rightAnswers":"A","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"看路面的导向箭头此车道为左转车道，指示前方道路仅可左转，不可直行。\n","chapterId":"419660005113856002","details":"该车道路面导向箭头指示前方道路仅可左转。\n","gif":"","id":"427031114645766195","optionsValue":"正确;错误;","picture":"4-531.jpg","qid":531,"questionType":"判断题","rightAnswers":"A","score":2,"specificId":"标线题","subjectType":"科目四","vehicleTypeId":"419659248327196672"}, {"analysis":"安全帽、安全锤和冷却液都不能有效灭火，只有灭火器才能起到灭火的功能。冷冻液是防冻液，是一种化学合成制剂，用于防止发动机的冷却系统在低温时冻结，其次是散热，不能灭火。\n","chapterId":"419660362640523283","details":"驾驶机动车时，为了预防行车中突然起火造成的危险，应随车携带以下哪项物品？\n","gif":"","id":"427031114654154895","optionsValue":"安全锤;安全帽;灭火器;冷冻液;","picture":"","qid":1069,"questionType":"单选题","rightAnswers":"C","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"如果后方有车辆撞击，头部由于惯性会后冲，没有头枕保护，颈椎有可能折断。所以头枕的中心一定要与头平齐。不是与【颈部】平齐。\n","chapterId":"419660362640523280","details":"安全头枕要调整到与颈部平齐的高度。\n","gif":"","id":"427031114637377551","optionsValue":"正确;错误;","picture":"","qid":64,"questionType":"判断题","rightAnswers":"B","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"虚实线，虚线的一侧可跨越，实线的一侧不可跨越。本车位于虚实线实线一侧，不可以跨越。\n","chapterId":"419660005113856002","details":"路面白色虚实线指示实线一侧允许跨越。\n","gif":"","id":"427031114645766179","optionsValue":"正确;错误;","picture":"4-515.jpg","qid":515,"questionType":"判断题","rightAnswers":"B","score":2,"specificId":"标线题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"黄色虚线+掉头标志都表明此处是可以掉头的。\n","chapterId":"419660005113856002","details":"左侧标志表示此处允许机动车掉头。\n","gif":"","id":"427031114641572048","optionsValue":"正确;错误;","picture":"4-470.jpg","qid":470,"questionType":"判断题","rightAnswers":"A","score":2,"specificId":"标志题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"高跟鞋踩刹车有安全隐患，本题描述正确。\n","chapterId":"419660362640523278","details":"女驾驶人穿高跟鞋驾驶机动车，不利于安全行车。\n","gif":"","id":"427031114645766306","optionsValue":"正确;错误;","picture":"","qid":642,"questionType":"判断题","rightAnswers":"A","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"根据规定，有障碍的一方让无障碍的一方。但有障碍的一方已经驶入有障碍路段而无障碍一方未驶入的，有障碍的一方先行。如图，对方已行驶至障碍物路段中间，这时要减速停车让对方先行。\n","chapterId":"419660362640523280","details":"驾驶机动车遇到这种情况不要减速。\n","gif":"","id":"427031114637377584","optionsValue":"正确\n;错误\n;","picture":"4-97.jpg","qid":97,"questionType":"判断题","rightAnswers":"B","score":2,"specificId":"路况题","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"驾驶员在高速公路上不能随意靠边停车，而是要停靠在紧急停车带里面，不是应急车道，没有紧急情况占用应急车道是违反高速公路管理规定的，所以要停车就应把车停在紧急停车带或服务区休息。即本题选“服务区”。\n","chapterId":"419660362640523283","details":"在高速公路行车选择什么地方停车？\n","gif":"","id":"427031114654154886","optionsValue":"加速车道\n;服务区;匝道;减速车道;","picture":"","qid":1060,"questionType":"单选题","rightAnswers":"B","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"},{"analysis":"后车轮侧滑向侧滑的方向打方向盘，前轮侧滑往相反的方向打方向盘。题目描述不全面，错误。\n","chapterId":"419660362640523282","details":"机动车在泥泞路段后轮发生侧滑时，要将转向盘向侧滑的相反方向缓转修正。\n","gif":"","id":"427031114649960645","optionsValue":"正确;错误;","picture":"","qid":871,"questionType":"判断题","rightAnswers":"B","score":2,"specificId":"","subjectType":"科目四","vehicleTypeId":"419659248327196672"}];
   
       
    var questionarr=[];var index=0;var t;
    for(var i=0;i<4;i++){
        var random=Math.floor(Math.random()*question.length);
        questionarr.push(question[random]);
    }
    if(index==0){
        demo(id);
    }
    
    $("body").on("swipeleft",function(){
        clearTimeout(t);
        index++;
        if(index >= 4){
            index = 4
        }
        if(index<5){
            que(questionarr[index-1]);
        }else{
            return;
        }
        if(index==4){
            $('.xz-btn').show();
            $('.xz-btn').click(function () {
                location.href='http://101.201.146.79:8088/dts/system/downLoad?time='+new Date().getTime();
            });
        }else{
            $('.xz-btn').hide();
        }
    });
    $("body").on("swiperight",function (){
        clearTimeout(t);
        index--;
        if(index <= 0){
            index = 0
        }
        if(index==0){
            demo(id);
        }else{
            que(questionarr[index-1]);
        }
        if(index==4){
            $('.xz-btn').show();
            $('.xz-btn').click(function () {
                location.href='http://101.201.146.79:8088/dts/system/downLoad?time='+new Date().getTime();
            });
        }else{
            $('.xz-btn').hide();
        }
    });

    function que(content){
        var html='<li class="answer-list error-box"> <a href="javascript:;" class="ui-link"> <span class="error-btn circle-btn"></span> <span class="answer-detail"></span> </a> </li>';
        var header = 'http://101.201.146.79:8088/dts/picture/question-img/';
        var img = $('.main-img img');
        $('.title-type').html(content.questionType);
        $('.title-content').html(content.details);
        if(content.picture==''){
            img.attr('src','').css({"opacity":"0","height":"0"});
        }else{
            img.attr('src',header+content.picture).css({"height":"150px","width":"auto","opacity":"0"});
            //图片加载完成后规定尺寸   
            var timer = setInterval(function(){
                if(img[0].complete || img[0].error){
                    console.log("img加载完成")
                   if(img.width() >= $(".main-img").width()){
                        img.css({"width":"100%","height":"auto"});
                    }
                    img.css("opacity","1")
                    clearInterval(timer)
                }else{
                    console.log("img加载中")
                }
            },10)
            
        }
        var arr=content.optionsValue.split(';');
        var arr1=['A','B','C','D'];
        $('.answer-box').html('');
        for(var i=0;i<arr.length-1;i++){
            arr[i].index=i;
            $('.answer-box').append(html);
            $('.circle-btn').eq(i).html(arr1[i]);
            $('.answer-detail').eq(i).html(arr[i]);
        }
        //是否正确
        $('.circle-btn').click(function(){
            t=setTimeout(function () {
                index++;
                if(index<5){
                    que(questionarr[index-1]);
                }else{
                    return
                }
                if(index==4){
                    $('.xz-btn').show();
                    $('.xz-btn').click(function () {
                        location.href='http://101.201.146.79:8088/dts/system/downLoad?time='+new Date().getTime();
                    });
                }else{
                    $('.xz-btn').hide();
                }
            },500);
            var rightimghtml='<img src="../images/r.png"/>';
            var errorimghtml='<img src="../images/x.png"/>';
            if($(this).html()==content.rightAnswers){
                $(this).css('background','#0DC810').html(rightimghtml);
            }else{
                $(this).css('background','#FC3838').html(errorimghtml);
                for(var k=0;k<$('.circle-btn').length;k++){
                    $('.circle-btn')[k].index=k;
                    if($('.circle-btn').eq(k).html()==content.rightAnswers){
                        $('.circle-btn').css('background','#FC3838').html(errorimghtml);
                        $('.circle-btn').eq(k).css('background','#0DC810').html(rightimghtml);
                    }
                }
            }
            if(index==4){
                $('.circle-btn').unbind("click");
            }
        });
    }
   
    demo(id)
    function demo(id){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/question/questionInfo?id='+id,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {id:id},
            success : function(msg) {
                que(msg);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }

});