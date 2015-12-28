
var SearchFilter = React.createClass({
  getInitialState: function() {
    return {width: $(window).width(),
            filterContentClass: 'hidden',
            filterToggleClass: '',
            refinementsText: 'Expand Refinements'
          };
  },

  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
  },


  componentWillUnmount: function() {
    window.removeEventListener('resize', this.updateDimensions);
  },


  updateDimensions: function() {
    this.setState({width: $(window).width()});
  },

  toggleRefinements: function(){
    if(this.state.filterContentClass == 'hidden')
      this.setState({filterContentClass: 'show', refinementsText: 'Hide Refinements', filterToggleClass: 'shown'})
    else
      this.setState({filterContentClass: 'hidden', refinementsText: 'Expand Refinements', filterToggleClass:''})
  },

  smallFilter: function(filter){
    expand = <div/>
    hide = <div/>
    if(this.state.filterContentClass == 'hidden')
      expand = <div className='text-center'> <a href="#" id="refinementsToggle" onClick={this.toggleRefinements} className={this.state.filterToggleClass}><span>Show filter</span></a></div>
    else
      hide = <div className='text-center'> <a href="#" id="refinementsToggle" onClick={this.toggleRefinements} className={this.state.filterToggleClass}><span>Hide filter</span></a></div>
    
    return(
      <div className="filter-small">
        {expand}
        <div className={this.state.filterContentClass}>
          <SearchCategories history={this.props.history} categories={this.props.categories} filter={filter.category_id} onFilterChange={this.props.onFilterChange}/>
          <SearchShops history={this.props.history} shops={this.props.shops} filter={filter.shop_ids} onFilterChange={this.props.onFilterChange}/>
          <SearchRatings history={this.props.history} filter={filter.rating} onFilterChange={this.props.onFilterChange}/>
        </div>
        {hide}
      </div>
      )
  },

  bigFilter: function(filter){
    return(
      <div className="col-md-2 filter">
        <SearchCategories history={this.props.history} categories={this.props.categories} filter={filter.category_id} onFilterChange={this.props.onFilterChange}/>
        <SearchShops history={this.props.history} shops={this.props.shops} filter={filter.shop_ids} onFilterChange={this.props.onFilterChange}/>
        <SearchRatings history={this.props.history} filter={filter.rating} onFilterChange={this.props.onFilterChange} product_count={this.props.product_count}/>
      </div>
      )
  },

  render: function(){
    categories = this.props.categories
    shops = this.props.shops
    filter = this.props.filter
    if(filter == null)
      filter = {}

    // if ( (categories == null || categories.length == 1) && 
    //      (shops == null || shops.length == 1) )
    //   return (<div/>)
    if(this.state.width > 992)
      return this.bigFilter(filter)
    else
      return this.smallFilter(filter)
  }
})
          
