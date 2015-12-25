var Popular = React.createClass({
  getInitialState: function() {
    return {};
  },

  setFilter: function(newObj){
    obj = {cid: this.props.location.query.cid, sid: this.props.location.query.sid}
    obj[newObj.key] = newObj.value
    this.props.history.pushState(null, '/search', {term: this.props.location.query.term, cid: obj.cid, sid: obj.sid})
  },

  search: function(props) {
    url = "api/products/top?category=" + props.location.query.category
    
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
    this.search(this.props);
  },
  
  render: function() {
    var content = (
        <ReactTransitionGroup component="div" transitionName="search-result" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <ProductResults history={this.props.history} products={this.state.products} />
        </ReactTransitionGroup>)

    return (
      <div>
        <Header history={this.props.history} defaultClass='title-small'/>
        <div id="search-content" className="container">
          {content}
        </div>
      </div>
    );
  }
});