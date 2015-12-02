// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * @class EventDispatcher
     * @constructor
     **/
    var EventDispatcher = function() {
      this.initialize();
    };
    var p = EventDispatcher.prototype;

	p._listeners = null;

	p.initialize = function() {};

	p.addEventListener = function(type, listener) {
		var listeners = this._listeners;
		if (!listeners) { listeners = this._listeners = {}; }
		else { this.removeEventListener(type, listener); }
		var arr = listeners[type];
		if (!arr) { arr = listeners[type] = []; }
		arr.push(listener);
		return listener;
	};

	p.removeEventListener = function(type, listener) {
		var listeners = this._listeners;
		if (!listeners) { return; }
        var arr = listeners[type];
		if (!arr) { return; }
		for (var i=0,l=arr.length; i<l; i++) {
			if (arr[i] == listener) {
				if (l==1) { delete(listeners[type]); }
				else { arr.splice(i,1); }
				break;
			}
		}
	};

	p.removeAllEventListeners = function(type) {
		if (!type) { this._listeners = null; }
		else if (this._listeners) { delete(this._listeners[type]); }
	};

	p.dispatchEvent = function(eventObj, target) {
		var ret=false, listeners = this._listeners;
		if (eventObj && listeners) {
			if (typeof eventObj == "string") { eventObj = {type:eventObj}; }
			eventObj.target = target||this;
			var arr = listeners[eventObj.type];
			if (!arr) { return ret; }
			arr = arr.slice();
			for (var i=0,l=arr.length; i<l; i++) {
				var o = arr[i];
				if (o instanceof Function) { ret = ret||o.apply(null, [eventObj]); }
				else if (o.handleEvent) { ret = ret||o.handleEvent(eventObj); }
			}
		}
		return !!ret;
	};

	p.hasEventListener = function(type) {
		var listeners = this._listeners;
		return !!(listeners && listeners[type]);
	};

ps.EventDispatcher = EventDispatcher;
}());