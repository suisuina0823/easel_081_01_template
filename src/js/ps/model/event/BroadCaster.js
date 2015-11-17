// namespace:
this.ps = this.ps||{};

(function() {
    /**
     * Event管理オブジェクトになります。
     *
     * @class BroadCaster
     * @constructor
     **/
    var BroadCaster = function(_type, _pre, _now) {
      this.initialize(_type, _pre, _now);
    };

    //init event
    BroadCaster.DOM_LOAD_INIT = "onLoadEventDomLoadInit";
    BroadCaster.XML_LOAD_INIT = "onLoadEventXMLLoadInit";
    BroadCaster.IMG_LOAD_FOR_LOADER_INIT = "onLoadEventIMGLoadForLoaderInit";
    BroadCaster.IMG_LOAD_INIT = "onLoadEventIMGLoadInit";
    BroadCaster.CONTENT_LOAD_INIT = "onLoadEventContentLoadInit";
    BroadCaster.LOADER_INIT = "onLoadEventContentLoaderInit";
    BroadCaster.CONTENT_START = "onContentEventContentStart";

    //content
    BroadCaster.CONTENTANIMATION_EVENT_START = "onAnimationEventStart";
    BroadCaster.CONTENTANIMATION_EVENT_BIG_BOX = "onAnimationEventBigBox";
    BroadCaster.CONTENTANIMATION_EVENT_FIRST_NEAR = "onAnimationEventFirstNear";
    BroadCaster.CONTENTANIMATION_EVENT_FIRST_MIDDLE = "onAnimationEventFirstMiddle";
    BroadCaster.CONTENTANIMATION_EVENT_FIRST_FAR = "onAnimationEventFirstFar";
    BroadCaster.CONTENTANIMATION_EVENT_CSS3_MOVE = "onAnimationEventCSS3Move";
    BroadCaster.CONTENTANIMATION_EVENT_TEXT = "onAnimationEventText";
    BroadCaster.CONTENTANIMATION_EVENT_SECOND = "onAnimationEventSecond";


    BroadCaster.dispatcher = null;
    BroadCaster.d = null;

    var p = BroadCaster.prototype;

    p.type = null;
    p.pre = null;
    p.now = null;

    // constructor:
    /**
    * Initialization method.
    * @method initialize
    * @protecteds
    **/
    p.initialize = function(_type, _pre, _now) {
        this.type = _type;
        this.pre = _pre;
        this.now = _now;
    };

    BroadCaster.init = function(){
        if (!BroadCaster.dispatcher) {
            BroadCaster.dispatcher = new ps.EventDispatcher();
            BroadCaster.d = new Array();
            BroadCaster.setUp();
        };
    };

    BroadCaster.reset = function(n, o) {BroadCaster.d[n].shift(); BroadCaster.d[n].push(o);};
    BroadCaster.dispatch = function(type, n) {BroadCaster.dispatcher.dispatchEvent(new ps.BroadCaster(type, BroadCaster.d[n][0], BroadCaster.d[n][1]));};
    BroadCaster.addEventListener = function(type, listener) {BroadCaster.dispatcher.addEventListener(type, listener);};
    BroadCaster.removeEventListener = function(type, listener) {BroadCaster.dispatcher.removeEventListener(type, listener);};
    BroadCaster.callEvent = function(o, type, n) {o[type](new ps.BroadCaster(type, BroadCaster.d[n][0], BroadCaster.d[n][1]));};

    BroadCaster.setUp = function(){
        BroadCaster.d[0] = [null, null];//initialize
        BroadCaster.d[1] = [null, null];//content
    };

    //initialize
    BroadCaster.INIT = "onInitEvent";
    BroadCaster.setInitScene = function(o) { BroadCaster.reset(0, o); BroadCaster.dispatch(BroadCaster.INIT, 0); };
    BroadCaster.getInitScene = function() { return BroadCaster.d[0][1]; };

    //content
    BroadCaster.CONTENT_ANIM = "onContentAnimationEvent";
    BroadCaster.setContentAnim = function(o) { BroadCaster.reset(1, o); BroadCaster.dispatch(BroadCaster.CONTENT_ANIM, 1); };
    BroadCaster.getNowContentAnim = function() { return BroadCaster.d[1][1]; };
    BroadCaster.getPreContentAnim = function() { return BroadCaster.d[1][0]; };

    ps.BroadCaster = BroadCaster;
}());