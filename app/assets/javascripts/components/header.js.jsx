var Header = React.createClass({
  componentDidMount: function() {
  },

  render: function(){
    return(
      <div id='header-row'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-sm-9'>
              <span>
                <img alt="Price Advisor" src="http://res.cloudinary.com/www-kunpawn-com-au/image/upload/v1449183242/logo_tkoyl4.png"/>
              </span>
            </div>
            <div className='col-md-6 col-sm-3'>
              <span className="pull-right"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
})