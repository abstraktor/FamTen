window.Model = {};

window.Collection = {};

window.Views = {};

//contains instances of window.Collection-items
window.App = {};

var Workspace = Backbone.Router.extend({

    routes: {
        "help": "help",
        "table": "table",
        "matches": "matches"
    },

    help: function() {
		alert("help");
        AppView.switchView($("a[data-view='Help']"));
    },

    table: function() {
        AppView.switchView($("a[data-view='Table']"));
    },

    matches: function() {
        AppView.switchView($("a[data-view='Match']"));
    }


});

Backbone.history.start();