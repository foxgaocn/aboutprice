var Today = React.createClass({
  getInitialState: function() {
    return {
      top2: [],
      current_product: null
    };
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

  genCurrentProduct: function(product){
    return (<div className="product-inline">
              <div className="cross" onClick={this.closeCurrent}>X</div>
              <TopProduct product_id={product.id} closeInline={this.closeCurrent} />
            </div>)
  },

  componentDidMount: function(){
    $.get("api/products/top2", function(result) {
      if (this.isMounted()) {
        this.setState({
          top2: result
        })
      }
    }.bind(this))
  },

  down_sign: function(product, type){
    if(type == 'by_price')
    {
      return <div className='down'>{'$' + product.price_drop/100 + ' less'}</div>
    }
    return <div className='down'>{(product.price_drop_percent*100).toFixed(2) + '% less'}</div>
  },

  genProduct: function(product, type){
    if(this.state.current_product == product.id)
      return this.genCurrentProduct(product)

    down_sign = this.down_sign(product, type)
    return(
      <div className="top-product" data={product.id}>
        <div className="image">
          <img src={product.img}/>
          {down_sign}
        </div>
        <div className="info">
          <div className="main-title">
            <h4 className='link'>{product.name}</h4>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <span className='gray'>now:</span>
              <span className='price'>${product.price/100.0}</span>
            </div>
            <div className="col-sm-6">
              <span className='gray'>was:</span>
              <span className='price-was'>${product.price_was/100.0}</span>
            </div>
          </div>
          <div className="goto">
            <a href={product.url} target='blank'>
              <button type="button" className="btn btn-success">Go to shop</button>
            </a>
          </div>
        </div>
      </div>
      )
  },


  getCategory: function(category){
    return(
    <div className="col-md-4 col-sm-12">
      <div className="panel panel-info">
        <div className="panel-heading">{category.name}</div>
        <div className="panel-body top2">
          {this.genProduct(category.products_by_price, 'by_price')}
          {this.genProduct(category.products_by_percent, 'by_percent')}
        </div>
      </div>
    </div>)
  },

  render: function(){
    var categories = this.state.top2.map(this.getCategory)
    return (
      <div className="container">
        <div className="row">
          {categories}
        </div>
      </div>
      )
  }
})