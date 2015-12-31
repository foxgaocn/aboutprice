var ProductInline = React.createClass({
  
  render: function(){
    product = this.props.product

    return(
    <div>
      <div className="row">
        <div className="col-md-3 product-image">
          <img src={product.img}/>
        </div>
        <div className="col-md-9">
          <div>
            <h3><a href={product.url} target="_blank">{product.name}</a></h3>
          </div>
          <div className="row">
            <div className="col-md-4 vcenter">
              <ProductInfo product={product}/>
            </div>
            <div className="col-md-8 vcenter">
              <Chart data={product.history}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row goto">
        <a href={product.url} target='blank'>
          <button type="button" className="btn btn-success">Go to shop</button>
        </a>
      </div>
    </div>)
  }
})