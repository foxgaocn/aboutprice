var Home = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div>
        <SearchBar history={this.props.history}/>
        <Today />
      </div>
    );
  }
});