(function() {

	var WFM_SERVER = 'https://csbuild.grouponinc.net/zd-scripts/ticket-analyzer/wfm_test.php';


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