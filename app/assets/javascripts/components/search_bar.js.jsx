var SearchBar = React.createClass({
  propTypes: {
  },

  keyDown: function(event){
       if(event.keyCode == 13){
          this.props.history.pushState(null, '/search', {term: this.refs.term.value})
       }
   },

  render: function() {
    return (
      <div className="row searchBar">
        <input type="search" ref="term" value={this.props.term} className="form-control" placeholder="search product here" onKeyDown={this.keyDown}/>
      </div>
    );
  }
});