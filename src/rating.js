define(function(require, exports, module) { 
	var $ = require('$');
	require('seajs-style');
	require('./rating.css');
	
	function Rating(elm, options){
		this.$elm = $(elm);
		this.opts = $.extend({}, $.fn.rating.defaults, options);
		this.activeCount = this.opts.activeCount;
		this.selectObj = this.opts.selectObj;
		this.onClick = this.opts.onClick;
		this.init();
	}
	Rating.prototype = {
		init: function(){
			var _this = this,
			activeCount = this.activeCount,
			selectObj = this.selectObj;
			var children = this.$elm.find('a');
			//选择个数为正数  
			if(activeCount - 1 >= 0){
				selectObj = children.eq(activeCount - 1);
				selectObj.prevAll().andSelf().attr('class', 'on');
			}
			$(children).bind({
				mouseenter: function(){
					if(selectObj){
						children.removeClass();
					}
					$(this).prevAll().andSelf().attr('class', 'hover');
				},
				mouseleave: function(){
					if(selectObj){
						selectObj.prevAll().andSelf().attr('class', 'on');
						selectObj.nextAll().removeClass();
					}else{
						children.removeClass();
					}
				},
				click: function(){
					$(this).prevAll().andSelf().attr('class', 'on');
					selectObj = _this.selectObj = $(this);
					_this.onClick.call(_this);
				}
			});
		}
	}
	$.fn.rating = function(options){
		return this.each(function(){
			new Rating(this, options);
		});
	}
	$.fn.rating.defaults = {
		activeCount: 0,  	//选择个数
		selectObj: null,    //选中对象
		onClick: function(){}
	}
	
});