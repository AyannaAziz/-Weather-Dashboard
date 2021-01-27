$(document).ready(function(){
   //call default city when page loads
   defaultCity()

   function defaultCity(){
    var url = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&APPID=0946b5eb988b3caf2e24954f8caf2636"
           $.get(url,function(data,status){
            console.log(data)
            displayData(data)
            apiFiveDays(data.name)
    })

}

  //function to display difault city 
   function displayData(data){

    var icon = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
    $('#icon-w').attr('src',iconUrl)

    var currentDate = new Date(data.dt * 1000).toISOString(); 
    //convert date 
    var display =  data.name + " (" + moment(currentDate).format("MM/D/YYYY") + ")"
    $('#cityName').text(display)
    //convertion to farenheit
    var tempFar = parseInt((data.main.temp - 273.15)* 9/5 + 32);

    // Display temperature on the page 
    $('#temperatureSet').text(tempFar+ " °F")
    // Display humidity on the page 
   $('#humiditySet').text(data.main.humidity + "%" )
   // Display  wind 
   $('#windSet').text(data.wind.speed)



   }
})