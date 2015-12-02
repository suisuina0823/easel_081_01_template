// namespace:
this.ps = this.ps||{};

(function() {
    /**
     * Controllerオブジェクト
     *
     * @class Controller
     * @constructor
     **/
    var Controller = function() {
    };


    Controller.setInitScene = function(_obj){
        ps.BroadCaster.setInitScene(_obj);
    };

    Controller.setContentAnimEvent = function(_obj){
        ps.BroadCaster.setContentAnim(_obj);
    };

    /**
     * bodyにラインを引くclassを指定します
     */
    Controller.setBodyBgLine = function(){
        document.body.className = "bgline";
    };

    /**
     * 2Dコンテンツのレンダリングなどをstopします
     */
    Controller.stop2DContent = function(){
        createjs.Ticker.removeAllEventListeners();
    };

    ps.Controller = Controller;
}());