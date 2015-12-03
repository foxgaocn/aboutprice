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
      <div className="row searchBar">
        <div className="input-group">
          <input type="search" ref="term" onChange={this.termChange} defaultValue={this.props.term} className="form-control" placeholder="search product here" onKeyDown={this.keyDown}/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.performSearch}>
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </button>
          </span>
        </div>
      </div>
    );
  }
});