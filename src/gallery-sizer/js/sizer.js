/**
Demonstrates the use of Resizer and image placeholder services.


@module sizer
@class Sizer
@version 0.1
**/
Y.Sizer = Y.Base.create('sizer', Y.Widget, [], {

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
        this.set('width', e.info.offsetWidth);
        this.set('height', e.info.offsetHeight);
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
    }

}, {
    ATTRS: {
        /**
        Image source URL
        @attribute url
        @type {String}
        **/
        url: {
            value: 'http://placedog.com/{width}/{height}'
        },

        /**
        Skin classname to use
        @attribute skin
        @type {String}
        **/
        skin: {
            value: 'yui3-skin-sam'
        },

        /**
        Width of the sizer image.
        @attribute width
        @type {Number}
        **/
        width: {
            value: 220
        },

        /**
        Height of the sizer image.
        @attribute height
        @type {Number}
        **/
        height: {
            value: 310
        },

        /**
        Minimum width of the image
        @attribute minWidth
        @type {Number}
        **/
        minWidth: {
            value: 50
        },

        /**
        Minimum height of the image
        @attribute minHeight
        @type {Number}
        **/
        minHeight: {
            value: 50
        },

        /**
        Maximum width of the image
        @attribute maxWidth
        @type {Number}
        **/
        maxWidth: {
            value: 300
        },

        /**
        Maximum height of the image
        @attribute maxHeight
        @type {Number}
        **/
        maxHeight: {
            value: 300
        },

        /**
        Automatically hide grips on the resizer
        @attribute autoHide
        @type {Boolean}
        **/
        autoHide: {
            value: false
        },

        /**
        Template to use for the text dimensions
        @attribute textTemplate
        @type {String}
        **/
        textTemplate: {
            value: '{width} x {height}'
        }

    }
});