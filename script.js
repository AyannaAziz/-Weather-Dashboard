$(document).ready(function(){
   //call default city when page loads
   defaultCity()

   function defaultCity(){
    var url = "https://api.openweathermap.org/data/2.5/weather?q=Denver&APPID=0946b5eb988b3caf2e24954f8caf2636"
           $.get(url,function(data,status){
            console.log(data)
            displayData(data)
            apiFiveDays(data.name)
    })

}

  //function to display default city 
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


// ajax call to get the uv index
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    $.ajax({
      method: "GET",
      url:
        "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=0946b5eb988b3caf2e24954f8caf2636&lat=" +
        lat +
        "&lon=" +
        lon
    }).then(function(uvdata) {
      console.log(uvdata);
      $("#uvSet").text(uvdata[0].value);
    });
       }

       function apiFiveDays(city) {
        //API CALL
        var ApiUrl =
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&APPID=0946b5eb988b3caf2e24954f8caf2636";
        $.ajax({
          method: "GET",
          url: ApiUrl
        }).then(function(data) {
          console.log(data);
          $("#forecast").empty();
          var forecastArray = data.list;

          forecastArray.forEach(function(forecast, index) {
            //get the date and time out of dt_txt
            //2020-01-19 06:00:00 ==> forecastDateTxt=["2020-01-19", "06:00:00"]
            var forecastDateTxt = forecast.dt_txt;

            //card body stuff
            var forecastDate = forecastDateTxt.split(" ")[0];
            var forecastTime = forecastDateTxt.split(" ")[1];
            // console.log(forecastDate);
            // console.log(forecastTime);

            // since the api return forecast for every 3hours, we will choose to return only a forecast for a spcecific hour =>
            if (forecastTime === "00:00:00") {
              //build a card
              //const card = $("<card class=' mr-2 bg-primary text-white small' style='width: 9rem;'>");
              var card;
              if (index === forecastArray.length - 1) {
                card = $(
                  "<div class='card bg-primary text-white small col' style=''>"
                );
              } else {
                card = $(
                  "<div class='card mr-3 bg-primary text-white small col' style=''>"
                );
              }
              const cardBody = $("<div class='card-body my-1'>");
              const h5 = $("<h6 class='card-title'>")
                .text(moment(forecastDate.trim()).format("MM/D/YYYY"))
                .appendTo(cardBody);

              var imgUrl =
                "http://openweathermap.org/img/wn/" +
                forecast.weather[0].icon +
                ".png";
              const img = $("<img>")
                .attr("src", imgUrl)
                .attr("alt", "Weather Forecast icon")
                .appendTo(cardBody);

              var lineBreak = $("<br>").appendTo(cardBody);
              var tempFar = parseInt((forecast.main.temp - 273.15)* 9/5 + 32);
              var tempSpan = $("<span>")
                .text(`Temp: ${tempFar} °F`)
                .appendTo(cardBody);

              var lineBreak = $("<br>").appendTo(cardBody);

              var humiditySpan = $("<span>")
                .text(`Humidity: ${forecast.main.humidity} %`)
                .appendTo(cardBody);

              //append the card body to the card
              cardBody.appendTo(card);

              //append the card to the row forecast
              $("#fivecitys").append(card);
            }
          });
        });
      }

   
})