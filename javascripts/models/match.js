window.Model.Match = Backbone.Model.extend({

    defaults: {
        Aplayers: [],
        Bplayers: [],
        Apoints: 0,
        Bpoints: 0,
        timestamp: Date.now(0),
        unsaved: true
        //this is temporary to determine while parsing whether the record is new or not...won't be persisted!
    },

    initialize: function() {
        [this.attributes.Aplayers, this.attributes.Bplayers] = App.Players.next_teams();
    },

    validate: function() {
        if (this.get("Aplayers").length != this.get("Bplayers").length)
        return this.get("Aplayers").length + " Players vs. " + this.get("Bplayers").length + "? Thats not fair!";
    },

    parse: function(response) {

        //parse given colon-seperated string of ABpoints to integers
        var ABpoints = response.attributes.ABpoints.split(":");
        ABpoints = ABpoints.map(function(x) {
            return parseInt(x) || 0;
        });

        var Aplayerpoints = response.attributes.Apoints = ABpoints[0];
        var Bplayerpoints = response.attributes.Bpoints = ABpoints[1];

        //ABpoints was only temporary but doesnt need to be persisted
        delete response.attributes.ABpoints;

        //render difference to the saved state before
        if (response.has("unsaved")) {
            previousStats = [0, 0, 0, 0, 0, 0];
            delete response.attributes.unsaved;
            // the attribute unsaved has no more use so lets delete it
        } else
        previousStats = this.getStatsFromPoints(response._previousAttributes.Apoints, response._previousAttributes.Bpoints);

        newStats = this.getStatsFromPoints(Aplayerpoints, Bplayerpoints);

        var Astatsdiff = {};
        var Bstatsdiff = {};

        [Astatsdiff.wins, Astatsdiff.evens, Astatsdiff.loses,
        Bstatsdiff.wins, Bstatsdiff.evens, Bstatsdiff.loses] =
        _.map(newStats,
        function(newStat, i) {
            return newStat - previousStats[i];
        });

        //lets update each player's stats
        //A-Team! *höhö*
        _.each(response.get("Aplayers"),
        function(tokenObj) {
            var player = App.Players._byCid[ tokenObj["id"] ];
			player.addStats([Astatsdiff.wins, Astatsdiff.evens, Astatsdiff.loses]);
			player.attributes.lastplayed = response.get("timestamp");
        });

	    //B-Team!
        _.each(response.get("Bplayers"),
        function(tokenObj) {
            var player = App.Players._byCid[ tokenObj["id"] ];
			player.addStats([Bstatsdiff.wins, Bstatsdiff.evens, Bstatsdiff.loses]);
			player.attributes.lastplayed = response.get("timestamp");
        });

        return response;
    },

    //@returns [Awins, Aevens, Aloses, Bwins, Bevens, Bloses]
    getStatsFromPoints: function(Apoints, Bpoints) {
        if (Apoints > Bpoints)
        return [1, 0, 0, 0, 0, 1];
        // A won
        else if (Bpoints > Apoints)
        return [0, 0, 1, 1, 0, 0];
        // B won
        else
        return [0, 1, 0, 0, 1, 0];
        //even
    },

    validate: function(attrs) {
        if (attrs && attrs.ABpoints && attrs.ABpoints.split(":").length != 2)
        return "The match-points should have the format Apoints:Bpoints!"
    },

    ABpoints: function() {
        return this.get('Apoints') + ":" + this.get('Bpoints');
    }
});

window.Collection.Matches = Backbone.Collection.extend({
    model: Model.Match,
    localStorage: new Store("matches"),

    // order by average points per game *descending* (thats what the minus is for)
    comparator: function(match) {
        return - match.get("timestamp");
    }
});

window.App.Matches = new Collection.Matches;