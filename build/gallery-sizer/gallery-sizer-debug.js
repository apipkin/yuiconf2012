YUI.add('gallery-sizer', function (Y, NAME) {

/**
Demonstrates the use of Resizer and image placeholder services.


@module gallery-sizer
@class Sizer
@since 0.1
**/
Y.Sizer = Y.Base.create('gallery-sizer', Y.Widget, [], {

    /**
    Creates image and text nodes and calls _makeResize
    @public
    @method renderUI
    @since 0.1
    **/
    renderUI: function() {
        var img = Y.Node.create('<img>'),
            txt = Y.Node.create('<span class="' + Y.ClassNameManager.getClassName('text') + '"></span>');

        this.get('contentBox').append(img).append(txt);

        this._img = img;
        this._txt = txt;

        this._makeResize();
    },

    /**
    Binds events for resize and when the image has completed loading.
    @public
    @method bindUI
    @since 0.1
    **/
    bindUI: function() {
        this.after('widthChange', this._afterWidthChange, this);
        this.after('heightChange', this._afterHeightChange, this);
        this._resize.after('resize:start', this._afterResizeStart, this);
        this._resize.after('resize:resize', this._afterResizeResize, this);
        this._resize.after('resize:end', this._afterResizeEnd, this);
        this._img.after('load', this._afterImageLoad, this);
    },

    /**
    Ensures there is a skin in place above the sizer widget. Loads correct image.
    @public
    @method syncUI
    @since 0.1
    **/
    syncUI: function() {
        var bb = this.get('boundingBox'),
            skin = bb.ancestor(this.get('skin'));

        if (!skin) {
            bb.ancestor().addClass(this.get('skin'));
        }

        this._resizeImage();
    },

    /**
    Calls update image size after height changes
    @protected
    @method _afterHeightChange
    @since 0.1
    */
    _afterWidthChange: function(e) {
        if (!e.src || e.src !== 'resize') {
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
        if (!e.src || e.src !== 'resize') {
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
        this._resize = new Y.Resize({
            node: this.get('contentBox'),
            autoHide: this.get('autoHide')
        });

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
        this.set('width', e.info.offsetWidth, {src: 'resize'});
        this.set('height', e.info.offsetHeight, {src: 'resize'});
        this._resizeImage();
    },

    /**
    Updates the placeholder image to the width and height of the resize component
    @protected
    @method _resizeImage
    @since 0.1
    **/
    _resizeImage: function() {
        var config = {
            width: this.get('width'),
            height: this.get('height')
        };

        this._img.set('src', Y.Lang.sub(this.get('url'), config));
    },

    /**
    Removes the busy class and clears out the dimensions
    @protected
    @method _afterImageLoad
    @since 0.1
    **/
    _afterImageLoad: function() {
        this.get('boundingBox').removeClass(Y.ClassNameManager.getClassName('busy'));
        this._txt.set('text', '');

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
