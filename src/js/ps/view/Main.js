
// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * Createjs用テンプレートセット
     * @class Main
     * @constructor
     **/
    var Main = function() {
      this.initialize();
    };
    var p = Main.prototype;

	Main.init = function() {
        Main.instance = new ps.Main();
	};

    /**
     *
     * @type {LoadManager}
     * @private
     */
    p._loadManager = null;

    /**
     *
     * @type {Loader}
     * @private
     */
    p._loader = null;
    p._stage = null;

    // constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {

        //createjsを初期化します
        ps.DataMain.canvas = document.getElementById("cavas2DBase");
        ps.DataMain.stage = new createjs.Stage(ps.DataMain.canvas);

        ps.DataMain.stageWidth = 960;
        ps.DataMain.stageHeight = 720;
        ps.DataMain.FPS = 30;

        //イベントを初期化します
        ps.BroadCaster.init();
        ps.BroadCaster.addEventListener(ps.BroadCaster.INIT, ps.Delegate.create(this, this.onInit));

        this.setLoadManager();
    };

    p.setLoadManager = function(){
        //Loaderはデフォルトの画像、アニメーションがセットされているので不要なものは削除してください。
        this._loadManager = new ps.LoadManager();
        this._loadManager.loadStart();
    };

    p.setLoader = function(){
        createjs.Tween.get(this,{loop:false} )
         .wait(300)
         .call(ps.Delegate.create(this, this.setLoaderComp));
    };

    p.setLoaderComp = function(){
        this._loader = new ps.Loader();
        ps.DataMain.stage.addChild(this._loader);
        this._loader.setDisplay(this._loadManager);
    };


    p.createContent = function(){
        //ここで表示オブジェクトを作成します


        //オブジェクト作成完了
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", ps.Delegate.create(this, this.onTicker));

        ps.Controller.setInitScene(ps.BroadCaster.CONTENT_LOAD_INIT);
    };


    //-----------------------------Event----------------------------
    p.onInit = function(e){
        console.log(e.now);
        switch (e.now){
            case(ps.BroadCaster.IMG_LOAD_FOR_LOADER_INIT): this.setLoader(); break;
            case(ps.BroadCaster.IMG_LOAD_INIT): this.createContent(); break;
            case(ps.BroadCaster.LOADER_INIT): ps.Controller.setInitScene(ps.BroadCaster.CONTENT_START); break;
        }
    };

    p.onTicker = function(){
        ps.DataMain.stage.update();
    };

    //----------------------------GET SET----------------------------------
    p.setLoaderContent = function(o){
        this._loader = o;
    };

    p.setContentBigbox = function(o){
        this._contentBigBox = o;
    };

    ps.Main = Main;
}());
