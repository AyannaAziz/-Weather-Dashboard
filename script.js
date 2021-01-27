$(document).ready(function(){
    https://openweathermap
    var url = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&APPID=0946b5eb988b3caf2e24954f8caf2636"
    $('#btn-ajax').click(function(){
        $.get(url,function(data,status){
            console.log(data)
      })
    })
})