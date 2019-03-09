function Focus(section) {
	Array.prototype.forEach.call(document.getElementsByClassName('section'), function(el) {
		if (el.id !== section) { el.classList.add('inactive') }
		else { el.classList.remove('inactive') }
	})
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var swipeFunc = {
	touches : {
		"touchstart": {"x":0, "y":0}, 
		"touchmove" : {"x":0, "y":0}, 
		"touchend"  : false,
		"direction" : "undetermined"
	},
	touchHandler: function(event, fun) {
		var touch;
		if (typeof event !== 'undefined'){	
			if (typeof event.touches !== 'undefined') {
				touch = event.touches[0];
				switch (event.type) {
					case 'touchstart':
					case 'touchmove':
						swipeFunc.touches[event.type].x = touch.pageX;
						swipeFunc.touches[event.type].y = touch.pageY;
						break;
					case 'touchend':
						swipeFunc.touches[event.type] = true;
						if (swipeFunc.touches.touchstart.y > 0 && swipeFunc.touches.touchmove.y > 0) {
							swipeFunc.touches.direction = swipeFunc.touches.touchstart.y < swipeFunc.touches.touchmove.y ? "up" : "down";
							if (swipeFunc.touches.direction === "up" && window.scrollY < 1) {
								swipeFunc.touches.touchstart.y = 0;
								swipeFunc.touches.touchmove.y = 0;
								swipeFunc.cb()
							}
						}
					default:
						break;
				}
			}
		}
	},
	init: function(cb) {
		swipeFunc.cb = cb;
		document.addEventListener('touchstart', swipeFunc.touchHandler, false);	
		document.addEventListener('touchmove', swipeFunc.touchHandler, false);	
		document.addEventListener('touchend', swipeFunc.touchHandler, false);
	}
};
