var SearchShops = React.createClass({

  genShop: function(shop){
    return(
      <div key={shop.id}> 
        <div>{shop.name} </div>
        <div> <span className='red'> {shop.count} </span> items </div>
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
        <div className="col-md-12">
          <h3> By Shop </h3>
        </div>
        {items}
      </div>
    )
  }
})