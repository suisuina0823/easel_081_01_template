module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        concat: {
            'build/release.js': [
                'src/js/**/*.js'
            ]
        },
        uglify: {
            my_target: {
                files: {
                    'release/js/ps/all.min.js': [
                        "src/js/ps/model/event/EventDispatcher.js",
                        "src/js/ps/model/event/BroadCaster.js",
                        "src/js/ps/akao/util/Delegate.js",
                        "src/js/ps/akao/util/XMLUtil.js",
                        "src/js/ps/akao/util/MathUtils.js",
                        "src/js/ps/akao/util/AnimationUtils.js",
                        "src/js/ps/view/display/loader/LoadManager.js",
                        "src/js/ps/model/data/DataMain.js",
                        "src/js/ps/view/display/contentBigBox/ContentBigBox.js",
                        "src/js/ps/controller/Controller.js",
                        "src/js/ps/view/Main.js",
                        "src/js/ps/view/display/loader/Loader.js",
                        "src/js/ps/view/display/loader/LoaderPercent.js",
                        "src/js/ps/view/display/loader/LoaderPercentNum.js"
                    ]
                }
            }
        },
        watch: {
            files: [
                "src/js/ps/model/event/EventDispatcher.js",
                "src/js/ps/model/event/BroadCaster.js",
                "src/js/ps/akao/util/Delegate.js",
                "src/js/ps/akao/util/XMLUtil.js",
                "src/js/ps/akao/util/MathUtils.js",
                "src/js/ps/akao/util/AnimationUtils.js",
                "src/js/ps/view/display/loader/LoadManager.js",
                "src/js/ps/model/data/DataMain.js",
                "src/js/ps/view/display/contentBigBox/ContentBigBox.js",
                "src/js/ps/controller/Controller.js",
                "src/js/ps/view/Main.js",
                "src/js/ps/view/display/loader/Loader.js",
                "src/js/ps/view/display/loader/LoaderPercent.js",
                "src/js/ps/view/display/loader/LoaderPercentNum.js"
            ],
            tasks: 'default'
        }
    });

    grunt.registerTask('default', [
        'uglify'
    ]);

    //インストールしたモジュールをロードする
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    //コマンドラインでgruntだけ入力し実行した場合に
    //ここでは↑で定義したwatchタスクを実行するという設定
    //カスタムで定義できます。
    //grunt.registerTask("default", "watch");
};
