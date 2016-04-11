(function(){
  App = {
    current: undefined,
    history: [],
    onStartDrill: function() {
      console.log('!!!!!!starting drill...');
      this.startDrill({
        name: $('select.new_type').val(),
        goal: parseInt($('input.new_makes').val()),
        makes: 0,
        attempts: 0,
        makeRate: function() {
          return this.makes / this.attempts;
        },
        startTime: new Date().getTime(),
        render: function() {
          return $('<tr class="drill"/>').
            append($('<td class="drill-name"/>').html(this.name)).
            append($('<td class="drill-goal"/>').html(this.goal)).
            append($('<td class="drill-stats"/>').html("" + this.makes + " / " + this.attempts + " = " + this.makeRate())).
            append($('<td class="drill-time"/>').html(this.startTime));
        }
      });
    },
    startDrill: function(drill) {
      this.current && this.history.push(this.current);
      this.current = drill;

      this.render();
    },
    renderHistory: function(drills) {
      console.log('renderHistory...');
      return drills.map(function(drill) {
          return drill.render();
        }.bind(this));
    },
    /**
     */
    render: function() {
      this.current && $('.current').html(this.current.render());
      $('.history-body').html(this.renderHistory(this.history));
    }
  }
  App.render();
})();
