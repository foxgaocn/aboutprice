var ProductResults = React.createClass({

  getInitialState: function() {
    return {width: $(window).width(),
            current_product: null};
  },

  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
  },

  
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.updateDimensions);
  },


  updateDimensions: function() {
    this.setState({width: $(window).width()});
  },
  
  genProduct: function(product){
    if(this.state.current_product == product.id)
      return this.genCurrentProduct(product)
    return this.genNormalProduct(product)
  },

  genCurrentProduct: function(product){
    return (<div className="product-inline product row" key={product.id}>
              <div className="col-xs-12">
                <div className="cross" onClick={this.closeCurrent}>X</div>
                <ProductInline product={product} closeInline={this.closeCurrent}/>
              </div>
            </div>)
  },

  genNormalProduct: function(product){
    msg = Util.priceOk(product.history, product.price)
    var stars = [];
    for (var i = 0; i < msg.code; i++) {
      stars.push(<span className='star glyphicon glyphicon-star' key={i}></span>);
    }
    return(
      <div key={product.id} data={product.id} className="row product-item product" onClick={this.setCurrent}>
        <div className="col-md-3">
          <div className="product-image">
            <img src={product.img}/>
          </div>
        </div>
        <div className="col-md-6 product-info">
          <h4 className='link'>
            {product.name}
          </h4>
          <div>
            <span className='price'>${product.price/100}</span> 
            <span className='source'>from: {product.shop}</span>
          </div>
        </div>
        <div className="col-md-3 product-price">
          <div>
            <span className='priceok'> Rating: </span>
            {stars}
          </div>
          <div> 
            <span className='priceok'>Advice: </span> 
            <span className='advice'> {msg.message} </span>
          </div>
        </div>
      </div>)
  },

  setCurrent: function(e){
    this.setState({
      current_product: parseInt(e.currentTarget.attributes["data"].value)
    })
  },

  closeCurrent: function(){
    this.setState({
      current_product: null
    })
  },

  render: function(){
    products = this.props.products
    if ( products == null)
      return (<div/>)
    if ( products.length == 0)
      return <div className='no-result'> Oops! No results were found </div>
    
    items = []
    products.forEach(function(product){
      items.push(this.genProduct(product))
    }.bind(this))

    var contentClass = "container"
    if(this.state.width > 992)
      contentClass = "col-md-10"
    return(
      <div className={contentClass}>
        {items}
      </div>
    )
  }
})