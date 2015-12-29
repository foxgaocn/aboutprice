var Link = window.ReactRouter.Link;
var Router = window.ReactRouter.Router;

var Header = React.createClass({
  getInitialState: function() {
    return {
      titleClass: this.props.defaultClass,
      headerHeight: this.props.defaultClass=="title-big"? 235 : 100};
  },
  handleScroll: function(e) {
    var scroll = document.body.scrollTop
    var titleClass = 'title-big'
    if(scroll > 10){
      titleClass = 'title-small'
    }
    var newHeight = 235 - document.body.scrollTop
    if(newHeight < 100)
      newHeight = 100
    this.setState({headerHeight: newHeight, titleClass: titleClass});
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    if(nextProps.defaultClass == 'title-big')
    {
      window.addEventListener('scroll', this.handleScroll);
      this.setState({titleClass: 'title-big', headerHeight: 235})
    }
    else{
      window.removeEventListener('scroll', this.handleScroll);
      this.setState({titleClass: 'title-small', headerHeight: 100})
    }
  },

  // componentDidMount: function() {
  //   //var parser = document.createElement('a');
  //   //parser.href = document.URL;
  //   if(this.props.defaultClass == 'title-big')
  //   {
  //     window.addEventListener('scroll', this.handleScroll);
  //     this.setState({titleClass: 'title-big', headerHeight: 235})
  //   }
  //   else{
  //     this.setState({titleClass: 'title-small', headerHeight: 100})
  //   }
  // },

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
               <span className="title3">{'.com.au\u2122'}</span>
            </div>
          </Link>
          <SearchBar history={this.props.history} term={this.props.term} noFocus={this.props.noFocus}/>
        </div>
      </div>
    );
  }
});