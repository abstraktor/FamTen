$(function() {
    window.Views.Table = Backbone.View.extend({

        el: "#content",

        // Cache the template function
        template: _.template($('#table-template').html()),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
        },

        initialize: function() {
			App.Players.bind("add", this.render, this);
			App.Players.bind("changed", this.render, this);
			App.Players.bind("remove", this.render, this);
            App.Players.fetch();
            this.render();
        },

        render: function() {
			console.log("redraw...")
			this.buildCreationRow();
			$(this.el).empty();
            $(this.el).html(this.template(App.Players.toJSON()));
            $("#table tbody").append(this.creationRow.render().el);
			this.addAll();
			this.creationRow.$("input").first().focus();
        },

	    // Add a single todo item to the list by creating a view for it, and
	    // appending its element to the `<ul>`.
	    addOne: function(player) {
	      	$(this.creationRow.el).before(new Views.Player({model: player}).render().el);
			this.creationRow.$("input").first().focus();
	    },

	    // Add all items in the collection at once.
	    addAll: function() {
	      App.Players.each(this.addOne, this);
	    },

        buildCreationRow : function() {
            var view = new Views.Player( {model: new Model.Player({position:"+"})} );
			view.startEditing();
			view.close = function() {
				if(App.Players.create(this.getContentFromForm()))
					this.setContent({});
			}
			this.creationRow = view;
        }
    });
});