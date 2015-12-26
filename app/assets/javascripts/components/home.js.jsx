var Home = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div>
        <Header history={this.props.history} defaultClass='title-big' noFocus={true}/>
        <div id="content">
          <Today />
        </div>
      </div>
    );
  }
});