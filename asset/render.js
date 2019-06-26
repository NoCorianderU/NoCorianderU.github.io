/* DOM-based rendering (Uses 3D when available, falls back on margin when transform not available) */
var render = (function(global) {
	var docStyle = document.documentElement.style;
	
	var engine;
	if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
		engine = 'presto';
	} else if ('MozAppearance' in docStyle) {
		engine = 'gecko';
	} else if ('WebkitAppearance' in docStyle) {
		engine = 'webkit';
	} else if (typeof navigator.cpuClass === 'string') {
		engine = 'trident';
	}
	
	var vendorPrefix = {
		trident: 'ms',
		gecko: 'Moz',
		webkit: 'Webkit',
		presto: 'O'
	}[engine];
	
	var helperElem = document.createElement("div");
	var undef;

	var perspectiveProperty = vendorPrefix + "Perspective";
	var transformProperty = vendorPrefix + "Transform";
	
	if (helperElem.style[perspectiveProperty] !== undef) {
		
		return function(left, top, zoom) {
			ctx.clearRect(0, 0, 749, 893);
			ctx.drawImage(img, left, top, 749 / zoom, 893 / zoom, 0, 0, 749, 893);
			content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
			spot.style.transform = 'translate3d(' + ((500 - left) * zoom) + 'px,' + ((500 - top) * zoom) + 'px,0)';
		};	
		
	} else if (helperElem.style[transformProperty] !== undef) {
		
		return function(left, top, zoom) {
			content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
		};
		
	} else {
		
		return function(left, top, zoom) {
			content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
			content.style.marginTop = top ? (-top/zoom) + 'px' : '';
			content.style.zoom = zoom || '';
		};
		
	}
})(this);

