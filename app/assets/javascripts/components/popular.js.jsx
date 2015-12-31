var Popular = React.createClass({
  getInitialState: function() {
    return {products: null}
  },

  search: function(category) {
    url = "api/products/top?category=" + category
    
    $.get(url, function(result) {
      if (this.isMounted()) {
        products = result.products
        this.setState({
          products: products
        })
      }
    }.bind(this));
  },

  componentDidMount: function() {
    this.search(this.props.category);
  },
  
  render: function() {
    var content = (
        <ReactTransitionGroup component="div" transitionName="search-result" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <ProductResults history={this.props.history} products={this.state.products} />
        </ReactTransitionGroup>)

    return (
      <div id="search-content" className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-2">
            {content}
          </div>
        </div>
      </div>
    );
  }
});