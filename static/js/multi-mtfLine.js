
//Only display bin, not bulk
function mtfLineJS()
{
    console.log("Draw global bins")
    var brushvalue = window.brushValue;
    console.log("brush video:"+brushvalue)

    $.ajax({
        url:"/ajax_mtfline/",
        method:"Get",
        data:{"video":brushvalue,
               csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val()}  ,
        traditional:true,
        cache:false,
        success:function (result) {
            console.log("MTF Line response！！！！")
            var Re = JSON.parse(result);
            var binArray = Object.values(Re)
            console.log(binArray);
            var doc = "static/upload/data/featureCSV/"
            switch(brushvalue)
            {
                case 1:{doc = doc +"multi_HC3_bin.csv";} break;
                case 2:{doc = doc +"multi_HC4_bin.csv";} break;
                case 3:{doc = doc +"multi_IP2_bin.csv";} break;
                case 4:{doc = doc +"multi_IP5_bin.csv";} break;
                case 5:{doc = doc +"multi_Air_bin.csv";} break;
                case 6:{doc = doc +"multi_Car_bin.csv";} break;
                case 7:{doc = doc +"multi_ST_bin.csv";} break;
            }

            d3.csv(doc).then(function (data) {
                //Get anomaly data
                var anomalyArray=[]
                var toMax = []
                var i;
                for(i=0;i<data.length;i++)
                {
                    var anomaly = []
                    anomaly.push(i)
                    anomaly.push(parseFloat(data[i].anomaly));
                    anomalyArray.push(anomaly)
                    toMax.push(parseFloat(data[i].anomaly))
                }
                console.log("toMax:"+toMax)


                var width = $("#MTFline").innerWidth();
                var height = $("#MTFline").innerHeight()*0.9;
                var padding={top:1,right:5,bottom:0,left:5};
                var svg=d3.select("#MTFline").append("svg")
                    .attr("id","mtfLine")
                    .attr("width",width)
                    .attr("height",height)


                var xScale = d3.scaleLinear()
                    .domain([0,toMax.length])
                    .range([padding.left, width - padding.left - padding.right]);
                var yScale = d3.scaleLinear()
                    .domain([0, d3.max(toMax)])
                    .range([height - padding.top - padding.bottom, padding.top]);
                var xAxis = d3.axisBottom()
                    .scale(xScale);
                var yAxis = d3.axisLeft()
                    .scale(yScale);


                var linePath = d3.line()
                    .x(function(d){ return xScale(d[0]) })
                    .y(function(d){ return yScale(d[1]) });

                svg.append('g')
                    .append('path')
                    .attr('class', 'line-path')
                    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                    .attr('d', linePath(anomalyArray))
                    .attr('fill', 'none')
                    .attr('stroke-width', 2)
                    .attr('stroke', '#cdcccc');


                //draw bin background
                var j;
                var color = d3.scaleLinear()
                    .domain([0,8])
                    .range(["#f8a9a9", "#7486ac"]);
                for(j=0;j<binArray.length-1;j++)
                {
                    svg.append('g')
                        .append("rect")
                        .attr('class', 'bin')
                        .attr("x",padding.left)
                        .attr("y",yScale(binArray[j+1])+padding.top)
                        .attr("width",width - padding.left - padding.right)
                        .attr("height",yScale(binArray[j])-yScale(binArray[j+1]))
                        .attr("fill",/*color(j)*/"#ffffff")
                        .attr("stroke","#cdcccc")
                        .style("opacity",0.4);

                }

            });


        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });
}


//Do not display bin, display the corresponding bulk
function mtfBulkJS(nodeColorArray)
{
    //need to be modified manually brushvalue chooseIndex  nodeColorArray
    console.log("Plot global bins, local bulk and polylines")

    var brushvalue = window.brushValue;
    console.log("brush value:"+brushvalue)

    $.ajax({
        url:"/ajax_mtfline/",
        method:"Get",
        data:{"video":brushvalue,
              csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val()}  ,
        traditional:true,
        cache:false,
        success:function (result) {
            var Re = result;
            var binArray = Object.values(Re)
            console.log("Segmentation bins for outliers of selected videos:"+binArray);
            var doc = "static/upload/data/featureCSV/"
            switch(brushvalue)
            {
                case 1:{doc = doc +"multi_HC3_bin.csv";} break;
                case 2:{doc = doc +"multi_HC4_bin.csv";} break;
                case 3:{doc = doc +"multi_IP2_bin.csv";} break;
                case 4:{doc = doc +"multi_IP5_bin.csv";} break;
                case 5:{doc = doc +"multi_Air_bin.csv";} break;
                case 6:{doc = doc +"multi_Car_bin.csv";} break;
                case 7:{doc = doc +"multi_ST_bin.csv";} break;
            }

            d3.csv(doc).then(function (data) {
                var toMax = []
                var i;
                for(i=0;i<data.length;i++)
                {
                    toMax.push(parseFloat(data[i].anomaly))
                }
                console.log("toMax:"+toMax)

                //draw line
                d3.select("#mtfBulk").remove();
                var width = $("#MTFline").innerWidth();
                var height = $("#MTFline").innerHeight()*0.9;
                var padding={top:0,right:5,bottom:5,left:5};
                var svg=d3.select("#MTFline").append("svg")
                    .attr("id","mtfBulk")
                    .attr("width",width)
                    .attr("height",height)
                var xScale = d3.scaleLinear()
                    .domain([0-1,toMax.length])
                    .range([padding.left, width - padding.left - padding.right]);
                var yScale = d3.scaleLinear()
                    .domain([0, d3.max(toMax)])
                    .range([height - padding.top - padding.bottom, padding.top]);
                var xAxis = d3.axisBottom()
                    .scale(xScale);
                var yAxis = d3.axisLeft()
                    .scale(yScale);

                //draw bin background
                var j;
                var color = d3.scaleLinear()
                    .domain([0,8])
                    .range(["#f8a9a9", "#7486ac"]);
                for(j=0;j<binArray.length-1;j++)
                {
                    svg.append('g')
                        .append("rect")
                        .attr('class', 'bin')
                        .attr("x",padding.left)
                        .attr("y",yScale(binArray[j+1])+padding.top)
                        .attr("width",width - padding.left - padding.right)
                        .attr("height",yScale(binArray[j])-yScale(binArray[j+1]))
                        .attr("fill",/*color(j)*/"#ffffff")
                        .attr("stroke","#cdcccc")
                        .style("opacity",0.4);

                }


                //version1
                /*
                                      var chooseIndex = 124
                                      //只绘制局部节点块和局部折线(连着的三个)
                                      var segwidth = $("#localBulk").innerWidth();
                                      var segheight = $("#localBulk").innerHeight()*0.1;
                                      var segpadding={top:0,right:5,bottom:5,left:5};
                                      var segSvg=d3.select("#localBulk").append("svg")
                                          .attr("id","bulkSvg")
                                          .attr("width",segwidth)
                                          .attr("height",segheight);
                                      //修改x范围以及获取局部数据！！！！！ 画局部
                                      var localScale;
                                      var localAnomalyArray=[];
                                      //绘制局部块
                                      if(chooseIndex<20){
                                          localScale = d3.scaleLinear()
                                              .domain([0-1,39+1])
                                              .range([padding.left, width - padding.left - padding.right]);
                                          var r;
                                          for(r=0;r<39;r++)
                                          {
                                              segSvg.append('g')
                                                  .append("rect")
                                                  .attr("x",localScale(r-0.5)+padding.left)
                                                  .attr("id","bulk"+r)
                                                  .attr("y",segpadding.top)
                                                  .attr("width",localScale(r+0.5)-localScale(r-0.5))  //加减0.5是为了不留空隙
                                                  .attr("height",15)
                                                  .attr("fill","#cdcccc")
                                                  .attr("stroke","#808080")
                                                  .style("opacity",0.9);
                                              segSvg.append('g')
                                                  .append('text')
                                                  .text(r)
                                                  .attr("x",localScale(r-0.5)+7)
                                                  .attr("y",segpadding.top+10)
                                                  .attr("font-size",10)
                                                  .attr("fill","#808080")
                                                  .style("opacity",0.8);
                                          }
                                          var count;
                                          for(count=0;count<40;count++)
                                          {
                                              var localAnomaly = []
                                              localAnomaly.push(count)
                                              localAnomaly.push(parseFloat(data[count].anomaly));
                                              localAnomalyArray.push(localAnomaly)
                                          }
                                      }
                                      else if(chooseIndex>171){
                                          localScale = d3.scaleLinear()
                                              .domain([152-1,191+1])
                                              .range([padding.left, width - padding.left - padding.right]);
                                          var r;
                                          for(r=152;r<192;r++)
                                          {
                                              segSvg.append('g')
                                                  .append("rect")
                                                  .attr("x",localScale(r-0.5)+padding.left)
                                                  .attr("id","bulk"+r)
                                                  .attr("y",segpadding.top)
                                                  .attr("width",localScale(r+0.5)-localScale(r-0.5))  //加减0.5是为了不留空隙
                                                  .attr("height",15)
                                                  .attr("fill","#cdcccc")
                                                  .attr("stroke","#808080")
                                                  .style("opacity",0.9);
                                              segSvg.append('g')
                                                  .append('text')
                                                  .text(r)
                                                  .attr("x",localScale(r-0.5)+7)
                                                  .attr("y",segpadding.top+10)
                                                  .attr("font-size",10)
                                                  .attr("fill","#808080")
                                                  .style("opacity",0.8);
                                          }
                                          var count;
                                          for(count=152;count<192;count++)
                                          {
                                              var localAnomaly = []
                                              localAnomaly.push(count)
                                              localAnomaly.push(parseFloat(data[count].anomaly));
                                              localAnomalyArray.push(localAnomaly)
                                          }
                                      }
                                      else{
                                          localScale = d3.scaleLinear()
                                              .domain([chooseIndex-21,chooseIndex+21])
                                              .range([padding.left, width - padding.left - padding.right]);
                                          var r;
                                          for(r=(chooseIndex-20);r<(chooseIndex+20);r++)
                                          {
                                              segSvg.append('g')
                                                  .append("rect")
                                                  .attr("x",localScale(r-0.5)+padding.left)
                                                  .attr("id","bulk"+r)
                                                  .attr("y",segpadding.top)
                                                  .attr("width",localScale(r+0.5)-localScale(r-0.5))  //加减0.5是为了不留空隙
                                                  .attr("height",15)
                                                  .attr("fill","#cdcccc")
                                                  .attr("stroke","#808080")
                                                  .style("opacity",0.9);
                                              segSvg.append('g')
                                                  .append('text')
                                                  .text(r)
                                                  .attr("x",localScale(r-0.5)+7)
                                                  .attr("y",segpadding.top+10)
                                                  .attr("font-size",10)
                                                  .attr("fill","#808080")
                                                  .style("opacity",0.8);
                                          }
                                          var count;
                                          for(count=(chooseIndex-20);count<(chooseIndex+20);count++)
                                          {
                                              var localAnomaly = []
                                              localAnomaly.push(count)
                                              localAnomaly.push(parseFloat(data[count].anomaly));
                                              localAnomalyArray.push(localAnomaly)
                                          }
                                      }

                                      //开始绘制局部线
                                      var linePath = d3.line()
                                          .x(function(d){ return localScale(d[0]) })
                                          .y(function(d){ return yScale(d[1]) });
                                      svg.append('g')
                                          .append('path')
                                          .attr('class', 'line-path')
                                          .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                                          .attr('d', linePath(localAnomalyArray))
                                          .attr('fill', 'none')
                                          .attr('stroke-width', 2)
                                          .attr('stroke', '#cdcccc');

                                      //选择相应的节点块进行染色
                                      var nodeColor = [2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,3,1,1,1,1,1,1,1,3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,1,3,3,1,1,1,1,1,0,2,2,2,2,2,2,2,2,2,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,2,2,2,2,2,2,2,0,0,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];
                                      var color;  //边和点的颜色
                                      switch (nodeColor.filter( (item, index ,arr)=>arr.indexOf(item) === index ).length) {
                                          case 2:{color = d3.scaleOrdinal().domain([0,1]).range(["#fc8d59","#91cf60"]);}break;
                                          case 3:{color = d3.scaleOrdinal().domain([0,1,2]).range(["#fc8d59","#ffffbf","#91cf60"]);}break;
                                          case 4:{color = d3.scaleOrdinal().domain([0,1,2,3]).range(["#fc8d59","#ffffbf","#a6d96a","#61875d"]);}break;
                                          case 5:{color = d3.scaleOrdinal().domain([0,1,2,3,4]).range(["#fdae61","#ffffbf","#91cf60","#61875d","#ce5c5c"]);}break;
                                          case 6:{color = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range(["#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                                          case 7:{color = d3.scaleOrdinal().domain([0,1,2,3,4,5,6]).range(["#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                                          case 8:{color = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7]).range(["#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#ce5c5c"]);}break;
                                      }

                                      //绘制选择的节点块
                                      var rectBulk = "#bulk"
                                      if(chooseIndex===0)
                                      {
                                          d3.select("#bulkSvg").select("#bulk0")
                                              .attr("fill",color(nodeColor[0]))
                                              .style("opacity",0.9);
                                          d3.select("#bulkSvg").select("#bulk1")
                                              .attr("fill",color(nodeColor[1]))
                                              .style("opacity",0.9);
                                          d3.select("#bulkSvg").select("#bulk2")
                                              .attr("fill",color(nodeColor[2]))
                                              .style("opacity",0.9);
                                      }
                                      else if(chooseIndex===191)
                                      {
                                          d3.select("#bulkSvg").select("#bulk189")
                                              .attr("fill",color(nodeColor[189]))
                                              .style("opacity",0.9);
                                          d3.select("#bulkSvg").select("#bulk190")
                                              .attr("fill",color(nodeColor[190]))
                                              .style("opacity",0.9);
                                          d3.select("#bulkSvg").select("#bulk191")
                                              .attr("fill",color(nodeColor[191]))
                                              .style("opacity",0.9);

                                      }
                                      else
                                      {
                                          var bulkIndexF =  rectBulk + (chooseIndex-1)
                                          d3.select("#bulkSvg").select(bulkIndexF)
                                              .attr("fill",color(nodeColor[chooseIndex-1]))
                                              .style("opacity",0.9);
                                          var bulkIndexM =  rectBulk + chooseIndex
                                          d3.select("#bulkSvg").select(bulkIndexM)
                                              .attr("fill",color(nodeColor[chooseIndex]))
                                              .style("opacity",0.9);
                                          var bulkIndexT =  rectBulk + (chooseIndex+1)
                                          d3.select("#bulkSvg").select(bulkIndexT)
                                              .attr("fill",color(nodeColor[chooseIndex+1]))
                                              .style("opacity",0.9);
                                      }


                */
                //version2 bulk
                var chooseIndexKaishi = parseInt(document.getElementById("leftNet").value);
                var chooseIndexJieshu = parseInt(document.getElementById("rightNet").value);
                console.log("line local block："+chooseIndexKaishi+"---"+chooseIndexJieshu)
                var segwidth = $("#MTFline").innerWidth();
                var segheight = $("#MTFline").innerHeight()*0.1;
                var segpadding={top:0,right:5,bottom:5,left:5};
                var segSvg=d3.select("#MTFline").append("svg")
                    .attr("id","bulkSvg")
                    .attr("width",segwidth)
                    .attr("height",segheight);
                //Modify xscale and get local data! ! ! ! ! paint part
                var localScale;
                var localAnomalyArray=[];

                localScale = d3.scaleLinear()
                    .domain([chooseIndexKaishi-6,chooseIndexJieshu+6])
                    .range([padding.left, width - padding.left - padding.right]);
                var r;
                for(r=(chooseIndexKaishi-5);r<(chooseIndexJieshu+5);r++)
                {
                    segSvg.append('g')
                        .append("rect")
                        .attr("x",localScale(r-0.5)+padding.left)
                        .attr("id","bulk"+r)
                        .attr("y",segpadding.top)
                        .attr("width",localScale(r+0.5)-localScale(r-0.5))
                        .attr("height",15)
                        .attr("fill","#cdcccc")
                        .attr("stroke","#808080")
                        .style("opacity",0.9);
                    segSvg.append('g')
                        .append('text')
                        .text(r)
                        .attr("x",localScale(r-0.5)+7)
                        .attr("y",segpadding.top+10)
                        .attr("font-size",10)
                        .attr("fill","#515151")
                        .style("opacity",0.8);
                }
                var count;
                for(count=(chooseIndexKaishi-5);count<(chooseIndexJieshu+5);count++)
                {
                    var localAnomaly = []
                    localAnomaly.push(count)
                    localAnomaly.push(parseFloat(data[count].anomaly));
                    localAnomalyArray.push(localAnomaly)
                }


                //Start drawing local lines
                var linePath = d3.line()
                    .x(function(d){ return localScale(d[0]) })
                    .y(function(d){ return yScale(d[1]) });
                svg.append('g')
                    .append('path')
                    .attr('class', 'line-path')
                    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                    .attr('d', linePath(localAnomalyArray))
                    .attr('fill', 'none')
                    .attr('stroke-width', 2)
                    .attr('stroke', '#cdcccc');

                //Select the corresponding node block for coloring
                var nodeColor = nodeColorArray;
                var color;  //edge and point color
                switch (nodeColor.filter( (item, index ,arr)=>arr.indexOf(item) === index ).length) {
                    case 2:{color = d3.scaleOrdinal().domain([0,1]).range(["#fc8d59","#91cf60"]);}break;
                    case 3:{color = d3.scaleOrdinal().domain([0,1,2]).range(["#fc8d59","#ffffbf","#91cf60"]);}break;
                    case 4:{color = d3.scaleOrdinal().domain([0,1,2,3]).range(["#fc8d59","#ffffbf","#a6d96a","#61875d"]);}break;
                    case 5:{color = d3.scaleOrdinal().domain([0,1,2,3,4]).range(["#fdae61","#ffffbf","#91cf60","#61875d","#ce5c5c"]);}break;
                    case 6:{color = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range(["#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                    case 7:{color = d3.scaleOrdinal().domain([0,1,2,3,4,5,6]).range(["#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                    case 8:{color = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7]).range(["#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#ce5c5c"]);}break;
                }

                //Start drawing the selected node block
                var rectBulk = "#bulk"
                for(chooseIndexKaishi;chooseIndexKaishi<=chooseIndexJieshu;chooseIndexKaishi++)
                {
                    var bulkIndexF =  rectBulk + chooseIndexKaishi
                    d3.select("#bulkSvg").select(bulkIndexF)
                        .attr("fill",color(nodeColor[chooseIndexKaishi]))
                        .style("opacity",0.9);
                }

            });


        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });

}





