$(function(){
	window.Views.Matches = Backbone.View.extend({
		el: "#content",

        // The DOM events specific to an item.
        events: { 
			
        },

        initialize: function() {
			App.Matches.bind("add", this.render, this);
			App.Matches.bind("changed", this.render, this);
			App.Matches.bind("remove", this.render, this);
			this.render();
        },

        render: function() {
			this.buildCreationRow();
			$(this.el).empty();
            $(this.el).append(this.creationRow.render().el);
			this.addAll();
			this.creationRow.$("input.match-input").focus();
			$(this.creationRow.el).addClass("creationRow");
            return this;
        },


	    // Add a single todo item to the list by creating a view for it, and
	    // appending its element to the `<ul>`.
	    addOne: function(match) {
	      	$(this.creationRow.el).after(new Views.Match({model: match}).render().el);
			this.creationRow.$("input").first().focus();
	    },

	    // Add all items in the collection at once.
	    addAll: function() {
	      App.Matches.each(this.addOne, this);
	    },


        buildCreationRow : function() {
            var view = new Views.Match( {model: new Model.Match({})} );
			view.update = function() {
				if(App.Matches.create(this.getContentFromForm()))
					this.setContent(new Model.Match({}));
			}
			this.creationRow = view;
        }

	});
});