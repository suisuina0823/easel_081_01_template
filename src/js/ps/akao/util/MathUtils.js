// namespace:
this.ps = this.ps || {};

(function () {
    /**
     *
     * @class MathUtils
     * @constructor
     **/
    var MathUtils = function () {
    };

    /**
     * 1か-1をランダムで返します
     * @return int
     */
    MathUtils.getPlusOrMinus = function() {
        var returnNum = 1;
        if (createRandomNum(10) > 5) { returnNum *= ( -1); }
        return returnNum;
    };


    /**
     * 引数の値が奇数だった場合に1足して返します
     * @param _num int
     * @return int
     */
    MathUtils.createEvenNumber = function( _num) {
        if ( _num % 10 % 2 != 0 ) { _num += 1; }
        return _num;
    };

    /**
     * 引数の値の範囲でランダムな整数を返します(0～引数-1の値になります)
     * @param _num int 値の範囲
     * @return randomNum int
     */
    MathUtils.createRandomNum = function( _num ) {
        var _randomNum = Math.floor(Math.random()*_num);
        return _randomNum;
    };

    /**
     * 第二引数を最小値として、引数の範囲の値のうちランダムな数値を返します。
     * @param _num
     * @param _min
     * @return int
     */
    MathUtils.createRandomRange = function( _num, _min ) {
        var _randomNum = Math.floor(Math.random()*_num)  + _min;
        return _randomNum;
    };

    /**
     * @param low Number
     * 引数の値lowとhighの範囲でランダムな数を返します(小数点以下あり)
     * @param high Number
     * @return Number
     */
    MathUtils.randomInRange = function(low, high) { return low + (high - low) * Math.random(); };

    /**
     * 引数の数値から100の位までの任意の数値を返します
     * @param _num uint
     * @param _rank uint
     * @return uint
     */
    MathUtils.getNumRank = function(_num, _rank) {
        var returnNum = 0;
        switch(_rank) {
            case(1): returnNum = _num - Math.floor(_num*0.1)*10 ; break;
            case(10): returnNum = Math.floor(_num*0.1) % 10 ; break;
            case(100): returnNum = Math.floor(_num*100) ; break;
        }
        return returnNum;
    };

    /**
     * 角度をラジアンに置き換えた数値を変えします。
     * @param _num
     * @return {Number}
     */
    MathUtils.getRadian = function(_num){
        return _num/180 * Math.PI;
    };

    ps.MathUtils = MathUtils;
}());