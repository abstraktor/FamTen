$(function() {
    window.Views.Match = Backbone.View.extend({
        el: "#content",

        // Cache the template function
        template: _.template($('#match-template').html()),

        initialize: function() {
				this.render();
            },

        render: function() {
	            $(this.el).html(this.template({}));
            },
    });
});