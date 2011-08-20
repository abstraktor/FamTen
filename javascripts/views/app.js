$(function() {
    window.Views.App = Backbone.View.extend({
        el: "#site",

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click .menu a[data-view]": "switchView"
        },

        initialize: function() {
			window.ContentView = new Views.Table;
            },

        render: function() {

            },

        switchView: function(self) {
			console.log(self.currentTarget);
            $(".menu li a").removeClass("active");
            $(self.currentTarget).addClass("active");
            window.ContentView = new Views[$(self.currentTarget).data("view")]();
            //	$("#site h1").html(controller.desc);
        }
    });

    //hit me as I'm the master view!
    window.AppView = new window.Views.App;
});