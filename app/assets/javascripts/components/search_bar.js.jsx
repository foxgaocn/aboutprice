var SearchBar = React.createClass({
  performSearch: function(){
    this.props.history.pushState(null, '/search', {term: this.refs.term.value})
  },

  keyDown: function(event){
    if(event.keyCode == 13 || event.keyCode == 9){
      this.performSearch();
    }
  },

  termChange: function(event){
    _.throttle(this.performSearch, 300)()
  },

  componentDidMount: function(){
    this.refs.term.getDOMNode().focus(); 
    Util.moveCursorToEnd(this.refs.term)
  },

  render: function() {
    return (
      <div id='header-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-sm-9'>
              <span>
                <a href="/">
                  <img id='logo' alt="Price Advisor" src="http://res.cloudinary.com/www-kunpawn-com-au/image/upload/v1449374482/imageedit_4_4310609050_xoo8bo.gif"/>
                </a>
              </span>
            </div>
            <div className='col-md-6 col-sm-3'>
              <span className="pull-right"></span>
            </div>
          </div>
          <div className="input-group col-sm-12 col-md-8 col-md-offset-2" id="search-bar">
            <input type="search" ref="term" onChange={this.termChange} defaultValue={this.props.term} className="form-control" placeholder="search product here" onKeyDown={this.keyDown}/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.performSearch}>
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
});