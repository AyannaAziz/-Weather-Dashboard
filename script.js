$(document).ready(function(){
  
//   DisplaySearchHistory()
  
      //call default city on page load
      defaultCity();
  
      function defaultCity(){
          var url = "https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=22face1056f8afe0875e71a72b411e82"
                 $.get(url,function(data,status){
                  console.log(data)
                  displayData(data)
                  apiFiveDay(data.name)
          })
  
      }
    
        //function to display default city 
         function displayData(data){
  
          var icon = data.weather[0].icon;
          var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
          $('#icon-w').attr('src',iconUrl)
        
          var currentDate = new Date(data.dt * 1000).toISOString(); 
          //convert date 
          var display =  data.name + " (" + moment(currentDate).format("MM/D/YYYY") + ")"
          $('#cityName').text(display)
          //convertion to °F
          var tempFar = parseInt((data.main.temp - 273.15)* 9/5 + 32);
  
          // Display temperature on the page 
          $('#temperatureSet').text(tempFar+ " °F")
          // Display humidity on the page 
         $('#humiditySet').text(data.main.humidity + "%" )
         // Display  wind 
         $('#windSet').text(data.wind.speed)
  
          // 2nd ajax call to get the uv index
              
              var lat = data.coord.lat;
              var lon = data.coord.lon;
              $.ajax({
                method: "GET",
                url:
                  "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=22face1056f8afe0875e71a72b411e82&lat=" +
                  lat +
                  "&lon=" +
                  lon 
              }).then(function(uvdata) {
                console.log(uvdata);
                $("#uvSet").text(uvdata[0].value);
              });
         }
  
         // on click on submit=> event listener on search button
         $("#search-button").click(function(event){
           event.preventDefault()
  
            //check if value is valid => size !=0
            const city = $("#search-input")
            .val()
            .trim();
           console.log(city)
           
      // api call: GET POST PUT DELETE
           var ApiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&APPID=22face1056f8afe0875e71a72b411e82";
         
           $.ajax({
            method: "GET",
            url: ApiUrl
          }).then(function(response) {
            //save data in the local storage
            localStorage.setItem(city, JSON.stringify(response));
      
            // add city in the search list
            var li = $(
              `<button type='button' class='list-group-item list-group-item-action' id='${city}'>${city}</li>`
            );
            // append the list item to the list by uding the id search-history
            li.appendTo("#search-history");
      
            //console.log(response);
            displayData(response);
      
            //API CALL TO GET WEATHER DATA FOR 5 DAYS
            apiFiveDay(city);
          });
     
         })
  
  
  
         function apiFiveDay(city) {
          //API CALL 
          var ApiUrl =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&APPID=22face1056f8afe0875e71a72b411e82";
          $.ajax({
            method: "GET",
            url: ApiUrl
          }).then(function(data) {
            console.log(data);
            $("#forecast").empty();
            var forecastArray = data.list;
      
            forecastArray.forEach(function(forecast, index) {
              
              var forecastDateTxt = forecast.dt_txt;
      
              //card body 
              var forecastDate = forecastDateTxt.split(" ")[0];
              var forecastTime = forecastDateTxt.split(" ")[1];
              // console.log(forecastDate);
              // console.log(forecastTime);
      
              // since the api return forecast for every 3hours, we will choose to return only a forecast for a spcecific hour =>
              if (forecastTime === "00:00:00") {
                //build a card
            
                var card;
                if (index === forecastArray.length - 1) {
                  card = $(
                    "<div class='card bg-primary text-white col-lg' style=''>"
                  );
                } else {
                  card = $(
                    "<div class='card mr-20 mr-2 bg-primary text-white ' style=''>"
                  );
                }
                const cardBody = $("<div class='card-body my-1'>");
                const h5 = $("<h6 class='card-title'>")
                  .text(moment(forecastDate.trim()).format("MM/D/YYYY"))
                  .appendTo(cardBody);
      
                var imgUrl =
                  "https://openweathermap.org/img/wn/" +
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
                $("#forecast").append(card);
              }
            });
          });
        }
      
  //Functions for keeping track of and displaying search history   
  function DisplaySearchHistory() {
    var cities = Object.keys(localStorage);
    console.log(cities);
    cities.forEach(function(city) {
      var li = $(
        `<button type='button' class='list-group-item list-group-item-action' id='${city}'>${city}</li>`
      );
      // append the list item to the list by uding the id search-history
      li.appendTo("#search-history");
    });
  }
   
          
  })