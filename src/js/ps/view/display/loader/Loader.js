
// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * Loader
     * @class Loader
     * @extends Container
     * @constructor
     **/
    var Loader = function() {
        this.initialize();
    };
    var p = Loader.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;

    /**
     * Initialization method.
     * @method initialize
     * @protected
     **/
    p.initialize = function() {
        this.Container_initialize();
        this.alpha = 0.0;
        ps.BroadCaster.addEventListener(ps.BroadCaster.INIT, ps.Delegate.create(this,this.onInit));
    };

    p._centerX = 0;
    p._centerY = 0;

    p._loaderPercent = null;
    p._percent = 0;
    p._percentCount = 0;
    p._percentCountNum = 1;
    p._loadCompFlg = false;
    p._loadManager = null;

    p._text = null;
    p._textDot1 = null;
    p._textDot2 = null;
    p._textDot3 = null;
    p._txtComp = null;
    p._textNum = 3;

    p._animate = false;
    p._mainTween = null;

    p._squreTweenThread = null;
    p._squreTweenNow = null;
    p._squreTweenPre = null;
    p._exclamationTween = null;
    p._txtCompTween = null;

    p._loadingSqureNow = null;
    p._loadingSqurePre = null;
    p._loadingExclamation = null;
    p._squreChnageNum = 1;
    p._squreFirstScale = 0.5;
    p._mask = null;

    p._adjustY = -57;
    p._cubeScrollAnimFlg = false;
    p._compAnimFlg = false;



    p.startAnim = function(){
        this._animate = true;
        this.squreAnimThread();
    };

    p.stopAnimation = function(){
        this._animate = false;
    };

    p.setDisplay = function(__loadManager){
        this._loadManager = __loadManager;
        //this.x = Math.floor(ps.DataMain.stageWidth * 0.5);
        //this.y = Math.floor(ps.DataMain.stageHeight * 0.5);
        this._centerX = Math.floor(ps.DataMain.stageWidth * 0.5);
        this._centerY = Math.floor(ps.DataMain.stageHeight * 0.5);

        this.createCubeSet();
        this.createPercent();
        this.createText();
        this.createExclamation();
        this.startAnim();
    };

    p.createCube = function(){

        var ss = new createjs.SpriteSheet({
            "animations":
            {
                "first": [0, 6,"first"],
                "stop": [6, 6],
                "second": [7, 9,"stop2"],
                "stop2": [9, 9]
            },
            "images": [ps.DataMain.imgContainer["loadingSpriteSheet"]],
            "frames":
            {
                //コマ一つ辺りのサイズ
                "width": 58,
                "height": 58,
                "regX": 0,
                "regY": 0,
                "count": 10
            }
        });

        var _squre = new createjs.Sprite(ss);
        _squre.addEventListener("animationend", ps.Delegate.create(this, this.onCubeRotateAnimationEnd));

        var _squreBase = new createjs.Container();
        this.addChild(_squreBase);
        _squre.x = -29;
        // _squre.y = -29;
        _squreBase.addChild(_squre);
        _squre.gotoAndPlay("first");

        _squreBase.x = -27 + this._centerX + 29;
        _squreBase.y = -56 + this._centerY + 29 ;

        return _squreBase;
    };

    p.createCubeSet = function(){
        this._loadingSqureNow = this.createCube();
        this._loadingSqureNow.scaleX = this._loadingSqureNow.scaleY = 0.5;
        this._loadingSqureNow.x = 482;
        this._loadingSqureNow.y = -56 + this._centerY + 29;

        this._loadingSqurePre = this.createCube();
        this._loadingSqurePre.x = 482;
        this._loadingSqurePre.y = 1100;

        this._loadingSqureNow.name = "now";
        this._loadingSqurePre.name = "pre";

        this._mask = new createjs.Shape();
        this._mask.graphics.beginFill("#FFFFFF").drawRect(0,0,100,100);
        this.addChild(this._mask);
    };

    p.createPercent = function(){
        this._loaderPercent = new ps.LoaderPercent();
        this.addChild(this._loaderPercent);
        this._loaderPercent.setDisplay();
        this._loaderPercent.x = this._centerX - 17;
        this._loaderPercent.y = this._centerY + 8;
    };

    p.createText = function(){
        this._text = new createjs.Bitmap( ps.DataMain.imgContainer["loadingTxt"]);
        this._txtComp = new createjs.Bitmap(ps.DataMain.imgContainer["txtLoadComp"]);
        this._text.x = -37 + this._centerX;
        this._txtComp.x = - Math.floor(109*0.45) + this._centerX;
        this._text.y =  this._txtComp.y = 23 + this._centerY;
        this._txtComp.visible = false;

        this._textDot1 = new createjs.Bitmap(ps.DataMain.imgContainer["loadingDot"]);
        this._textDot2 = new createjs.Bitmap(ps.DataMain.imgContainer["loadingDot"]);
        this._textDot3 = new createjs.Bitmap(ps.DataMain.imgContainer["loadingDot"]);

        this._textDot1.x = 34 + this._centerX;
        this._textDot2.x = 37 + this._centerX;
        this._textDot3.x = 40 + this._centerX;
        this._textDot1.y = this._textDot2.y =  this._textDot3.y = 30 + this._centerY;
        this.addChild(this._text);
        this.addChild(this._textDot1);
        this.addChild(this._textDot2);
        this.addChild(this._textDot3);
        this.addChild(this._txtComp);
    };

    p.createExclamation = function(){
        this._loadingExclamation = new createjs.Bitmap(ps.DataMain.imgContainer["exclamation"]);
        this.addChild(this._loadingExclamation);
        this._loadingExclamation.x = this._centerX-8;
        this._loadingExclamation.y = this._centerY-110 + 30;
        this._loadingExclamation.visible = false;
        this._loadingExclamation.alpha = 0;
    };

    p.setPercent = function(){
        this._nowPercent = this._loadManager.getNowPercent();
        if(this._percentCount <= this._nowPercent){
            this._percentCount += this._percentCountNum;
            if(this._percentCount >= 100){
                this._percentCount = 100;
                this.stopAnimation();
                this.setPercentComp();
            }
        }
    };

    p.updateText = function(){
        //percent
        this._loaderPercent.setPercent(this._percentCount);

        //txt
        var _interval = 2;
        this._textNum ++;
        if(this._textNum == _interval*4) this._textNum = 0;

        switch(this._textNum){
            case(0): this._textDot1.visible = this._textDot2.visible = this._textDot3.visible = false; break;
            case(_interval*1): this._textDot2.visible = this._textDot3.visible = false;  this._textDot1.visible = true; break;
            case(_interval*2): this._textDot3.visible = false;  this._textDot1.visible = this._textDot2.visible = true; break;
            case(_interval*3): this._textDot1.visible = this._textDot2.visible = this._textDot3.visible = true; break;
        }
    };

    p.setPercentComp = function(){
        this._text.visible = false;
        this._textDot1.visible = false;
        this._textDot2.visible = false;
        this._textDot3.visible = false;
        //this._txtComp.visible = true;

        this._txtCompTween = createjs.Tween.get(this._txtComp,{loop:false} )
                                            .wait(100)
                                            .call(ps.Delegate.create(this,this.setTxtCompVisible), [true])
    };

    p.setTxtCompVisible = function(_bool){
        this._txtComp.visible = _bool;
    };

    p.update = function(){
        if(this._animate) {
            this.setPercent();
            this.updateText();
        }
    };

    //-----------------------Event-----------------------
    p.onInit = function(e){
        switch (e.now){
            case(ps.BroadCaster.IMG_LOAD_INIT): _loadCompFlg = true; break;
        }
    };

    p.onCubeRotateAnimationEnd = function(e){
        //if(this._percentCount >= 100 && this._cubeScrollAnimFlg && !this._compAnimFlg){
        if(this._percentCount >= 100 &&  !this._compAnimFlg){
            this.setCompAnim();
        }
    };

    p.destroy = function(){
        ps.BroadCaster.removeEventListener(ps.BroadCaster.INIT, ps.Delegate.create(this,this.onInit));
        this.stopAnimation();
        this._loaderPercent.destroy();
        this.parent.removeChild(this);
        ps.Main.instance.setLoaderContent(null);

        this.stopTween(this._mainTween);
        this.stopTween(this._exclamationTween);
        this.stopTween(this._txtCompTween);
        this.stopTween(this._squreTweenThread);
        this.stopTween(this._squreTweenNow);
        this.stopTween(this._squreTweenPre);

        this._loadManager = null;
        this._text = null;
        this._textDot1 = null;
        this._textDot2 = null;
        this._textDot3 = null;
        this._txtComp = null;
        this._textNum = 3;
        this._animate = false;

        this._loadingSqureNow = null;
        this._loadingSqurePre = null;
        this._loadingExclamation = null;
        this._mask = null;
    };


    //-----------------------Transition-----------------------
    p.stopTween = function(_target){
        if(_target){ _target.pause(); _target = null;  }
    };

    p.squreAnimThread = function(){
        this._squreTweenThread = createjs.Tween.get(this,{loop:true})
            .wait(700)
            .call(this.changeSqure)
    };

    p.changeSqure = function(){
        this.stopTween(this._squreTweenNow);
        this.stopTween(this._squreTweenPre);

        if(this._percentCount != 100){
            if(this._squreChnageNum == 1){
                this._loadingSqureNow.x = 482;
                this._loadingSqurePre.x = 482;
                this._loadingSqureNow.y = 304;
                this._loadingSqurePre.y = 1100;
                this._loadingSqurePre.scaleX = this._loadingSqurePre.scaleY =this._nowPercent/100*(1-this._squreFirstScale) + this._squreFirstScale;
                this._squreTweenNow = createjs.Tween.get(this._loadingSqureNow,{loop:false,override:true})
                                                        .to({y:-100},500, createjs.Ease.cubicOut)
                                                        .call(ps.Delegate.create(this, this.changeSqureComp));
                this._squreTweenPre = createjs.Tween.get(this._loadingSqurePre,{loop:false,override:true})
                                                         .to({ y:304},500, createjs.Ease.cubicOut);
            } else {
                this._loadingSqureNow.x = 482;
                this._loadingSqurePre.x = 482;
                this._loadingSqureNow.y = 1100;
                this._loadingSqurePre.y = 304;
                this._loadingSqureNow.scaleX = this._loadingSqureNow.scaleY =this._nowPercent/100*(1-this._squreFirstScale) + this._squreFirstScale;
                this._squreTweenNow = createjs.Tween.get(this._loadingSqurePre,{loop:false,override:true})
                                                        .to({y:-100},500, createjs.Ease.cubicOut)
                                                        .call(ps.Delegate.create(this, this.changeSqureComp));
                this._squreTweenPre = createjs.Tween.get(this._loadingSqureNow,{loop:false,override:true})
                                                        .to({ y:304},500, createjs.Ease.cubicOut);
            }
            this._squreChnageNum = this._squreChnageNum*(-1);
        }
    };

    p.changeSqureComp = function() {
        if(this._percentCount >= 100){
            this._cubeScrollAnimFlg = true;
            this.stopTween(this._squreTweenThread);
            this.stopTween(this._squreTweenNow);
            this.stopTween(this._squreTweenPre);
            //this.setCompAnim();
        }
    };

    p.setCompAnim = function(){
        var _bmpA = null;
        if(this._squreChnageNum == 1){
            _bmpA = this._loadingSqureNow.getChildAt(0);
        } else {
            _bmpA = this._loadingSqurePre.getChildAt(0);
        }
        _bmpA.gotoAndPlay("second");
        this.exclamationAnim();
    };

    p.exclamationAnim = function(){
        this._loadingExclamation.visible = true;
        var destY = this._centerY-110;
        this._exclamationTween = createjs.Tween.get(this._loadingExclamation,{loop:false,override:true})
                                                    .to({y:destY, alpha:1.0},300, createjs.Ease.cubicOut)
                                                    .wait(800)
                                                    .call(ps.Delegate.create(this, this.exclamationAnimSecoond));
        this.setCompAnimFlg();
    };

    p.setCompAnimFlg = function(){
        this._compAnimFlg = true;
    };

    p.exclamationAnimSecoond = function(){
        var destY = this._centerY-110-20;
        this._exclamationTween = createjs.Tween.get(this._loadingExclamation,{loop:false,override:true})
                                                    .to({y:destY, alpha:0},700, createjs.Ease.cubicOut)
                                                    .call(ps.Delegate.create(this, this.exclamationAnimComp));

        createjs.Tween.get(this._loaderPercent,{loop:false,override:true})
                      .to({alpha:0},700, createjs.Ease.cubicOut);

        createjs.Tween.get(this._txtComp,{loop:false,override:true})
                      .to({alpha:0},700, createjs.Ease.cubicOut);
    };

    p.exclamationAnimComp = function(){
        ps.Controller.setContentAnimEvent(ps.BroadCaster.CONTENTANIMATION_EVENT_START);
        this.destroy();

    };


    ps.Loader = Loader;
}());