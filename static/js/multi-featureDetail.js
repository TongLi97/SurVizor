//Draw feature pixels according to the selected video
function multifeatureDetailJS(value)
{
    console.log('Start drawing feature pixels based on the selected video!')
    value = parseInt(value)
    docStr = "static/upload/data/featureCSV/"
    indexVideo = 0
    switch(value)
    {
        case 1:{ docStr = docStr +"multi_HC3_normal.csv"; indexVideo=182; } break;  //不添加为了整除8的数,只使用原始数据
        case 2:{ docStr = docStr +"multi_HC4_normal.csv";  indexVideo=182; } break;
        case 3:{ docStr = docStr +"multi_IP2_normal.csv";  indexVideo=182; } break;
        case 4:{ docStr = docStr +"multi_IP5_normal.csv";  indexVideo=182; } break;
        case 5:{ docStr = docStr +"multi_Air_normal.csv";  indexVideo=179; } break;
        case 6:{ docStr = docStr +"multi_Car_normal.csv";  indexVideo=146; } break;
        case 7:{ docStr = docStr +"multi_ST_normal.csv";  indexVideo=70; } break;

    }

    d3.csv(docStr).then(function (data) {
        console.log("Reading raw data...")
        console.log(docStr)
        featureArray_4 = [];
        aesArray = []
        memoryArray = []
        qualityArray = []
        anomalyArray = []


        for(i=0;i<indexVideo;i++)
        {
            aesArray.push(parseFloat(data[i].aesthetics).toFixed(2))
            memoryArray.push(parseFloat(data[i].memory).toFixed(2))
            qualityArray.push(parseFloat(data[i].quality).toFixed(2))
            anomalyArray.push(parseFloat(data[i].anomaly).toFixed(2))
        }

        featureArray_4.push(aesArray);
        featureArray_4.push(memoryArray);
        featureArray_4.push(qualityArray);
        featureArray_4.push(anomalyArray);
        console.log(featureArray_4)


        var width = $("#featureDetail").innerWidth();
        var height = $("#featureDetail").innerHeight();
        var padding={top:1,right:1,bottom:1,left:1};

        var svg=d3.select("#featureDetail").append("svg")
            .attr("id","featureDetailSvg")
            .attr("width",width*0.8)
            .attr("height",height*0.6);


        //Draw 4 pixel bar in seconds
        for(k=0;k<featureArray_4.length;k++)
        {
            let pixel_color ;
            var minFeature = d3.min(featureArray_4[k])
            var maxFeature = d3.max(featureArray_4[k])
            switch(k)
            {
                case 0:{ pixel_color = d3.scaleLinear()
                    .domain([minFeature , maxFeature])
                    .range(["#f0f5f8","#51689b"]) } break;
                case 1:{ pixel_color = d3.scaleLinear()
                    .domain([minFeature , maxFeature])
                    .range(["#f3eeea","rgb(251,195,87)"])} break;
                case 2:{ pixel_color = d3.scaleLinear()
                    .domain([minFeature , maxFeature])
                    .range(["#d4dcd3","#61875d"])} break;
                case 3:{ pixel_color = d3.scaleLinear()
                    .domain([minFeature , maxFeature])
                    .range(["#f5eded","rgb(205,104,104)"])} break;
            }


            function x_rect(i)
            {
                i= i+1;
                return padding.left*3+6.2*(i-1);
            }
            function y_rect()
            {
                return padding.top+k*20;
            }

            kStr= k.toString()
            str = "pixel"+ kStr.toString();
            strg = "#pixel"+ kStr.toString();
            fillstr = "fill" +kStr.toString();
            fillstrg ="#fill" +kStr.toString();


            var pixelg=d3.select("#featureDetailSvg")
                .append("g")
                .attr("id",str)
                .attr("transform","translate("+padding.left+","+(padding.top*3+k*15)+")");


            let rects=d3.select(strg)
                .selectAll("rect")
                .data(featureArray_4[k])
                .enter()
                .append("rect")
                .attr("fill",function (d) {
                    return pixel_color(d);
                })
                .attr("x",function(d,i){
                    return x_rect(i);

                })
                .attr("y",function (d) {
                    return y_rect();
                })
                .attr("width",6.2)  //5
                .attr("height",30)  //10
                .on("mouseover",function(d){
                    d3.select(this).transition(500).attr("fill","#bdbdbd");
                })
                .on("mouseout",function(d){
                    d3.select(this).transition(500).attr("fill",pixel_color(d));
                });

            console.log(strg)

            }

    });
}


