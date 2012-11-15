YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-sizer'),
        sizer = null;

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        'check for size and attrs': function() {
            if (sizer) {
                sizer.destroy();
                sizer = null;
            }
            sizer = new Y.Sizer();
            sizer.render();

            var cb = sizer.get('contentBox');

            Y.Assert.areEqual(sizer.get('width'), cb.get('region').width, 'Initial widths are not correct');
            Y.Assert.areEqual(sizer.get('height'), cb.get('region').height, 'Initial heights are not correct');

            sizer.set('width', 250);
            sizer.set('height', 250);

            Y.Assert.areEqual(sizer.get('width'), cb.get('region').width, 'Initial widths are not correct');
            Y.Assert.areEqual(sizer.get('height'), cb.get('region').height, 'Initial heights are not correct');
        },

        'check for url to change when width changes': function() {
            if (sizer) {
                sizer.destroy();
                sizer = null;
            }
            sizer = new Y.Sizer();
            sizer.render();

            sizer.after('imageLoaded', function(e) {
                var url = Y.Lang.sub(sizer.get('url'), {
                    width: sizer.get('width'),
                    height: sizer.get('height')
                });

                Y.Assert.areSame(url, e.src);
            });

            sizer.set('width', 100);

        }


    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test' ] });
