$(document).ready(function(){
    var did=getQueryString('id');
    var belongGroup;
    // $('.bottom-list:nth-child(1)').addClass('cur');
    // $('.bottom-list').click(function(){
    //     $('.bottom-list').removeClass('cur');
    //     $(this).addClass('cur');
    //     belongGroup=$('.bottom-list.cur a').html();
    //     if(belongGroup=='全部'){
    //         belongGroup='';
    //     }
    //     eachimg(did,belongGroup);
    // })
    // eachimg(did,'');





    //底部相册列表
    listLi(did);


})
function eachimg(did,belongGroup){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivPicture/selectPictures?drivingId='+did+'&belongGroup='+belongGroup,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            console.log("+++++++++++++++"+msg)
            var imghtml='<li class="video-list"><a href="javascript:;">111<img class="de-img" src="" alt=""></a><a href="javascript:;"><span class="img-detail">倒车入库</span></a></li>';
            var header='http://101.201.146.79:8088//dts';
            $('.video-lists').html(' ');
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                $('.video-lists').append(imghtml);
                $('.de-img').eq(i).attr('src',header+msg[i].picturePath);
                $('.img-detail').eq(i).html(msg[i].pictureName);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}

 //底部相册列表
function listLi(did){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivPicture/selectPictureLabels?drivingId='+did,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",
        success:function(msg){
            var $ul = $(".bottom-lists");
            var len = msg.length;
            $(".bottom-list").eq(0).click();
            for(var i = 0; i < len; i++){
                $('<li class="bottom-list">'+msg[i].name+'</li>').appendTo($ul);
            };
            
            var $bottomList = $(".bottom-list");
            $bottomList.click(function(){
                $(".video-title").text($(this).text());
                var index = $(this).index();
                $(this).addClass("cur").siblings().removeClass('cur');
                listImg(msg[index].id)
            })
            $bottomList.eq(0).click();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
};

function listImg(imgId){
     $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivPicture/selectPictures?tpsId='+imgId+'',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",
        success:function(msg){
            var $ul = $(".video-lists");

             $ul.html('');

            //如果有照片
            if(msg[0] != undefined){
                var len = msg[0].photo.length;
                for(var i = 0; i < len; i++){
                        $('<li><img src="http://www.dingdongxueche.com:9080/JXWeb/upload_imgs/'+msg[0].photo[i].photourl+'"/></li>').appendTo($ul);
                };
            };

            
           
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}