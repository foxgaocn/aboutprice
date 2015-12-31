var ProductModal = React.createClass({
  getInitialState: function() {
    return {
      shown: false
    };
  },

  componentDidMount: function(){
    $('#myModal').on('shown.bs.modal', function (e) {
      this.setState({shown: true})
    }.bind(this))
  },

  gen_product: function(){
    if( this.props.product_str == '' || !this.state.shown)
      return <div />

    var product = JSON.parse(this.props.product_str)

    return(
      <div className="top-product">
        <div className="image-auto-height">
          <img src={product.img}/>
        </div>
        <div className="info">
          <div className="main-title">
            <h4 className='link'>{product.name}</h4>
          </div>
          <div>
            <ProductInfo product={product}/>
          </div>
          <div>
            <Chart data={product.history}/>
          </div>
          <div className="text-center">
            <a href={product.url} target='blank'>
              <button type="button" className="btn btn-success">Go to shop</button>
            </a>
          </div>
        </div>
      </div>)
  },

  render: function() {
    return (
      <div className="modal fade" tabIndex="-1" id="myModal" role="dialog">
        <div className="modal-dialog product-modal">
          <div className="modal-content">
            <div className="modal-body">
              {this.gen_product()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});