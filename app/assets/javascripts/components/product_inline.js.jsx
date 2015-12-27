var ProductInline = React.createClass({
  render: function(){
    product = this.props.product

    msg = Util.priceOk(product.history, product.price)
    var stars = [];
    for (var i = 0; i < msg.code; i++) {
      stars.push(<span className='star glyphicon glyphicon-star'></span>);
    }
    return(
      <div className="row">
        <div className="col-md-4 main-image">
          <img src={product.img}/>
        </div>
        <div className="col-md-8">
          <div>
            <h3><a href='#' onClick={this.props.closeInline}>{product.name}</a></h3>
          </div>
          <div>
            <span className='price'>${product.price/100}</span>
            <span className='source'>from: {product.shop}</span>
          </div>
          <div className="row">
            <div className="col-md-4 vcenter">
              <div>
                <span className='priceok'>Rating: </span>
                {stars}
              </div>
              <div> 
                <span className='priceok'>Advice: </span> 
                <span className='advice'> {msg.message} </span>
              </div>
            </div>
            <div className="col-md-8 vcenter">
              <Chart data={product.history}/>
            </div>
          </div>
          <div className="goto">
            <a href={product.url} target='blank'>
              <button type="button" className="btn btn-success">Go to shop</button>
            </a>
          </div>
        </div>
      </div>)
  }
})