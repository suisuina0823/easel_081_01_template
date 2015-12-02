
// namespace:
this.ps = this.ps||{};

(function() {

    /**
     *
     * @class LoadManager
     * @constructor
     **/
    var LoadManager = function() {
      this.initialize();
    };
    var p = LoadManager.prototype;
        LoadManager.initialize = function() {
    };

    // private properties:

    /**
     *
     * @type {PreloadJS}
     */
    p.preload = null;

    p._imgLastID = null;
    p._loadImgMax = 0;
    p._loadImgCount = 0;
    p._nowPercent = 0;

    // constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {
        this.preload = new createjs.LoadQueue(false);
        this.preload.addEventListener("fileload", ps.Delegate.create(this,this.loadHandler));
        this.preload.addEventListener("error", ps.Delegate.create(this,this.loadError));

        /*
        preload.addEventListener("fileload", handleFileLoad);
        preload.addEventListener("complete", handleComplete);
        preload.addEventListener("progress", handleOverallProgress);
        preload.addEventListener("fileprogress", handleFileProgress);
        preload.addEventListener("error", handleFileError);
        */
    };

    p.loadStart = function(){
        //console.log("loader start");
        var _manifest = [{src:ps.DataMain.CONFIG_XML_URL, id:"configXML"}];
        this.preload.loadManifest(_manifest);
    };

    p.stop = function() {
        if (this.preload != null) {this.preload.close(); }
    };

    p.setNowPercent = function(){
        this._nowPercent = Math.floor(this._loadImgCount / this._loadImgMax*100);
    };

    p.setXMLoadd = function(_xml){
        var _manifest = ps.XMLUtil.getLoadManifest(_xml, "img");
        ps.DataMain.configXML = _xml;
        this._imgLastID = _manifest[_manifest.length-1].id;
        this._loadImgMax = _manifest.length;
        this.preload.loadManifest(_manifest);
    };

    p.setImgLoad = function(e){
        ps.DataMain.imgContainer[e.item.id] = e.result;
        this._loadImgCount ++;
        this.setNowPercent();
        //loading用のimgロード完了を通知します
        if(e.item.id == "txtP")ps.Controller.setInitScene(ps.BroadCaster.IMG_LOAD_FOR_LOADER_INIT);
        if(this._imgLastID == e.item.id)this.loadComp();
    };

    p.loadComp = function(){
        ps.Controller.setInitScene(ps.BroadCaster.IMG_LOAD_INIT);
    };

    p.loadHandler = function(e){
        /*
        console.log("loadHandler e.type:" + e.type);
        console.log("e.item.type:" + e.item.type);
        console.log("e.item.id:" + e.item.id);
        console.log("OK e.result=" + e.result);
        */

        switch(e.item.type){
            case("xml"):
                this.setXMLoadd(e.result);
                ps.Controller.setInitScene(ps.BroadCaster.XML_LOAD_INIT);
                break;
            case("image"):
                this.setImgLoad(e);
                break;
        }
    };
    p.loadError = function(e){
        //console.log("LoadManager:loader error");
    };

    //------------------------------------------Get Set-----------------------------------------------------
    p.getNowPercent = function(){
        return this._nowPercent;
    };

    ps.LoadManager = LoadManager;
}());