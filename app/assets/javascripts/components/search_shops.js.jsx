var SearchShops = React.createClass({
  getInitialState: function() {
    if(this.props.filter == null)
      this.filter = []
    else
      this.filter = this.props.filter.split(",")
    return {};
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
          <input type="checkbox" value={shop.id} name='shop' onChange={this.shopChanged} checked={checked}>{shop.name}</input>
        </label>
      </div>)
  },

  render: function(){
    shops = this.props.shops
    if ( shops == null || shops.length == 1)
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