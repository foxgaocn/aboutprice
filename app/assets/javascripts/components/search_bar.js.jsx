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
    _.debounce(this.performSearch, 1000)()
  },

  componentDidMount: function(){
    this.refs.term.value = this.props.term == null ? '' : this.props.term
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    this.refs.term.value = nextProps.term == null ? '' : nextProps.term
  },
 

  render: function() {
    return (
      <div className="input-group col-sm-12 col-md-8 col-md-offset-2" id="search-bar">
        <input type="search" ref="term" onChange={this.termChange} defaultValue={this.props.term} className="form-control" placeholder="search product here" onKeyDown={this.keyDown} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.performSearch}>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
      </div>
    );
  }
});