this.ps = this.ps||{};
(function() {

    /**
     * AnimationCanvas
     * @constructor
     */
    var AnimationCanvas = function(__nodeClass, __srcDir, __fps, __imgW, __imgH, __scale, __total, __extention) {
        this.initialize(__nodeClass, __srcDir, __fps, __imgW, __imgH, __scale, __total,__extention);
    };

    var p = AnimationCanvas.prototype;
    p._nodeClass = null;
    p._srcDir = null;
    p._imgLoadCount = 0;
    p._total = 0;
    p._fps = 0;
    p._imgW = 0;
    p._imgH = 0;
    p._scale = 1.0;
    p._extention = "";

    p.canvas = null;
    p.stage = null;
    p.preload = null;
    p._bmpAnim = null;
    p._imgList = null;

    p._animate = false;
    p._clickFlg = false;

    p.onAnimationEndCallBack       = function() {};
    p.onImageLoadCompleteCallBack  = function() {};
    p.onClickEventCallBack         = function() {};

    p.setAnimationEndCallBack      = function(o){ this.onAnimationEndCallBack = o; };
    p.setImageLoadCompleteCallBack = function(o){ this.onImageLoadCompleteCallBack = o; };
    p.setClickEventCallBack        = function(o){ this.onClickEventCallBack = o; };


    /**
     * Initialization method.
     * @method initialize
     * @protected
     **/
    p.initialize = function(__nodeClass, __srcDir, __fps, __imgW, __imgH, __scale, __total, __extention) {
        this._nodeClass = __nodeClass;
        this._srcDir = __srcDir;
        this._fps = __fps;
        this._imgW = __imgW;
        this._imgH = __imgH;
        this._scale = __scale;
        this._total = __total;
        this._extention = __extention;
        this._imgList = [];

         var _node = ps.NodeUtil.getElementsByClassName(this._nodeClass);
         this.canvas = _node[0].getElementsByTagName("canvas")[0];
         this.stage = new createjs.Stage(this.canvas);
         this.setImgLoad();

         createjs.Ticker.useRAF = true;
         createjs.Ticker.setFPS(this._fps);
         createjs.Ticker.addEventListener("tick", ps.Delegate.create(this, this.onTicker));
    };


    //------------------------------------loader-------------------------------------
    p.setImgLoad = function(){
        var _manifest  = [];
        for(var i=0; i < this._total; i++){
            var _num;
            if(i < 10){ _num = "00" + i;
            } else if(i < 100){ _num = "0" + i;
            } else { _num = i; }
            var _loadObj = {};
            _loadObj.src = this._srcDir + "/img" + _num +  this._extention;
            _loadObj.id = "id" + i;
            _manifest[i] = _loadObj;
        }

        this.preload = new createjs.LoadQueue(false);
        this.preload.addEventListener("fileload", ps.Delegate.create(this, this.handleFileLoad));
        this.preload.loadManifest(_manifest);
    };

    /**
     * ファイルロードイベント
     * @param event
     */
    p.handleFileLoad = function(event){
        var img = new Image();
        img.onload = ps.Delegate.create(this, this.imgLoadComp);
        img.src = event.item.src;
        this._imgList.push(img);
    };

    /**
     * imgロード完了イベント
     */
    p.imgLoadComp = function(e){
        this._imgLoadCount ++;
        if(this._imgLoadCount == this._total){
            this.setDisplay();
            this.startAnimation();
            this.setBtn();

            this.onImageLoadCompleteCallBack(e);
        }
    };

    p.loadError = function(){
        //console.log("setImgLoadComp loadError");
    };


    //-----------------------------------------------------other----------------------------------------------------------
    p.setDisplay = function(){
        var stopFrame = this._total-1;
        var ss = new createjs.SpriteSheet({
            "animations":
            {
                "first": [0, stopFrame,"stop"],
                "stop": [stopFrame, stopFrame]},
                "images": this._imgList,
                "frames":
            {
                //コマ一つ辺りのサイズ
                "width": this._imgW,
                "height": this._imgH,
                "regX": 0,
                "regY": 0,
                "count": this._total
            }
        });
        this._bmpAnim = new createjs.BitmapAnimation(ss);
        this._bmpAnim.scaleX = this._bmpAnim.scaleY = this._scale;
        this._bmpAnim.addEventListener("animationend", ps.Delegate.create(this, this.onAnimationEnd));
        this.stage.addChild(this._bmpAnim);
    };

    p.destroyImg = function(){
        var len = this._imgList.length;
        for(var i=0; i< len; i++)this._imgList[i] = null;
    };

    p.startAnimation = function(){
        this._animate = true;
        this._clickFlg = false;
        this._bmpAnim.gotoAndPlay("first");
    };

    p.setBtn = function(){
        var _node =  ps.NodeUtil.getElementsByClassName(this._nodeClass);
        _node[0].onclick = ps.Delegate.create(this, this.onClick)
    };

    //-----------------------------------------------------event------------------------------------------------------
    /**
     * canvasのアップデートイベントになります
     */
    p.onTicker = function(e){
        if(this._animate) this.stage.update();
    };

    /**
     * アニメーション完了時に呼ばれるイベントになります
     */
    p.onAnimationEnd = function(e){
        this._clickFlg = true;
        this.onAnimationEndCallBack(e);
    };

    /**
     * クリックイベントになります
     */
    p.onClick = function(e){
        if(this._clickFlg){
            this.startAnimation();
            this.onClickEventCallBack(e);
        }
    };

    /**
     * アニメーションを削除する際は呼んでください。
     */
    p.destroy = function(){
        createjs.Ticker.removeAllEventListeners("tick", ps.Delegate.create(this, this.onTicker));
       if( this.preload)this.preload.removeAllEventListeners("fileload", ps.Delegate.create(this, this.handleFileLoad));
       if( this._bmpAnim)this._bmpAnim.removeAllEventListeners("animationend", ps.Delegate.create(this, this.onAnimationEnd));

        this.destroyImg();
        this.canvas = this.stage = this.preload = this._bmpAnim = null;
        this._imgList = null;
        this._animate = this._clickFlg  = false;
        this.fps = this.imgW = this.imgH = this.total = this._imgLoadCount = 0;
        this.nodeClass = this.srcDir = null;
    };

    this.ps.AnimationCanvas = AnimationCanvas;
}());