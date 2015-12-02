
// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * LoaderPercent
     * @class LoaderPercent
     * @extends Container
     * @constructor
     **/
    var LoaderPercent = function() {
        this.initialize();
    };
    var p = LoaderPercent.prototype = new createjs.Container();
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
    };

    /**
     * @type {BitmapAnimation}
     * @private
     */
    p._cube = null;
    p._num1 = null;
    p._num10 = null;
    p._num100 = null;
    p._numP = null;

    /**
     *
     * @type {Text}
     * @private
     */
    p._text = null;


    p.setParam = function(){
    };

    p.setDisplay = function(){
        this.x = -15;
        this.y = 8;
        var margX = 8;

        this._num1 = new ps.LoaderPercentNum();
        this._num10 = new ps.LoaderPercentNum();
        this._num100 = new ps.LoaderPercentNum();
        this._numP = new ps.LoaderPercentNum();
        this._num1.setDisplay();
        this._num10.setDisplay();
        this._num100.setDisplay();
        this._numP.setDisplay();
        this._num1.setNum(0);
        this._num10.setNum(0);
        this._num100.setNum(0);
        this._numP.setNum("%");
        this._num1.x = margX*2;
        this._num10.x = margX;
        this._num100.x = 0;
        this._numP.x = margX*3+1;

        this.addChild(this._num1);
        this.addChild(this._num10);
        this.addChild(this._num100);
        this.addChild(this._numP);
    };

    p.setPercent = function(_num){
        this._num1.setNum(Math.floor(_num %10 ));
        this._num10.setNum(Math.floor(_num/10)%10);
        this._num100.setNum(Math.floor(_num /100));
    };

    p.destroy = function(){
        this._num1.destroy();
        this._num10.destroy();
        this._num100.destroy();
        this._numP.destroy();
        this._cube = null;
        this._num1 = null;
        this._num10 = null;
        this._num100 = null;
        this._numP = null;
    };

    ps.LoaderPercent = LoaderPercent;
}());