if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-sizer/gallery-sizer.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-sizer/gallery-sizer.js",
    code: []
};
_yuitest_coverage["build/gallery-sizer/gallery-sizer.js"].code=["YUI.add('gallery-sizer', function (Y, NAME) {","","/**","Demonstrates the use of Resizer and image placeholder services.","","","@module gallery-sizer","@class Sizer","@since 0.1","**/","Y.Sizer = Y.Base.create('gallery-sizer', Y.Widget, [], {","","    /**","    Creates image and text nodes and calls _makeResize","    @public","    @method renderUI","    @since 0.1","    **/","    renderUI: function() {","        var img = Y.Node.create('<img>'),","            txt = Y.Node.create('<span class=\"' + Y.ClassNameManager.getClassName('text') + '\"></span>');","","        this.get('contentBox').append(img).append(txt);","","        this._img = img;","        this._txt = txt;","","        this._makeResize();","    },","","    /**","    Binds events for resize and when the image has completed loading.","    @public","    @method bindUI","    @since 0.1","    **/","    bindUI: function() {","        this.after('widthChange', this._afterWidthChange, this);","        this.after('heightChange', this._afterHeightChange, this);","        this._resize.after('resize:start', this._afterResizeStart, this);","        this._resize.after('resize:resize', this._afterResizeResize, this);","        this._resize.after('resize:end', this._afterResizeEnd, this);","        this._img.after('load', this._afterImageLoad, this);","    },","","    /**","    Ensures there is a skin in place above the sizer widget. Loads correct image.","    @public","    @method syncUI","    @since 0.1","    **/","    syncUI: function() {","        var bb = this.get('boundingBox'),","            skin = bb.ancestor(this.get('skin'));","","        if (!skin) {","            bb.ancestor().addClass(this.get('skin'));","        }","","        this._resizeImage();","    },","","    /**","    Calls update image size after height changes","    @protected","    @method _afterHeightChange","    @since 0.1","    */","    _afterWidthChange: function(e) {","        if (!e.src || e.src !== 'resize') {","            this._resizeImage();","        }","    },","","    /**","    Calls update image size after height changes","    @protected","    @method _afterHeightChange","    @since 0.1","    */","    _afterHeightChange: function(e) {","        if (!e.src || e.src !== 'resize') {","            this._resizeImage();","        }","    },","","    /**","    Initializes the Resize component","    @protected","    @method _makeResize","    @since 0.1","    **/","    _makeResize: function() {","        this._resize = new Y.Resize({","            node: this.get('contentBox'),","            autoHide: this.get('autoHide')","        });","","        this._resize.plug(Y.Plugin.ResizeConstrained, {","            minWidth: this.get('minWidth'),","            maxWidth: this.get('maxWidth'),","            minHeight: this.get('minHeight'),","            maxHeight: this.get('maxHeight')","        });","    },","","    /**","    Adds a busy class when you start resizing","    @protected","    @method _afterResizeStart","    @since 0.1","    **/","    _afterResizeStart: function() {","        this.get('boundingBox').addClass(Y.ClassNameManager.getClassName('busy'));","    },","","    /**","    Updates dimension text during the resize and sets the width and height","        to the widget","    @protected","    @method _afterResizeResize","    @since 0.1","    **/","    _afterResizeResize: function(e) {","        this._txt.set('text', Y.Lang.sub(this.get('textTemplate'), {","            width: e.info.offsetWidth,","            height: e.info.offsetHeight","        }));","    },","","    /**","    Sets the final width and height from the final resize then calls _resizeImage","    @protected","    @method _afterResizeEnd","    @since 0.1","    **/","    _afterResizeEnd: function(e) {","        this.set('width', e.info.offsetWidth, {src: 'resize'});","        this.set('height', e.info.offsetHeight, {src: 'resize'});","        this._resizeImage();","    },","","    /**","    Updates the placeholder image to the width and height of the resize component","    @protected","    @method _resizeImage","    @since 0.1","    **/","    _resizeImage: function() {","        var config = {","            width: this.get('width'),","            height: this.get('height')","        };","","        this._img.set('src', Y.Lang.sub(this.get('url'), config));","    },","","    /**","    Removes the busy class and clears out the dimensions","    @protected","    @method _afterImageLoad","    @since 0.1","    **/","    _afterImageLoad: function() {","        this.get('boundingBox').removeClass(Y.ClassNameManager.getClassName('busy'));","        this._txt.set('text', '');","","        this.fire('imageLoaded', { src: this._img.get('src') });","    }","","}, {","    ATTRS: {","        /**","        Image source URL","        @attribute url","        @type {String}","        @default http://placekitten.com/{width}/{height}","        **/","        url: {","            value: 'http://placekitten.com/{width}/{height}'","        },","","        /**","        Skin classname to use","        @attribute skin","        @type {String}","        @default yui3-skin-sam","        **/","        skin: {","            value: 'yui3-skin-sam'","        },","","        /**","        Width of the sizer image.","        @attribute width","        @type {Number}","        @default 220","        **/","        width: {","            value: 220","        },","","        /**","        Height of the sizer image.","        @attribute height","        @type {Number}","        @default 310","        **/","        height: {","            value: 310","        },","","        /**","        Minimum width of the image","        @attribute minWidth","        @type {Number}","        @default 50","        **/","        minWidth: {","            value: 50","        },","","        /**","        Minimum height of the image","        @attribute minHeight","        @type {Number}","        @default 50","        **/","        minHeight: {","            value: 50","        },","","        /**","        Maximum width of the image","        @attribute maxWidth","        @type {Number}","        @default 300","        **/","        maxWidth: {","            value: 300","        },","","        /**","        Maximum height of the image","        @attribute maxHeight","        @type {Number}","        @default 400","        **/","        maxHeight: {","            value: 400","        },","","        /**","        Automatically hide grips on the resizer","        @attribute autoHide","        @type {Boolean}","        @default false","        **/","        autoHide: {","            value: false","        },","","        /**","        Template to use for the text dimensions","        @attribute textTemplate","        @type {String}","        @default {width} x {height}","        **/","        textTemplate: {","            value: '{width} x {height}'","        }","","    }","});","","}, '@VERSION@', {\"requires\": [\"widget\", \"base-build\", \"resizer\"], \"skinnable\": true});"];
_yuitest_coverage["build/gallery-sizer/gallery-sizer.js"].lines = {"1":0,"11":0,"20":0,"23":0,"25":0,"26":0,"28":0,"38":0,"39":0,"40":0,"41":0,"42":0,"43":0,"53":0,"56":0,"57":0,"60":0,"70":0,"71":0,"82":0,"83":0,"94":0,"99":0,"114":0,"125":0,"138":0,"139":0,"140":0,"150":0,"155":0,"165":0,"166":0,"168":0};
_yuitest_coverage["build/gallery-sizer/gallery-sizer.js"].functions = {"renderUI:19":0,"bindUI:37":0,"syncUI:52":0,"_afterWidthChange:69":0,"_afterHeightChange:81":0,"_makeResize:93":0,"_afterResizeStart:113":0,"_afterResizeResize:124":0,"_afterResizeEnd:137":0,"_resizeImage:149":0,"_afterImageLoad:164":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-sizer/gallery-sizer.js"].coveredLines = 33;
_yuitest_coverage["build/gallery-sizer/gallery-sizer.js"].coveredFunctions = 12;
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 1);
YUI.add('gallery-sizer', function (Y, NAME) {

/**
Demonstrates the use of Resizer and image placeholder services.


@module gallery-sizer
@class Sizer
@since 0.1
**/
_yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 11);
Y.Sizer = Y.Base.create('gallery-sizer', Y.Widget, [], {

    /**
    Creates image and text nodes and calls _makeResize
    @public
    @method renderUI
    @since 0.1
    **/
    renderUI: function() {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "renderUI", 19);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 20);
var img = Y.Node.create('<img>'),
            txt = Y.Node.create('<span class="' + Y.ClassNameManager.getClassName('text') + '"></span>');

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 23);
this.get('contentBox').append(img).append(txt);

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 25);
this._img = img;
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 26);
this._txt = txt;

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 28);
this._makeResize();
    },

    /**
    Binds events for resize and when the image has completed loading.
    @public
    @method bindUI
    @since 0.1
    **/
    bindUI: function() {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "bindUI", 37);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 38);
