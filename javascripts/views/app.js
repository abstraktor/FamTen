window.Views.App = Backbone.View.extend({
	el:"#site",
	
    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "click .menu li": "switchView"
    },

	initialize: function(){
		
	},
	
	render: function(){
		
	},
	
	switchView: function(this){
		console.log(this);
		//	$("#site h1").html(controller.desc);
	},	
});