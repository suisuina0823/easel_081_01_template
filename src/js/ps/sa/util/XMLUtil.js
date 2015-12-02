// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * XMLUtil
     * @class XMLUtil
     * @author sa
     * @constructor
     **/
    var XMLUtil = function() {
    };

    /**
     * PreloadJS用のmanifestファイルを作成します。
     * 属性値はid、urlで固定になります。
     * @param _xml
     * @param _nodeName
     * @return {Array}
     */
    XMLUtil.getLoadManifest = function( _xml, _nodeName ){
        var _xmlData = _xml.getElementsByTagName("data")[0];
        var _manifest = [];
        var _imgNum = _xmlData.getElementsByTagName(_nodeName).length;
        for(var i=0; i < _imgNum; i++ ){
            var _node = _xmlData.getElementsByTagName(_nodeName)[i];
            var _attrID = _node.getAttributeNode("id").value;
            var _attrURL = _node.getAttributeNode("url").value;
            if(i == _imgNum-1) this._imgLastID =_attrID;

            var _manifestObj = {};
            _manifestObj.src = _attrURL;
            _manifestObj.id = _attrID;
            _manifest.push(_manifestObj);
        }
        return _manifest;
    };
    ps.XMLUtil = XMLUtil;
}());
