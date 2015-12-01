var Search = React.createClass({

  getInitialState: function() {
    return {
      filter:{
        category_id: null,
        shop_ids: []
      }
    };
  },

  setFilter: function(newObj){
    filter = this.state.filter
    filter[newObj.key] = newObj.value
    this.setState({filter: filter})
    this.search(this.props)
  },

  search: function(props) {
    url = "api/products/search?term=" + props.location.query.term
    if(this.state.filter.category_id != null)
      url += "&cid=" + this.state.filter.category_id
    if(this.state.filter.shop_ids.length > 0)
      url += "&sid=" + this.state.filter.shop_ids.join(",")
    
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({
          categories: result.categories,
          shops: result.shops,
          products: result.products
        });
      }
    }.bind(this));
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    if(this.props.location.query.term != nextProps.location.query.term)
      this.search(nextProps);
  },

  componentDidMount: function() {
    this.search(this.props);
  },
  
  render: function() {
    return (
      <div>
        <SearchBar history={this.props.history}/>
        <div className="row">
          <SearchFilter history={this.props.history} categories={this.state.categories} shops={this.state.shops} filter={this.state.filter} onFilterChange={this.setFilter}/>
          <ProductResults history={this.props.history} products={this.state.products} />
        </div>
      </div>
    );
  }
});