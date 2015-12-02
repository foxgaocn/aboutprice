var Chart = React.createClass({
  componentDidMount: function() {
    data = JSON.parse(this.props.data)
    chartData = []
    Object.keys(data).forEach(function(k){
      chartData.push({x: Util.stringToHours(k), y: data[k]/100.0})
    });
    //assume chartData is sorted by date, otherwise sort it
    firstDay = chartData[0].x
    lastDay = chartData[chartData.length-1].x
    today = Util.todaytoHours()
    if(lastDay < today) {
      chartData.push({x: today, y: chartData[chartData.length-1].y})
      lastDay = today
    }

    new Chartist.Line('.ct-chart', {
      series: [
        { name: 'price',
          data: chartData
        }
      ]}, 
      {
        axisX: {
          type: Chartist.AutoScaleAxis,
          onlyInteger: true,
          scaleMinSpace: 60,
          low: firstDay,
          high: lastDay,
          labelInterpolationFnc: function(value) {
            return Util.hoursToDate(value).toLocaleDateString('en-AU')
          }
        },
        series:{
          'price':{
            lineSmooth: Chartist.Interpolation.step()
          }
        }
      }
    );
  },

  render: function() {
    return (
      <div className="ct-chart">
      </div>
    );
  }
});

