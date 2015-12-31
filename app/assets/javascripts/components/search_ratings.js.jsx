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
    
    return(
      <div key={rating} className="row">
        <label className="filter-label">
          <input type="checkbox" value={rating} name='rating' onChange={this.ratingChanged} checked={checked}/>
          {<span>{Util.priceIndicatorShort(rating)}</span>}
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
        <h4>Price track</h4>
        {items} 
      </div>
    )
  }
})