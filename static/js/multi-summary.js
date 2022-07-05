
function multiSummaryJS()
{

    var width = $("#summaryHC3").innerWidth();
    var height = $("#summaryHC3").innerHeight();
    var padding={top:1,right:1,bottom:1,left:1};


    //The first summary plot and cell chart
    var summaryhc3svg=d3.select("#summaryHC3").append("svg")
            .attr("id","summaryHC3Svg")
            .attr("width",width*0.5)
            .attr("height",height)
            /*.style("background-color","blue")*/;
    var cellhc3svg=d3.select("#summaryHC3").append("svg")
        .attr("id","cellHC3Svg")
        .attr("width",width*0.5)
        .attr("height",height)
        /*.style("background-color","red")*/;
    //Summary
    d3.csv("static/upload/data/featureCSV/multi-summary.csv").then(function(data){
        var summaryData ;
        summaryData = data[0]     //获取当期视频的summary数据0 1 2 3

        var summaryAes = parseFloat(summaryData.aesthetics).toFixed(2);
        var summaryMemory = parseFloat(summaryData.memory).toFixed(2);
        var summaryQuality = parseFloat(summaryData.quality).toFixed(2);
        var summaryAnomaly = parseFloat(summaryData.anomaly).toFixed(2);

        var summaryArray = []   //4个特征值的平均数
        summaryArray.push(summaryAes);
        summaryArray.push(summaryMemory);
        summaryArray.push(summaryQuality);
        summaryArray.push(summaryAnomaly);

        console.log("summaryArray:"+summaryArray)

        var mx = parseFloat(summaryArray[3])+parseFloat(5);   //异常值+ 5 作为最大值
        var bar_width=10;
        var bar_padding =3;
        var color_line = d3.scaleOrdinal()
            .domain([0,1,2,3])
            .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);  //  ["#75a4cb","#e5cda5","#61875d","#9693cd"]
        var x_scale=d3.scaleLinear()
            .domain([0,mx])
            .range([padding.left*15,width*0.5]);

        let bars=summaryhc3svg.selectAll("rect")
            .data(summaryArray)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return x_scale(mx)-x_scale(d);
            })
            .attr("y",function (d,i) {
                return i*(bar_width+bar_padding)+padding.top*11;
            })
            .attr("width",function(d){ return x_scale(d);})
            .attr("height",bar_width)
            .style("fill",function (d,i) {
                return color_line(i);
            })
            .style("opacity",0.7);
    });
    //Cell
    d3.csv("static/upload/data/featureCSV/image-HC3.csv").then(function(data){
        var i;
        var valueArray = []  //Store all current values
        for(i=0;i<data.length;i++)
        {
            valueArray.push(parseFloat(data[i].value).toFixed(2));    //Map the current color by value
        }
        //The attributes of each grid define the x y coordinates, width, height, color, etc.
        var cell_width=4;
        var cell_height=4;
        var cell_padding=1;
        var x = function(n){
            return padding.left*8+cell_width*n+cell_padding*n;
        }
        var y = function (m) {
            return padding.top*6+cell_width*m+cell_padding*m;
        }
        var mx_value = parseFloat(d3.max(valueArray));
        var cell_color = d3.scaleLinear()
            .domain([0,mx_value])
            .range(["#f3f8fd","#adc1dc"]);

        //draw cell
        let m =0;
        let index = 0;
        while(index<valueArray.length)
        {
            let n = 0;
            while(n<15 && index<valueArray.length)
            {
                let bars=cellhc3svg.append("rect")
                    .attr("x",x(n))
                    .attr("y",y(m))
                    .attr("width",cell_width)
                    .attr("height",cell_height)
                    .style("fill",cell_color(valueArray[index]));

                n++;
                index++;
            }
            m++;
        }
    });



    //The second
    var summaryhc4svg=d3.select("#summaryHC4").append("svg")
        .attr("id","summaryHC4Svg")
        .attr("width",width*0.5)
        .attr("height",height);
    var cellhc4svg=d3.select("#summaryHC4").append("svg")
        .attr("id","cellHC4Svg")
        .attr("width",width*0.5)
        .attr("height",height);

    d3.csv("static/upload/data/featureCSV/multi-summary.csv").then(function(data){
        var summaryData ;
        summaryData = data[1]

        var summaryAes = parseFloat(summaryData.aesthetics).toFixed(2);
        var summaryMemory = parseFloat(summaryData.memory).toFixed(2);
        var summaryQuality = parseFloat(summaryData.quality).toFixed(2);
        var summaryAnomaly = parseFloat(summaryData.anomaly).toFixed(2);

        var summaryArray = []
        summaryArray.push(summaryAes);
        summaryArray.push(summaryMemory);
        summaryArray.push(summaryQuality);
        summaryArray.push(summaryAnomaly);

        console.log("summaryArray:"+summaryArray)

        var mx = parseFloat(summaryArray[3])+parseFloat(5);
        var bar_width=10;
        var bar_padding =3;
        var color_line = d3.scaleOrdinal()
            .domain([0,1,2,3])
            .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);
        var x_scale=d3.scaleLinear()
            .domain([0,mx])
            .range([padding.left*15,width*0.5]);

        let bars=summaryhc4svg.selectAll("rect")
            .data(summaryArray)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return x_scale(mx)-x_scale(d);
            })
            .attr("y",function (d,i) {
                return i*(bar_width+bar_padding)+padding.top*11;
            })
            .attr("width",function(d){ return x_scale(d);})
            .attr("height",bar_width)
            .style("fill",function (d,i) {
                return color_line(i);
            })
            .style("opacity",0.7);
    });

    d3.csv("static/upload/data/featureCSV/image-HC4.csv").then(function(data){
        var i;
        var valueArray = []
        for(i=0;i<data.length;i++)
        {
            valueArray.push(parseFloat(data[i].value).toFixed(2));
        }

        var cell_width=4;
        var cell_height=4;
        var cell_padding=1;
        var x = function(n){
            return padding.left*8+cell_width*n+cell_padding*n;
        }
        var y = function (m) {
            return padding.top*6+cell_width*m+cell_padding*m;
        }
        var mx_value = parseFloat(d3.max(valueArray));
        var cell_color = d3.scaleLinear()
            .domain([0,mx_value])
            .range(["#f3f8fd","#adc1dc"]);


        let m =0;
        let index = 0;
        while(index<valueArray.length)
        {
            let n = 0;
            while(n<15 && index<valueArray.length)
            {
                let bars=cellhc4svg.append("rect")
                    .attr("x",x(n))
                    .attr("y",y(m))
                    .attr("width",cell_width)
                    .attr("height",cell_height)
                    .style("fill",cell_color(valueArray[index]));

                n++;
                index++;
            }
            m++;
        }
    });



    //The third
    var summaryip2svg=d3.select("#summaryIP2").append("svg")
        .attr("id","summaryIP2Svg")
        .attr("width",width*0.5)
        .attr("height",height);
    var cellip2svg=d3.select("#summaryIP2").append("svg")
        .attr("id","cellIP2Svg")
        .attr("width",width*0.5)
        .attr("height",height);

    d3.csv("static/upload/data/featureCSV/multi-summary.csv").then(function(data){
        var summaryData ;
        summaryData = data[2]

        var summaryAes = parseFloat(summaryData.aesthetics).toFixed(2);
        var summaryMemory = parseFloat(summaryData.memory).toFixed(2);
        var summaryQuality = parseFloat(summaryData.quality).toFixed(2);
        var summaryAnomaly = parseFloat(summaryData.anomaly).toFixed(2);

        var summaryArray = []
        summaryArray.push(summaryAes);
        summaryArray.push(summaryMemory);
        summaryArray.push(summaryQuality);
        summaryArray.push(summaryAnomaly);

        console.log("summaryArray:"+summaryArray)

        var mx = parseFloat(summaryArray[3])+parseFloat(5);
        var bar_width=10;
        var bar_padding =3;
        var color_line = d3.scaleOrdinal()
            .domain([0,1,2,3])
            .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);
        var x_scale=d3.scaleLinear()
            .domain([0,mx])
            .range([padding.left*15,width*0.5]);

        let bars=summaryip2svg.selectAll("rect")
            .data(summaryArray)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return x_scale(mx)-x_scale(d);
            })
            .attr("y",function (d,i) {
                return i*(bar_width+bar_padding)+padding.top*11;
            })
            .attr("width",function(d){ return x_scale(d);})
            .attr("height",bar_width)
            .style("fill",function (d,i) {
                return color_line(i);
            })
            .style("opacity",0.7);
    });

    d3.csv("static/upload/data/featureCSV/image-IP2.csv").then(function(data){
        var i;
        var valueArray = []  //存储当前所有的value值
        for(i=0;i<data.length;i++)
        {
            valueArray.push(parseFloat(data[i].value).toFixed(2));
        }

        var cell_width=4;
        var cell_height=4;
        var cell_padding=1;
        var x = function(n){
            return padding.left*8+cell_width*n+cell_padding*n;
        }
        var y = function (m) {
            return padding.top*6+cell_width*m+cell_padding*m;
        }
        var mx_value = parseFloat(d3.max(valueArray));
        var cell_color = d3.scaleLinear()
            .domain([0,mx_value])
            .range(["#f3f8fd","#adc1dc"]);


        let m =0;
        let index = 0;
        while(index<valueArray.length)
        {
            let n = 0;
            while(n<15 && index<valueArray.length)
            {
                let bars=cellip2svg.append("rect")
                    .attr("x",x(n))
                    .attr("y",y(m))
                    .attr("width",cell_width)
                    .attr("height",cell_height)
                    .style("fill",cell_color(valueArray[index]));

                n++;
                index++;
            }
            m++;
        }
    });


    //The forth
    var summaryip5svg=d3.select("#summaryIP5").append("svg")
        .attr("id","summaryIP5Svg")
        .attr("width",width*0.5)
        .attr("height",height);
    var cellip5svg=d3.select("#summaryIP5").append("svg")
        .attr("id","cellIP5Svg")
        .attr("width",width*0.5)
        .attr("height",height);

    d3.csv("static/upload/data/featureCSV/multi-summary.csv").then(function(data){
        var summaryData ;
        summaryData = data[3]

        var summaryAes = parseFloat(summaryData.aesthetics).toFixed(2);
        var summaryMemory = parseFloat(summaryData.memory).toFixed(2);
        var summaryQuality = parseFloat(summaryData.quality).toFixed(2);
        var summaryAnomaly = parseFloat(summaryData.anomaly).toFixed(2);

        var summaryArray = []
        summaryArray.push(summaryAes);
        summaryArray.push(summaryMemory);
        summaryArray.push(summaryQuality);
        summaryArray.push(summaryAnomaly);

        console.log("summaryArray:"+summaryArray)

        var mx = parseFloat(summaryArray[3])+parseFloat(5);
        var bar_width=10;
        var bar_padding =3;
        var color_line = d3.scaleOrdinal()
            .domain([0,1,2,3])
            .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);   // ["#75a4cb","#e5cda5","#61875d","#9693cd"]
        var x_scale=d3.scaleLinear()
            .domain([0,mx])
            .range([padding.left*15,width*0.5]);

        let bars=summaryip5svg.selectAll("rect")
            .data(summaryArray)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return x_scale(mx)-x_scale(d);
            })
            .attr("y",function (d,i) {
                return i*(bar_width+bar_padding)+padding.top*11;
            })
            .attr("width",function(d){ return x_scale(d);})
            .attr("height",bar_width)
            .style("fill",function (d,i) {
                return color_line(i);
            })
            .style("opacity",0.7);
    });

    d3.csv("static/upload/data/featureCSV/image-IP5.csv").then(function(data){
        var i;
        var valueArray = []  //存储当前所有的value值
        for(i=0;i<data.length;i++)
        {
            valueArray.push(parseFloat(data[i].value).toFixed(2));
        }

        var cell_width=4;
        var cell_height=4;
        var cell_padding=1;
        var x = function(n){
            return padding.left*8+cell_width*n+cell_padding*n;
        }
        var y = function (m) {
            return padding.top*6+cell_width*m+cell_padding*m;
        }
        var mx_value = parseFloat(d3.max(valueArray));
        var cell_color = d3.scaleLinear()
            .domain([0,mx_value])
            .range(["#f3f8fd","#adc1dc"]);


        let m =0;
        let index = 0;
        while(index<valueArray.length)
        {
            let n = 0;
            while(n<15 && index<valueArray.length)
            {
                let bars=cellip5svg.append("rect")
                    .attr("x",x(n))
                    .attr("y",y(m))
                    .attr("width",cell_width)
                    .attr("height",cell_height)
                    .style("fill",cell_color(valueArray[index]));

                n++;
                index++;
            }
            m++;
        }
    });


    //The fifth
    var summaryairsvg=d3.select("#summaryAir").append("svg")
            .attr("id","summaryAirSvg")
            .attr("width",width*0.5)
            .attr("height",height);
    var cellairsvg=d3.select("#summaryAir").append("svg")
            .attr("id","cellAirSvg")
            .attr("width",width*0.5)
            .attr("height",height);

    d3.csv("static/upload/data/featureCSV/multi-summary.csv").then(function(data){
        var summaryData ;
        summaryData = data[4]

        var summaryAes = parseFloat(summaryData.aesthetics).toFixed(2);
        var summaryMemory = parseFloat(summaryData.memory).toFixed(2);
        var summaryQuality = parseFloat(summaryData.quality).toFixed(2);
        var summaryAnomaly = parseFloat(summaryData.anomaly).toFixed(2);

        var summaryArray = []
        summaryArray.push(summaryAes);
        summaryArray.push(summaryMemory);
        summaryArray.push(summaryQuality);
        summaryArray.push(summaryAnomaly);

        console.log("summaryArray:"+summaryArray)

        var mx = parseFloat(summaryArray[3])+parseFloat(5);
        var bar_width=10;
        var bar_padding =3;
        var color_line = d3.scaleOrdinal()
            .domain([0,1,2,3])
            .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);
        var x_scale=d3.scaleLinear()
            .domain([0,mx])
            .range([padding.left*15,width*0.5]);

        let bars=summaryairsvg.selectAll("rect")
            .data(summaryArray)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return x_scale(mx)-x_scale(d);
            })
            .attr("y",function (d,i) {
                return i*(bar_width+bar_padding)+padding.top*11;
            })
            .attr("width",function(d){ return x_scale(d);})
            .attr("height",bar_width)
            .style("fill",function (d,i) {
                return color_line(i);
            })
            .style("opacity",0.7);
    });

    d3.csv("static/upload/data/featureCSV/image-Air.csv").then(function(data){
        var i;
        var valueArray = []  //存储当前所有的value值
        for(i=0;i<data.length;i++)
        {
            valueArray.push(parseFloat(data[i].value).toFixed(2));
        }

        var cell_width=4;
        var cell_height=4;
        var cell_padding=1;
        var x = function(n){
            return padding.left*8+cell_width*n+cell_padding*n;
        }
        var y = function (m) {
            return padding.top*6+cell_width*m+cell_padding*m;
        }
        var mx_value = parseFloat(d3.max(valueArray));
        var cell_color = d3.scaleLinear()
            .domain([0,mx_value])
            .range(["#f3f8fd","#adc1dc"]);

        let m =0;
        let index = 0;
        while(index<valueArray.length)
        {
            let n = 0;
            while(n<15 && index<valueArray.length)
            {
                let bars=cellairsvg.append("rect")
                    .attr("x",x(n))
                    .attr("y",y(m))
                    .attr("width",cell_width)
                    .attr("height",cell_height)
                    .style("fill",cell_color(valueArray[index]));

                n++;
                index++;
            }
            m++;
        }
    });


    //The sixth
    var summarycarsvg=d3.select("#summaryCar").append("svg")
            .attr("id","summaryCarSvg")
            .attr("width",width*0.5)
            .attr("height",height);
    var cellcarsvg=d3.select("#summaryCar").append("svg")
            .attr("id","cellCarSvg")
            .attr("width",width*0.5)
            .attr("height",height);

    d3.csv("static/upload/data/featureCSV/multi-summary.csv").then(function(data){
        var summaryData ;
        summaryData = data[5]

        var summaryAes = parseFloat(summaryData.aesthetics).toFixed(2);
        var summaryMemory = parseFloat(summaryData.memory).toFixed(2);
        var summaryQuality = parseFloat(summaryData.quality).toFixed(2);
        var summaryAnomaly = parseFloat(summaryData.anomaly).toFixed(2);

        var summaryArray = []
        summaryArray.push(summaryAes);
        summaryArray.push(summaryMemory);
        summaryArray.push(summaryQuality);
        summaryArray.push(summaryAnomaly);

        console.log("summaryArray:"+summaryArray)

        var mx = parseFloat(summaryArray[3])+parseFloat(5);
        var bar_width=10;
        var bar_padding =3;
        var color_line = d3.scaleOrdinal()
            .domain([0,1,2,3])
            .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);
        var x_scale=d3.scaleLinear()
            .domain([0,mx])
            .range([padding.left*15,width*0.5]);

        let bars=summarycarsvg.selectAll("rect")
            .data(summaryArray)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return x_scale(mx)-x_scale(d);
            })
            .attr("y",function (d,i) {
                return i*(bar_width+bar_padding)+padding.top*11;
            })
            .attr("width",function(d){ return x_scale(d);})
            .attr("height",bar_width)
            .style("fill",function (d,i) {
                return color_line(i);
            })
            .style("opacity",0.7);
    });

    d3.csv("static/upload/data/featureCSV/image-Car.csv").then(function(data){
        var i;
        var valueArray = []  //存储当前所有的value值
        for(i=0;i<data.length;i++)
        {
            valueArray.push(parseFloat(data[i].value).toFixed(2));
        }

        var cell_width=4;
        var cell_height=4;
        var cell_padding=1;
        var x = function(n){
            return padding.left*8+cell_width*n+cell_padding*n;
        }
        var y = function (m) {
            return padding.top*6+cell_width*m+cell_padding*m;
        }
        var mx_value = parseFloat(d3.max(valueArray));
        var cell_color = d3.scaleLinear()
            .domain([0,mx_value])
            .range(["#f3f8fd","#adc1dc"]);


        let m =0;
        let index = 0;
        while(index<valueArray.length)
        {
            let n = 0;
            while(n<15 && index<valueArray.length)
            {
                let bars=cellcarsvg.append("rect")
                    .attr("x",x(n))
                    .attr("y",y(m))
                    .attr("width",cell_width)
                    .attr("height",cell_height)
                    .style("fill",cell_color(valueArray[index]));

                n++;
                index++;
            }
            m++;
        }
    });



    //The seventh
    var summarystsvg=d3.select("#summaryST").append("svg")
            .attr("id","summarySTSvg")
            .attr("width",width*0.5)
            .attr("height",height);
    var cellstsvg=d3.select("#summaryST").append("svg")
            .attr("id","cellSTSvg")
            .attr("width",width*0.5)
            .attr("height",height);

    d3.csv("static/upload/data/featureCSV/multi-summary.csv").then(function(data){
        var summaryData ;
        summaryData = data[6]

        var summaryAes = parseFloat(summaryData.aesthetics).toFixed(2);
        var summaryMemory = parseFloat(summaryData.memory).toFixed(2);
        var summaryQuality = parseFloat(summaryData.quality).toFixed(2);
        var summaryAnomaly = parseFloat(summaryData.anomaly).toFixed(2);

        var summaryArray = []
        summaryArray.push(summaryAes);
        summaryArray.push(summaryMemory);
        summaryArray.push(summaryQuality);
        summaryArray.push(summaryAnomaly);

        console.log("summaryArray:"+summaryArray)

        var mx = parseFloat(summaryArray[3])+parseFloat(5);
        var bar_width=10;
        var bar_padding =3;
        var color_line = d3.scaleOrdinal()
            .domain([0,1,2,3])
            .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);
        var x_scale=d3.scaleLinear()
            .domain([0,mx])
            .range([padding.left*15,width*0.5]);

        let bars=summarystsvg.selectAll("rect")
            .data(summaryArray)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return x_scale(mx)-x_scale(d);
            })
            .attr("y",function (d,i) {
                return i*(bar_width+bar_padding)+padding.top*11;
            })
            .attr("width",function(d){ return x_scale(d);})
            .attr("height",bar_width)
            .style("fill",function (d,i) {
                return color_line(i);
            })
            .style("opacity",0.7);
    });

    d3.csv("static/upload/data/featureCSV/image-ST.csv").then(function(data){
        var i;
        var valueArray = []
        for(i=0;i<data.length;i++)
        {
            valueArray.push(parseFloat(data[i].value).toFixed(2));
        }

        var cell_width=4;
        var cell_height=4;
        var cell_padding=1;
        var x = function(n){
            return padding.left*8+cell_width*n+cell_padding*n;
        }
        var y = function (m) {
            return padding.top*6+cell_width*m+cell_padding*m;
        }
        var mx_value = parseFloat(d3.max(valueArray));
        var cell_color = d3.scaleLinear()
            .domain([0,mx_value])
            .range(["#f3f8fd","#adc1dc"]);


        let m =0;
        let index = 0;
        while(index<valueArray.length)
        {
            let n = 0;
            while(n<15 && index<valueArray.length)
            {
                let bars=cellstsvg.append("rect")
                    .attr("x",x(n))
                    .attr("y",y(m))
                    .attr("width",cell_width)
                    .attr("height",cell_height)
                    .style("fill",cell_color(valueArray[index]));

                n++;
                index++;
            }
            m++;
        }
    });


}




