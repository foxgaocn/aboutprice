var TopProduct = React.createClass({
  getInitialState: function() {
    return {
      product: null
    };
  },

  componentDidMount: function(){
    $.get("api/products/"+this.props.product_id, function(result) {
      if (this.isMounted()) {
        this.setState({
          product: result
        })
      }
    }.bind(this))
  },

  render: function(){
    product = this.state.product
    if(product == null)
      return <div />

    msg = Util.priceOk(product.history, product.price)
    var stars = [];
    for (var i = 0; i < msg.code; i++) {
      stars.push(<span className='star'>☆</span>);
    }
    return(
      <div>
        <div className="row" onClick={this.props.closeInline}>
          <div className="col-md-4 main-image">
            <img src={product.img}/>
          </div>
          <div className="col-md-8">
            <div>
              <h3><a href='#'>{product.name}</a></h3>
            </div>
            <div>
              <span className='gray'>from: {product.shop}</span>
            </div>
            <div className="row">
              <div className="col-md-4 vcenter">
                <div className='price'>${product.price/100}</div>
                <div><span className='priceok'>Price rating:</span>{stars}</div>
                <div>{msg.message}</div>
              </div>
              <div className="col-md-8 vcenter">
                <Chart data={product.history}/>
              </div>
            </div>
            <div>
              <a href={product.url} target='blank'>
                <button type="button" className="btn btn-success">Go to shop</button>
              </a>
            </div>
          </div>
        </div>
      </div>)
  }
})