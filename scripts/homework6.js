// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  drawChart();
  drawCounterChart();
});

function drawChart(){
    var parseTime = d3.timeParse("%Y-%m-%d");

    var margin = {top: 20, right: 20, bottom: 40, left: 50},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
                      .x(function(d) { return x(d.Date); })
                      .y(function(d) { return y(d.Close); });

    d3.csv("data/DHFL.NS.csv").then(function(data) {

      data.forEach(function(d) {
        d.Date = parseTime(d.Date);
        d.Close = +d.Close;
      });


      var cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 55);
      
        data = data.filter(function(d) {
            return d.Date > cutoffDate && d.Close > 0;
        })

        svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.Date; }));
      y.domain([10, d3.max(data, function(d) { return d.Close; })]);

      // Add the valueline path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));

      svg.append("text")      // text label for the x-axis
        .attr("x", width / 2 )
        .attr("y",  height + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text("Date time");

      svg.append("text")      // text label for the y-axis
        .attr("y",20 - margin.left)
        .attr("x",50 - (height / 2))
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end")
        .style("font-size", "16px")
        .text("Share Price in INR");

      svg.append("text")      // text label for chart Title
        .attr("x", width / 2 )
        .attr("y", 0 - (margin.top/2) + 10)
        .style("text-anchor", "middle")
        .style("font-size", "16px") 
        .style("text-decoration", "underline") 
        .text("DHFL Share Price");
  });
}

function drawCounterChart(){
    var parseTime = d3.timeParse("%Y-%m-%d");

    var margin = {top: 20, right: 20, bottom: 40, left: 50},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
                      .x(function(d) { return x(d.Date); })
                      .y(function(d) { return y(d.Close); });

    d3.csv("data/DHFL.NS.csv").then(function(data) {

      data.forEach(function(d) {
        d.Date = parseTime(d.Date);
        d.Close = +d.Close;
      });


      // var cutoffDate = new Date();
      //   cutoffDate.setDate(cutoffDate.getDate() - 55);
      
        data = data.filter(function(d) {
            return d.Close > 0;
        })

        svg = d3.select("#counterChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.Date; }));
      y.domain([0, d3.max(data, function(d) { return d.Close; })]);

      // Add the valueline path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));

        console.log(svg);

        svg.append("text")      // text label for the x-axis
        .attr("x", width / 2 )
        .attr("y",  height + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text("Date time");

      svg.append("text")      // text label for the y-axis
        .attr("y",20 - margin.left)
        .attr("x",50 - (height / 2))
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end")
        .style("font-size", "16px")
        .text("Share Price in INR");

      svg.append("text")      // text label for chart Title
        .attr("x", width / 2 )
        .attr("y", 0 - (margin.top/2) + 10)
        .style("text-anchor", "middle")
        .style("font-size", "16px") 
        .style("text-decoration", "underline") 
        .text("DHFL Share Price");
    });


}