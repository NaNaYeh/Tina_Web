

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

	//觀測參數
	var ioOpts = {
		root: null, //父容器dom(預設視窗)
		threshold: [0, .5, 1], //目標出現 0%、50%、100% 時要callback 
	};

	//觀測 callback
	function fnIoCallback(entries) {
		entries.forEach(item => {
			if (item.isIntersecting) {
				$(item.target).addClass("show");
			}
		});
	}

	//觀測器
	var myIo = new IntersectionObserver(fnIoCallback, ioOpts);

	//觀測目標
	$(".chart").each(function () {
		myIo.observe($(this)[0]); //js dom
	});

	$(".block_1").each(function () {
		myIo.observe($(this)[0]); // 這是你要加的
	});

	startCircleAnimations();

	// 圓圖進度動畫
	function startCircleAnimations() {

		const percentages = [90, 82, 85]; // 每個圓形的進度
		const circles = ["#circle1", "#circle2", "#circle3"];
		const numbers = ["#num1", "#num2", "#num3"];

		circles.forEach((circle, index) => {
			let percentage = percentages[index];
			let dashOffsetValue = 225 - (225 * percentage) / 100;

			// 設置圓形動畫
			setTimeout(() => {
				$(circle).css({
					"stroke-dashoffset": dashOffsetValue,
					"stroke": `url(#GradientColor${index + 1})`
				});
			}, 100);

			// 設置數字動畫
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

	//長型 圖表
	$(".long .score").each(function () {
		var tmpW = $(this).data("num");
		$(this).attr({ style: `--ww:${tmpW}` });
	});

});


