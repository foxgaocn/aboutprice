
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
    return(
      <div className="filter">
        <div>
          <a href="#" id="refinementsToggle" onClick={this.toggleRefinements} className={this.state.filterToggleClass}><span>{this.state.refinementsText}</span></a>
        </div>
        <div className={this.state.filterContentClass + " col-md-2 filter"}>
          <SearchCategories history={this.props.history} categories={this.props.categories} filter={filter.category_id} onFilterChange={this.props.onFilterChange}/>
          <SearchShops history={this.props.history} shops={this.props.shops} filter={filter.shop_ids} onFilterChange={this.props.onFilterChange}/>
        </div>
      </div>
      )
  },

  bigFilter: function(filter){
    return(
      <div className="col-md-2 filter">
        <SearchCategories history={this.props.history} categories={this.props.categories} filter={filter.category_id} onFilterChange={this.props.onFilterChange}/>
        <SearchShops history={this.props.history} shops={this.props.shops} filter={filter.shop_ids} onFilterChange={this.props.onFilterChange}/>
      </div>
      )
  },

  render: function(){
    categories = this.props.categories
    shops = this.props.shops
    filter = this.props.filter
    if(filter == null)
      filter = {}

    if ( (categories == null || categories.length == 1) && 
         (shops == null || shops.length == 1) )
      return (<div/>)
    if(this.state.width > 992)
      return this.bigFilter(filter)
    else
      return this.smallFilter(filter)
  }
})
          
