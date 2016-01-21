var SearchPriceRange = React.createClass({
  componentWillUpdate: function(nextProps, nextState){
    if(nextProps.range == null || nextProps.range == this.props.range)
      return

    var slider =  this.refs.slider;
    if(slider.noUiSlider != null)
      slider.noUiSlider.destroy()

    var range =nextProps.range
    var min = Number(range.match(/(\d+)\.\.(\d+)/)[1])
    var max = Number(range.match(/(\d+)\.\.(\d+)/)[2])

    if(min == max)
      return

    var currentMin = this.props.min == null ? min : this.props.min
    var currentMax = this.props.max == null ? max : this.props.max


    noUiSlider.create(slider, {
      start: [currentMin, currentMax],
      connect: true,
      step: 1,
      range: {
        'min': min,
        'max': max
      }
    });

    this.refs.min.innerHTML = min;
    this.refs.max.innerHTML = max;

    var snapValues = [
      this.refs.min,
      this.refs.max
    ];

    slider.noUiSlider.on('update', function( values, handle ) {
      snapValues[handle].innerHTML = '$' + Math.floor(values[handle]);
    });

    slider.noUiSlider.on('change', function( values, handle ) {
      this.props.onFilterChange({min: Math.floor(values[0]), max: Math.floor(values[1])})
    }.bind(this));
  },

  render: function(){
    var showStyle = ""
    if(this.props.range == null)
      showStyle == "hidden"
    else{
      range = this.props.range
      var min = Number(range.match(/(\d+)\.\.(\d+)/)[1])
      var max = Number(range.match(/(\d+)\.\.(\d+)/)[2])
      if(min == max)
        showStyle = "hidden"
    }  
    
    return (
      <div className={"row " + showStyle}>
        <h4>Price range</h4>
        <div className="row">
          <div className='col-xs-10' id="slider" ref='slider'/>
        </div>
        <div className="row slider-indicator">
          <div className='col-xs-6 pull-left' ref='min'/> 
          <div className='col-xs-6 pull-right' ref='max'/> 
        </div>
      </div>
    )
  }
})