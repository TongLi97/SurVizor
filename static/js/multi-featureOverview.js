//Draw FeaturePixel View Menu bar
function multi_featureToolJS()
{
    console.log("Start drawing the menu bar for the left view!")

    var width = $("#iconTool").innerWidth();
    var height = $("#iconTool").innerHeight();

    var padding={top:1,right:1,bottom:1,left:5};

    var svg=d3.select("#iconTool").append("svg")
        .attr("id","toolSvg")
        .attr("width",width)
        .attr("height",height);

    var color_ordinal = d3.scaleOrdinal()
        .domain([1,2,3,4])
        .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);//["#75a4cb","#e5cda5","#61875d","#9693cd"]


    window.feavalue = 0;
    var timer = null;
    var g=d3.select("#toolSvg")
        .append("g")
        .attr("transform","translate("+padding.left*8+","+padding.top+")")
    ;
    var rect1 = d3.select("#toolSvg")
        .append("path")
        .attr("id","aes")
        .attr("d", rightRoundedRect(padding.left+40, padding.top, 40, 20, 10))
        .attr("fill",color_ordinal(1))
        .attr("opacity",0.7)
        .on("mouseover",function(){
            d3.select(this).transition(500).style("opacity",0.6);
        })
        .on("mouseout",function(){
            d3.select(this).transition(500).style("opacity",1);
        })
        .on("click",function (){
            d3.select("#thresholdSvg").remove();
            d3.select("#chartSvg").remove();
        })
        ;
    var text1 = d3.select("#toolSvg")
        .append("text")
        .text("Aesthetics")
        .attr("x",padding.left+26)
        .attr("y",padding.top+35)
        .attr("font-size",12)
        .attr("fill",color_ordinal(1))
        .attr("opacity",0.9);


    var rect2 = d3.select("#toolSvg")
        .append("path")
        .attr("id","memory")
        .attr("d", rightRoundedRect(padding.left+150, padding.top, 40, 20, 10))
        .attr("fill",color_ordinal(2))
        .attr("opacity",0.7)
        .on("mouseover",function(){
            d3.select(this).transition(500).style("opacity",0.6);
        })
        .on("mouseout",function(){
            d3.select(this).transition(500).style("opacity",1);
        })
        .on("click",function () {
            clearTimeout(timer);   //解决单机双击冲突
            timer = setTimeout(function(){
                d3.select("#thresholdSvg").remove();
                d3.select("#chartSvg").remove();
                var feature = 2;
                multiThresholdJS(feature);
            },300);
        })
        .on("dblclick",function(){
            clearTimeout(timer);
            pipBSTMemoryJS()
        });
    var text2 = d3.select("#toolSvg")
        .append("text")
        .text("Memory")
        .attr("x",padding.left+142)
        .attr("y",padding.top+35)
        .attr("font-size",12)
        .attr("fill",color_ordinal(2))
        .attr("opacity",0.9);


    var rect3 = d3.select("#toolSvg")
        .append("path")
        .attr("id","anomaly")
        .attr("d", rightRoundedRect(padding.left+260, padding.top, 40, 20, 10))
        .attr("fill",color_ordinal(3))
        .attr("opacity",0.7)
        .on("mouseover",function(){
            d3.select(this).transition(500).style("opacity",0.6);
        })
        .on("mouseout",function(){
            d3.select(this).transition(500).style("opacity",1);
        })
        .on("click",function () {

            d3.select("#thresholdSvg").remove();
            d3.select("#chartSvg").remove();
            var feature =3;
            multiThresholdJS(feature);

        })

    ;
    var text3 = d3.select("#toolSvg")
        .append("text")
        .text("Quality")
        .attr("x",padding.left+255)
        .attr("y",padding.top+35)
        .attr("font-size",12)
        .attr("fill",color_ordinal(3))
        .attr("opacity",0.9);


    var rect4 = d3.select("#toolSvg")
        .append("path")
        .attr("id","quality")
        .attr("d", rightRoundedRect(padding.left+370, padding.top, 40, 20, 10))
        .attr("fill",color_ordinal(4))
        .attr("opacity",0.7)
        .on("mouseover",function(){
            d3.select(this).transition(500).style("opacity",0.6);
        })
        .on("mouseout",function(){
            d3.select(this).transition(500).style("opacity",1);
        })
        .on("click",function () {
            clearTimeout(timer);
            timer = setTimeout(function(){
                d3.select("#thresholdSvg").remove();
                d3.select("#chartSvg").remove();
                var feature =4;
                multiThresholdJS(feature);
            },300);
        })
        .on("dblclick",function(){
            clearTimeout(timer);
            pipBSTJS()
        })
    ;
    var text4 = d3.select("#toolSvg")
        .append("text")
        .text("Anomaly")
        .attr("x",padding.left+362)
        .attr("y",padding.top+35)
        .attr("font-size",12)
        .attr("fill",color_ordinal(4))
        .attr("opacity",0.9);


    function rightRoundedRect(x, y, width, height, radius) {             //通过path绘制任意曲线
        return "M" + x + "," + y
            + "h" + (width - radius)
            + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
            + "v" + (height - 2 * radius)
            + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
            + "h" + (radius - width)
            + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius
            + "v" + (height - 2 * radius)
            + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius
            + "z";
    }



}


