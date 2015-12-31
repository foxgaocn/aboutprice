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


  genStar: function(count){
    var stars = []
    for(i=0; i<count; i++){
      stars.push(<i className='fa fa-star star' key={i}/>)
    }
    return stars;
  },

  genProduct: function(product, type){
    if(product == null)
      return null

    return(
      <div className="top-product" data={product.id} data-product={JSON.stringify(product)} onClick={this.showProduct}>
        <div className="image">
          <img src={product.img}/>
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
              <span className='priceok'>Price advice: </span>
              <span> {this.genStar(product.rating)} </span>
              <span className='advice'> ({Util.priceIndicator(product.rating)}) </span>
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
          <span className="pull-right"><Link to={'/popular?category=' + category.id} className="more">More</Link></span>
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