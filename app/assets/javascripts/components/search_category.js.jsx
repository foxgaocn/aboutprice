var SearchCategories = React.createClass({

  genCategroy: function(category){
    return(
      <div key={category.id}> 
        <div>{category.name} </div>
        <div> <span className='red'> {category.count} </span> items </div>
      </div>)
  },

  render: function(){
    categories = this.props.categories
    if ( categories == null || categories.length == 1)
      return (<div/>)
    
    items = []
    categories.forEach(function(category){
      items.push(this.genCategroy(category))
    }.bind(this))

    return(
      <div className="row">
        <div className="col-md-12">
          <h3> By Category </h3>
        </div>
        {items}
      </div>
    )
  }
})