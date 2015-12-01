
var SearchFilter = React.createClass({
  render: function(){
    categories = this.props.categories
    shops = this.props.shops

    if ( (categories == null || categories.length == 1) && 
         (shops == null || shops.length == 1) )
      return (<div/>)
    
    return(
      <div className="col-md-2 filter">
        <SearchCategories history={this.props.history} categories={this.props.categories} filter={this.props.filter.category_id} onFilterChange={this.props.onFilterChange}/>
        <SearchShops history={this.props.history} shops={this.props.shops} filter={this.props.filter.shop_ids} onFilterChange={this.props.onFilterChange}/>
      </div>
    )
  }
})
          
