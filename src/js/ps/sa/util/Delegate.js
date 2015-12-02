// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * Delegate
     * @class Delegate
     * @author sa
     * @constructor
     **/
    var Delegate = function() {
    };

    /**
     * スコープを制御します
     * @param __target
     * @param __func
     * @return {Function}
     */
    Delegate.create = function( __target, __func ){
        var f = function(){
            var target = arguments.callee._target;
            var func = arguments.callee._func;
            return func.apply(target, arguments);
        };
        f._target = __target;
        f._func = __func;
        return f;
    };

    ps.Delegate = Delegate;
}());
