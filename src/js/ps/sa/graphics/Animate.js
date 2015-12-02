// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * Animate
     * SWFACObjectのラッパーオブジェクトになります。
     * @param _nodeClass
     * @param _src
     * @param _fps
     * @param _imgW
     * @param _imgH
     * @param _total
     * @param _td
     * @param _frames
     * @constructor
     */
    var Animate = function(_nodeClass, _src, _fps, _imgW, _imgH, _total,_td, _frames) {
        this.initialize(_nodeClass, _src, _fps, _imgW, _imgH, _total,_td, _frames);
    };

    var p = Animate.prototype;
    p.us = null;
    p.defaltW = 0;
    p.defaltH = 0;
    p.devicePx = 1;
    p.nodeClass = null;
    p.animObj = null;

    p.setCompleteCallbackFunc = function(){};
    p.setLabelCompleteCallbackFunc = function(){};
    p.setLabelLoopCallbackFunc = function(){};
    p.setLoadCompleteCallbackFunc = function(){};
    p.setLoopCallbackFunc = function(){};
    p.setStartCallbackFunc = function(){};
    p.setStopCallbackFunc = function(){};
    p.setClickFunc = function(){};

    /**
     * Initialization method.
     * @method initialize
     * @protected
     **/
    p.initialize = function(_nodeClass, _src, _fps, _imgW, _imgH, _total,_td, _frames) {
        //console.log("Animate initialize");
        this.ua = ps.DeviceUtil.getUA();
        this.setDevicePixelRatio();
        this.nodeClass = _nodeClass;
        this.setClickEvent();
        this.setAnimation(_src, this.getPropertyObj( _fps, _imgW, _imgH, _total,_td, _frames));
    };

    p.setDevicePixelRatio = function(){
        //機種ごとのDevicePixelRatioを取得
        if(!this.ua.msie) this.devicePx = window.devicePixelRatio;
    };

    p.setClickEvent = function(){
        var _node = ps.NodeUtil.getElementsByClassName("bmpAnimation");
        _node[0].onclick = ps.Delegate.create(this, this.onClick);
    };

    p.getPropertyObj = function( _fps, _imgW, _imgH, _total,_td, _frames){
        var setW = Math.round(_imgW/this.devicePx);
        var setH = Math.round(_imgH/this.devicePx);
        if(!_frames)_frames = {};
        return  {"fps":_fps,"loop":false,"w":setW,"h":setH,"total":_total,"td":_td,"frames":_frames};
    };

    p.setAnimation = function(_src, _propObj){
        this.animObj = new SWFACObject(this.nodeClass,_src, _propObj);
        this.animObj.setCompleteCallback(this.setCompleteCallbackFunc);
        this.animObj.setLabelCompleteCallback(this.setLabelCompleteCallbackFunc);
        this.animObj.setLabelLoopCallback(this.setLabelLoopCallbackFunc);
        this.animObj.setLoadCompleteCallback(this.setLoadCompleteCallbackFunc);
        this.animObj.setLoopCallback(this.setLoopCallbackFunc);
        this.animObj.setStartCallback(this.setStartCallbackFunc);
        this.animObj.setStopCallback(this.setStopCallbackFunc);
    };

    p.replaceAnimation = function(_src, _fps, _imgW, _imgH, _total, _td, _frames){
        if(!_frames)_frames = {};
        var propObj = this.getPropertyObj( _fps, _imgW, _imgH, _total, _td, _frames);
        this.setAnimation(_src, propObj);
    };

    p.onClick     = function(){ this.setClickFunc(); };
    p.start       = function(){ this.animObj.start(); };
    p.stop        = function(){ this.animObj.stop(); };
    p.gotoAndPlay = function(o){ this.animObj.gotoAndPlay(o); };
    p.gotoAndStop = function(o){ this.animObj.gotoAndStop(o); };
    p.gotoLabel   = function(o){ this.animObj.gotoLabel(o); };

    p.setCompleteCallback      = function(o){ this.setCompleteCallbackFunc = o; this.animObj.setCompleteCallback(o); };
    p.setLabelCompleteCallback = function(o){ this.setLabelCompleteCallbackFunc = o; this.animObj.setLabelCompleteCallback(o); };
    p.setLabelLoopCallback     = function(o){ this.setLabelLoopCallbackFunc = o; this.animObj.setLabelLoopCallback(o); };
    p.setLoadCompleteCallback  = function(o){ this.setLoadCompleteCallbackFunc = o; this.animObj.setLoadCompleteCallback(o); };
    p.setLoopCallback          = function(o){ this.setLoopCallbackFunc = o; this.animObj.setLoopCallback(o); };
    p.setStartCallback         = function(o){ this.setStartCallbackFunc = o; this.animObj.setStartCallback(o); };
    p.setStopCallback          = function(o){ this.setStopCallbackFunc = o; this.animObj.setStopCallback(o); };
    p.setClick                 = function(o){ this.setClickFunc = o;};

    p.setFps                   = function(o){ this.animObj.setFps(o); };
    p.setLoop                  = function(o){ this.animObj.setLoop(o); };
    p.setVisible               = function(o){ this.animObj.setVisible(o); };
    p.setNodeClass             = function(o){ this.nodeClass = o; };

    ps.Animate = Animate;
}());