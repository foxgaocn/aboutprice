var Chart = React.createClass({
  componentDidMount: function() {
    data = JSON.parse(this.props.data)
    chartData = []
    Object.keys(data).forEach(function(k){
      chartData.push({x: Util.stringToHours(k), y: data[k]/100.0})
    });

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

