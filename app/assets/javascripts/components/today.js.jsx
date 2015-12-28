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
    if(e.target.nodeName == "BUTTON")
      return; //do not show modal if the go to button is clicked
    this.setState({current_product_str: e.currentTarget.attributes["data-product"].value})
    $('#myModal').modal()  
  },


  down_sign: function(product, type){
    if(type == 'by_price')
    {
      return <div className='down'><span>{'$' + product.price_drop/100 + ' off'}</span></div>
    }
    return <div className='down'><span>{(product.price_drop_percent*100).toFixed(2) + '% off'}</span></div>
  },

  genProduct: function(product, type){
    if(product == null)
      return null

    down_sign = this.down_sign(product, type)
    msg = Util.priceOk(product.history, product.price)
    var stars = [];
    for (var i = 0; i < msg.code; i++) {
      stars.push(<span className='star glyphicon glyphicon-star' key={i}></span>);
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
              <span className='priceok'>From: </span>
              <span className='advice'> {product.shop} </span>
            </div>
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


  genCategory: function(category, type){
    var product;
    if(type == 'by_price') 
      product = this.genProduct(category.products_by_price, type)
    else
      product = this.genProduct(category.products_by_percent, type)
    
    if(product == null)
      return null

    return(
    <div className="col-md-4 col-sm-12" key={category.id + type}>
      <div className="panel panel-default top-category">
        <div className="panel-heading cat-heading">
          <span>{category.name}</span>
          <span className="pull-right more"><Link to={'/popular?category=' + category.id}>More</Link></span>
        </div>
        <div className="panel-body">
          {product}
        </div>
      </div>
    </div>)
  },

  render: function(){
    var categories = [];
    this.state.top2.forEach( category => { categories.push(this.genCategory(category, 'by_price')); categories.push(this.genCategory(category, 'by_percent'));  } )
    return (
        <div className="container today">
          <div className="row">
            {categories}
          </div>
          <ProductModal product_str={this.state.current_product_str}/>
        </div>
      )
  }
})