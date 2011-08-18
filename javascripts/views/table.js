$(function() {
    window.Views.Table = Backbone.View.extend({

        el: "#content",

        // Cache the template function
        template: _.template($('#table-template').html()),

        item_template: _.template($('#tableitem-template').html()),

        item_form_template: _.template($('#tableitem-form-template').html()),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "keydown .player-form": "updateCreationRow",
            "keydown .player-form": "saveFormOnReturn",
            "keyup .player-form": "showTooltip"
        },

        initialize: function() {
            App.Players.fetch();
			App.Players.bind("add", this.addOne, this);
			App.Players.bind("remove", this.render, this);
            this.render();
        },

        render: function() {
			console.log("redraw");
            $(this.el).html(this.template(App.Players.toJSON()));
			this.addAll();
            this.appendCreationRow();
        },

	    // Add a single todo item to the list by creating a view for it, and
	    // appending its element to the `<ul>`.
	    addOne: function(player) {
			this.$("#table tbody").last().remove();
            var row = _.template($('#tableitem-template').html()) ({model: player});
	      	this.$("#table tbody").append(row);
			this.appendCreationRow();
	    },

	    // Add all items in the **Todos** collection at once.
	    addAll: function() {
	      App.Players.each(this.addOne);
	    },
	
        appendCreationRow: function() {
            var row = this.item_form_template(new Model.Player());
            $("#table tbody").append(row);
        },

        createPlayerFromForm: function() {
            o = {};
            $("input.player-form").each(function() {
                o[$(this).data("field")] = this.value;
            });
            return o;
        },

        updateCreationRow: function(e) {
            if (e.keyCode == 13) return;
            player = App.Players.create(this.createPlayerFromForm());
			
            //	$("#site h1").html(controller.desc);
        },

		saveFormOnReturn: function(e) {
            if (e.keyCode != 13) return;
        	App.Players.create(this.createPlayerFromForm());
		},	

        showTooltip: function(self) {
            //TODO
            }
    });
});