$(document).ready(function () {
    var score=getQueryString('score');
    var time=getQueryString('time');
    $('.main-box .score i').html(score);
    $('.time i').html(time);
    // $('.again-btn').click(function () {
    //    history.back();
    // });
})