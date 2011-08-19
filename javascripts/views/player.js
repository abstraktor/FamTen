$(function() {
    window.Views.Player = Backbone.View.extend({

        tagName: "tr",
        // Cache the template function for a single item.
        template: _.template($('#player-template').html()),

        // The DOM events specific to an item.
        events: {
            "dblclick .player-view": "toggleEditing",
            // "click span.player-destroy"   : "clear",
            "keypress .player-input": "updateOnEnter",
            "blur .player-input": "callclose",
            "keyup .player-input": "showTooltip"
        },

        // The TodoView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Todo** and a **TodoView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function() {
            $(this.el).addClass("viewing");
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        setContent: function(attrs) {
			var self = this;
			if(attrs===undefined)
				var attrs = this.model.attributes;
			
            this.$("*[data-field]").each(function(i, el) {
				var field = $(el).data("field");
				var val = attrs[field];
                if (el.tagName == "INPUT") {
                    $(el).val(val);
                } else {
                    $(el).text(val);
                }
            });
        },

        // Toggle the `"done"` state of the model.
        toggleEditing: function() {
            if ($(this.el).hasClass("viewing"))
            this.startEditing();
            else this.finishEditing();

        },

        startEditing: function() {
            $(this.el).removeClass("viewing");
            $(this.el).addClass("editing");
            this.$("input").first().focus();
        },

        finishEditing: function() {
            $(this.el).removeClass("editing");
            $(this.el).addClass("viewing");
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function() {
            this.model.save(this.getContentFromForm());
            this.toggleEditing();
        },

		callclose: function(){
			this.close();
		},

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.close();
        },

        // Remove this view from the DOM.
        remove: function() {
            $(this.el).remove();
        },

        // Remove the item, destroy the model.
        clear: function() {
            this.model.destroy();
        },

        getContentFromForm: function() {
            o = {};
            this.$("input").each(function() {
                o[$(this).data("field")] = $(this).val();
            });
            return o;
        },

        showTooltip: function(self) {
            //TODO
            }

    });
});