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
        <input type="search" ref="term" onChange={this.termChange} defaultValue={this.props.term} className="form-control" placeholder="search product here" onKeyDown={this.keyDown}/>
      </div>
    );
  }
});