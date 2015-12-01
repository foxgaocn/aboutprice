var ProductResults = React.createClass({

  priceOk: function(history, price){
    data = JSON.parse(history)
    keys = Object.keys(data)
    values = []
    keys.forEach(function(k){values.push(data[k])})
    values = _.uniq(values)
    switch(values.length){
      case 1:
        return {code: 3, message:'Price never changed. Your choice'}
      case 2:
        if(_.sortedIndex(values, price) === 0){
          highest = _.max(values)
          return {code: 4, message: "Down from $" + highest + ", price ok"}
        }
        lowest = _.min(values)
        return {code: 2, message: "Was $" + lowest + ", maybe wait"}
      case 3:
        index = _.sortedIndex(values, price)
        if(index === 0)
          return {code: 5, message: "Lowest ever, price ok"}
        else if(index == 1)
          return {code: 3, message: "Average price, up to you"}
        else{
          return {code: 2, message: "Price not ok, better wait"}
        }
        break;
      default:
        index = _.sortedIndex(values, price)
        if(index === 0)
          return {code: 5, message: "Lowest ever, price ok"}
        else if(index == 1)
          return {code: 4, message: "Not too bad, can go with it"}
        else if(index === values.length - 1)
          return {code: 1, message: "Price not ok, avoid"}
        else if(index == values.length - 2)
          return {code: 2, message: "You may find better price later"}
        else
          return {code: 3, message: "Average price, up to you"}
    }
  },
  
  genProduct: function(product){
    msg = this.priceOk(product.history, product.price)
    return(
      <div key={product.id} className="row product-item">
        <div className="col-md-3 product-image vcenter">
          <img className="img-responsive" src={product.img}/>
        </div>
        <div className="col-md-6 vcenter" >
          <h4>
            <a href={product.url} target="_blank">{product.name}</a>
          </h4>
          <div>
            <span className='price'>${product.price/100}</span> 
            <span className='source'>from: {product.shop}</span>
          </div>
        </div>
        <div className="col-md-3 vcenter">
           <p>{msg.code}</p>
           <p>{msg.message}</p>
           <p>{product.history}</p>
        </div>
      </div>)
  },

  render: function(){
    products = this.props.products
    if ( categories == null)
      return (<div/>)
    if ( categories.length == 0)
      return <div> Sorry, we cannot find anything match your query </div>
    
    items = []
    products.forEach(function(product){
      items.push(this.genProduct(product))
    }.bind(this))

    return(
      <div className="col-md-10">
        {items}
      </div>
    )
  }
})