var ProductResults = React.createClass({

  getInitialState: function() {
    return {current_product: null};
  },
  
  genProduct: function(product){
    if(this.state.current_product == product.id)
      return this.genCurrentProduct(product)
    return this.genNormalProduct(product)
  },

  genCurrentProduct: function(product){
    return (<div className="product-inline">
              <div className="cross" onClick={this.closeCurrent}>X</div>
              <Product product={product}/>
            </div>)
  },

  genNormalProduct: function(product){
    msg = Util.priceOk(product.history, product.price)
    var stars = [];
    for (var i = 0; i < msg.code; i++) {
      stars.push(<span className='star'>☆</span>);
    }
    return(
      <div key={product.id} className="row product-item">
        <div className="col-md-3 product-image vcenter" onClick={this.setCurrent} data={product.id}>
          <img className="img-responsive" src={product.img}/>
        </div>
        <div className="col-md-6 vcenter">
          <h4 className='link' onClick={this.setCurrent} data={product.id}>
            {product.name}
          </h4>
          <div>
            <span className='price'>${product.price/100}</span> 
            <span className='source'>from: {product.shop}</span>
          </div>
        </div>
        <div className="col-md-3 vcenter">
          <div>
            <span className='priceok'>Price OK?</span>
            {stars}
          </div>
          <div className="link" onClick={this.setCurrent} data={product.id}>  
            {msg.message}
          </div>
        </div>
      </div>)
  },

  setCurrent: function(e){
    this.setState({
      current_product: parseInt(e.target.attributes["data"].value)
    })
  },

  closeCurrent: function(e){
    this.setState({
      current_product: null
    })
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
      <div className="col-md-10">
        {items}
      </div>
    )
  }
})