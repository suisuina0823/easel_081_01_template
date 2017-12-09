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

    ps.Controller = Controller;
}());