this.after('widthChange', this._afterWidthChange, this);
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 39);
this.after('heightChange', this._afterHeightChange, this);
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 40);
this._resize.after('resize:start', this._afterResizeStart, this);
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 41);
this._resize.after('resize:resize', this._afterResizeResize, this);
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 42);
this._resize.after('resize:end', this._afterResizeEnd, this);
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 43);
this._img.after('load', this._afterImageLoad, this);
    },

    /**
    Ensures there is a skin in place above the sizer widget. Loads correct image.
    @public
    @method syncUI
    @since 0.1
    **/
    syncUI: function() {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "syncUI", 52);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 53);
var bb = this.get('boundingBox'),
            skin = bb.ancestor(this.get('skin'));

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 56);
if (!skin) {
            _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 57);
bb.ancestor().addClass(this.get('skin'));
        }

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 60);
this._resizeImage();
    },

    /**
    Calls update image size after height changes
    @protected
    @method _afterHeightChange
    @since 0.1
    */
    _afterWidthChange: function(e) {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_afterWidthChange", 69);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 70);
if (!e.src || e.src !== 'resize') {
            _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 71);
this._resizeImage();
        }
    },

    /**
    Calls update image size after height changes
    @protected
    @method _afterHeightChange
    @since 0.1
    */
    _afterHeightChange: function(e) {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_afterHeightChange", 81);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 82);
if (!e.src || e.src !== 'resize') {
            _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 83);
this._resizeImage();
        }
    },

    /**
    Initializes the Resize component
    @protected
    @method _makeResize
    @since 0.1
    **/
    _makeResize: function() {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_makeResize", 93);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 94);
this._resize = new Y.Resize({
            node: this.get('contentBox'),
            autoHide: this.get('autoHide')
        });

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 99);
this._resize.plug(Y.Plugin.ResizeConstrained, {
            minWidth: this.get('minWidth'),
            maxWidth: this.get('maxWidth'),
            minHeight: this.get('minHeight'),
            maxHeight: this.get('maxHeight')
        });
    },

    /**
    Adds a busy class when you start resizing
    @protected
    @method _afterResizeStart
    @since 0.1
    **/
    _afterResizeStart: function() {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_afterResizeStart", 113);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 114);
this.get('boundingBox').addClass(Y.ClassNameManager.getClassName('busy'));
    },

    /**
    Updates dimension text during the resize and sets the width and height
        to the widget
    @protected
    @method _afterResizeResize
    @since 0.1
    **/
    _afterResizeResize: function(e) {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_afterResizeResize", 124);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 125);
this._txt.set('text', Y.Lang.sub(this.get('textTemplate'), {
            width: e.info.offsetWidth,
            height: e.info.offsetHeight
        }));
    },

    /**
    Sets the final width and height from the final resize then calls _resizeImage
    @protected
    @method _afterResizeEnd
    @since 0.1
    **/
    _afterResizeEnd: function(e) {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_afterResizeEnd", 137);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 138);
this.set('width', e.info.offsetWidth, {src: 'resize'});
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 139);
this.set('height', e.info.offsetHeight, {src: 'resize'});
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 140);
this._resizeImage();
    },

    /**
    Updates the placeholder image to the width and height of the resize component
    @protected
    @method _resizeImage
    @since 0.1
    **/
    _resizeImage: function() {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_resizeImage", 149);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 150);
var config = {
            width: this.get('width'),
            height: this.get('height')
        };

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 155);
this._img.set('src', Y.Lang.sub(this.get('url'), config));
    },

    /**
    Removes the busy class and clears out the dimensions
    @protected
    @method _afterImageLoad
    @since 0.1
    **/
    _afterImageLoad: function() {
        _yuitest_coverfunc("build/gallery-sizer/gallery-sizer.js", "_afterImageLoad", 164);
_yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 165);
this.get('boundingBox').removeClass(Y.ClassNameManager.getClassName('busy'));
        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 166);
