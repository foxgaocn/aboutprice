var ProductResults = React.createClass({

  genProduct: function(product){
    return(
      <div key={product.id} className="row">
        <div className="col-md-3">
          <img src={product.img}/>
        </div>
        <div className="col-md-7">
          <a href={product.url} target="_blank">{product.name}</a>
        </div>
        <div className="col-md-3">
          ${product.price/100}
        </div>
      </div>)
  },

  render: function(){
    products = this.props.products
    if ( categories == null)
      return (<div/>)
    if ( categories.length == 0)
      return <div> Sorry, we cannot find anything match your query </div>
    
    items = []
    products.forEach(function(product){
      items.push(this.genProduct(product))
    }.bind(this))

    return(
      <div className="col-md-9">
        {items}
      </div>
    )
  }
})