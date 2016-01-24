var SocialButtons = React.createClass({

  shareTwitter: function(){
    window.open('https://twitter.com/intent/tweet?text=http://www.priceadvisor.com.au');
  },

  shareGoogle: function(){
    window.open('https://plus.google.com/share?url=http://www.priceadvisor.com.au')
  },

  shareFb: function(){
    window.open('https://www.facebook.com/dialog/share?app_id=453208924879851&display=popup&href=http://www.priceadvisor.com.au&redirect_uri=http://www.priceadvisor.com.au')
  },

  buttonOnBig: function(){
    return (
      <div id='social-buttons'>
        <div className="button-on-big">
          <a className="fa fa-facebook share-base share-facebook" onClick={this.shareFb} title="share to facebook"></a>
          <a className="fa fa-twitter share-base share-twitter" onClick={this.shareTwitter} title="share to twitter"></a>
          <a className="fa fa-google-plus share-base share-google-plus" onClick={this.shareGoogle} title="share to google plus"></a>
          <a className="fa fa-envelope-o share-base share-mail" href='mailto:?body=http://www.priceadvisor.com.au' title="share to friends"></a>
          <a className="fa fa-comment share-base share-contact" href='mailto:?admin@priceadvisor.com.au' title="contact us"></a>
        </div>
      </div>
    );
  },

  buttonOnSmall: function(){
    return(
      <div id='social-buttons'>
        <div className="button-on-small">
          <div className="top-right">
            <button type="button" className="collapsed" data-toggle="dropdown" id="dropdownMenu1" aria-haspopup="true" aria-expanded="true">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
             <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a className="fa fa-facebook share-base share-facebook" onClick={this.shareFb}  title="share to facebook"></a></li>
              <li><a className="fa fa-twitter share-base share-twitter" onClick={this.shareTwitter}  title="share to twitter"></a></li>
              <li><a className="fa fa-google-plus share-base share-google-plus" onClick={this.shareGoogle}  title="share to google plus"></a></li>
              <li><a className="fa fa-envelope-o share-base share-contact" href='mailto:?body=http://www.priceadvisor.com.au'  title="share to friends"></a></li>
              <li role="separator" className="divider"></li>
              <li><a href="mailto:admin@priceadvisor.com.au">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
       )
  },

  render: function() {
    return this.props.titleClass == "header-big" ? this.buttonOnBig() : this.buttonOnSmall()
  }
});