this._txt.set('text', '');

        _yuitest_coverline("build/gallery-sizer/gallery-sizer.js", 168);
this.fire('imageLoaded', { src: this._img.get('src') });
    }

}, {
    ATTRS: {
        /**
        Image source URL
        @attribute url
        @type {String}
        @default http://placekitten.com/{width}/{height}
        **/
        url: {
            value: 'http://placekitten.com/{width}/{height}'
        },

        /**
        Skin classname to use
        @attribute skin
        @type {String}
        @default yui3-skin-sam
        **/
        skin: {
            value: 'yui3-skin-sam'
        },

        /**
        Width of the sizer image.
        @attribute width
        @type {Number}
        @default 220
        **/
        width: {
            value: 220
        },

        /**
        Height of the sizer image.
        @attribute height
        @type {Number}
        @default 310
        **/
        height: {
            value: 310
        },

        /**
        Minimum width of the image
        @attribute minWidth
        @type {Number}
        @default 50
        **/
        minWidth: {
            value: 50
        },

        /**
        Minimum height of the image
        @attribute minHeight
        @type {Number}
        @default 50
        **/
        minHeight: {
            value: 50
        },

        /**
        Maximum width of the image
        @attribute maxWidth
        @type {Number}
        @default 300
        **/
        maxWidth: {
            value: 300
        },

        /**
        Maximum height of the image
        @attribute maxHeight
        @type {Number}
        @default 400
        **/
        maxHeight: {
            value: 400
        },

        /**
        Automatically hide grips on the resizer
        @attribute autoHide
        @type {Boolean}
        @default false
        **/
        autoHide: {
            value: false
        },

        /**
        Template to use for the text dimensions
        @attribute textTemplate
        @type {String}
        @default {width} x {height}
        **/
        textTemplate: {
            value: '{width} x {height}'
        }

    }
});

}, '@VERSION@', {"requires": ["widget", "base-build", "resizer"], "skinnable": true});
