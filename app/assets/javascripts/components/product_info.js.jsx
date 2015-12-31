var ProductInfo = React.createClass({
  genStar: function(count){
    var stars = []
    for(i=0; i<count; i++){
      stars.push(<i className='fa fa-star star' key={i}/>)
    }
    return stars;
  },

  render: function() {
    var product = this.props.product
    return (
      <div>
        <div>
          <span className='priceok'>Price: </span>
          <span className='price'>${product.price/100.0}</span>
        </div>
        <div>
          <span className='priceok'>From: </span>
          <span className='advice'>{product.shop}</span>
        </div>
        <div>
            <span className='priceok'>Price advice: </span>
            <span> {this.genStar(product.rating)} </span>
            <span className='advice'> ({Util.priceIndicator(product.rating)}) </span>
        </div>
      </div>
    );
  }
});




