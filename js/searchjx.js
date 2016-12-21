$(document).ready(function () {
    var city=getQueryString('city');
    console.log(city)
    var keyhtml=localStorage.getItem('key');
    var historylist='<td></td>';
    if(keyhtml){
        var keyarr=keyhtml.split('|');
        for(var i=0;i<keyarr.length;i++){
            keyarr[i].index=i;
            $('.history-list').append(historylist);
            $('.history-list td').eq(i).html(keyarr[i]);
        }
    }
    $('.hist-close').click(function () {
        $('.history-list').html(' ');
        localStorage.removeItem('key');
    })
    hotword(city);
    $('.key-confirm').click(function () {
        var keyword=$('.search-all').val();
        if(keyword){
            history1(city,keyword)
        }
    });
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
            var areaarr=msg[0].areas;
            for(var i=0;i<areaarr.length;i++){
                areaarr[i].index=i;
                var arealist='<td></td>';
                $('.area-list').append(arealist);
                $('.area-list td').eq(i).html(areaarr[i]);
            }
            $('td').on('click',function () {
                var html=$(this).html();
                location.href='../zjx/zjx.html?keyword='+html;
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function hotarea(city){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivingInfo/selectHotAreas?city='+city,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                var hotarealist='<td></td>';
                $('.hotarea-list').append(hotarealist);
                $('.hotarea-list td').eq(i).html(msg[i]);
            }
            $('td').on('click',function () {
                alert(1);
                var html=$(this).html();
                location.href='../zjx/zjx.html?keyword='+html;
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function hotword(city){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivingInfo/selectForKeywords?city='+city,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            var areaarr=msg[0].district;
            var hotarea=msg[0].hotArea;
            var topicarr=msg[0].characters;
            for(var i=0;i<areaarr.length;i++){
                areaarr[i].index=i;
                var arealist='<td></td>';
                $('.area-list').append(arealist);
                $('.area-list td').eq(i).html(areaarr[i]);
            }
            for(var j=0;j<hotarea.length;j++){
                hotarea[j].index=j;
                var hotarealist='<td></td>';
                $('.hotarea-list').append(hotarealist);
                $('.hotarea-list td').eq(j).html(hotarea[j]);
            }
            for(var k=0;k<topicarr.length;k++){
                topicarr[k].index=k;
                var topiclist='<td></td>';
                $('.topic-list').append(topiclist);
                $('.topic-list td').eq(k).html(topicarr[k]);
            }
            $('td').on('click',function () {
                var html=$(this).html();
                location.href='../zjx/zjx.html?keyword='+html;
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function history1(city,keyword){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/drivingInfo/selectByKeywords?city='+city+'&keyword='+keyword,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            $('.main-box').html('');
            var history='<li class="history-list"><span class="history-left history-main"></span><span class="history-detail"></span></li>';
            var history1='<li class="history-list"><span class="history-left history-main1"></span><span class="history-detail1"></span></li>'
            var hisarea=msg[0].area;var hisdri=msg[0].driving;
            for(var i=0;i<hisarea.length;i++){
                $('.main-box').append(history1);
                hisarea[i].index=i;
                $('.history-main1').eq(i).html(hisarea[i]);
                $('.history-detail1').eq(i).html('地区');
            }
            for(var j=0;j<hisdri.length;j++){
                $('.main-box').append(history);
                hisdri[j].index=j;
                $('.history-main').eq(j).html(hisdri[j]);
                $('.history-detail').eq(j).html('驾校');
            }
            $('.history-list').on('click',function(){
                var html=$(this).children('.history-left').text();
                location.href='../zjx/zjx.html?keyword='+html;
                var historyhtml=localStorage.getItem('key');
                if(historyhtml){
                    historyhtml=historyhtml+'|'+html;
                    localStorage.setItem('key',historyhtml);
                }else{
                    localStorage.setItem('key',html);
                }
            });

        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}