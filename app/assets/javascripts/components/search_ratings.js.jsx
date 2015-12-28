var SearchRatings = React.createClass({
  componentDidMount: function() {
    if(this.props.filter == null)
      this.filter = []
    else
      this.filter = this.props.filter.split(",")
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    if(nextProps.filter == null)
      this.filter = []
    else
      this.filter = nextProps.filter.split(",")
  },

  ratingChanged: function(e)
  {
    newValue = e.target.value
    index = this.filter.indexOf(newValue)

    if(e.target.checked && index == -1){
      this.filter.push(newValue)
      this.props.onFilterChange({key: "rating", value: this.filter.join(",")})
    }
    else if(!e.target.checked && index > -1){
      this.filter.splice(index, 1)
      this.props.onFilterChange({key: "rating", value: this.filter.join(",")})
    }
  },

  genRating: function(rating){
    checked = this.filter.indexOf(rating.toString()) > -1
    var stars = [];
    for (var i = 0; i < rating; i++) {
      stars.push(<span className='star glyphicon glyphicon-star' key={i}></span>);
    }
    return(
      <div key={i} className="row">
        <label className="filter-label">
          <input type="checkbox" value={i} name='rating' onChange={this.ratingChanged} checked={checked}/>
          {stars}
        </label>
      </div>)
  },

  render: function(){
    if(this.filter == null)
      return null

    if(this.props.product_count == 0 && this.props.filter == null)
      return <div />
    items = [];
    [5,4,3,2,1].forEach(function(i){
      items.push(this.genRating(i))
    }.bind(this))

    return(
      <div className="row">
        <h4>Rating</h4>
        {items} 
      </div>
    )
  }
})