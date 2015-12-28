var SearchShops = React.createClass({
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

  shopChanged: function(e)
  {
    newValue = e.target.value
    index = this.filter.indexOf(newValue)

    if(e.target.checked && index == -1){
      this.filter.push(newValue)
      this.props.onFilterChange({key: "sid", value: this.filter.join(",")})
    }
    else if(!e.target.checked && index > -1){
      this.filter.splice(index, 1)
      this.props.onFilterChange({key: "sid", value: this.filter.join(",")})
    }
  },

  genShop: function(shop){
    checked = this.filter.indexOf(shop.id.toString()) > -1
    return(
      <div key={shop.id} className="row">
        <label className="filter-label">
          <input type="checkbox" value={shop.id} name='shop' onChange={this.shopChanged} checked={checked}/>
          {shop.name}
        </label>
      </div>)
  },

  render: function(){
    if(this.filter == null)
      return null
    
    shops = this.props.shops
    if ( shops == null || shops.length == 0)
      return (<div/>)
    
    items = []
    shops.forEach(function(shop){
      items.push(this.genShop(shop))
    }.bind(this))

    return(
      <div className="row">
        <h4>Seller</h4>
        {items} 
      </div>
    )
  }
})