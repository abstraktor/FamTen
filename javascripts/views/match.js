$(function() {
    window.Views.Match = Backbone.View.extend({
        tagName: "div",

        // Cache the template function for a single item.
        template: _.template($('#match-template').html()),

        // The DOM events specific to an item.
        events: {
            "keypress input": "updateOnEnter",
			"dblclick" : "toggleEditing"
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
			this.$("input[data-field='Aplayers']").tokenInput(App.Players.tokenJSON(),{prePopulate:this.model.get("Aplayers"), max:2, preventDuplicates:true});
			this.$("ul.token-input-list").addClass("left");
			this.$("input[data-field='Bplayers']").tokenInput(App.Players.tokenJSON(),{
				prePopulate:this.model.get("Bplayers"), 
				max:2, 
				preventDuplicates:true });
			this.$("ul.token-input-list:not(.left)").addClass("right");
            return this;
        },

        update: function() {
            this.model.save(this.getContentFromForm());
        },

        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.update();
        },

        setContent: function(attrs) {
            var self = this;
            if (attrs === undefined)
            var attrs = this.model;

            this.$("*[data-field]").each(function(i, el) {
                var field = $(el).data("field");
                if (typeof self.model[field] === "function") {
                    val = self.model[field]();
                }
                else if (self.model.get(field) !== "undefined")
                val = self.model.get(field);
                else
                console.error("the field " + field + " is not within that model");

                if (el.tagName == "INPUT") {
                    $(el).val(val);
                } else {
                    $(el).text(val);
                }
            });
        },

		toggleEditing: function(){
			if($(this.el).hasClass("editing"))
				$(this.el).removeClass("editing");
			else
				$(this.el).addClass("editing");
		},
		
        getContentFromForm: function() {
            o = {};
            this.$("input").each(function() {
                o[$(this).data("field")] = $(this).val();
            });
            return o;
        },
    });
});