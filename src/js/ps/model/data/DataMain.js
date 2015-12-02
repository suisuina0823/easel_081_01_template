// namespace:
this.ps = this.ps||{};

(function() {
    /**
     * DataMainオブジェクト
     *
     * @class DataMain
     * @constructor
     **/
    var DataMain = function() {
    };

    /**
     * 初期化用XML URL
     * @type {String}
     */
    DataMain.CONFIG_XML_URL = "assets/config.xml";

    DataMain.configXML = null;

    /**
     *
     * @type {*}
     */
    DataMain.imgContainer = {};

    /**
     *
     * @type {null}
     */
    DataMain.canvas = null;

    /**
     *
     * @type {null}
     */
    DataMain.stage = null;

    /**
     *
     * @type {null}
     */
    DataMain.stageHeight = null;

    /**
     *
     * @type {null}
     */
    DataMain.stageWidth = null;

    DataMain.FPS = 0;


    ps.DataMain = DataMain;
}());