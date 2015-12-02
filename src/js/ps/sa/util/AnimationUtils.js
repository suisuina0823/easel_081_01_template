// namespace:
this.ps = this.ps || {};

(function () {

    /**
     * @class AnimationUtils
     * @date 13/03/21
     * @author akao
     * @constructor
     **/
    var AnimationUtils = function () {
        this.initialize();
    };
    var p = AnimationUtils.prototype;

    p._nowT = 0;
    p._preT = 0;


    /**
     * Initialization method.
     * @method initialize
     * @protected
     **/
    p.initialize = function () {
    };

    /**
     *現在のフレームレートを返します
     * @return
     */
    p.getNowFPS = function () {
        var _fps = 0;
        var _date = new Date();
        this._nowT = _date.getTime();
        if(this._preT == 0)this._preT = this._nowT;
        _fps = 1/(this._nowT - this._preT)*1000;
        this._preT = this._nowT;
        return _fps;
    };

    /**
     * アニメーションのスピード定数を返します。
     * 基準フレームレートに対する現在のFPSで計算されます。
     * @param _FPS
     * @return
     */
    p.getNowSpeedNumByFPS = function (_FPS) {
        var returnNum = 1.0;
        returnNum = _FPS / this.getNowFPS();
        return returnNum;
    };

    ps.AnimationUtils = AnimationUtils;
}());