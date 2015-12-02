// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * NodeUtil
     * @class NodeUtil
     * @author sa
     * @constructor
     **/
    var NodeUtil = function() {
    };

    /**
     * 全Nodeからクラス名を取得します
     * @param _xml
     * @param _nodeName
     * @return {Array}
     */
    NodeUtil.getElementsByClassName = function(targetClass){
        var foundElements = new Array();
        if (document.all){
            var allElements = document.all;
        }
        else {
            var allElements = document.getElementsByTagName("*");
        }
        for (i=0,j=0;i<allElements.length;i++) {
            if (allElements[i].className == targetClass) {
                foundElements[j] = allElements[i];
                j++;
            }
        }
        return foundElements;
    };
    ps.NodeUtil = NodeUtil;
}());
