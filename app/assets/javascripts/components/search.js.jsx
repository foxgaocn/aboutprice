var Search = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  search: function(props) {
    url = "api/products/search?term=" + props.location.query.term
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
          <SearchFilter history={this.props.history} categories={this.state.categories} shops={this.state.shops}/>
          <ProductResults history={this.props.history} products={this.state.products} />
        </div>
      </div>
    );
  }
});