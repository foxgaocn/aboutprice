
var SearchFilter = React.createClass({
  render: function(){
    categories = this.props.categories
    shops = this.props.shops

    if ( (categories == null || categories.length == 1) && 
         (shops == null || shops.length == 1) )
      return (<div/>)
    
    return(
      <div className="col-md-3 filter">
        <SearchCategories history={this.props.history} categories={this.props.categories}/>
        <SearchShops history={this.props.history} shops={this.props.shops} />
      </div>
    )
  }
})
          
