window.Model.Player = Backbone.Model.extend({

    // Default attributes for the todo.
    defaults: {
        name: "",
        wins: 0,
        evens: 0,
        loses: 0
    },

    // Ensure that each player created has a name.
    initialize: function() {
        },

    avgpointspergame: function() {
        if (this.games() == 0)
        return 0;
        return this.points() / this.games();
    },

    points: function() {
        return (this.get("wins") * 2) + this.get("evens");
    },

    stats: function() {
        if (this.get("wins") === undefined) {
            return "";
        }
        return this.get("wins") + ":" + this.get("evens") + ":" + this.get("loses");
    },

    games: function() {
        return this.get("wins") + this.get("evens") + this.get("loses");
    },

    position: function() {
        if (!this.collection)
        return "";
        return this.collection.indexOf(this) + 1;
    },

    parse: function(response) {
        var stats = response.attributes.stats.split(":");
		
		//parse given colon-seperated string of stats to integers
		stats = stats.map(function(x) {
        	return parseInt(x) || 0;
    	});
        
		response.set({
			wins: stats[0],
			evens: stats[1],
			loses: stats[2]
		});
        delete response.attributes.stats;
		return response;
    },

    validate: function(attrs) {
        if (attrs) {
            if (attrs.name == "" || attrs.name == 'NaN')
            return "Spieler brauchen Namen";
            if (attrs.stats !== undefined) {
                var stats = attrs.stats.split(":");
                if (!_.isArray(stats) || stats.length != 3)
                return "Stats should have the form wins:evens:loses";
            }
        }
    }
});

window.Collection.Players = Backbone.Collection.extend({
    model: Model.Player,

    localStorage: new Store("players"),

    name_exists: function(name) {
        return this.any(function(p) {
            return p.get("name") == name
        });
    },

    // order by average points per game *descending* (thats what the minus is for)
    comparator: function(player) {
        return - player.avgpointspergame();
    }

});

window.App.Players = new Collection.Players;