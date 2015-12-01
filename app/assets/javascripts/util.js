Util = {
  startDate: new Date(2015, 10, 1),

  stringToHours: function(datestr){
    date = Date.parse(datestr)
    return (date - this.startDate)/3600000
  },

  hoursToDate: function(hours){
    return new Date(this.startDate.getTime() + hours*3600000)
  },

}