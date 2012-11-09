YUI.add('sizer-tests', function(Y) {

    var areSame = Y.Assert.areSame,
        testBasic = new Y.Test.Case({
            name: "Sizer Tests",

            'should fail': function() {
                Y.Assert.isTrue(false);
            }

        });

    var suite = new Y.Test.Suite("Sizer");
    suite.add(testBasic);

    Y.Test.Runner.add(suite);

});
