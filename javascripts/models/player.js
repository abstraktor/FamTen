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
        if (!this.get("name")) {
            this.set({
                "name": this.defaults.name
            });
        }
    },

    points: function() {
        return (this.wins * 2) + this.evens;
    },

    stats: function() {
        return this.wins + ":" + this.even + ":" + this.loses;
    },

    games: function() {
        return this.wins + this.evens + this.loses;
    },

    validate: function(attrs) {
        if (attrs) {
            if (attrs.name == "")
            return "Spieler brauchen Namen";
            if (App.Players.name_exists(attrs.name))
            return "Diesen Spieler hast du schon hinzugefügt"
            if (attrs.stats !== undefined) {
                var stats = attrs.stats.split(":");
                if (!_.isArray(stats))
                return "Stats should have the form wins:evens:loses replaced by that numbers";
                //parse given colon-seperated string of stats to integers
                [this.wins, this.evens, this.loses] = stats.map(function(x) {
                    return parseInt(x);
                });
            }
            delete attrs.stats;
        }
    }
});

window.Collection.Players = Backbone.Collection.extend({
    model: Model.Player,

    localStorage: new Store("players"),

    name_exists: function(name) {
        return this.any(function(p) {
            return p.attributes.name == name
        });
    },

    // Todos are sorted by their original insertion order.
    comparator: function(player) {
        return player.points();
    }

});

window.App.Players = new Collection.Players;