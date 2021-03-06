var ReactTransitionGroup = React.addons.CSSTransitionGroup

var Search = React.createClass({
  getInitialState: function() {
    return {products: null};
  },

  setFilter: function(newObj){
    query = this.props.location.query
    obj = {cid: query.cid, sid: query.sid, rating: query.rating, min: query.min, max: query.max}
    if(newObj.min != null && newObj.max != null){
      obj.min = newObj.min
      obj.max = newObj.max
    }
    else
      obj[newObj.key] = newObj.value
    this.props.history.pushState(null, '/search', {term: query.term, cid: obj.cid, sid: obj.sid, rating: obj.rating, min: obj.min, max: obj.max})
  },

  search: function(props, merge) {
    query = props.location.query
    url = "api/products/search?term=" + query.term
    cid = query.cid
    sid = query.sid
    rating = query.rating
    page = query.page
    min = query.min
    max = query.max
    if(cid != null)
      url += "&cid=" + cid
    if(sid != null)
      url += "&sid=" + sid
    if(rating != null)
      url += "&rating=" + rating
    if(page && page > 1)
      url += "&p=" + page
    if(min != null && max != null)
      url += "&min=" + min + "&max=" + max
    
    $.get(url, function(result) {
      if (this.isMounted()) {
        products = result.products
        if(merge) products = _.union(this.state.products, products)//when load next page
        this.setState({
          categories: result.categories,
          shops: result.shops,
          range: result.range,
          products: products
        })
      }
    }.bind(this));
  },

  getMore: function(){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
      sum = _.reduce(this.state.shops, function(memo, shop){ return memo + shop.count; }, 0);
      if(this.props.location.query.page == null){
        if(sum <= 20) return;
        else{
          this.props.location.query.page = 2
          this.search(this.props, true)
        }
      }else{
        if(this.page * 20 >= sum)
          return;
        else{
          this.props.location.query.page++
          this.search(this.props, true)
        }
      } 
    }
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    query = this.props.location.query
    nextQuery = nextProps.location.query
    termChanged = query.term != nextQuery.term
    cidChanged = query.cid != nextQuery.cid
    sidChanged = query.sid != nextQuery.sid
    ratingChanged = query.rating != nextQuery.rating
    rangeChanged = query.min != nextQuery.min || query.max != nextQuery.max
    if(termChanged || cidChanged || sidChanged || ratingChanged || rangeChanged)
      this.search(nextProps);
  },

  componentDidMount: function() {
    this.search(this.props);
    var throttled = _.throttle(this.getMore, 100);
    $(window).scroll(throttled);
  },

  getContent: function(){
    if(this.props.location.query.category != null)
      return <Popular category={this.props.location.query.category} />

    if(this.props.location.query.term == null || this.props.location.query.term.length == 0)
      return <Today />
    
    query = this.props.location.query
    filter = {category_id: query.cid, shop_ids: query.sid, rating: query.rating, min: query.min, max: query.max}
    product_count = this.state.products == null ? 0 : this.state.products.length
    return  (
        <div id="search-content" className="container">
          <ReactTransitionGroup component="div" transitionName="search-result" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div className="row">
              <SearchFilter history={this.props.history} categories={this.state.categories} range={this.state.range} shops={this.state.shops} filter={filter} product_count={product_count} onFilterChange={this.setFilter}/>
              <ProductResults history={this.props.history} products={this.state.products} />
            </div>
          </ReactTransitionGroup>
        </div>)
  },
  
  render: function() {
    var content = this.getContent()
    var headerClass='header-small'
    var query = this.props.location.query
    if(query.category== null && (query.term == null || query.term.length == 0))
      headerClass = 'header-big'
    return (
      <div>
        <Header history={this.props.history} term={this.props.location.query.term} defaultClass={headerClass}/>
        {content}
      </div>
    );
  }
});