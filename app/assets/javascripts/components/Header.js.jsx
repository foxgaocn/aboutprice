var Link = window.ReactRouter.Link;
var Router = window.ReactRouter.Router;

var Header = React.createClass({

  getInitialState: function() {
    return {headerHeight: 235,
            titleClass: this.props.defaultClass};
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

  componentDidMount: function() {
    var parser = document.createElement('a');
    parser.href = document.URL;
    if(parser.pathname == '/')
      window.addEventListener('scroll', this.handleScroll);
    else
      this.setState({titleClass: 'title-small', headerHeight: 100})
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },


  render: function() {
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