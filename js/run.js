var arr=["timg1.jpg","timg2.jpg","timg3.jpg","timg4.jpg","timg5.jpg"];
var ord = 0;//代表当前图片的序号，从0开始。
var myTimer = null;
 
function  initUI() {
    $("#dots li:first").css("backgroundColor", "orange");
    $('.guide').css('top', ($(window).height() - 150) + 'px');
    $('.guide-back').css('top', ($(window).height() - 80) + 'px');
}
 
function  initEvent() {
    $(".center-header").mouseenter(function () {
        stopPlay();
    });
 
    $(".center-header").mouseleave(function () {
        autoPlay();
    });
 
    $("#dots li").click(function () {
        goImg($("#dots li").index(this));
    });
 
    $(".btn-left").click(function () {
        var transord =ord-1;
        transord = transord<0?arr.length-1:transord;
        goImg(transord);
    });
 
    $(".btn-right").click(function () {
        var transord =ord+1;
        transord = transord>arr.length-1?0:transord;
        goImg(transord);
    });

    $(window).resize(function () {
        var y = $(this).height();
        $('.guide').css('top', (y-150)+'px');
        $('.guide-back').css('top', (y-80)+'px');
        // console.dir($('sidebar').css('height'));

    });

    $('.guide').click(function () {
        var height = $(window).scrollTop();
        if (height < 600) {
            $(window).scrollTop(0) ;
        }else{
            $(window).scrollTop((height - 300)) ;
        }
    });

    $(window).scroll(function () {
        var height = $(this).scrollTop();
        $('.header-inner').css('top', height);
        if (height >= 300) {
            $('.guide-back').css('display', 'block');
        }else{
            $('.guide-back').css('display', 'none');
        }
    });

    $('.guide-back').click(function () {
        $(window).scrollTop(0) ;
    });

}
 
//1、自动播放
function autoPlay() {
    myTimer = setInterval(function () {
        //一、改变数据
        // 1、记录当前序号（淡出的图片序号）
        var outOrd = ord;
        //2、改变要显示的图片的序号（淡出图片序号加一）
        ord++;
        if(ord>arr.length-1){
            ord=0;
        }
        //二、改变外观
        var $img = $(".center-header img");
        //1、淡入淡出效果
        //让一张(outOrd)淡出 当前消失
        $img.eq(outOrd).animate({"opacity":0},2000);
        //让一张(ord)淡入下一张图片显示
        $img.eq(ord).animate({"opacity":1},2000);
        //2、改变豆豆的颜色；
        $("#dots li").eq(ord).css("backgroundColor", "orange").siblings().css("backgroundColor", "#DFD5D0");
    },3000);
}
 
//2、停止播放
function stopPlay() {
    window.clearInterval(myTimer);
}
 
//3、跳转到指定的图片
function  goImg(transOrd) {
    //一、改变数据
    // 1、记录当前序号（淡出的图片序号）
    let outOrd = ord;
    //2、改变要显示的图片的序号（传入的图片序号）
    ord=transOrd;
    if(ord>arr.length-1){
        ord=0;
    }
    //二、改变外观
    let $img = $(".center-header img");
    //1、淡入淡出效果
    //让一张(outOrd)淡出 当前消失
    $img.eq(outOrd).animate({"opacity":0},2000);
    //让一张(ord)淡入下一张图片显示
    $img.eq(ord).animate({"opacity":1},2000);
    //2、改变豆豆的颜色；
    $("#dots li").eq(ord).css("backgroundColor", "orange").siblings().css("backgroundColor", "#DFD5D0");
}
 
$(function () {
    //1、初始化界面
    initUI();
    //2、绑定事件
    initEvent();
    //3、自动播放
    autoPlay();

     
});