(function(){
  App = {
    current: undefined,
    history: [],
    newDrill: function() {
      return {
        name: $('select.new_type').val(),
        goal: parseInt($('input.new_makes').val()),
        index: this.history.length,
        makes: 0,
        attempts: 0,
        makeRate: function() {
          return this.makes / this.attempts;
        },
        renderRate: function() {
          return (this.attempts > 0 ? parseInt(this.makeRate() * 1000)/10.0 + "%" : "?");
        },
        startTime: new Date().getTime(),
        endTime: undefined,
        time: function() {
          return this.endTime || (new Date().getTime() - this.startTime);
        },
        stats: function() {
          return "" + this.makes + " / " + this.attempts + " = " + this.renderRate();
        },
        onMake: function() {
          this.makes += 1;
          this.attempts += 1;
        },
        onMiss: function() {
          this.attempts += 1;
        },
        onFinish: function() {
          this.endTime = this.time();
        },
        isGoalReached: function() {
          return this.makes >= this.goal;
        },
        renderPanel: function() {
          var panel = $('#drill-panel-tmpl').clone();
          panel.find('.drill-name').text(this.name);
          panel.find('.drill-goal').text(this.goal);
          panel.find('.drill-stats').text(this.stats());
          panel.find('.drill-time').text(this.time());
          if (this.isGoalReached()) {
            panel.find('.btn-retry').show();
          } else {
            panel.find('.btn-retry').hide();
          }
          panel.show();
          return panel;
        },
        renderTr: function() {
          return $('<tr class="drill"/>').
            append($('<td class="drill-name"/>').text(this.name)).
              append($('<td class="drill-goal"/>').text(this.goal)).
                append($('<td class="drill-stats"/>').text(this.stats())).
                  append($('<td class="drill-time"/>').text(this.time()));
        }
      };
    },
    onStartDrill: function() {
      this.startDrill(this.newDrill());
    },
    onMake: function() {
      this.current && this.current.onMake();
      this.render();
    },
    onMiss: function() {
      this.current && this.current.onMiss();
      this.render();
    },
    startDrill: function(drill) {
      if (this.current) {
        this.current.onFinish();
        this.history.unshift(this.current);
      }
      this.current = drill;
      this.render();
    },
    renderHistory: function(drills) {
      return drills.map(function(drill) {
          return drill.renderTr();
        }.bind(this));
    },
    render: function() {
      this.current && $('.current').html(this.current.renderPanel());
      $('.history-body').html(this.renderHistory(this.history));
    }
  }
  App.render();
})();
