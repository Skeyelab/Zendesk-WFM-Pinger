(function() {

	return {
		requests: {
			pingServer: function(data) {
				return {
					url: this.setting('wfm_server'),
					type: 'POST',
					data: data
				};
			}
		},
		events: {
			'app.activated': 'startWork',
			'app.willDestroy': 'stopWork'

		},
		startWork: function() {
			var data = {
				"domain": this.currentAccount().subdomain(),
				"ticket_id": this.ticket().id(),
				"assignee_id": this.currentUser().id(),
				"state": "start"
			};

			this.ajax('pingServer', data);
		},
		stopWork: function() {
			var data = {
				"domain": this.currentAccount().subdomain(),
				"ticket_id": this.ticket().id(),
				"assignee_id": this.currentUser().id(),
				"state": "stop"
			};

			this.ajax('pingServer', data);
		}

	};

}());