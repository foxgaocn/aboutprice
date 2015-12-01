var Search = React.createClass({

  getInitialState: function() {
    return {};
  },

  setFilter: function(newObj){
    obj = {cid: this.props.location.query.cid, sid: this.props.location.query.sid}
    obj[newObj.key] = newObj.value
    this.props.history.pushState(null, '/search', {term: this.props.location.query.term, cid: obj.cid, sid: obj.sid})
  },

  search: function(props, merge) {
    url = "api/products/search?term=" + props.location.query.term
    cid = props.location.query.cid
    sid = props.location.query.sid
    page = props.location.query.page
    if(cid != null)
      url += "&cid=" + cid
    if(sid != null)
      url += "&sid=" + sid
    if(page && page > 1){
      url += "&p=" + page
    }
    
    $.get(url, function(result) {
      if (this.isMounted()) {
        products = result.products
        if(merge) products = _.union(this.state.products, products)//when load next page
        this.setState({
          categories: result.categories,
          shops: result.shops,
          products: products
        });
      }
    }.bind(this));
  },

  getMore: function(){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
      sum = _.reduce(this.state.shops, function(memo, shop){ return memo + shop.count; }, 0);
      if(this.props.location.query.page == null){
        if(sum <= 20) $(window).unbind('scroll');
        else{
          this.props.location.query.page = 2
          this.search(this.props, true)
        }
      }else{
        if(this.page * 20 >= sum)
          $(window).unbind('scroll');
        else{
          this.props.location.query.page++
          this.search(this.props, true)
        }
      } 
    }
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
    var throttled = _.throttle(this.getMore, 100);
    $(window).scroll(throttled);
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