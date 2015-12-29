var ProductInline = React.createClass({
  render: function(){
    product = this.props.product

    return(
      <div className="row">
        <div className="col-md-3 product-image">
          <img src={product.img}/>
        </div>
        <div className="col-md-9">
          <div>
            <h3><a href={product.url} target="_blank">{product.name}</a></h3>
          </div>
          <div>
            <span className='price'>${product.price/100}</span>
          </div>
          <div className="row">
            <div className="col-md-4 vcenter">
              <div> 
                <span className='priceok'>From: </span> 
                <span className='advice'> {product.shop} </span>
              </div>
              <div>
                <span className='priceok'>Price: </span>
                <span className='advice'> {Util.priceIndicator(product.rating)} </span>
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