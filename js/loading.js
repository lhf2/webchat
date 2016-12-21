
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style="position:fixed;left:0;width:100%;height:100%;display:flex; justify-content:center; align-items:center; top:0;background:#fff url(../images/loading.gif) center no-repeat;opacity:1;filter:alpha(opacity=100);z-index:10000;"></div>';
//呈现loading效果
document.write(_LoadingHtml);

//window.onload = function () {
//    var loadingMask = document.getElementById('loadingDiv');
//    loadingMask.parentNode.removeChild(loadingMask);
//};

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loadingDiv');
        loadingMask.parentNode.removeChild(loadingMask);
    }
}