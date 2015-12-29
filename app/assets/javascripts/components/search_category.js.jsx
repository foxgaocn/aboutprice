var SearchCategories = React.createClass({

  categoryChanged: function(e){
    if(e.target.checked){
      this.props.onFilterChange({key: "cid", value: parseInt(e.target.value)})
    }
  },

  genCategroy: function(category){
    checked = category.id == this.props.filter
    return(
      <div key={category.id} className="row">
        <label className="filter-label">
          <input type="radio" value={category.id} name='category' onChange={this.categoryChanged} checked={checked}/>
          {category.name}
        </label>
      </div>)
  },

  render: function(){
    categories = this.props.categories
    if ( categories == null || categories.length == 0)
      return (<div/>)
    
    items = []
    categories.forEach(function(category){
      items.push(this.genCategroy(category))
    }.bind(this))

    return(
      <div className="row">
        <h4>Category</h4>
        {items} 
      </div>
    )
  }
})