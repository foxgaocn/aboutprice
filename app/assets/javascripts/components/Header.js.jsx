var Link = window.ReactRouter.Link;
var Router = window.ReactRouter.Router;

var Header = React.createClass({
  getInitialState: function() {
    return {
      titleClass: this.props.defaultClass,
      headerHeight: this.props.defaultClass=="header-big"? 235 : 100};
  },
  handleScroll: function(e) {
    var scroll = document.body.scrollTop
    var titleClass = 'header-big'
    if(scroll > 10){
      titleClass = 'header-small'
    }
    var newHeight = 235 - document.body.scrollTop
    if(newHeight < 100)
      newHeight = 100
    this.setState({headerHeight: newHeight, titleClass: titleClass});
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    if(nextProps.defaultClass == 'header-big')
    {
      window.addEventListener('scroll', this.handleScroll);
      this.setState({titleClass: 'header-big', headerHeight: 235})
    }
    else{
      window.removeEventListener('scroll', this.handleScroll);
      this.setState({titleClass: 'header-small', headerHeight: 100})
    }
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },


  render: function() {
    if(this.state.headerHeight == null)
      return null
    return (
      <div id='header' style={{height: this.state.headerHeight}}>
        <div className='container'>
          <Link to='/' className="no-underline">
            <div className={"title " + this.state.titleClass}>
               <span className="title1">Price</span>
               <span className="title2">Advisor</span>
               <span className="title3">{'.com.au'}</span>
            </div>
          </Link>
          <SearchBar history={this.props.history} term={this.props.term} noFocus={this.props.noFocus}/>
        </div>
      </div>
    );
  }
});