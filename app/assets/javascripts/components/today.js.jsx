var Today = React.createClass({
  getInitialState: function() {
    return {
      top2: [],
      current_product_str: ''
    };
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

  showProduct: function(e){
    this.setState({current_product_str: e.currentTarget.attributes["data-product"].value})
    $('#myModal').modal()  
  },


  down_sign: function(product, type){
    if(type == 'by_price')
    {
      return <div className='down'>{'$' + product.price_drop/100 + ' off'}</div>
    }
    return <div className='down'>{(product.price_drop_percent*100).toFixed(2) + '% off'}</div>
  },

  genProduct: function(product, type){
    if(product == null)
      return <div />

    down_sign = this.down_sign(product, type)
    msg = Util.priceOk(product.history, product.price)
    var stars = [];
    for (var i = 0; i < msg.code; i++) {
      stars.push(<span className='star glyphicon glyphicon-star'></span>);
    }

    return(
      <div className="top-product" data={product.id} data-product={JSON.stringify(product)} onClick={this.showProduct}>
        <div className="image">
          <img src={product.img}/>
          {down_sign}
        </div>
        <div className="info">
          <div className="main-title">
            <h4 className='link'>{product.name}</h4>
          </div>
          <div>
            <span className='priceok'>Price: </span>
            <span className='price'>${product.price/100.0}</span>
            <span className='gray'>&nbsp; (was:</span>
            <span className='price-was'>${product.price_was/100.0}</span>
             <span className='gray'>)</span>
          </div>
          <div>
            <div>
              <span className='priceok'>Rating: </span>
              {stars}
            </div>
            <div> 
              <span className='priceok'>Advice: </span> 
              <span className='advice'> {msg.message} </span>
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
      <div className="panel panel-default top-category">
        <div className="panel-heading cat-heading">
          <span>{category.name}</span>
          <span className="pull-right more">More</span>
        </div>
        <div className="panel-body">
          {this.genProduct(category.products_by_price, 'by_price')}
          {this.genProduct(category.products_by_percent, 'by_percent')}
        </div>
      </div>
    </div>)
  },

  render: function(){
    var categories = this.state.top2.map(this.getCategory)
    return (
      <div>
        <div id="toptitle">
          <span>Top advice today</span>
        </div>
        <div className="container">
          <div className="row">
            {categories}
          </div>
        </div>
        <ProductModal product_str={this.state.current_product_str}/>
      </div>
      )
  }
})