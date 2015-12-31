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

  formatDate: function (input) {
    var pattern = /(.*?)\/(.*?)\/(.*?)$/;
    return input.replace(pattern,function(match,p1,p2,p3){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return (p2<10?"0"+p2:p2) + " " + months[(p1-1)];
    });
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

  priceIndicator: function(rating){
    switch(rating){
      case 1: return "Highest ever";
      case 2: return "Higher than normal";
      case 3: return "Normal";
      case 4: return "Lower than normal";
      case 5: return "Lowest ever";
      default: return "";
    }
  },

  priceIndicatorShort: function(rating){
    switch(rating){
      case 1: return "Highest";
      case 2: return "Higher";
      case 3: return "Normal";
      case 4: return "Lower";
      case 5: return "Lowest";
      default: return "";
    }
  },

  priceOk: function(history, price){
    data = JSON.parse(history)
    keys = Object.keys(data)
    values = []
    keys.forEach(function(k){values.push(data[k])})
    values = _.uniq(values)
    values = _.sortBy(values)
    switch(values.length){
      case 1:
        return {code: 3, message:'Price never changed. Your choice'}
      case 2:
        if(_.indexOf(values, price) === 0){
          highest = _.max(values)
          return {code: 4, message: "Down from $" + highest/100 + ", not bad"}
        }
        lowest = _.min(values)
        return {code: 2, message: "Was $" + lowest/100 + " previously, maybe wait"}
      case 3:
        index = _.indexOf(values, price)
        if(index === 0)
          return {code: 5, message: "Lowest ever, good deal"}
        else if(index == 1)
          return {code: 3, message: "Average price, up to you"}
        else{
          return {code: 2, message: "Price not ok, better wait"}
        }
        break;
      default:
        index = _.indexOf(values, price)
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