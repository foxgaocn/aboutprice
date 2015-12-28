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

    var msg = Util.priceOk(product.history, product.price)
    var stars = [];
    for (var i = 0; i < msg.code; i++) {
      stars.push(<span className='star glyphicon glyphicon-star'></span>);
    }
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
            <span className='priceok'>Price: </span>
            <span className='price'>${product.price/100.0}</span>
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