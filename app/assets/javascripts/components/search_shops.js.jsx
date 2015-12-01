var SearchShops = React.createClass({
  shopChanged: function(e)
  {
    newValue = parseInt(e.target.value)
    index = this.props.filter.indexOf(newValue)

    if(e.target.checked && index == -1){
      this.props.filter.push(newValue)
      this.props.onFilterChange({key: "shop_ids", value: this.props.filter})
    }
    else if(!e.target.checked && index > -1){
      this.props.filter.splice(index, 1)
      this.props.onFilterChange({key: "shop_ids", value: this.props.filter})
    }
  },

  genShop: function(shop){
    checked = this.props.filter.indexOf(shop.id) > -1
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