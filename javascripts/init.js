window.Model = {};

window.Collection = {};

window.Views = {};

//contains instances of window.Collection-items
window.App = {};

$(function(){
	
	var Workspace = Backbone.Router.extend({

	    routes: {
	        "help": "help",
	        "table": "table",
	        "matches": "matches"
	    },

	    help: function() {
	        window.AppView.switchView($("a[data-view='Help']"));
	    },

	    table: function() {
	        window.AppView.switchView($("a[data-view='Table']"));
	    },

	    matches: function() {
	        window.AppView.switchView($("a[data-view='Match']"));
	    }

	});

	new Workspace();
	Backbone.history.start();
});