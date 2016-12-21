$(document).ready(function () {
    /********************************************/
    var userId=localStorage.getItem('userid');
    var did=getQueryString('id');
    if(location.href.indexOf('wydp.html')>=0){
        eachave(did);
        allcomment(did,userId);
    }
    if(location.href.indexOf('jxxq.html')>=0){
        allcomment(did,userId);
    }
    if(location.href.indexOf('xydp.html')>=0){
        jxdetail(did);
        var evaluate="";
        $('.show-btn').click(function(){
             evaluate=$('textarea').val();
            var servehtml=$('.review-star').eq(0).html();
            var serveLevel=servehtml.substring(0,servehtml.lastIndexOf('星'));
            var teachhtml=$('.review-star').eq(1).html();
            var teachLevel=teachhtml.substring(0,teachhtml.lastIndexOf('星'));
            var fieldhtml=$('.review-star').eq(2).html();
            var fieldLevel=fieldhtml.substring(0,fieldhtml.lastIndexOf('星'));
            var feehtml=$('.review-star').eq(3).html();
            var feeLevel=feehtml.substring(0,feehtml.lastIndexOf('星'));
            var checkflag=$("input[type='checkbox']").is(':checked');
            var isHide;
            if(checkflag){
                isHide=1;
            }else{
                isHide=0;
            }
            
          /*  var m1=localStorage.getItem("base64_src1");
            var m2=localStorage.getItem("base64_src2");
            var m3=localStorage.getItem("base64_src3");
            var m4=localStorage.getItem("base64_src4");
            var m5=localStorage.getItem("base64_src5");
            var m6=localStorage.getItem("base64_src6");
            var m7=localStorage.getItem("base64_src7");
            var m8=localStorage.getItem("base64_src8");
            var m9=localStorage.getItem("base64_src9");
            swal("评论数据", "图片长度："+(localStorage.getItem("base64")), "success");*/
          /*if(!IsEmpty(localStorage.getItem("base64"))){
	          if(IsEmpty(m1)){localStorage.setItem("base64",m1);}  
	          if(IsEmpty(m2)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m2);}  
	          if(IsEmpty(m3)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m3);}  
	          if(IsEmpty(m4)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m4);}  
	          if(IsEmpty(m5)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m5);}  
	          if(IsEmpty(m6)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m6);}  
	          if(IsEmpty(m7)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m7);}  
	          if(IsEmpty(m8)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m8);}  
	          if(IsEmpty(m9)){localStorage.setItem("base64",localStorage.getItem("base64")+"|"+m9);}  
           
          }*/
         
          if(serveLevel>0&&teachLevel>0&&fieldLevel>0&&feeLevel>0){ 
        	  if(evaluate!=""&&evaluate.length>0){
        		  var vV= ""+localStorage.getItem("base64");
        		 //  swal("数据", "localStorage数据：+:"+vV.indexOf("+")+"|="+vV.indexOf("="), "success");
        		  var paramData='formFile='+vV+'&userId='+userId+'&drivingId='+did+'&evaluate='+evaluate+'&serveLevel='+serveLevel+'&feeLevel='+feeLevel+'&fieldLevel='+fieldLevel+'&teachLevel='+teachLevel+'&zambia=0&isHide='+isHide+'&callbackparam=?';
        		 /* $.getJSON("http://101.201.146.79:8088/dts/evaluate/addEvaluates?"+url+"&callbackparam=?",
        		            function(json) {
        			  			swal(json.code+"|"+json.desc);
        		            }
        		        );*/
                // var imgSrc = new Image();
                // imgSrc.src = asd
		          $.ajax({  
		   		 	            url : 'http://101.201.146.79:8088/dts/evaluate/addEvaluates',
		                        type: "POST",
		               // contentType : "application/json;charset=utf-8",
		                   dataType : 'jsonp',
		                        data:paramData,
		                      cache : false,
		                      jsonp : "callbackparam",
		                success: function(data){  
		                	// swal("发表成功", "发表成功："+data.result, "success");
		                	//if("ok"==data.result){
		                	 localStorage.setItem("base64","");
		               	     location.href='../zjx/wydp.html?id='+did;
		                	//}
		               } ,
		              
		               error: function(e){  
		            	   //console.log("Error loading base64"+e);  
		            	   //swal("上传图片错误", "|错误异常："+e, "error");
		            	   //localStorage.setItem("base64","");
		            	   //location.href='../zjx/wydp.html?id='+did;
		               }
				     });
        	  }else{
        		  swal("温馨提示","评论内容不能为空!","error");
        	  }
          }else{
        	  swal("温馨提示","服务、教学、场地、收费都需做出评价...","error");
          }
          
          
        });
    }
    
  
    
    function allcomment(did,userId){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/evaluate/selectEvaluates?drivingId='+did+'&userId='+userId+'&currentNum=1&count=10',
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //data : {id:recordid},//recordid
            success : function(msg) {
                $('.detail-lists').html(' ');
                var header='http://101.201.146.79:8088/dts/';
                //var header1='http://101.201.146.79:8088/dts/evaluate/';
                for(var i=0;i<msg.length;i++){
                    msg[i].index=i;
                    var commenthtml='<li class="detail-list"><div class="detail-img icon-myimg"><img src="" alt=""></div><div class="detail-text"><div class="my"><span class="name"></span> <span class="time"></span></div><div class="review-img review-img5"></div><div class="summary"></div><div class="comment-img"></div><div class="zan"><img src="../images/zan.png" alt=""><span></span></div></div></li>';
                    $('.detail-lists').append(commenthtml);
                    $('.time').eq(i).html(msg[i].evaluate_time);
                    $('.review-img5').eq(i).raty(
                        {
                            path:"../images",
                            score:msg[i].average,
                            showHalf:  true,
                            readOnly:  true
                        }
                    );
                   // var choseimg='<img src=""/>';
                    if((msg[i].pictures).indexOf('.jpg')>0){
                        var choseimgs=msg[i].pictures;
                        $('.comment-img').eq(i).show();
                        var choseimgarr=choseimgs.split(',');
                        
                       /* for(var k=0;k<choseimgarr.length;k++){
                            $('.comment-img').eq(i).append('<img src="http://101.201.146.79:8088/dts/evaluate/'+choseimgarr[k]+'"/>');
                        }*/
                       // console.log(choseimgarr)
                        if(choseimgarr.length>1){
                            //console.log(1111);
                            for(var k=0;k<choseimgarr.length;k++){
                                //choseimgarr[k].index=k;
                                $('.comment-img').eq(i).append('<img src="http://101.201.146.79:8088/dts/evaluate/'+choseimgarr[k]+'"/>');
                               // $('.comment-img').eq(i).append(choseimg);
                              //  $('.comment-img img').eq(k).attr('src',header1+choseimgs[k].pictures);
                            }
                        }else{
                            //console.log(22230);
                        	$('.comment-img').eq(i).append('<img src="http://101.201.146.79:8088/dts/evaluate/'+choseimgarr[0]+'"/>');
                           // $('.comment-img').eq(i).html(choseimg);
                           // $('.comment-img img').eq(i).attr('src',header1+choseimgs[i].pictures);
                        }

                    }
                    $('.summary').eq(i).html(msg[i].evaluate);
                    $('.zan span').eq(i).html(msg[i].zambia);
                    if(msg[i].isHide==1){
                        $('.icon-myimg img').eq(i).attr('src',header+'image/default_head.png');
                        $('.name').eq(i).html('*******');
                    }else{
                        
                         $('.name').eq(i).html(msg[i].nickname);
                        if(msg[i].image.indexOf("http") == 0){
                            $('.icon-myimg img').eq(i).attr('src',msg[i].image);
                        }else{
                            $('.icon-myimg img').eq(i).attr('src',header+'image/'+msg[i].image);  
                        }
                    }
                    if(msg[i].isZambia==1){
                        $('.zan img').eq(i).attr('src','../images/zan1.png');
                    }else{
                        $('.zan img').eq(i).attr('src','../images/zan.png');
                    }
                }
                //点赞
                $('.zan').click(function(){
                    var index=$(this).index('.zan');
                    var curid=msg[index].id;
                    var zannum=$('.zan span').eq(index).html();
                    if(userId){
                        if(msg[index].isZambia==1){
                            qxdz(curid,userId);
                            $('.zan img').eq(index).attr('src','../images/zan.png');
                            zannum--;
                            $('.zan span').eq(index).html(zannum);
                            msg[index].isZambia=0;
                        }else{
                            zan(curid,userId);
                            $('.zan img').eq(index).attr('src','../images/zan1.png');
                            zannum++;
                            $('.zan span').eq(index).html(zannum);
                            msg[index].isZambia=1;
                        }
                    }else{
                        location.href='../login/login.html'
                    }
                })
                //我要点评
                $('.view-btn').click(function () {
                    location.href='../zjx/xydp.html?id='+did;
                })
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
    //点赞
    function zan(id,userId){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/evaluate/updZambias?id='+id+'&userId='+userId+'&updType=1',
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
    function qxdz(id,userId){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/evaluate/updZambias?id='+id+'&userId='+userId+'&updType=0',
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

});
function eachave(did){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/evaluate/selectAverages?drivingId='+did,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            $('.score').html(msg.average);
            $('.view-num span').html(msg.count);
            $('.review-img1').raty(
                {
                    path:"../images",
                    score:msg.serveavg,
                    showHalf:  true,
                    readOnly:  true
                }
            );
            $('.review-img2').raty(
                {
                    path:"../images",
                    score:msg.teachavg,
                    showHalf:  true,
                    readOnly:  true
                }
            );
            $('.review-img3').raty(
                {
                    path:"../images",
                    score:msg.fieldavg,
                    showHalf:  true,
                    readOnly:  true
                }
            );
            $('.review-img4').raty(
                {
                    path:"../images",
                    score:msg.feeavg,
                    showHalf:  true,
                    readOnly:  true
                }
            );
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function jxdetail(did){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivingInfo/selectByIds?dId='+did,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            var header='http://www.dingdongxueche.com:9080/JXWeb/editContent/logoupload//';
            // http://www.dingdongxueche.com:9080/JXWeb/editContent/logoupload//201610250153351477374815563111-20130320102125.jpg
            $('.school-img img').attr('src',header+msg.schoolimg);
            $('.sc-name').html(msg.name);
            $('.adr span').html(msg.address);

        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function addcontent(userid,did,evaluate,serveLevel,feeLevel,fieldLevel,teachLevel,isHide){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        //url:'http://101.201.146.79:8088/dts/evaluate/addEvaluates',
        url : 'http://101.201.146.79:8088/dts/evaluate/addEvaluates?userId='+userid+'&drivingId='+did+'&evaluate='+evaluate+'&serveLevel='+serveLevel+'&feeLevel='+feeLevel+'&fieldLevel='+fieldLevel+'&teachLevel='+teachLevel+'&zambia=0&isHide='+isHide,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {userId:userid,drivingId:did,evaluate:evaluate,imageCode:imageCode,serveLevel:serveLevel,feeLevel:feeLevel,fieldLevel:fieldLevel,teachLevel:teachLevel,zambia:0,isHide:isHide},//recordid
        success : function(msg) {
            setTimeout(location.href='../zjx/wydp.html?id='+did);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}