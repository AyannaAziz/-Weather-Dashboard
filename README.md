# -Weather-Dashboard
Weather Dashboard is an application created using the Open Weather Map data API. This application runs in the browser and can be utilized to find out the weather conditions of a given city currently and for the next 5 days. 

## Description
The server-side API used to get response data object is retrieved from the Open Weather APi. The current weather section includes the following weather attributes and date.

* City, Date, Icon image
* Temperature
* Humidity
* Wind Speed
* UV index

The 5-days weather forecast includes the following information for each day:

* Date
* Icon image
* Temperature
* Humidity

The local storage is used to store the previously searched cities and display them to the user in the left side of the page under the search bar.

## Built With
* HTML
* CSS
* JQuery
* Open 

## Demo
![](weatherdemo.png)

## Challenges 
In order to get all the information needed, a good deal of manipulation of the response from the get request was needed, including taking information from one response to generate a new request. For example, the search based on city name returns latitude and longitude coordinates, and these coordinates are used in the UV Index get request.

## Authors
Alma Aziz

## Link
Visit the website here: https://ayannaaziz.github.io/-Weather-Dashboard/

## References
These videos/articles were helpful in helping me get started and complete the app.

* https://stackoverflow.com/questions/56070796/show-day-name-instead-of-number-from-open-weather-api-response
* https://code-projects.org/weather-dashboard-in-javascript-with-source-code/

  ## MIT License

Copyright (c) 2021 Ayanna Aziz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.