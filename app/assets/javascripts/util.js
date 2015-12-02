Util = {
  startDate: new Date(2015, 10, 1),

  stringToHours: function(datestr){
    date = Date.parse(datestr)
    return (date - this.startDate)/3600000
  },

  todaytoHours: function(){
    return ((new Date()) -  this.startDate)/3600000
  },

  hoursToDate: function(hours){
    return new Date(this.startDate.getTime() + hours*3600000)
  },

  moveCursorToEnd: function(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
  },

  priceOk: function(history, price){
    data = JSON.parse(history)
    keys = Object.keys(data)
    values = []
    keys.forEach(function(k){values.push(data[k])})
    values = _.uniq(values)
    switch(values.length){
      case 1:
        return {code: 3, message:'Price never changed. Your choice'}
      case 2:
        if(_.sortedIndex(values, price) === 0){
          highest = _.max(values)
          return {code: 4, message: "Down from $" + highest/100 + ", price ok"}
        }
        lowest = _.min(values)
        return {code: 2, message: "Was $" + lowest/100 + " previously, maybe wait"}
      case 3:
        index = _.sortedIndex(values, price)
        if(index === 0)
          return {code: 5, message: "Lowest ever, good deal"}
        else if(index == 1)
          return {code: 3, message: "Average price, up to you"}
        else{
          return {code: 2, message: "Price not ok, better wait"}
        }
        break;
      default:
        index = _.sortedIndex(values, price)
        if(index === 0)
          return {code: 5, message: "Lowest ever, good deal"}
        else if(index == 1)
          return {code: 4, message: "Not too bad, can go with it"}
        else if(index === values.length - 1)
          return {code: 1, message: "Price not ok, avoid"}
        else if(index == values.length - 2)
          return {code: 2, message: "You may find better price later"}
        else
          return {code: 3, message: "Average price, up to you"}
    }
  },

}