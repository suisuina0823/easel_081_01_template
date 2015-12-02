
// namespace:
this.ps = this.ps||{};

(function() {

    /**
     *
     * @class Content
     * @constructor
     **/
    var Content = function() {
      this.initialize();
    };
    var p = Content.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;

    // private properties:

    /**
     *
     * @type {Shape}
     * @private
     */
    p._bg = null;

    /**
     *
     * @type {BitmapAnimation}
     * @private
     */
    p._logo = null;

    /**
     *
     * @type {LineCircleSet}
     * @private
     */
    p._lineCircleSet = null;

    // constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {
        this.Container_initialize();
        ps.BroadCaster.addEventListener(ps.BroadCaster.INIT, ps.Delegate.create(this, p.onInitEvent));
    };

    p.setDisplay = function(){
        this.setBg();
    };

    p.setBg = function(){
        this._bg = new createjs.Shape();
        this.addChild(this._bg);
        this._bg.graphics.beginFill("#CCCCCC")
            .drawRect(0,0,ps.DataMain.stageWidth,ps.DataMain.stageHeight);
    };


    //-----------------------Event-----------------------
    p.onInitEvent = function(e){
        switch (e.now){
            case(ps.BroadCaster.CONTENT_START): this.animationControll(); break;
        }
    };

    //-----------------------Transition-----------------------
    p.animationControll = function(){
        var tween = createjs.Tween.get(this, {loop:false})
            .wait(2500).call(this.startBgAnim)
    };

    p.startBgAnim = function(){
        createjs.Tween.get(this._bg,{loop:false})
            .to({alpha:this.alpha, alpha:1},2000, createjs.Ease.cubicIn)
    };

    p.closeAnimStart = function(){

    };

    p.closeAnimComp = function(tween) {
        //targetの取得方法
        // tween._target;

    };

    ps.Content = Content;
}());