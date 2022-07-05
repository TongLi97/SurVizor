function tsnePointJS()
{

    var brushvalue = window.brushValue;
    var secondLeft = parseInt((brushPixel[0]-3)/6.2)
    var secondRight = parseInt((brushPixel[1]-3)/6.2)

    $.ajax({
        url:"/ajax_tsne/",
        method:"Get",
        async: true,
        data:{"video":brushvalue,"leftSecond":secondLeft,"rightSecond":secondRight,
               csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val()
             } ,
        beforeSend: function () {
            $('#loadingModal').css('display','block')

        },
        complete: function () {
            $('#loadingModal').css('display','none')
        },
        traditional:true,
        cache:false,
        success:function (result) {
            console.log("tsne响应！！！！")
            console.log("秒数"+secondLeft+","+secondRight)

            var Re = result;
            var i;
            var data = []   //Stored is multiple [ [4 features] , x , y , frame ]
            var dataX = []  //Store the x-coordinate to calculate the X-axis range
            var dataY = []  //Store the y-coordinate to calculate the Y-axis range
            var dataFrame = [] //Store frames to compute temporal colormaps

            for(i=0;i<Re.length;i++)
            {
                var XY = Re[i];  //XY {"aes":0.2222,"mem":0.344,"qua":0.596,"ano":0.827,"x":40.67675018310547,"y":36.4661865234375,"frame":10}
                var xyArray = [];  //[ [4 features] , x , y , frame ]

                var dataFeature = [];//Store 4 features to compute sector
                var aes = XY.aes;
                var mem = XY.mem;
                var qua = XY.qua;
                var ano = XY.ano;
                dataFeature.push(parseFloat(aes));
                dataFeature.push(parseFloat(mem));
                dataFeature.push(parseFloat(qua));
                dataFeature.push(parseFloat(ano));
                xyArray.push(dataFeature);

                var x = XY.x;
                var y = XY.y;
                var f = XY.frame
                xyArray.push(parseFloat(x))  //x
                dataX.push(parseFloat(x))
                xyArray.push(parseFloat(y))   //y
                dataY.push(parseFloat(y))
                xyArray.push(parseInt(f))    //frame
                dataFrame.push(parseInt(f))

                data.push(xyArray)
            }



            var width = $("#featureDetail").innerWidth()*0.15;
            var height = $("#featureDetail").innerHeight()*0.7;
            console.log(width+ ","+ height);
            var padding={top:5,right:5,bottom:5,left:5};


            var svg=d3.select("#featureDetail").append("svg")
                    .attr("id","tsnePoint")
                    .attr("width",width)
                    .attr("height",height);

            var x_scale = d3.scaleLinear()
                .domain([d3.min(dataX)-5 , d3.max(dataX)+5])
                .range([padding.left, width-padding.right]);
            var y_scale = d3.scaleLinear()
                .domain([d3.min(dataY)-5 , d3.max(dataY)+5])
                .range([height-padding.bottom, padding.top]);
            var color_scale = d3.scaleLinear()
                .domain([d3.min(dataFrame) , d3.max(dataFrame)])
                .range(["#a9c0f8", "#51689b"]);
            var color_feature = d3.scaleOrdinal()
                .domain([0,1,2,3 ])
                .range(["#51689b","#fbc357","#61875d","#ce5c5c"]);
            var tooltip =d3.select("#tsnePoint").append("div")
                    .attr("class","tooltip")
                    .style("z-index", "10")
                    .style("visibility", "hidden");



            var pie = d3.pie();
            var outerRadius = 10; //outer radius
            var innerRadius = 3; //inner radius
            var arc = d3.arc()  //arc generator
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            //Start drawing a scatter pie chart
            let m;
            for(m=0;m<data.length;m++)
            {
                var dataset = data[m][0];
                var piedata =pie(dataset);
                var g=svg.append("g")
                    .attr("id",m);
                var arcs = g.selectAll("g")
                    .data(piedata)
                    .enter()
                    .append("g")
                    .attr("transform","translate("+ (x_scale(data[m][1])) +","+ (y_scale(data[m][2])) +")");

                arcs.append("path")
                    .attr("fill",function(d,i){
                        return color_feature(i);
                    })
                    .attr("d",function(d){
                        return arc(d);   //Call the arc generator to get the path value
                    })
                    .style("opacity",0.6)
                   ;
                let text = data[m][3];
                var circle = g.append("circle")
                    .attr('cx',  x_scale(data[m][1]))
                    .attr('cy',  y_scale(data[m][2]))
                    .attr('r', 3)
                    .attr("fill", color_scale(data[m][3]))
                    .style("opacity",1)
                    .on("mouseover",function()
                    {
                        d3.select(this).transition().duration(200).attr("r",5);
                    })
                    .on('mouseout', function () {
                        d3.select(this).transition().duration(200).attr("r",3);
                    })
                    .on('click',function(){
                        var indexFrame = text;
                        functionPlaySelectedTSNE(indexFrame);
                    })
                ;
            }

        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });
}

