// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * LoaderPercentNum
     * @class LoaderPercentNum
     * @extends Container
     * @constructor
     **/
    var LoaderPercentNum = function() {
        this.initialize();
    };
    var p = LoaderPercentNum.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;

    // private properties:

    // constructor:
	/**
	 * Initialization method.
     * @method initialize
	 * @protected
	 **/
	p.initialize = function() {
        this.Container_initialize();
        this.setParam();
        this.setDisplay();
    };

    /**
     * @type {BitmapAnimation}
     * @private
     */
    p._num0 = null;
    p._num1 = null;
    p._num2 = null;
    p._num3 = null;
    p._num4 = null;
    p._num5 = null;
    p._num6 = null;
    p._num7 = null;
    p._num8 = null;
    p._num9 = null;
    p._numP = null;

    p.setParam = function(){
    };

    p.setDisplay = function(){
        for(var i=0; i < 10; i++)this.setNumImg(i);
        this._numP = new createjs.Bitmap(ps.DataMain.imgContainer["txtP"]);
        this._numP.visible = false;
        this._numP.x = 0;
        this._numP.y = -1;
        this.addChild( this._numP);
    };

    p.setNumImg = function(_num){
        var _adjustX = 0;
        var _adjustY = 0;

        switch(_num){
            case(3): _adjustX=-1; _adjustY=-1; break;
            case(4): _adjustX=-1; _adjustY=0; break;
            case(8): _adjustX=-1; _adjustY=0; break;
        }

        this["_num" + _num ] = new createjs.Bitmap(ps.DataMain.imgContainer["txtNum" + _num]);
        this["_num" + _num ].x = _adjustX;
        this["_num" + _num ].y = _adjustY;
        this["_num" + _num ].visible = false;
        this.addChild( this["_num" + _num ]);
    };

    p.setNum = function(_value){
        //reset
        for(var i=0; i < 10; i++)this["_num" + i ].visible = false;
        this["_numP"].visible = false;
        if(_value == "%"){
            this["_numP"].visible = true;
        } else {
            this["_num" + _value ].visible = true;
        }

    };

    p.destroy = function(){
        this._num0 = null;
        this._num1 = null;
        this._num2 = null;
        this._num3 = null;
        this._num4 = null;
        this._num5 = null;
        this._num6 = null;
        this._num7 = null;
        this._num8 = null;
        this._num9 = null;
        this._numP = null;
    };

    ps.LoaderPercentNum = LoaderPercentNum;
}());