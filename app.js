(function() {

	var WFM_SERVER = 'https://wfmserver.herokuapp.com/api/v1/ping/';


	return {
		requests: {
			pingServer: function(data) {
				return {
					url: WFM_SERVER,
					type: 'POST',
					data: data
				};
			}
		},
		events: {
			'app.activated': function() {
				this.ping("start");
			},
			'app.deactivated': function() {
				this.ping("stop");
			},
			'app.willDestroy': function() {
				this.ping("destroy");
			},
			'ticket.save': function() {
				this.ping("save");
			}

		},
		ping: function(state) {
			var data = {
				"domain": this.currentAccount().subdomain(),
				"ticket_id": this.ticket().id(),
				"assignee_id": this.currentUser().id(),
				"state": state
			};

			this.ajax('pingServer', data);
		},

	};

}());