// namespace:
this.ps = this.ps||{};

(function() {

    /**
     * DeviceUtil
     * @class DeviceUtil
     * @author akao
     * @constructor
     **/
    var DeviceUtil = function() {
    };

    /**
     * useragent情報を返します
     * @return {Array}
     */
    DeviceUtil.getUA = function(){
        var ua ={
            'msie'	:	false,
            'msie6'	:	false,
            'msie7'	:	false,
            'msie8'	:	false,
            'msie9'	:	false,
            'msie10'	:	false,
            'iphone'	:	false,
            'ipad'	:	false,
            'ipod'	:	false,
            'safari'	:	false,
            'firefox'	:	false,
            'chrome'	:	false,
            'opera'	:	false,
            'android'	:	false,
            'androidTablet'	:	false,
            'blackberry'	:	false,
            'windowsMobile'	:	false
        };
        var _ua = navigator.userAgent.toLowerCase();
        _ua = _ua.replace(/ /g, "");
        for( var i in ua ) {
            if( _ua.indexOf( i ) != -1 ) ua[i] = true;
        }

        //	another ua....
        if( ua.android ) {
            //	android
            ua.android = ( ( _ua.indexOf( 'android' ) != -1 && _ua.indexOf( 'mobile' ) != -1 ) && _ua.indexOf( 'sc-01c' ) == -1 )?	true:false;

            //	androidTablet:SC-01C
            ua.androidTablet = ( _ua.indexOf( 'android' ) != -1 && ( _ua.indexOf( 'mobile' ) == -1 || _ua.indexOf( 'sc-01c' ) != -1 ) )?	true:false;
        }

        //log
        //for(var key in ua)console.log( "ua " +  key + ":" + ua[key]);

        //	windows mobile
        ua.windowsMobile = ( _ua.indexOf( 'IEMobile' ) != -1 )?	true:false;
        return ua;
    };

    ps.DeviceUtil = DeviceUtil;
}());
