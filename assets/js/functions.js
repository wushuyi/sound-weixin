var $el = {};
var myApp;
var AudoPlay = (function ($el) {

    function AudoPlay() {
        this.init();
    }

    AudoPlay.prototype = {

        init: function () {

            if (!createjs.Sound.initializeDefaultPlugins()) {
                return;
            }

            var audioPath = "./assets/sound/";
            var sounds = [
                {id: "test", src: "test.mp3"}
            ];
            $el.status.text("loading audio");
            createjs.Sound.alternateExtensions = ["mp3"];
            var loadProxy = createjs.proxy(this.handleLoad, this);
            createjs.Sound.addEventListener("fileload", loadProxy);
            createjs.Sound.registerSounds(sounds, audioPath);
        },

        handleLoad: function (event) {
            createjs.Sound.play(event.src);
            $el.status.text("Playing " + event.src);
        }
    };

    return AudoPlay;
}($el));

$.fn.ready(function () {
    $el.status = $('#status');
    $el.doc = $(document);
    $el.status.text('wait....');
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
        $el.doc.on('WeixinJSBridgeReady', function () {
            myApp = new AudoPlay();
        });
    } else if (Modernizr.touch) {
        $el.doc.on('touchstart', function () {
            myApp = new AudoPlay();
        });
    } else {
        $.fn.ready(function () {
            myApp = new AudoPlay();
        });
    }
});