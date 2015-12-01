var Search = React.createClass({

  getInitialState: function() {
    return {};
  },

  setFilter: function(newObj){
    obj = {cid: this.props.location.query.cid, sid: this.props.location.query.sid}
    obj[newObj.key] = newObj.value
    this.props.history.pushState(null, '/search', {term: this.props.location.query.term, cid: obj.cid, sid: obj.sid})
  },

  search: function(props) {
    url = "api/products/search?term=" + props.location.query.term
    cid = props.location.query.cid
    sid = props.location.query.sid
    if(cid != null)
      url += "&cid=" + cid
    if(sid != null)
      url += "&sid=" + sid
    
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
    termChanged = this.props.location.query.term != nextProps.location.query.term
    cidChanged = this.props.location.query.cid != nextProps.location.query.cid
    sidChanged = this.props.location.query.sid != nextProps.location.query.sid
    if(termChanged || cidChanged || sidChanged)
      this.search(nextProps);
  },

  componentDidMount: function() {
    this.search(this.props);
  },
  
  render: function() {
    filter = {category_id: this.props.location.query.cid, shop_ids: this.props.location.query.sid}
    return (
      <div>
        <SearchBar history={this.props.history} term={this.props.location.query.term}/>
        <div className="row">
          <SearchFilter history={this.props.history} categories={this.state.categories} shops={this.state.shops} filter={filter} onFilterChange={this.setFilter}/>
          <ProductResults history={this.props.history} products={this.state.products} />
        </div>
      </div>
    );
  }
});