var Home = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div id="main_search">
        <SearchBar history={this.props.history}/>
      </div>
    );
  }
});