//Display user interest choices based on threshold settings
function multiThresholdJS(feature)
{

    var sel = document.getElementById("video_select") ;
    var value = sel.options[sel.selectedIndex].value
    var doc="static/upload/data/featureCSV/"
    var fitWidth = 1126; //913

    switch(parseInt(value))
    {
        case 1:{ doc = doc + "multi_HC3_normal.csv" ; fitWidth = 1126;} break;
        case 2:{ doc = doc + "multi_HC4_normal.csv" ; fitWidth = 1126;} break;
        case 3:{ doc = doc + "multi_IP2_normal.csv" ; fitWidth = 1126;} break;
        case 4:{ doc = doc + "multi_IP5_normal.csv" ; fitWidth = 1126;} break;
        case 5:{ doc = doc + "multi_Air_normal.csv" ; fitWidth = 1110;} break;
        case 6:{ doc = doc + "multi_Car_normal.csv" ; fitWidth = 948;} break;
        case 7:{ doc = doc + "multi_ST_normal.csv" ; fitWidth = 568;} break;
    }
    d3.csv(doc).then(function(data){
        var width = $("#featureDetail").innerWidth();
        var height = $("#featureDetail").innerHeight();
        var padding={top:1,right:1,bottom:1,left:1};

        var thresholdsvg=d3.select("#featureDetail").append("svg")
                .attr("id","thresholdSvg")
                .attr("width",width*0.265)
                .attr("height",height*0.1);
        var chartsvg=d3.select("#featureDetail").append("svg")
            .attr("id","chartSvg")
            .attr("width",width*0.8)
            .attr("height",height*0.27);


           var color_text = "black";
           switch (parseInt(feature)) {
               case 1:{ color_text = "#51689b";} break;
               case 2:{ color_text = "#fbc357";} break;
               case 3:{ color_text = "#61875d";} break;
               case 4:{ color_text = "#ce5c5c";} break;
           }
        var thresholdtext = d3.select("#thresholdSvg")
            .append("text")
            .attr("id","Text")
            .attr("x",padding.left*2)
            .attr("y",padding.top*12)
            .attr("font-size",11)
            .attr("fill",color_text)
            .style("opacity",0.8);



        var mm=[];
        var color_slider="black";
        switch(parseInt(feature))
        {
            case 1:{
                var j;
                for(j=0;j<data.length;j++)
                {
                    mm.push(parseFloat(data[j].aesthetics));
                }
                 color_slider = "#51689b";
            } break;
            case 2:{
                var j;
                for(j=0;j<data.length;j++)
                {
                    mm.push(parseFloat(data[j].memory));
                }
                color_slider = "#fbc357";
            } break;
            case 3:{
                var j;
                for(j=0;j<data.length;j++)
                {
                    mm.push(parseFloat(data[j].quality));
                }
                color_slider = "#61875d";
            } break;
            case 4:{
                var j;
                for(j=0;j<data.length;j++)
                {
                    mm.push(parseFloat(data[j].anomaly));
                }
                color_slider = "#ce5c5c";
            } break;
        }
        console.log("mm:"+mm)

        var Width = 100;
        var maxValue = d3.max(mm);
        var minValue = d3.min(mm);
        var initialValue = minValue;
        var emptyColor = "#ECECEC";
        var thumbColor = "white";
        var lineWidth = 6;
        var thumbSize = 6;
        var NormValue = (initialValue-minValue)/(maxValue-minValue); //   value normalized between 0-1
        var selectedValue;
        function dragEnded() {
            selectedValue = d3.event.x-padding.left*40;  //The pixel value of the position where the mouse moves
            if (selectedValue < 0)
                selectedValue = 0;
            else if (selectedValue > Width)
                selectedValue = Width;

            NormValue = selectedValue / Width;  //Normalized 0-1 value
            valueCircle.attr("cx", selectedValue+padding.left*40);
            valueLine.attr("x2", Width * NormValue+padding.left*40);  //The value of the stroke, the position of the end
            emptyLine.attr("x1", Width * NormValue+padding.left*40);  //Uncrossed value, starting position
            d3.event.sourceEvent.stopPropagation();
            var threshold = (NormValue*(maxValue-minValue)+minValue).toFixed(2);
            d3.select("#Text").text(threshold);

            var i;
            var aesArray=[],memoryArray=[],qualityArray=[],anomalyArray=[];

            for(i=0;i<data.length;i++)
            {
                var aes=[],memory=[],quality=[],anomaly=[];

                aes.push(i+1);
                aes.push(parseFloat(data[i].aesthetics)-threshold);

                memory.push(i+1);
                memory.push(parseFloat(data[i].memory)-threshold);


                quality.push(i+1);
                quality.push(parseFloat(data[i].quality)-threshold);


                anomaly.push(i+1);
                anomaly.push(parseFloat(data[i].anomaly)-threshold);


                aesArray.push(aes);
                memoryArray.push(memory);
                qualityArray.push(quality);
                anomalyArray.push(anomaly);
            }
            var resultAes = [],resultMemory = [],resultQuality = [],resultAnomaly = [];
            resultAes.push(aesArray);
            resultMemory.push(memoryArray);
            resultQuality.push(qualityArray);
            resultAnomaly.push(anomalyArray);

            var result = []
            switch (parseInt(feature)) {
                case 1:{ result = resultAes;} break;
                case 2:{ result = resultMemory;} break;
                case 3:{ result = resultQuality;} break;
                case 4:{ result = resultAnomaly;} break;
            }


            d3.horizon = function() {
                var bands = 1, // between 1 and 5, typically
                    mode = "offset", // or mirror
                    curve = d3.curveLinear, // or basis, monotone, step-before, etc.
                    x = d3_horizonX,
                    y = d3_horizonY,
                    w = fitWidth,
                    h = 60, //60
                    duration = 0;

                var color = d3.scaleLinear()
                    .domain([-1, 0, 0, 1])
                    .range(["#08519c", "#bdd7e7", "#bae4b3", "#006d2c"]);

                // For each small multiple…
                function horizon(g) {
                    g.each(function(d, i) {
                        var g = d3.select(this),
                            n = 2 * bands + 1,
                            xMin = Infinity,
                            xMax = -Infinity,
                            yMax = -Infinity,
                            x0, // old x-scale
                            y0, // old y-scale
                            t0,
                            id; // unique id for paths

                        // Compute x- and y-values along with extents.
                        var data = d.map(function(d, i) {
                            var xv = x.call(this, d, i),
                                yv = y.call(this, d, i);
                            if (xv < xMin) xMin = xv;
                            if (xv > xMax) xMax = xv;
                            if (-yv > yMax) yMax = -yv;
                            if (yv > yMax) yMax = yv;
                            return [xv, yv];
                        });

                        // Compute the new x- and y-scales, and transform.
                        var x1 = d3.scaleLinear().domain([xMin, xMax]).range([0, w]),
                            y1 = d3.scaleLinear().domain([0, yMax]).range([0, h * bands]),
                            t1 = d3_horizonTransform(bands, h, mode);

                        // Retrieve the old scales, if this is an update.
                        if (this.__chart__) {
                            x0 = this.__chart__.x;
                            y0 = this.__chart__.y;
                            t0 = this.__chart__.t;
                            id = this.__chart__.id;
                        } else {
                            x0 = x1.copy();
                            y0 = y1.copy();
                            t0 = t1;
                            id = ++d3_horizonId;
                        }

                        // We'll use a defs to store the area path and the clip path.
                        var defs = g.selectAll("defs")
                            .data([null]);

                        // The clip path is a simple rect.
                        defs.enter().append("defs").append("clipPath")
                            .attr("id", "d3_horizon_clip" + id)
                            .append("rect")
                            .attr("width", w)
                            .attr("height", h);

                        defs.select("rect").transition()
                            .duration(duration)
                            .attr("width", w)
                            .attr("height", h);

                        // We'll use a container to clip all horizon layers at once.
                        g.selectAll("g")
                            .data([null])
                            .enter().append("g")
                            .attr("clip-path", "url(#d3_horizon_clip" + id + ")");

                        // Instantiate each copy of the path with different transforms.
                        var path = g.select("g").selectAll("path")
                            .data(d3.range(-1, -bands - 1, -1).concat(d3.range(1, bands + 1)), Number);

                        var d0 = d3_horizonArea
                            .curve(curve)
                            .x(function(d) { return x0(d[0]); })
                            .y0(h * bands)
                            .y1(function(d) { return h * bands - y0(d[1]); })
                            (data);

                        var d1 = d3_horizonArea
                            .x(function(d) { return x1(d[0]); })
                            .y1(function(d) { return h * bands - y1(d[1]); })
                            (data);

                        path.enter().append("path")
                            .style("fill", color)
                            .attr("transform", t0)
                            .attr("d", d0);


                        // Stash the new scales.
                        this.__chart__ = {x: x1, y: y1, t: t1, id: id};
                    });
                    d3.timerFlush();
                }

                horizon.bands = function(x) {
                    if (!arguments.length) return bands;
                    bands = +x;
                    color.domain([-bands, -1, 1, bands]);
                    return horizon;
                };

                horizon.mode = function(x) {
                    if (!arguments.length) return mode;
                    mode = x + "";
                    return horizon;
                };

                horizon.colors = function(x) {
                    if (!arguments.length) return color.range();
                    color.range(x);
                    return horizon;
                };

                horizon.curve = function(x) {
                    if (!arguments.length) return curve;
                    curve = x;
                    return horizon;
                };

                horizon.x = function(z) {
                    if (!arguments.length) return x;
                    x = z;
                    return horizon;
                };

                horizon.y = function(z) {
                    if (!arguments.length) return y;
                    y = z;
                    return horizon;
                };

                horizon.width = function(x) {
                    if (!arguments.length) return w;
                    w = +x;
                    return horizon;
                };

                horizon.height = function(x) {
                    if (!arguments.length) return h;
                    h = +x;
                    return horizon;
                };

                return horizon;
            };

            var d3_horizonArea = d3.area();
            var d3_horizonId = 0;

            function d3_horizonX(d) {return d[0];}

            function d3_horizonY(d) {return d[1];}

            function d3_horizonTransform(bands, h, mode) {
                return mode == "offset"
                    ? function(d) { return "translate(0," + (d + (d < 0) - bands) * h + ")"; }
                    : function(d) { return (d < 0 ? "scale(1,-1)" : "") + "translate(0," + (d - bands) * h + ")"; };
            }

            //Drawing
            var colors;
            switch(parseInt(feature))
            {
                case 1:{ colors =["#51689b", "#d4d3d3", "#51689b", "#d4d3d3"]; } break;
                case 2:{ colors =["#fbc357", "#d4d3d3", "#fbc357", "#d4d3d3"]; } break;
                case 3:{ colors =["#61875d", "#b7bbb7", "#61875d", "#b7bbb7"]; } break;
                case 4:{ colors =["#ce5c5c", "#d4d3d3", "#ce5c5c", "#d4d3d3"]; } break;

            }


            var chart = d3.horizon()
                .width(fitWidth)
                .height(60) //60
                .bands(1)   //initial value
                .mode("mirror")  //initial value
                .curve(d3.curveMonotoneX)
                .colors(colors);  //Use only the middle two, the first is negative and the second is positive

            d3.select("#chartSvg").selectAll("*").remove();
            chartsvg.data(result).call(chart);

        }

        var valueLine = thresholdsvg.append("line")
            .attr("x1", padding.left*40)
            .attr("x2", Width * NormValue+padding.left*40)
            .attr("y1", padding.top*11)
            .attr("y2", padding.top*11)
            .style("stroke", color_slider)
            .style("opacity",0.5)
            .style("stroke-linecap", "round")
            .style("stroke-width", lineWidth);
        var emptyLine = thresholdsvg.append("line")
            .attr("x1", Width * NormValue+padding.left*40)
            .attr("x2", Width+padding.left*40)
            .attr("y1", padding.top*11)
            .attr("y2", padding.top*11)
            .style("stroke", emptyColor)
            .style("stroke-linecap", "round")
            .style("stroke-width", lineWidth);
        var valueCircle = thresholdsvg.append("circle")
            .attr("cx", width * NormValue+padding.left*40)
            .attr("cy", padding.top*11)
            .attr("r", thumbSize)
            .style("stroke", "#a1a1a1")
            .style("stroke-width", 1)
            .style("fill", thumbColor)
            .call(d3.drag().on("drag", dragEnded));

    });














}








