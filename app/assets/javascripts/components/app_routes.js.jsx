var Route = window.ReactRouter.Route;
var Router = window.ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var createHistory = History.createHistory;

var AppRoutes = React.createClass({
  render: function() {
    return (
      <Router history={createHistory()}>
        <Route path='/' component={App}>
          <IndexRoute component={Search} />
          <Route path='search' component={Search} />
          <Route path='popular' component={Search} />
        </Route>
      </Router>
    );
  }
});




