$(function(){
	window.Views.Match =  Backbone.View.extend({
		el: "#content",
		
        // Cache the template function for a single item.
        template: _.template($('#match-template').html()),

        // The DOM events specific to an item.
        events: {
			
        },

        initialize: function() {
			this.render();
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        },
	});
});