

//側欄打開跟關閉
$(function(){
	$(".btn_open").on("click", function(){
		$(".side").fadeIn();
		$(".side .inner").css("left","0%");
	});
	$(".btn_close").on("click", function(){
		$(".side").fadeOut();
		$(".side .inner").css("left","-50%");
	});

	$(".menu a").on("click", function(){
		$(".side").fadeOut();
		$(".side .inner").css("left","-50%");
	});
});


//bxSlider輪播圖
$(function(){
	$(".gallery_1 .run .inner").bxSlider({
		slideWidth: 1920,
		slideMargin: 0,
		minSlides: 1,
		maxSlides: 1,
		speed:1000,
		pager: true,
		touchEnabled: true,
		adaptiveHeight:true,
		auto: true,
		onSliderLoad : function(){
			$(".gallery_1 .run .inner .piece img").show();
		}
	});
});

//觀測器+圖形動畫
$(function(){

    // 觀測參數
    var ioOpts = {
        root: null,
        threshold: [0, .5, 1],
    };

    // 觀測 callback
    function fnIoCallback(entries) {
        entries.forEach(item => {

            if (item.isIntersecting) {

                // 保留原本 chart、block_1 的動畫
                $(item.target).addClass("show");

                // 圓形進度條進入畫面 50% 才執行
                if (
                    $(item.target).hasClass("round") && item.intersectionRatio >= 0.5
                ) {
                    startCircleAnimations();

                    // 圓形動畫只執行一次
                    myIo.unobserve(item.target);
                }
            }

        });
    }

    // 觀測器
    var myIo = new IntersectionObserver(fnIoCallback, ioOpts);

    // 原本 chart 的觀測
    $(".chart").each(function () {
        myIo.observe(this);
    });

    // 原本 block_1 的觀測
    $(".block_1").each(function () {
        myIo.observe(this);
    });

    // 新增：觀測圓形進度條
    $(".chart .round").each(function () {
        myIo.observe(this);
    });


    // 圓形進度條動畫
    function startCircleAnimations() {

        const percentages = [90, 82, 85];
        const circles = ["#circle1", "#circle2", "#circle3"];
        const numbers = ["#num1", "#num2", "#num3"];

        circles.forEach((circle, index) => {

            let percentage = percentages[index];
            let dashOffsetValue = 225 - (225 * percentage) / 100;

            // 圓形動畫
            setTimeout(() => {
                $(circle).css({
                    "stroke-dashoffset": dashOffsetValue,
                    "stroke": `url(#GradientColor${index + 1})`
                });
            }, 100);

            // 數字動畫
            let counter = 0;

            let interval = setInterval(() => {

                if (counter >= percentage) {
                    clearInterval(interval);
                } else {
                    counter++;
                    $(numbers[index]).html(`${counter}%`);
                }

            }, 20);
        });
    }


    // 長型圖表（保留原本功能）
    $(".long .score").each(function () {
        var tmpW = $(this).data("num");
        $(this).attr({ style: `--ww:${tmpW}` });
    });

});

