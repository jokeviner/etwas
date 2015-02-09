/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/
window.onload = function(){
	var height = window.innerHeight;
	var wrapper = $('.wrapper'),
		pages = $('.pages'),
		page = $('.page');
	var pageNum = page.length,
		pageNow = 0,
		pageTmp = [];

	var pageTurnOffset = [],
		pageTurnPos = [];
	page.height(height);
	pages.height(height*pageNum)
	//page.eq(pageNow).addClass('cur');
	pageAnimate(page.eq(pageNow));
	wrapper.on('touchstart touchmove touchend touchcancel',function(e){
		var touch = e.touches[0];
		if(e.type == 'touchstart'){
			pageTurnOffset = [];
			pageTurnPos = [touch.clientX,touch.clientY];
			pages.addClass('drag');
		}
		if(e.type =='touchmove'){
			e.preventDefault();
			pageTurnOffset = [touch.clientX-pageTurnPos[0],touch.clientY-pageTurnPos[1]];
			if((pageNow==0 && pageTurnOffset[1]>0)||(pageNow==pageNum-1 && pageTurnOffset[1]<0)){
				return
			}else{
				pages.css({
					"-webkit-transform":"matrix(1, 0, 0, 1, 0, -"+(pageNow*height-pageTurnOffset[1])+")"
				})					
			}
		
		}
		if(e.type =='touchend' || e.type == 'touchcancel'){
			pages.removeClass('drag')
			var a = pageTurnOffset[1],
				b = pageTurnOffset[0],
				c = Math.abs(a),
				d = Math.abs(b);
			if(a>0 && a>d){
				pageTurn('down');
			}else if(a<0 && c>d){
				pageTurn('up');
			}else if(b>0 && b>c){
				pageTurn('right');
			}else if(b<0 && d>c){
				pageTurn('left');
			}

		}

	})	

	function pageTurn(type){
		if(type == 'up' && pageNow != pageNum-1){
			pageAnimateCancel(page.eq(pageNow));

			pageNow++;
			pageAnimate(page.eq(pageNow));

			pages.css({
				"-webkit-transform":"matrix(1, 0, 0, 1, 0, -"+pageNow*height+")"
			})
		}else if(type == 'down' && pageNow !=0){
			pageAnimateCancel(page.eq(pageNow));
			pageNow--;
			pageAnimate(page.eq(pageNow));

			pages.css({
				"-webkit-transform":"matrix(1, 0, 0, 1, 0, -"+pageNow*height+")"
			})
		}
	}
	function pageAnimateCancel(el){
		el.find("[data-animation]").css({
			"-webkit-animation":"none"
		});
	}
	function pageAnimate(el){
		el.find("[data-animation]").each(function(){
			var op = [];
			op[0] = $(this).attr("data-animation");
			op[1] = ($(this).attr("data-duration")||1000)+"ms";
			op[2] = $(this).attr("data-timing-function")||"ease-in";
			op[3] = ($(this).attr("data-delay")||0)+"ms";


			var c = op.join(" ")+" both";
			$(this).css({
				"-webkit-animation": c
			})
		})
	}


}