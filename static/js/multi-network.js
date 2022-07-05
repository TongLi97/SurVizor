//Only for the NETWORK of abnormal features, you need to pass in the time to highlight the part
function netWorkXYJS()
{
    var brushvalue = window.brushValue;
    console.log("brush video:"+brushvalue)


    $.ajax({
        url:"/ajax_network/",
        method:"Get",
        async: true,
        data:{"video":brushvalue,
               csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val() }  ,
        beforeSend: function () {
            $('#loadingModal').css('display','block')

        },
        complete: function () {
            $('#loadingModal').css('display','none')
        },
        traditional:true,
        cache:false,
        success:function (result) {
            console.log("MTF response！")
            var Re = result;
            console.log(Re)


            var data = Re;

            //link width
            var edgSizeArray = []
            //link color
            //var edgColorArray = []
            //node size
            var nodeSizeArray = []
            //node color
            var nodeColorArray = []
            //node x-y
            var nodeX = []
            var nodeY = []

            var k,l,v,z;


            for(k=0;k<Re.links.length;k++)
                edgSizeArray.push(Re.links[k].value)
            for(v=0;v<Re.nodes.length;v++)
                nodeSizeArray.push(Re.nodes[v].size)
            for(l=0;l<Re.nodes.length;l++)
                nodeColorArray.push(Re.nodes[l].group)
            for(z=0;z<Re.posXY.length;z++)
            {
                var obj = Re.posXY[z];
                nodeX.push(obj[z][0])
                nodeY.push(obj[z][1])
            }

            console.log("link size："+edgSizeArray)
            console.log("node color："+nodeColorArray)
            console.log("node color deduplication："+nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ))
            console.log("node size："+nodeSizeArray)

            var labelColor;
            switch (nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ).length) {
                case 2:{labelColor = d3.scaleOrdinal().domain([0,1]).range(["#fc8d59","#91cf60"]);}break;
                case 3:{labelColor = d3.scaleOrdinal().domain([0,1,2]).range(["#fc8d59","#ffffbf","#91cf60"]);}break;
                case 4:{labelColor = d3.scaleOrdinal().domain([0,1,2,3]).range(["#fc8d59","#ffffbf","#a6d96a","#61875d"]);}break;
                case 5:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4]).range(["#fdae61","#ffffbf","#91cf60","#61875d","#ce5c5c"]);}break;
                case 6:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range(["#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 7:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6]).range(["#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 8:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7]).range(["#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#ce5c5c"]);}break;
            }

            var edgSize = d3.scaleLinear()
                .domain([d3.min(edgSizeArray) , d3.max(edgSizeArray)])
                .range([1,5]);

            var nodeSize = d3.scaleLinear()
                .domain([d3.min(nodeSizeArray) , d3.max(nodeSizeArray)])
                .range([8,13]);

            var width = $("#Network").innerWidth();
            var height = $("#Network").innerHeight();
            var padding={top:15,right:1,bottom:1,left:15};

            d3.select("#networkNosecond").remove();
            var svg=d3.select("#Network").append("svg")
                    .attr("id","network")
                    .attr("width",width)
                    .attr("height",height);
            var x_coor = d3.scaleLinear()
                .domain([d3.min(nodeX) , d3.max(nodeX)])
                .range([padding.left,width-padding.left-padding.right]);
            var y_coor = d3.scaleLinear()
                .domain([d3.min(nodeY) , d3.max(nodeY)])
                .range([height-padding.bottom-padding.top,padding.top]);

            var leftNet = document.getElementById("leftNet").value;
            var rightNet = document.getElementById("rightNet").value ;
            console.log("Highlight local points："+leftNet+"---"+rightNet)
            function getOpacityNode(id)
            {
                if(id >= parseInt(leftNet) && id <= parseInt(rightNet))
                    return true;
                else
                    return false;
            }
            function getOpacityLink(id)
            {
                if(id>=leftNet && id<=rightNet)
                    return true;
                else
                    return false;
            }
            //version2
            function getOpacityLinkCom(leftNet,id)
            {
                switch (parseInt(leftNet)) {
                    case 5:{if(id === 8 ) return true; else return false;}break;
                    case 70:{if(id === 86 || id === 87 || id===88) return true; else return false;}break;
                    case 155:{if(id === 158 || id === 159 || id === 170 ||id === 171 ||id === 172) return true; else return false;}break; //
                }
            }




            //draw lines
            var link = svg.append("g").attr("class", "links")
                .selectAll("line")
                .data(data.links)
                .enter()
                .append("line")
                .attr("id",function (d) {
                    return d.source;
                })
                .attr("x1",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y1",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("x2",function (d,i) {
                    return x_coor(nodeX[i+1]);
                })
                .attr("y2",function (d,i) {
                    return y_coor(nodeY[i+1]);
                })
                .attr("stroke","#cdcccc")
                .attr("stroke-width",function(d){
                    return edgSize(d.value);
                })
                .style("opacity",function(d,i){
                    return (getOpacityLink(i) && getOpacityLinkCom(leftNet,i))? 0.9:0.1;
                });

            //draw circles
            var node = svg.append("g").attr("class", "nodes")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("circle")
                .attr("id",function (d) {
                    return d.id;
                })
                .attr("r", function(d){
                    return nodeSize(d.size)
                })
                .attr("cx",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("cy",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("fill", function(d) {
                    return labelColor(d.group);
                })
                .style("opacity",function(d,i){

                    return getOpacityNode(i)? 0.9:0.1; //version2
                })
                .on('click',function(d){
                    console.log("点击啦！！！")
                    console.log(d.id)
                    var indexFrame = d.id;
                    functionPlaySelectedNet(indexFrame);
                });
            // V1 V2 choose a painting
            // V1: Display the bin segmentation of the polyline while drawing the network diagram
            //mtfLineJS()
            // V2: The display is not the bin segmentation, but the bulk of the corresponding point
            mtfBulkJS(nodeColorArray)

            svg.append("g")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("text")
                .text(function (d,i) {
                    return d.id;
                })
                .attr("x",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .style("fill", "#515151")
                .style("font-family", "Arial")
                .style("font-size", 10)
                .style("opacity",function(d,i){
                    return getOpacityNode(i)? 0.9:0;
                });







        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });
}

//When no seconds are entered, all are displayed, and some parts are not highlighted
function netWorkXYJSNoSecond()
{
    var brushvalue = window.brushValue;
    console.log("brush value:"+brushvalue)

    $.ajax({
        url:"/ajax_network/",
        method:"Get",
        async: true,

        data:{"video":brushvalue,
               csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val()} ,
        beforeSend: function () {
            $('#loadingModal').css('display','block')

        },
        complete: function () {
            $('#loadingModal').css('display','none')
        },
        traditional:true,
        cache:false,
        success:function (result) {
            console.log("MTF response！！！！")
            var Re = result;
            console.log(Re)
            var data = Re;
            //link width
            var edgSizeArray = []
            //link color
            //var edgColorArray = []
            //node size
            var nodeSizeArray = []
            //node color
            var nodeColorArray = []
            //node x-y
            var nodeX = []
            var nodeY = []

            var k,l,v,z;


            for(k=0;k<Re.links.length;k++)
                edgSizeArray.push(Re.links[k].value)

            for(v=0;v<Re.nodes.length;v++)
                nodeSizeArray.push(Re.nodes[v].size)
            for(l=0;l<Re.nodes.length;l++)
                nodeColorArray.push(Re.nodes[l].group)
            for(z=0;z<Re.posXY.length;z++)
            {
                var obj = Re.posXY[z];
                nodeX.push(obj[z][0])
                nodeY.push(obj[z][1])
            }

            console.log("link width："+edgSizeArray)
            console.log("node color："+nodeColorArray)
            console.log("node color deduplication："+nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ))
            console.log("node size："+nodeSizeArray)


            var labelColor;
            switch (nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ).length) {
                case 2:{labelColor = d3.scaleOrdinal().domain([0,1]).range(["#fc8d59","#91cf60"]);}break;
                case 3:{labelColor = d3.scaleOrdinal().domain([0,1,2]).range(["#fc8d59","#ffffbf","#91cf60"]);}break;
                case 4:{labelColor = d3.scaleOrdinal().domain([0,1,2,3]).range(["#fc8d59","#ffffbf","#a6d96a","#61875d"]);}break;
                case 5:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4]).range(["#fdae61","#ffffbf","#91cf60","#61875d","#ce5c5c"]);}break;
                case 6:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range(["#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 7:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6]).range(["#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 8:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7]).range(["#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#ce5c5c"]);}break;
            }

            var edgSize = d3.scaleLinear()
                .domain([d3.min(edgSizeArray) , d3.max(edgSizeArray)])
                .range([1,5]);

            var nodeSize = d3.scaleLinear()
                .domain([d3.min(nodeSizeArray) , d3.max(nodeSizeArray)])
                .range([8,13]);

            var width = $("#Network").innerWidth();
            var height = $("#Network").innerHeight();
            var padding={top:15,right:1,bottom:1,left:15};


            var svg=d3.select("#Network").append("svg")
                    .attr("id","networkNosecond")
                    .attr("width",width)
                    .attr("height",height);
            var x_coor = d3.scaleLinear()
                .domain([d3.min(nodeX) , d3.max(nodeX)])
                .range([padding.left,width-padding.left-padding.right]);
            var y_coor = d3.scaleLinear()
                .domain([d3.min(nodeY) , d3.max(nodeY)])
                .range([height-padding.bottom-padding.top,padding.top]);


            //draw links
            var link = svg.append("g").attr("class", "links")
                .selectAll("line")
                .data(data.links)
                .enter()
                .append("line")
                .attr("id",function (d) {
                    return d.source;
                })
                .attr("x1",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y1",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("x2",function (d,i) {
                    return x_coor(nodeX[i+1]);
                })
                .attr("y2",function (d,i) {
                    return y_coor(nodeY[i+1]);
                })
                .attr("stroke","#cdcccc")
                .attr("stroke-width",function(d){
                    return edgSize(d.value);
                })
                .style("opacity",0.5);

            //draw circles
            var node = svg.append("g").attr("class", "nodes")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("circle")
                .attr("id",function (d) {
                    return d.id;
                })
                .attr("r", function(d){
                    return nodeSize(d.size)
                })
                .attr("cx",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("cy",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("fill", function(d) {
                    return labelColor(d.group);
                })
                .style("opacity",0.9)
                .on('click',function(d)
                {
                    var indexFrame = d.id;
                    functionPlaySelectedNet(indexFrame)
                });


            node.on("mouseover", focus).on("mouseout", unfocus);
            //Special: When node 0 is selected, its nodes and connections are displayed
            function node0(id)
            {
                if((id===0) || (id===1) || (id===2))
                    return true;
                else
                    return false;
            }
            function link0(id)
            {
                if((id===0) || (id===1))
                    return true;
                else
                    return false;
            }
            //Special: When node 191 is selected, its nodes and connections are displayed
            function node191(id)
            {
                if((id===189) || (id===190) || (id===191))
                    return true;
                else
                    return false;

            }
            function link191(id)
            {
                if((id===189) || (id===190))
                    return true;
                else
                    return false;

            }
            //else
            function confirmNodeThree(i,index)
            {
                if((i===index-1) || (i===index) || (i===index+1))
                    return true;
                else
                    return false;
            }
            function confirmLinkTwo(i,index)
            {
                if((i===index-1) || (i===index))
                    return true;
                else
                    return false;
            }

            function focus(d) {
                var index = d3.select(d3.event.target).datum().id;

                //The corresponding adjacent nodes are displayed on the network diagram
                if(index===0)
                {
                    d3.select("#networkNosecond").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node0(circleID)? 1 : 0.1);
                        });
                    d3.select("#networkNosecond").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link0(lineID)? 1 : 0.1);
                        });
                    svg.append("g")
                        .append("text")
                        .text("0")
                        .attr("x",x_coor(nodeX[0])-4)
                        .attr("y",y_coor(nodeY[0])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);
                    svg.append("g")
                        .append("text")
                        .text("1")
                        .attr("x",x_coor(nodeX[1])-4)
                        .attr("y",y_coor(nodeY[1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);
                    svg.append("g")
                        .append("text")
                        .text("2")
                        .attr("x",x_coor(nodeX[2])-4)
                        .attr("y",y_coor(nodeY[2])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);

                }
                else if(index===191)
                {
                    d3.select("#networkNosecond").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node191(circleID)? 1 : 0.1);
                        });
                    d3.select("#networkNosecond").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link191(lineID)? 1 : 0.1);
                        });
                    svg.append("g")
                        .append("text")
                        .text("189")
                        .attr("x",x_coor(nodeX[189])-4)
                        .attr("y",y_coor(nodeY[189])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);
                    svg.append("g")
                        .append("text")
                        .text("190")
                        .attr("x",x_coor(nodeX[190])-4)
                        .attr("y",y_coor(nodeY[190])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);
                    svg.append("g")
                        .append("text")
                        .text("191")
                        .attr("x",x_coor(nodeX[191])-4)
                        .attr("y",y_coor(nodeY[191])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);

                }
                else
                {
                    d3.select("#networkNosecond").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', confirmNodeThree(circleID,index)? 1 : 0.1);
                        });
                    d3.select("#networkNosecond").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', confirmLinkTwo(lineID,index)? 1 : 0.1);
                        });
                    svg.append("g")
                        .append("text")
                        .text(index)
                        .attr("x",x_coor(nodeX[index])-4)
                        .attr("y",y_coor(nodeY[index])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);
                    svg.append("g")
                        .append("text")
                        .text(index-1)
                        .attr("x",x_coor(nodeX[index-1])-4)
                        .attr("y",y_coor(nodeY[index-1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);
                    svg.append("g")
                        .append("text")
                        .text(index+1)
                        .attr("x",x_coor(nodeX[index+1])-4)
                        .attr("y",y_coor(nodeY[index+1])+3)
                        .style("fill","#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10);

                }

            }

            function unfocus() {
                node.style("opacity", 1);
                link.style("opacity", 1);
                svg.selectAll("text").style("opacity", 0);

            }

        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });

}

function netWorkAesXYJS()
{
    var brushvalue = window.brushValue;
    console.log("刷取的视频做网络图:"+brushvalue)

    $.ajax({
        url:"networkAesServlet",
        method:"Get",        //400 字符串无法解析 是因为之前写num_array 这个-不对
        contentType:"application/json;charset=UTF-8",
        data:{"video":brushvalue/*,"leftSecond":secondLeft,"rightSecond":secondRight*/}  ,    //这种形式就可以  JSON.stringify将JS对象转成字符串的形式  出现头过大的情况，在tomcat的server.xml加入maxPostSize="-1" maxHttpHeaderSize ="102400"
        traditional:true,
        cache:false,
        success:function (result) {
            console.log("MTF-Aes响应！！！！")
            var Re = JSON.parse(result);
            console.log(Re)


            var data = Re;
            /* var data = {
                 "nodes": [
                     {
                         "id": "Myriel",
                         "group": 1
                     },
                     {
                         "id": "Napoleon",
                         "group": 1
                     },
                     {
                         "id": "Mlle.Baptistine",
                         "group": 1
                     },
                     {
                         "id": "Mme.Magloire",
                         "group": 1
                     },
                     {
                         "id": "CountessdeLo",
                         "group": 1
                     },
                     {
                         "id": "Geborand",
                         "group": 1
                     },
                     {
                         "id": "Champtercier",
                         "group": 1
                     },
                     {
                         "id": "Cravatte",
                         "group": 1
                     },
                     {
                         "id": "Count",
                         "group": 1
                     },
                     {
                         "id": "OldMan",
                         "group": 1
                     },
                     {
                         "id": "Labarre",
                         "group": 2
                     },
                     {
                         "id": "Valjean",
                         "group": 2
                     },
                     {
                         "id": "Marguerite",
                         "group": 3
                     },
                     {
                         "id": "Mme.deR",
                         "group": 2
                     },
                     {
                         "id": "Isabeau",
                         "group": 2
                     },
                     {
                         "id": "Gervais",
                         "group": 2
                     },
                     {
                         "id": "Tholomyes",
                         "group": 3
                     },
                     {
                         "id": "Listolier",
                         "group": 3
                     },
                     {
                         "id": "Fameuil",
                         "group": 3
                     },
                     {
                         "id": "Blacheville",
                         "group": 3
                     },
                     {
                         "id": "Favourite",
                         "group": 3
                     },
                     {
                         "id": "Dahlia",
                         "group": 3
                     },
                     {
                         "id": "Zephine",
                         "group": 3
                     },
                     {
                         "id": "Fantine",
                         "group": 3
                     },
                     {
                         "id": "Mme.Thenardier",
                         "group": 4
                     },
                     {
                         "id": "Thenardier",
                         "group": 4
                     },
                     {
                         "id": "Cosette",
                         "group": 5
                     },
                     {
                         "id": "Javert",
                         "group": 4
                     },
                     {
                         "id": "Fauchelevent",
                         "group": 0
                     },
                     {
                         "id": "Bamatabois",
                         "group": 2
                     },
                     {
                         "id": "Perpetue",
                         "group": 3
                     },
                     {
                         "id": "Simplice",
                         "group": 2
                     },
                     {
                         "id": "Scaufflaire",
                         "group": 2
                     },
                     {
                         "id": "Woman1",
                         "group": 2
                     },
                     {
                         "id": "Judge",
                         "group": 2
                     },
                     {
                         "id": "Champmathieu",
                         "group": 2
                     },
                     {
                         "id": "Brevet",
                         "group": 2
                     },
                     {
                         "id": "Chenildieu",
                         "group": 2
                     },
                     {
                         "id": "Cochepaille",
                         "group": 2
                     },
                     {
                         "id": "Pontmercy",
                         "group": 4
                     },
                     {
                         "id": "Boulatruelle",
                         "group": 6
                     },
                     {
                         "id": "Eponine",
                         "group": 4
                     },
                     {
                         "id": "Anzelma",
                         "group": 4
                     },
                     {
                         "id": "Woman2",
                         "group": 5
                     },
                     {
                         "id": "MotherInnocent",
                         "group": 0
                     },
                     {
                         "id": "Gribier",
                         "group": 0
                     },
                     {
                         "id": "Jondrette",
                         "group": 7
                     },
                     {
                         "id": "Mme.Burgon",
                         "group": 7
                     },
                     {
                         "id": "Gavroche",
                         "group": 8
                     },
                     {
                         "id": "Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Magnon",
                         "group": 5
                     },
                     {
                         "id": "Mlle.Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Mme.Pontmercy",
                         "group": 5
                     },
                     {
                         "id": "Mlle.Vaubois",
                         "group": 5
                     },
                     {
                         "id": "Lt.Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Marius",
                         "group": 8
                     },
                     {
                         "id": "BaronessT",
                         "group": 5
                     },
                     {
                         "id": "Mabeuf",
                         "group": 8
                     },
                     {
                         "id": "Enjolras",
                         "group": 8
                     },
                     {
                         "id": "Combeferre",
                         "group": 8
                     },
                     {
                         "id": "Prouvaire",
                         "group": 8
                     },
                     {
                         "id": "Feuilly",
                         "group": 8
                     },
                     {
                         "id": "Courfeyrac",
                         "group": 8
                     },
                     {
                         "id": "Bahorel",
                         "group": 8
                     },
                     {
                         "id": "Bossuet",
                         "group": 8
                     },
                     {
                         "id": "Joly",
                         "group": 8
                     },
                     {
                         "id": "Grantaire",
                         "group": 8
                     },
                     {
                         "id": "MotherPlutarch",
                         "group": 9
                     },
                     {
                         "id": "Gueulemer",
                         "group": 4
                     },
                     {
                         "id": "Babet",
                         "group": 4
                     },
                     {
                         "id": "Claquesous",
                         "group": 4
                     },
                     {
                         "id": "Montparnasse",
                         "group": 4
                     },
                     {
                         "id": "Toussaint",
                         "group": 5
                     },
                     {
                         "id": "Child1",
                         "group": 10
                     },
                     {
                         "id": "Child2",
                         "group": 10
                     },
                     {
                         "id": "Brujon",
                         "group": 4
                     },
                     {
                         "id": "Mme.Hucheloup",
                         "group": 8
                     }
                 ],
                 "links": [
                     {
                         "source": "Napoleon",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Baptistine",
                         "target": "Myriel",
                         "value": 8
                     },
                     {
                         "source": "Mme.Magloire",
                         "target": "Myriel",
                         "value": 10
                     },
                     {
                         "source": "Mme.Magloire",
                         "target": "Mlle.Baptistine",
                         "value": 6
                     },
                     {
                         "source": "CountessdeLo",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Geborand",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Champtercier",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Cravatte",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Count",
                         "target": "Myriel",
                         "value": 2
                     },
                     {
                         "source": "OldMan",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Valjean",
                         "target": "Labarre",
                         "value": 1
                     },
                     {
                         "source": "Valjean",
                         "target": "Mme.Magloire",
                         "value": 3
                     },
                     {
                         "source": "Valjean",
                         "target": "Mlle.Baptistine",
                         "value": 3
                     },
                     {
                         "source": "Valjean",
                         "target": "Myriel",
                         "value": 5
                     },
                     {
                         "source": "Marguerite",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Mme.deR",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Isabeau",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gervais",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Listolier",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Fameuil",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Fameuil",
                         "target": "Listolier",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Listolier",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Fameuil",
                         "value": 4
                     },
                     {
                         "source": "Favourite",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Blacheville",
                         "value": 4
                     },
                     {
                         "source": "Dahlia",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Favourite",
                         "value": 5
                     },
                     {
                         "source": "Zephine",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Favourite",
                         "value": 4
                     },
                     {
                         "source": "Zephine",
                         "target": "Dahlia",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Favourite",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Dahlia",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Zephine",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Marguerite",
                         "value": 2
                     },
                     {
                         "source": "Fantine",
                         "target": "Valjean",
                         "value": 9
                     },
                     {
                         "source": "Mme.Thenardier",
                         "target": "Fantine",
                         "value": 2
                     },
                     {
                         "source": "Mme.Thenardier",
                         "target": "Valjean",
                         "value": 7
                     },
                     {
                         "source": "Thenardier",
                         "target": "Mme.Thenardier",
                         "value": 13
                     },
                     {
                         "source": "Thenardier",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Thenardier",
                         "target": "Valjean",
                         "value": 12
                     },
                     {
                         "source": "Cosette",
                         "target": "Mme.Thenardier",
                         "value": 4
                     },
                     {
                         "source": "Cosette",
                         "target": "Valjean",
                         "value": 31
                     },
                     {
                         "source": "Cosette",
                         "target": "Tholomyes",
                         "value": 1
                     },
                     {
                         "source": "Cosette",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Javert",
                         "target": "Valjean",
                         "value": 17
                     },
                     {
                         "source": "Javert",
                         "target": "Fantine",
                         "value": 5
                     },
                     {
                         "source": "Javert",
                         "target": "Thenardier",
                         "value": 5
                     },
                     {
                         "source": "Javert",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Javert",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Fauchelevent",
                         "target": "Valjean",
                         "value": 8
                     },
                     {
                         "source": "Fauchelevent",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Perpetue",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Simplice",
                         "target": "Perpetue",
                         "value": 2
                     },
                     {
                         "source": "Simplice",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Simplice",
                         "target": "Fantine",
                         "value": 2
                     },
                     {
                         "source": "Simplice",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Scaufflaire",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Woman1",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Woman1",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Judge",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Judge",
                         "target": "Bamatabois",
                         "value": 2
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Judge",
                         "value": 3
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Bamatabois",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Brevet",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Brevet",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Chenildieu",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Pontmercy",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Boulatruelle",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Eponine",
                         "target": "Mme.Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Eponine",
                         "target": "Thenardier",
                         "value": 3
                     },
                     {
                         "source": "Anzelma",
                         "target": "Eponine",
                         "value": 2
                     },
                     {
                         "source": "Anzelma",
                         "target": "Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Anzelma",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Woman2",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Woman2",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Woman2",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "MotherInnocent",
                         "target": "Fauchelevent",
                         "value": 3
                     },
                     {
                         "source": "MotherInnocent",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gribier",
                         "target": "Fauchelevent",
                         "value": 2
                     },
                     {
                         "source": "Mme.Burgon",
                         "target": "Jondrette",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Mme.Burgon",
                         "value": 2
                     },
                     {
                         "source": "Gavroche",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gillenormand",
                         "target": "Cosette",
                         "value": 3
                     },
                     {
                         "source": "Gillenormand",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Magnon",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Magnon",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Gillenormand",
                         "value": 9
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Cosette",
                         "value": 2
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Mme.Pontmercy",
                         "target": "Mlle.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Mme.Pontmercy",
                         "target": "Pontmercy",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Vaubois",
                         "target": "Mlle.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Mlle.Gillenormand",
                         "value": 2
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Mlle.Gillenormand",
                         "value": 6
                     },
                     {
                         "source": "Marius",
                         "target": "Gillenormand",
                         "value": 12
                     },
                     {
                         "source": "Marius",
                         "target": "Pontmercy",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Lt.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Cosette",
                         "value": 21
                     },
                     {
                         "source": "Marius",
                         "target": "Valjean",
                         "value": 19
                     },
                     {
                         "source": "Marius",
                         "target": "Tholomyes",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Marius",
                         "target": "Eponine",
                         "value": 5
                     },
                     {
                         "source": "Marius",
                         "target": "Gavroche",
                         "value": 4
                     },
                     {
                         "source": "BaronessT",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "BaronessT",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Enjolras",
                         "target": "Marius",
                         "value": 7
                     },
                     {
                         "source": "Enjolras",
                         "target": "Gavroche",
                         "value": 7
                     },
                     {
                         "source": "Enjolras",
                         "target": "Javert",
                         "value": 6
                     },
                     {
                         "source": "Enjolras",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Enjolras",
                         "target": "Valjean",
                         "value": 4
                     },
                     {
                         "source": "Combeferre",
                         "target": "Enjolras",
                         "value": 15
                     },
                     {
                         "source": "Combeferre",
                         "target": "Marius",
                         "value": 5
                     },
                     {
                         "source": "Combeferre",
                         "target": "Gavroche",
                         "value": 6
                     },
                     {
                         "source": "Combeferre",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Enjolras",
                         "value": 4
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Combeferre",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Enjolras",
                         "value": 6
                     },
                     {
                         "source": "Feuilly",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Feuilly",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Feuilly",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Marius",
                         "value": 9
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Enjolras",
                         "value": 17
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Combeferre",
                         "value": 13
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Gavroche",
                         "value": 7
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Feuilly",
                         "value": 6
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Prouvaire",
                         "value": 3
                     },
                     {
                         "source": "Bahorel",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Bahorel",
                         "target": "Gavroche",
                         "value": 5
                     },
                     {
                         "source": "Bahorel",
                         "target": "Courfeyrac",
                         "value": 6
                     },
                     {
                         "source": "Bahorel",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Bahorel",
                         "target": "Enjolras",
                         "value": 4
                     },
                     {
                         "source": "Bahorel",
                         "target": "Feuilly",
                         "value": 3
                     },
                     {
                         "source": "Bahorel",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Bahorel",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Bossuet",
                         "target": "Marius",
                         "value": 5
                     },
                     {
                         "source": "Bossuet",
                         "target": "Courfeyrac",
                         "value": 12
                     },
                     {
                         "source": "Bossuet",
                         "target": "Gavroche",
                         "value": 5
                     },
                     {
                         "source": "Bossuet",
                         "target": "Bahorel",
                         "value": 4
                     },
                     {
                         "source": "Bossuet",
                         "target": "Enjolras",
                         "value": 10
                     },
                     {
                         "source": "Bossuet",
                         "target": "Feuilly",
                         "value": 6
                     },
                     {
                         "source": "Bossuet",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Bossuet",
                         "target": "Combeferre",
                         "value": 9
                     },
                     {
                         "source": "Bossuet",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Bossuet",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Joly",
                         "target": "Bahorel",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Bossuet",
                         "value": 7
                     },
                     {
                         "source": "Joly",
                         "target": "Gavroche",
                         "value": 3
                     },
                     {
                         "source": "Joly",
                         "target": "Courfeyrac",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Enjolras",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Feuilly",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Joly",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Joly",
                         "target": "Marius",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Bossuet",
                         "value": 3
                     },
                     {
                         "source": "Grantaire",
                         "target": "Enjolras",
                         "value": 3
                     },
                     {
                         "source": "Grantaire",
                         "target": "Combeferre",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Courfeyrac",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Joly",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Bahorel",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Feuilly",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Prouvaire",
                         "value": 1
                     },
                     {
                         "source": "MotherPlutarch",
                         "target": "Mabeuf",
                         "value": 3
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Thenardier",
                         "value": 5
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Thenardier",
                         "value": 6
                     },
                     {
                         "source": "Babet",
                         "target": "Gueulemer",
                         "value": 6
                     },
                     {
                         "source": "Babet",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Javert",
                         "value": 2
                     },
                     {
                         "source": "Babet",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Thenardier",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Babet",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Gueulemer",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Enjolras",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Babet",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Gueulemer",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Claquesous",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Toussaint",
                         "target": "Cosette",
                         "value": 2
                     },
                     {
                         "source": "Toussaint",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Toussaint",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Child1",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Child2",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Child2",
                         "target": "Child1",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Babet",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Gueulemer",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Thenardier",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Claquesous",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Montparnasse",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Bossuet",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Joly",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Grantaire",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Bahorel",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Courfeyrac",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Enjolras",
                         "value": 1
                     }
                 ]
             }*/
            //link的宽度
            var edgSizeArray = []
            //link的颜色
            //var edgColorArray = []
            //node的大小
            var nodeSizeArray = []
            //node的颜色
            var nodeColorArray = []
            //node的坐标
            var nodeX = []
            var nodeY = []

            var k,l,v,z;


            for(k=0;k<Re.links.length;k++)
                edgSizeArray.push(Re.links[k].value)
            /*for(l=0;l<Re.links.length;l++)
                edgColorArray.push(Re.links[l].edgLabel)*/
            for(v=0;v<Re.nodes.length;v++)
                nodeSizeArray.push(Re.nodes[v].size)
            for(l=0;l<Re.nodes.length;l++)
                nodeColorArray.push(Re.nodes[l].group)
            for(z=0;z<Re.posXY.length;z++)
            {
                var obj = Re.posXY[z];
                nodeX.push(obj[z][0])  //obj[z]是[x,y]
                nodeY.push(obj[z][1])
            }





            console.log("边的大小："+edgSizeArray)
            console.log("点的颜色："+nodeColorArray)
            console.log("点的颜色去重："+nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ))
            console.log("点的大小："+nodeSizeArray)


            var labelColor;  //边和点的颜色
            switch (nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ).length) {
                case 2:{labelColor = d3.scaleOrdinal().domain([0,1]).range(["#fc8d59","#91cf60"]);}break;
                case 3:{labelColor = d3.scaleOrdinal().domain([0,1,2]).range(["#fc8d59","#ffffbf","#91cf60"]);}break;
                case 4:{labelColor = d3.scaleOrdinal().domain([0,1,2,3]).range(["#fc8d59","#ffffbf","#a6d96a","#61875d"]);}break;
                case 5:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4]).range(["#fdae61","#ffffbf","#91cf60","#61875d","#ce5c5c"]);}break;
                case 6:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range(["#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 7:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6]).range(["#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 8:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7]).range(["#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#ce5c5c"]);}break;
            }

            var edgSize = d3.scaleLinear()  //边大小
                .domain([d3.min(edgSizeArray) , d3.max(edgSizeArray)])
                .range([1,3]);

            var nodeSize = d3.scaleLinear()  //点大小
                .domain([d3.min(nodeSizeArray) , d3.max(nodeSizeArray)])
                .range([2,4]);

            var width = 200;
            var height = 135;
            //预留给轴线的距离
            var padding={top:5,right:1,bottom:1,left:5};
            var net1=d3.select("#OtherMulti").append("svg")
                .attr("id","net1Svg")
                .attr("width",200)
                .attr("height",135)
                /*.style("background-color","blue")*/;

            var x_coor = d3.scaleLinear()  //x坐标
                .domain([d3.min(nodeX) , d3.max(nodeX)])
                .range([padding.left,width-padding.left-padding.right]);
            var y_coor = d3.scaleLinear()  //Y坐标
                .domain([d3.min(nodeY) , d3.max(nodeY)])
                .range([height-padding.bottom-padding.top,padding.top]);

            //绘制连线
            var link = net1.append("g").attr("class", "links")
                .selectAll("line")
                .data(data.links)
                .enter()
                .append("line")
                .attr("id",function (d) {
                    return d.source;
                })
                .attr("x1",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y1",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("x2",function (d,i) {
                    return x_coor(nodeX[i+1]);
                })
                .attr("y2",function (d,i) {
                    return y_coor(nodeY[i+1]);
                })
                .attr("stroke","#cdcccc")
                .attr("stroke-width",function(d){
                    return edgSize(d.value);
                })
                .style("opacity",function(d,i){
                    return getOpacityLink(i)? 0.9:0.1; //version2
                });  //0.5

            //绘制圆
            var node = net1.append("g").attr("class", "nodes")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("circle")
                .attr("id",function (d) {
                    return d.id;
                })
                .attr("r", function(d){
                    return nodeSize(d.size)
                })
                .attr("cx",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("cy",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("fill", function(d) {
                    return labelColor(d.group);
                })
                .style("opacity",function(d,i){
                    return getOpacityNode(i)? 0.9:0.1; //version2
                });  //0.9

            //version2：选择一定范围，下面的鼠标事件是version1，不用动
            function getOpacityNode(id)
            {
                if(id>=125 && id<=145)
                    return true;
                else
                    return false;
            }
            function getOpacityLink(id)
            {
                if(id>=125 && id<=145)
                    return true;
                else
                    return false;
            }
            net1.append("g")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("text")
                .text(function (d,i) {
                    return d.id;
                })
                .attr("x",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .style("fill", "#9c9c9c")
                .style("font-family", "Arial")
                .style("font-size", 10)
                .style("opacity",function(d,i){
                    return getOpacityNode(i)? 0.9:0;
                }); // to prevent mouseover/drag capture




            node.on("mouseover", focus).on("mouseout", unfocus);
            //特殊：当选择的是节点0时，其节点和连线显示
            function node0(id)
            {
                if((id===0) || (id===1) || (id===2))
                    return true;
                else
                    return false;
            }
            function link0(id)
            {
                if((id===0) || (id===1))
                    return true;
                else
                    return false;
            }
            //特殊：当选择的是节点191时，其节点和连线显示
            function node191(id)
            {
                if((id===189) || (id===190) || (id===191))
                    return true;
                else
                    return false;

            }
            function link191(id)
            {
                if((id===189) || (id===190))
                    return true;
                else
                    return false;

            }
            //非特殊
            function confirmNodeThree(i,index)
            {
                if((i===index-1) || (i===index) || (i===index+1))
                    return true;
                else
                    return false;
            }
            function confirmLinkTwo(i,index)
            {
                if((i===index-1) || (i===index))
                    return true;
                else
                    return false;
            }

            function focus(d) {
                //选择的点的id
                var index = d3.select(d3.event.target).datum().id;

                //网络图上显示相应相邻节点
                if(index===0)
                {
                    d3.select("#net1Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node0(circleID)? 1 : 0.1);
                        });
                    d3.select("#net1Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link0(lineID)? 1 : 0.1);
                        });
                    net1.append("g")
                        .append("text")
                        .text("0")
                        .attr("x",x_coor(nodeX[0])-4)
                        .attr("y",y_coor(nodeY[0])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net1.append("g")
                        .append("text")
                        .text("1")
                        .attr("x",x_coor(nodeX[1])-4)
                        .attr("y",y_coor(nodeY[1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net1.append("g")
                        .append("text")
                        .text("2")
                        .attr("x",x_coor(nodeX[2])-4)
                        .attr("y",y_coor(nodeY[2])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                else if(index===191)
                {
                    d3.select("#net1Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node191(circleID)? 1 : 0.1);
                        });
                    d3.select("#net1Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link191(lineID)? 1 : 0.1);
                        });
                    net1.append("g")
                        .append("text")
                        .text("189")
                        .attr("x",x_coor(nodeX[189])-4)
                        .attr("y",y_coor(nodeY[189])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net1.append("g")
                        .append("text")
                        .text("190")
                        .attr("x",x_coor(nodeX[190])-4)
                        .attr("y",y_coor(nodeY[190])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net1.append("g")
                        .append("text")
                        .text("191")
                        .attr("x",x_coor(nodeX[191])-4)
                        .attr("y",y_coor(nodeY[191])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                else
                {
                    d3.select("#net1Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', confirmNodeThree(circleID,index)? 1 : 0.1);
                        });
                    d3.select("#net1Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', confirmLinkTwo(lineID,index)? 1 : 0.1);
                        });
                    net1.append("g")
                        .append("text")
                        .text(index)
                        .attr("x",x_coor(nodeX[index])-4)
                        .attr("y",y_coor(nodeY[index])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net1.append("g")
                        .append("text")
                        .text(index-1)
                        .attr("x",x_coor(nodeX[index-1])-4)
                        .attr("y",y_coor(nodeY[index-1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net1.append("g")
                        .append("text")
                        .text(index+1)
                        .attr("x",x_coor(nodeX[index+1])-4)
                        .attr("y",y_coor(nodeY[index+1])+3)
                        .style("fill","#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                //同时在index.jsp显示相应折线bin-bulk 暂时不用。用的是手动修改localBulk.jsp
                /* var chooseIndex = index;
                 mtfLineBulkJS(nodeColorArray,chooseIndex)*/



            }

            function unfocus() {
                node.style("opacity", 1);
                link.style("opacity", 1);
                net1.selectAll("text").style("opacity", 0);

            }








        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });
}

function netWorkMemXYJS()
{
    var brushvalue = window.brushValue;
    console.log("刷取的视频做网络图:"+brushvalue)


    $.ajax({
        url:"networkMemServlet",
        method:"Get",        //400 字符串无法解析 是因为之前写num_array 这个-不对
        contentType:"application/json;charset=UTF-8",
        data:{"video":brushvalue/*,"leftSecond":secondLeft,"rightSecond":secondRight*/}  ,    //这种形式就可以  JSON.stringify将JS对象转成字符串的形式  出现头过大的情况，在tomcat的server.xml加入maxPostSize="-1" maxHttpHeaderSize ="102400"
        traditional:true,
        cache:false,
        success:function (result) {
            console.log("MTF-Mem响应！！！！")
            var Re = JSON.parse(result);
            console.log(Re)


            var data = Re;
            /* var data = {
                 "nodes": [
                     {
                         "id": "Myriel",
                         "group": 1
                     },
                     {
                         "id": "Napoleon",
                         "group": 1
                     },
                     {
                         "id": "Mlle.Baptistine",
                         "group": 1
                     },
                     {
                         "id": "Mme.Magloire",
                         "group": 1
                     },
                     {
                         "id": "CountessdeLo",
                         "group": 1
                     },
                     {
                         "id": "Geborand",
                         "group": 1
                     },
                     {
                         "id": "Champtercier",
                         "group": 1
                     },
                     {
                         "id": "Cravatte",
                         "group": 1
                     },
                     {
                         "id": "Count",
                         "group": 1
                     },
                     {
                         "id": "OldMan",
                         "group": 1
                     },
                     {
                         "id": "Labarre",
                         "group": 2
                     },
                     {
                         "id": "Valjean",
                         "group": 2
                     },
                     {
                         "id": "Marguerite",
                         "group": 3
                     },
                     {
                         "id": "Mme.deR",
                         "group": 2
                     },
                     {
                         "id": "Isabeau",
                         "group": 2
                     },
                     {
                         "id": "Gervais",
                         "group": 2
                     },
                     {
                         "id": "Tholomyes",
                         "group": 3
                     },
                     {
                         "id": "Listolier",
                         "group": 3
                     },
                     {
                         "id": "Fameuil",
                         "group": 3
                     },
                     {
                         "id": "Blacheville",
                         "group": 3
                     },
                     {
                         "id": "Favourite",
                         "group": 3
                     },
                     {
                         "id": "Dahlia",
                         "group": 3
                     },
                     {
                         "id": "Zephine",
                         "group": 3
                     },
                     {
                         "id": "Fantine",
                         "group": 3
                     },
                     {
                         "id": "Mme.Thenardier",
                         "group": 4
                     },
                     {
                         "id": "Thenardier",
                         "group": 4
                     },
                     {
                         "id": "Cosette",
                         "group": 5
                     },
                     {
                         "id": "Javert",
                         "group": 4
                     },
                     {
                         "id": "Fauchelevent",
                         "group": 0
                     },
                     {
                         "id": "Bamatabois",
                         "group": 2
                     },
                     {
                         "id": "Perpetue",
                         "group": 3
                     },
                     {
                         "id": "Simplice",
                         "group": 2
                     },
                     {
                         "id": "Scaufflaire",
                         "group": 2
                     },
                     {
                         "id": "Woman1",
                         "group": 2
                     },
                     {
                         "id": "Judge",
                         "group": 2
                     },
                     {
                         "id": "Champmathieu",
                         "group": 2
                     },
                     {
                         "id": "Brevet",
                         "group": 2
                     },
                     {
                         "id": "Chenildieu",
                         "group": 2
                     },
                     {
                         "id": "Cochepaille",
                         "group": 2
                     },
                     {
                         "id": "Pontmercy",
                         "group": 4
                     },
                     {
                         "id": "Boulatruelle",
                         "group": 6
                     },
                     {
                         "id": "Eponine",
                         "group": 4
                     },
                     {
                         "id": "Anzelma",
                         "group": 4
                     },
                     {
                         "id": "Woman2",
                         "group": 5
                     },
                     {
                         "id": "MotherInnocent",
                         "group": 0
                     },
                     {
                         "id": "Gribier",
                         "group": 0
                     },
                     {
                         "id": "Jondrette",
                         "group": 7
                     },
                     {
                         "id": "Mme.Burgon",
                         "group": 7
                     },
                     {
                         "id": "Gavroche",
                         "group": 8
                     },
                     {
                         "id": "Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Magnon",
                         "group": 5
                     },
                     {
                         "id": "Mlle.Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Mme.Pontmercy",
                         "group": 5
                     },
                     {
                         "id": "Mlle.Vaubois",
                         "group": 5
                     },
                     {
                         "id": "Lt.Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Marius",
                         "group": 8
                     },
                     {
                         "id": "BaronessT",
                         "group": 5
                     },
                     {
                         "id": "Mabeuf",
                         "group": 8
                     },
                     {
                         "id": "Enjolras",
                         "group": 8
                     },
                     {
                         "id": "Combeferre",
                         "group": 8
                     },
                     {
                         "id": "Prouvaire",
                         "group": 8
                     },
                     {
                         "id": "Feuilly",
                         "group": 8
                     },
                     {
                         "id": "Courfeyrac",
                         "group": 8
                     },
                     {
                         "id": "Bahorel",
                         "group": 8
                     },
                     {
                         "id": "Bossuet",
                         "group": 8
                     },
                     {
                         "id": "Joly",
                         "group": 8
                     },
                     {
                         "id": "Grantaire",
                         "group": 8
                     },
                     {
                         "id": "MotherPlutarch",
                         "group": 9
                     },
                     {
                         "id": "Gueulemer",
                         "group": 4
                     },
                     {
                         "id": "Babet",
                         "group": 4
                     },
                     {
                         "id": "Claquesous",
                         "group": 4
                     },
                     {
                         "id": "Montparnasse",
                         "group": 4
                     },
                     {
                         "id": "Toussaint",
                         "group": 5
                     },
                     {
                         "id": "Child1",
                         "group": 10
                     },
                     {
                         "id": "Child2",
                         "group": 10
                     },
                     {
                         "id": "Brujon",
                         "group": 4
                     },
                     {
                         "id": "Mme.Hucheloup",
                         "group": 8
                     }
                 ],
                 "links": [
                     {
                         "source": "Napoleon",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Baptistine",
                         "target": "Myriel",
                         "value": 8
                     },
                     {
                         "source": "Mme.Magloire",
                         "target": "Myriel",
                         "value": 10
                     },
                     {
                         "source": "Mme.Magloire",
                         "target": "Mlle.Baptistine",
                         "value": 6
                     },
                     {
                         "source": "CountessdeLo",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Geborand",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Champtercier",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Cravatte",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Count",
                         "target": "Myriel",
                         "value": 2
                     },
                     {
                         "source": "OldMan",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Valjean",
                         "target": "Labarre",
                         "value": 1
                     },
                     {
                         "source": "Valjean",
                         "target": "Mme.Magloire",
                         "value": 3
                     },
                     {
                         "source": "Valjean",
                         "target": "Mlle.Baptistine",
                         "value": 3
                     },
                     {
                         "source": "Valjean",
                         "target": "Myriel",
                         "value": 5
                     },
                     {
                         "source": "Marguerite",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Mme.deR",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Isabeau",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gervais",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Listolier",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Fameuil",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Fameuil",
                         "target": "Listolier",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Listolier",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Fameuil",
                         "value": 4
                     },
                     {
                         "source": "Favourite",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Blacheville",
                         "value": 4
                     },
                     {
                         "source": "Dahlia",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Favourite",
                         "value": 5
                     },
                     {
                         "source": "Zephine",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Favourite",
                         "value": 4
                     },
                     {
                         "source": "Zephine",
                         "target": "Dahlia",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Favourite",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Dahlia",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Zephine",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Marguerite",
                         "value": 2
                     },
                     {
                         "source": "Fantine",
                         "target": "Valjean",
                         "value": 9
                     },
                     {
                         "source": "Mme.Thenardier",
                         "target": "Fantine",
                         "value": 2
                     },
                     {
                         "source": "Mme.Thenardier",
                         "target": "Valjean",
                         "value": 7
                     },
                     {
                         "source": "Thenardier",
                         "target": "Mme.Thenardier",
                         "value": 13
                     },
                     {
                         "source": "Thenardier",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Thenardier",
                         "target": "Valjean",
                         "value": 12
                     },
                     {
                         "source": "Cosette",
                         "target": "Mme.Thenardier",
                         "value": 4
                     },
                     {
                         "source": "Cosette",
                         "target": "Valjean",
                         "value": 31
                     },
                     {
                         "source": "Cosette",
                         "target": "Tholomyes",
                         "value": 1
                     },
                     {
                         "source": "Cosette",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Javert",
                         "target": "Valjean",
                         "value": 17
                     },
                     {
                         "source": "Javert",
                         "target": "Fantine",
                         "value": 5
                     },
                     {
                         "source": "Javert",
                         "target": "Thenardier",
                         "value": 5
                     },
                     {
                         "source": "Javert",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Javert",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Fauchelevent",
                         "target": "Valjean",
                         "value": 8
                     },
                     {
                         "source": "Fauchelevent",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Perpetue",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Simplice",
                         "target": "Perpetue",
                         "value": 2
                     },
                     {
                         "source": "Simplice",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Simplice",
                         "target": "Fantine",
                         "value": 2
                     },
                     {
                         "source": "Simplice",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Scaufflaire",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Woman1",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Woman1",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Judge",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Judge",
                         "target": "Bamatabois",
                         "value": 2
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Judge",
                         "value": 3
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Bamatabois",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Brevet",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Brevet",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Chenildieu",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Pontmercy",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Boulatruelle",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Eponine",
                         "target": "Mme.Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Eponine",
                         "target": "Thenardier",
                         "value": 3
                     },
                     {
                         "source": "Anzelma",
                         "target": "Eponine",
                         "value": 2
                     },
                     {
                         "source": "Anzelma",
                         "target": "Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Anzelma",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Woman2",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Woman2",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Woman2",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "MotherInnocent",
                         "target": "Fauchelevent",
                         "value": 3
                     },
                     {
                         "source": "MotherInnocent",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gribier",
                         "target": "Fauchelevent",
                         "value": 2
                     },
                     {
                         "source": "Mme.Burgon",
                         "target": "Jondrette",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Mme.Burgon",
                         "value": 2
                     },
                     {
                         "source": "Gavroche",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gillenormand",
                         "target": "Cosette",
                         "value": 3
                     },
                     {
                         "source": "Gillenormand",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Magnon",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Magnon",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Gillenormand",
                         "value": 9
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Cosette",
                         "value": 2
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Mme.Pontmercy",
                         "target": "Mlle.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Mme.Pontmercy",
                         "target": "Pontmercy",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Vaubois",
                         "target": "Mlle.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Mlle.Gillenormand",
                         "value": 2
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Mlle.Gillenormand",
                         "value": 6
                     },
                     {
                         "source": "Marius",
                         "target": "Gillenormand",
                         "value": 12
                     },
                     {
                         "source": "Marius",
                         "target": "Pontmercy",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Lt.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Cosette",
                         "value": 21
                     },
                     {
                         "source": "Marius",
                         "target": "Valjean",
                         "value": 19
                     },
                     {
                         "source": "Marius",
                         "target": "Tholomyes",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Marius",
                         "target": "Eponine",
                         "value": 5
                     },
                     {
                         "source": "Marius",
                         "target": "Gavroche",
                         "value": 4
                     },
                     {
                         "source": "BaronessT",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "BaronessT",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Enjolras",
                         "target": "Marius",
                         "value": 7
                     },
                     {
                         "source": "Enjolras",
                         "target": "Gavroche",
                         "value": 7
                     },
                     {
                         "source": "Enjolras",
                         "target": "Javert",
                         "value": 6
                     },
                     {
                         "source": "Enjolras",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Enjolras",
                         "target": "Valjean",
                         "value": 4
                     },
                     {
                         "source": "Combeferre",
                         "target": "Enjolras",
                         "value": 15
                     },
                     {
                         "source": "Combeferre",
                         "target": "Marius",
                         "value": 5
                     },
                     {
                         "source": "Combeferre",
                         "target": "Gavroche",
                         "value": 6
                     },
                     {
                         "source": "Combeferre",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Enjolras",
                         "value": 4
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Combeferre",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Enjolras",
                         "value": 6
                     },
                     {
                         "source": "Feuilly",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Feuilly",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Feuilly",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Marius",
                         "value": 9
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Enjolras",
                         "value": 17
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Combeferre",
                         "value": 13
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Gavroche",
                         "value": 7
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Feuilly",
                         "value": 6
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Prouvaire",
                         "value": 3
                     },
                     {
                         "source": "Bahorel",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Bahorel",
                         "target": "Gavroche",
                         "value": 5
                     },
                     {
                         "source": "Bahorel",
                         "target": "Courfeyrac",
                         "value": 6
                     },
                     {
                         "source": "Bahorel",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Bahorel",
                         "target": "Enjolras",
                         "value": 4
                     },
                     {
                         "source": "Bahorel",
                         "target": "Feuilly",
                         "value": 3
                     },
                     {
                         "source": "Bahorel",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Bahorel",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Bossuet",
                         "target": "Marius",
                         "value": 5
                     },
                     {
                         "source": "Bossuet",
                         "target": "Courfeyrac",
                         "value": 12
                     },
                     {
                         "source": "Bossuet",
                         "target": "Gavroche",
                         "value": 5
                     },
                     {
                         "source": "Bossuet",
                         "target": "Bahorel",
                         "value": 4
                     },
                     {
                         "source": "Bossuet",
                         "target": "Enjolras",
                         "value": 10
                     },
                     {
                         "source": "Bossuet",
                         "target": "Feuilly",
                         "value": 6
                     },
                     {
                         "source": "Bossuet",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Bossuet",
                         "target": "Combeferre",
                         "value": 9
                     },
                     {
                         "source": "Bossuet",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Bossuet",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Joly",
                         "target": "Bahorel",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Bossuet",
                         "value": 7
                     },
                     {
                         "source": "Joly",
                         "target": "Gavroche",
                         "value": 3
                     },
                     {
                         "source": "Joly",
                         "target": "Courfeyrac",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Enjolras",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Feuilly",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Joly",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Joly",
                         "target": "Marius",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Bossuet",
                         "value": 3
                     },
                     {
                         "source": "Grantaire",
                         "target": "Enjolras",
                         "value": 3
                     },
                     {
                         "source": "Grantaire",
                         "target": "Combeferre",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Courfeyrac",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Joly",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Bahorel",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Feuilly",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Prouvaire",
                         "value": 1
                     },
                     {
                         "source": "MotherPlutarch",
                         "target": "Mabeuf",
                         "value": 3
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Thenardier",
                         "value": 5
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Thenardier",
                         "value": 6
                     },
                     {
                         "source": "Babet",
                         "target": "Gueulemer",
                         "value": 6
                     },
                     {
                         "source": "Babet",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Javert",
                         "value": 2
                     },
                     {
                         "source": "Babet",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Thenardier",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Babet",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Gueulemer",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Enjolras",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Babet",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Gueulemer",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Claquesous",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Toussaint",
                         "target": "Cosette",
                         "value": 2
                     },
                     {
                         "source": "Toussaint",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Toussaint",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Child1",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Child2",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Child2",
                         "target": "Child1",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Babet",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Gueulemer",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Thenardier",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Claquesous",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Montparnasse",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Bossuet",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Joly",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Grantaire",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Bahorel",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Courfeyrac",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Enjolras",
                         "value": 1
                     }
                 ]
             }*/
            //link的宽度
            var edgSizeArray = []
            //link的颜色
            //var edgColorArray = []
            //node的大小
            var nodeSizeArray = []
            //node的颜色
            var nodeColorArray = []
            //node的坐标
            var nodeX = []
            var nodeY = []

            var k,l,v,z;


            for(k=0;k<Re.links.length;k++)
                edgSizeArray.push(Re.links[k].value)
            /*for(l=0;l<Re.links.length;l++)
                edgColorArray.push(Re.links[l].edgLabel)*/
            for(v=0;v<Re.nodes.length;v++)
                nodeSizeArray.push(Re.nodes[v].size)
            for(l=0;l<Re.nodes.length;l++)
                nodeColorArray.push(Re.nodes[l].group)
            for(z=0;z<Re.posXY.length;z++)
            {
                var obj = Re.posXY[z];
                nodeX.push(obj[z][0])  //obj[z]是[x,y]
                nodeY.push(obj[z][1])
            }





            console.log("边的大小："+edgSizeArray)
            console.log("点的颜色："+nodeColorArray)
            console.log("点的颜色去重："+nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ))
            console.log("点的大小："+nodeSizeArray)


            var labelColor;  //边和点的颜色
            switch (nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ).length) {
                case 2:{labelColor = d3.scaleOrdinal().domain([0,1]).range(["#fc8d59","#91cf60"]);}break;
                case 3:{labelColor = d3.scaleOrdinal().domain([0,1,2]).range(["#fc8d59","#ffffbf","#91cf60"]);}break;
                case 4:{labelColor = d3.scaleOrdinal().domain([0,1,2,3]).range(["#fc8d59","#ffffbf","#a6d96a","#61875d"]);}break;
                case 5:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4]).range(["#fdae61","#ffffbf","#91cf60","#61875d","#ce5c5c"]);}break;
                case 6:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range(["#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 7:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6]).range(["#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 8:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7]).range(["#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#ce5c5c"]);}break;
            }

            var edgSize = d3.scaleLinear()  //边大小
                .domain([d3.min(edgSizeArray) , d3.max(edgSizeArray)])
                .range([1,3]);

            var nodeSize = d3.scaleLinear()  //点大小
                .domain([d3.min(nodeSizeArray) , d3.max(nodeSizeArray)])
                .range([2,4]);

            var width = 200;
            var height = 135;
            //预留给轴线的距离
            var padding={top:5,right:1,bottom:1,left:5};


            var net2=d3.select("#OtherMulti").append("svg")
                .attr("id","net2Svg")
                .attr("width",200)
                .attr("height",135)
                /*.style("background-color","red")*/;

            var x_coor = d3.scaleLinear()  //x坐标
                .domain([d3.min(nodeX) , d3.max(nodeX)])
                .range([padding.left,width-padding.left-padding.right]);
            var y_coor = d3.scaleLinear()  //Y坐标
                .domain([d3.min(nodeY) , d3.max(nodeY)])
                .range([height-padding.bottom-padding.top,padding.top]);



            //绘制连线
            var link = net2.append("g").attr("class", "links")
                .selectAll("line")
                .data(data.links)
                .enter()
                .append("line")
                .attr("id",function (d) {
                    return d.source;
                })
                .attr("x1",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y1",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("x2",function (d,i) {
                    return x_coor(nodeX[i+1]);
                })
                .attr("y2",function (d,i) {
                    return y_coor(nodeY[i+1]);
                })
                .attr("stroke","#cdcccc")
                .attr("stroke-width",function(d){
                    return edgSize(d.value);
                })
                .style("opacity",function(d,i){
                    return getOpacityLink(i)? 0.9:0.1; //version2
                });  //0.5

            //绘制圆
            var node = net2.append("g").attr("class", "nodes")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("circle")
                .attr("id",function (d) {
                    return d.id;
                })
                .attr("r", function(d){
                    return nodeSize(d.size)
                })
                .attr("cx",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("cy",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("fill", function(d) {
                    return labelColor(d.group);
                })
                .style("opacity",function(d,i){
                    return getOpacityNode(i)? 0.9:0.1; //version2
                });  //0.9

            //version2：选择一定范围，下面的鼠标事件是version1，不用动
            function getOpacityNode(id)
            {
                if(id>=125 && id<=145)
                    return true;
                else
                    return false;
            }
            function getOpacityLink(id)
            {
                if(id>=125 && id<=145)
                    return true;
                else
                    return false;
            }
            net2.append("g")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("text")
                .text(function (d,i) {
                    return d.id;
                })
                .attr("x",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .style("fill", "#9c9c9c")
                .style("font-family", "Arial")
                .style("font-size", 10)
                .style("opacity",function(d,i){
                    return getOpacityNode(i)? 0.9:0;
                }); // to prevent mouseover/drag capture


            node.on("mouseover", focus).on("mouseout", unfocus);
            //特殊：当选择的是节点0时，其节点和连线显示
            function node0(id)
            {
                if((id===0) || (id===1) || (id===2))
                    return true;
                else
                    return false;
            }
            function link0(id)
            {
                if((id===0) || (id===1))
                    return true;
                else
                    return false;
            }
            //特殊：当选择的是节点191时，其节点和连线显示
            function node191(id)
            {
                if((id===189) || (id===190) || (id===191))
                    return true;
                else
                    return false;

            }
            function link191(id)
            {
                if((id===189) || (id===190))
                    return true;
                else
                    return false;

            }
            //非特殊
            function confirmNodeThree(i,index)
            {
                if((i===index-1) || (i===index) || (i===index+1))
                    return true;
                else
                    return false;
            }
            function confirmLinkTwo(i,index)
            {
                if((i===index-1) || (i===index))
                    return true;
                else
                    return false;
            }

            function focus(d) {
                //选择的点的id
                var index = d3.select(d3.event.target).datum().id;

                //网络图上显示相应相邻节点
                if(index===0)
                {
                    d3.select("#net2Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node0(circleID)? 1 : 0.1);
                        });
                    d3.select("#net2Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link0(lineID)? 1 : 0.1);
                        });
                    net2.append("g")
                        .append("text")
                        .text("0")
                        .attr("x",x_coor(nodeX[0])-4)
                        .attr("y",y_coor(nodeY[0])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net2.append("g")
                        .append("text")
                        .text("1")
                        .attr("x",x_coor(nodeX[1])-4)
                        .attr("y",y_coor(nodeY[1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net2.append("g")
                        .append("text")
                        .text("2")
                        .attr("x",x_coor(nodeX[2])-4)
                        .attr("y",y_coor(nodeY[2])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                else if(index===191)
                {
                    d3.select("#net2Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node191(circleID)? 1 : 0.1);
                        });
                    d3.select("#net2Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link191(lineID)? 1 : 0.1);
                        });
                    net2.append("g")
                        .append("text")
                        .text("189")
                        .attr("x",x_coor(nodeX[189])-4)
                        .attr("y",y_coor(nodeY[189])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net2.append("g")
                        .append("text")
                        .text("190")
                        .attr("x",x_coor(nodeX[190])-4)
                        .attr("y",y_coor(nodeY[190])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net2.append("g")
                        .append("text")
                        .text("191")
                        .attr("x",x_coor(nodeX[191])-4)
                        .attr("y",y_coor(nodeY[191])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                else
                {
                    d3.select("#net2Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', confirmNodeThree(circleID,index)? 1 : 0.1);
                        });
                    d3.select("#net2Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', confirmLinkTwo(lineID,index)? 1 : 0.1);
                        });
                    net2.append("g")
                        .append("text")
                        .text(index)
                        .attr("x",x_coor(nodeX[index])-4)
                        .attr("y",y_coor(nodeY[index])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net2.append("g")
                        .append("text")
                        .text(index-1)
                        .attr("x",x_coor(nodeX[index-1])-4)
                        .attr("y",y_coor(nodeY[index-1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net2.append("g")
                        .append("text")
                        .text(index+1)
                        .attr("x",x_coor(nodeX[index+1])-4)
                        .attr("y",y_coor(nodeY[index+1])+3)
                        .style("fill","#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                //同时在index.jsp显示相应折线bin-bulk 暂时不用。用的是手动修改localBulk.jsp
                /* var chooseIndex = index;
                 mtfLineBulkJS(nodeColorArray,chooseIndex)*/



            }

            function unfocus() {
                node.style("opacity", 1);
                link.style("opacity", 1);
                net2.selectAll("text").style("opacity", 0);

            }








        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });
}

function netWorkQuaXYJS()
{
    var brushvalue = window.brushValue;
    console.log("刷取的视频做网络图:"+brushvalue)


    $.ajax({
        url:"networkQuaServlet",
        method:"Get",        //400 字符串无法解析 是因为之前写num_array 这个-不对
        contentType:"application/json;charset=UTF-8",
        data:{"video":brushvalue/*,"leftSecond":secondLeft,"rightSecond":secondRight*/}  ,    //这种形式就可以  JSON.stringify将JS对象转成字符串的形式  出现头过大的情况，在tomcat的server.xml加入maxPostSize="-1" maxHttpHeaderSize ="102400"
        traditional:true,
        cache:false,
        success:function (result) {
            console.log("MTF-Qua响应！！！！")
            var Re = JSON.parse(result);
            console.log(Re)


            var data = Re;
            /* var data = {
                 "nodes": [
                     {
                         "id": "Myriel",
                         "group": 1
                     },
                     {
                         "id": "Napoleon",
                         "group": 1
                     },
                     {
                         "id": "Mlle.Baptistine",
                         "group": 1
                     },
                     {
                         "id": "Mme.Magloire",
                         "group": 1
                     },
                     {
                         "id": "CountessdeLo",
                         "group": 1
                     },
                     {
                         "id": "Geborand",
                         "group": 1
                     },
                     {
                         "id": "Champtercier",
                         "group": 1
                     },
                     {
                         "id": "Cravatte",
                         "group": 1
                     },
                     {
                         "id": "Count",
                         "group": 1
                     },
                     {
                         "id": "OldMan",
                         "group": 1
                     },
                     {
                         "id": "Labarre",
                         "group": 2
                     },
                     {
                         "id": "Valjean",
                         "group": 2
                     },
                     {
                         "id": "Marguerite",
                         "group": 3
                     },
                     {
                         "id": "Mme.deR",
                         "group": 2
                     },
                     {
                         "id": "Isabeau",
                         "group": 2
                     },
                     {
                         "id": "Gervais",
                         "group": 2
                     },
                     {
                         "id": "Tholomyes",
                         "group": 3
                     },
                     {
                         "id": "Listolier",
                         "group": 3
                     },
                     {
                         "id": "Fameuil",
                         "group": 3
                     },
                     {
                         "id": "Blacheville",
                         "group": 3
                     },
                     {
                         "id": "Favourite",
                         "group": 3
                     },
                     {
                         "id": "Dahlia",
                         "group": 3
                     },
                     {
                         "id": "Zephine",
                         "group": 3
                     },
                     {
                         "id": "Fantine",
                         "group": 3
                     },
                     {
                         "id": "Mme.Thenardier",
                         "group": 4
                     },
                     {
                         "id": "Thenardier",
                         "group": 4
                     },
                     {
                         "id": "Cosette",
                         "group": 5
                     },
                     {
                         "id": "Javert",
                         "group": 4
                     },
                     {
                         "id": "Fauchelevent",
                         "group": 0
                     },
                     {
                         "id": "Bamatabois",
                         "group": 2
                     },
                     {
                         "id": "Perpetue",
                         "group": 3
                     },
                     {
                         "id": "Simplice",
                         "group": 2
                     },
                     {
                         "id": "Scaufflaire",
                         "group": 2
                     },
                     {
                         "id": "Woman1",
                         "group": 2
                     },
                     {
                         "id": "Judge",
                         "group": 2
                     },
                     {
                         "id": "Champmathieu",
                         "group": 2
                     },
                     {
                         "id": "Brevet",
                         "group": 2
                     },
                     {
                         "id": "Chenildieu",
                         "group": 2
                     },
                     {
                         "id": "Cochepaille",
                         "group": 2
                     },
                     {
                         "id": "Pontmercy",
                         "group": 4
                     },
                     {
                         "id": "Boulatruelle",
                         "group": 6
                     },
                     {
                         "id": "Eponine",
                         "group": 4
                     },
                     {
                         "id": "Anzelma",
                         "group": 4
                     },
                     {
                         "id": "Woman2",
                         "group": 5
                     },
                     {
                         "id": "MotherInnocent",
                         "group": 0
                     },
                     {
                         "id": "Gribier",
                         "group": 0
                     },
                     {
                         "id": "Jondrette",
                         "group": 7
                     },
                     {
                         "id": "Mme.Burgon",
                         "group": 7
                     },
                     {
                         "id": "Gavroche",
                         "group": 8
                     },
                     {
                         "id": "Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Magnon",
                         "group": 5
                     },
                     {
                         "id": "Mlle.Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Mme.Pontmercy",
                         "group": 5
                     },
                     {
                         "id": "Mlle.Vaubois",
                         "group": 5
                     },
                     {
                         "id": "Lt.Gillenormand",
                         "group": 5
                     },
                     {
                         "id": "Marius",
                         "group": 8
                     },
                     {
                         "id": "BaronessT",
                         "group": 5
                     },
                     {
                         "id": "Mabeuf",
                         "group": 8
                     },
                     {
                         "id": "Enjolras",
                         "group": 8
                     },
                     {
                         "id": "Combeferre",
                         "group": 8
                     },
                     {
                         "id": "Prouvaire",
                         "group": 8
                     },
                     {
                         "id": "Feuilly",
                         "group": 8
                     },
                     {
                         "id": "Courfeyrac",
                         "group": 8
                     },
                     {
                         "id": "Bahorel",
                         "group": 8
                     },
                     {
                         "id": "Bossuet",
                         "group": 8
                     },
                     {
                         "id": "Joly",
                         "group": 8
                     },
                     {
                         "id": "Grantaire",
                         "group": 8
                     },
                     {
                         "id": "MotherPlutarch",
                         "group": 9
                     },
                     {
                         "id": "Gueulemer",
                         "group": 4
                     },
                     {
                         "id": "Babet",
                         "group": 4
                     },
                     {
                         "id": "Claquesous",
                         "group": 4
                     },
                     {
                         "id": "Montparnasse",
                         "group": 4
                     },
                     {
                         "id": "Toussaint",
                         "group": 5
                     },
                     {
                         "id": "Child1",
                         "group": 10
                     },
                     {
                         "id": "Child2",
                         "group": 10
                     },
                     {
                         "id": "Brujon",
                         "group": 4
                     },
                     {
                         "id": "Mme.Hucheloup",
                         "group": 8
                     }
                 ],
                 "links": [
                     {
                         "source": "Napoleon",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Baptistine",
                         "target": "Myriel",
                         "value": 8
                     },
                     {
                         "source": "Mme.Magloire",
                         "target": "Myriel",
                         "value": 10
                     },
                     {
                         "source": "Mme.Magloire",
                         "target": "Mlle.Baptistine",
                         "value": 6
                     },
                     {
                         "source": "CountessdeLo",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Geborand",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Champtercier",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Cravatte",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Count",
                         "target": "Myriel",
                         "value": 2
                     },
                     {
                         "source": "OldMan",
                         "target": "Myriel",
                         "value": 1
                     },
                     {
                         "source": "Valjean",
                         "target": "Labarre",
                         "value": 1
                     },
                     {
                         "source": "Valjean",
                         "target": "Mme.Magloire",
                         "value": 3
                     },
                     {
                         "source": "Valjean",
                         "target": "Mlle.Baptistine",
                         "value": 3
                     },
                     {
                         "source": "Valjean",
                         "target": "Myriel",
                         "value": 5
                     },
                     {
                         "source": "Marguerite",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Mme.deR",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Isabeau",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gervais",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Listolier",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Fameuil",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Fameuil",
                         "target": "Listolier",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Tholomyes",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Listolier",
                         "value": 4
                     },
                     {
                         "source": "Blacheville",
                         "target": "Fameuil",
                         "value": 4
                     },
                     {
                         "source": "Favourite",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Favourite",
                         "target": "Blacheville",
                         "value": 4
                     },
                     {
                         "source": "Dahlia",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Dahlia",
                         "target": "Favourite",
                         "value": 5
                     },
                     {
                         "source": "Zephine",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Zephine",
                         "target": "Favourite",
                         "value": 4
                     },
                     {
                         "source": "Zephine",
                         "target": "Dahlia",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Tholomyes",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Listolier",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Fameuil",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Blacheville",
                         "value": 3
                     },
                     {
                         "source": "Fantine",
                         "target": "Favourite",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Dahlia",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Zephine",
                         "value": 4
                     },
                     {
                         "source": "Fantine",
                         "target": "Marguerite",
                         "value": 2
                     },
                     {
                         "source": "Fantine",
                         "target": "Valjean",
                         "value": 9
                     },
                     {
                         "source": "Mme.Thenardier",
                         "target": "Fantine",
                         "value": 2
                     },
                     {
                         "source": "Mme.Thenardier",
                         "target": "Valjean",
                         "value": 7
                     },
                     {
                         "source": "Thenardier",
                         "target": "Mme.Thenardier",
                         "value": 13
                     },
                     {
                         "source": "Thenardier",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Thenardier",
                         "target": "Valjean",
                         "value": 12
                     },
                     {
                         "source": "Cosette",
                         "target": "Mme.Thenardier",
                         "value": 4
                     },
                     {
                         "source": "Cosette",
                         "target": "Valjean",
                         "value": 31
                     },
                     {
                         "source": "Cosette",
                         "target": "Tholomyes",
                         "value": 1
                     },
                     {
                         "source": "Cosette",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Javert",
                         "target": "Valjean",
                         "value": 17
                     },
                     {
                         "source": "Javert",
                         "target": "Fantine",
                         "value": 5
                     },
                     {
                         "source": "Javert",
                         "target": "Thenardier",
                         "value": 5
                     },
                     {
                         "source": "Javert",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Javert",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Fauchelevent",
                         "target": "Valjean",
                         "value": 8
                     },
                     {
                         "source": "Fauchelevent",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Bamatabois",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Perpetue",
                         "target": "Fantine",
                         "value": 1
                     },
                     {
                         "source": "Simplice",
                         "target": "Perpetue",
                         "value": 2
                     },
                     {
                         "source": "Simplice",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Simplice",
                         "target": "Fantine",
                         "value": 2
                     },
                     {
                         "source": "Simplice",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Scaufflaire",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Woman1",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Woman1",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Judge",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Judge",
                         "target": "Bamatabois",
                         "value": 2
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Judge",
                         "value": 3
                     },
                     {
                         "source": "Champmathieu",
                         "target": "Bamatabois",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Brevet",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Brevet",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Chenildieu",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Judge",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Champmathieu",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Brevet",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Chenildieu",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Cochepaille",
                         "target": "Bamatabois",
                         "value": 1
                     },
                     {
                         "source": "Pontmercy",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Boulatruelle",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Eponine",
                         "target": "Mme.Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Eponine",
                         "target": "Thenardier",
                         "value": 3
                     },
                     {
                         "source": "Anzelma",
                         "target": "Eponine",
                         "value": 2
                     },
                     {
                         "source": "Anzelma",
                         "target": "Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Anzelma",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Woman2",
                         "target": "Valjean",
                         "value": 3
                     },
                     {
                         "source": "Woman2",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Woman2",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "MotherInnocent",
                         "target": "Fauchelevent",
                         "value": 3
                     },
                     {
                         "source": "MotherInnocent",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gribier",
                         "target": "Fauchelevent",
                         "value": 2
                     },
                     {
                         "source": "Mme.Burgon",
                         "target": "Jondrette",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Mme.Burgon",
                         "value": 2
                     },
                     {
                         "source": "Gavroche",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Gavroche",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gillenormand",
                         "target": "Cosette",
                         "value": 3
                     },
                     {
                         "source": "Gillenormand",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Magnon",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Magnon",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Gillenormand",
                         "value": 9
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Cosette",
                         "value": 2
                     },
                     {
                         "source": "Mlle.Gillenormand",
                         "target": "Valjean",
                         "value": 2
                     },
                     {
                         "source": "Mme.Pontmercy",
                         "target": "Mlle.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Mme.Pontmercy",
                         "target": "Pontmercy",
                         "value": 1
                     },
                     {
                         "source": "Mlle.Vaubois",
                         "target": "Mlle.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Mlle.Gillenormand",
                         "value": 2
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Lt.Gillenormand",
                         "target": "Cosette",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Mlle.Gillenormand",
                         "value": 6
                     },
                     {
                         "source": "Marius",
                         "target": "Gillenormand",
                         "value": 12
                     },
                     {
                         "source": "Marius",
                         "target": "Pontmercy",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Lt.Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Cosette",
                         "value": 21
                     },
                     {
                         "source": "Marius",
                         "target": "Valjean",
                         "value": 19
                     },
                     {
                         "source": "Marius",
                         "target": "Tholomyes",
                         "value": 1
                     },
                     {
                         "source": "Marius",
                         "target": "Thenardier",
                         "value": 2
                     },
                     {
                         "source": "Marius",
                         "target": "Eponine",
                         "value": 5
                     },
                     {
                         "source": "Marius",
                         "target": "Gavroche",
                         "value": 4
                     },
                     {
                         "source": "BaronessT",
                         "target": "Gillenormand",
                         "value": 1
                     },
                     {
                         "source": "BaronessT",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Mabeuf",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Enjolras",
                         "target": "Marius",
                         "value": 7
                     },
                     {
                         "source": "Enjolras",
                         "target": "Gavroche",
                         "value": 7
                     },
                     {
                         "source": "Enjolras",
                         "target": "Javert",
                         "value": 6
                     },
                     {
                         "source": "Enjolras",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Enjolras",
                         "target": "Valjean",
                         "value": 4
                     },
                     {
                         "source": "Combeferre",
                         "target": "Enjolras",
                         "value": 15
                     },
                     {
                         "source": "Combeferre",
                         "target": "Marius",
                         "value": 5
                     },
                     {
                         "source": "Combeferre",
                         "target": "Gavroche",
                         "value": 6
                     },
                     {
                         "source": "Combeferre",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Enjolras",
                         "value": 4
                     },
                     {
                         "source": "Prouvaire",
                         "target": "Combeferre",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Enjolras",
                         "value": 6
                     },
                     {
                         "source": "Feuilly",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Feuilly",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Feuilly",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Feuilly",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Marius",
                         "value": 9
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Enjolras",
                         "value": 17
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Combeferre",
                         "value": 13
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Gavroche",
                         "value": 7
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Feuilly",
                         "value": 6
                     },
                     {
                         "source": "Courfeyrac",
                         "target": "Prouvaire",
                         "value": 3
                     },
                     {
                         "source": "Bahorel",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Bahorel",
                         "target": "Gavroche",
                         "value": 5
                     },
                     {
                         "source": "Bahorel",
                         "target": "Courfeyrac",
                         "value": 6
                     },
                     {
                         "source": "Bahorel",
                         "target": "Mabeuf",
                         "value": 2
                     },
                     {
                         "source": "Bahorel",
                         "target": "Enjolras",
                         "value": 4
                     },
                     {
                         "source": "Bahorel",
                         "target": "Feuilly",
                         "value": 3
                     },
                     {
                         "source": "Bahorel",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Bahorel",
                         "target": "Marius",
                         "value": 1
                     },
                     {
                         "source": "Bossuet",
                         "target": "Marius",
                         "value": 5
                     },
                     {
                         "source": "Bossuet",
                         "target": "Courfeyrac",
                         "value": 12
                     },
                     {
                         "source": "Bossuet",
                         "target": "Gavroche",
                         "value": 5
                     },
                     {
                         "source": "Bossuet",
                         "target": "Bahorel",
                         "value": 4
                     },
                     {
                         "source": "Bossuet",
                         "target": "Enjolras",
                         "value": 10
                     },
                     {
                         "source": "Bossuet",
                         "target": "Feuilly",
                         "value": 6
                     },
                     {
                         "source": "Bossuet",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Bossuet",
                         "target": "Combeferre",
                         "value": 9
                     },
                     {
                         "source": "Bossuet",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Bossuet",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Joly",
                         "target": "Bahorel",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Bossuet",
                         "value": 7
                     },
                     {
                         "source": "Joly",
                         "target": "Gavroche",
                         "value": 3
                     },
                     {
                         "source": "Joly",
                         "target": "Courfeyrac",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Enjolras",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Feuilly",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Prouvaire",
                         "value": 2
                     },
                     {
                         "source": "Joly",
                         "target": "Combeferre",
                         "value": 5
                     },
                     {
                         "source": "Joly",
                         "target": "Mabeuf",
                         "value": 1
                     },
                     {
                         "source": "Joly",
                         "target": "Marius",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Bossuet",
                         "value": 3
                     },
                     {
                         "source": "Grantaire",
                         "target": "Enjolras",
                         "value": 3
                     },
                     {
                         "source": "Grantaire",
                         "target": "Combeferre",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Courfeyrac",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Joly",
                         "value": 2
                     },
                     {
                         "source": "Grantaire",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Bahorel",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Feuilly",
                         "value": 1
                     },
                     {
                         "source": "Grantaire",
                         "target": "Prouvaire",
                         "value": 1
                     },
                     {
                         "source": "MotherPlutarch",
                         "target": "Mabeuf",
                         "value": 3
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Thenardier",
                         "value": 5
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Gueulemer",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Thenardier",
                         "value": 6
                     },
                     {
                         "source": "Babet",
                         "target": "Gueulemer",
                         "value": 6
                     },
                     {
                         "source": "Babet",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Javert",
                         "value": 2
                     },
                     {
                         "source": "Babet",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Babet",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Thenardier",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Babet",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Gueulemer",
                         "value": 4
                     },
                     {
                         "source": "Claquesous",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Mme.Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Claquesous",
                         "target": "Enjolras",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Babet",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Gueulemer",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Claquesous",
                         "value": 2
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Montparnasse",
                         "target": "Thenardier",
                         "value": 1
                     },
                     {
                         "source": "Toussaint",
                         "target": "Cosette",
                         "value": 2
                     },
                     {
                         "source": "Toussaint",
                         "target": "Javert",
                         "value": 1
                     },
                     {
                         "source": "Toussaint",
                         "target": "Valjean",
                         "value": 1
                     },
                     {
                         "source": "Child1",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Child2",
                         "target": "Gavroche",
                         "value": 2
                     },
                     {
                         "source": "Child2",
                         "target": "Child1",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Babet",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Gueulemer",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Thenardier",
                         "value": 3
                     },
                     {
                         "source": "Brujon",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Eponine",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Claquesous",
                         "value": 1
                     },
                     {
                         "source": "Brujon",
                         "target": "Montparnasse",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Bossuet",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Joly",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Grantaire",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Bahorel",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Courfeyrac",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Gavroche",
                         "value": 1
                     },
                     {
                         "source": "Mme.Hucheloup",
                         "target": "Enjolras",
                         "value": 1
                     }
                 ]
             }*/
            //link的宽度
            var edgSizeArray = []
            //link的颜色
            //var edgColorArray = []
            //node的大小
            var nodeSizeArray = []
            //node的颜色
            var nodeColorArray = []
            //node的坐标
            var nodeX = []
            var nodeY = []

            var k,l,v,z;


            for(k=0;k<Re.links.length;k++)
                edgSizeArray.push(Re.links[k].value)
            /*for(l=0;l<Re.links.length;l++)
                edgColorArray.push(Re.links[l].edgLabel)*/
            for(v=0;v<Re.nodes.length;v++)
                nodeSizeArray.push(Re.nodes[v].size)
            for(l=0;l<Re.nodes.length;l++)
                nodeColorArray.push(Re.nodes[l].group)
            for(z=0;z<Re.posXY.length;z++)
            {
                var obj = Re.posXY[z];
                nodeX.push(obj[z][0])  //obj[z]是[x,y]
                nodeY.push(obj[z][1])
            }





            console.log("边的大小："+edgSizeArray)
            console.log("点的颜色："+nodeColorArray)
            console.log("点的颜色去重："+nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ))
            console.log("点的大小："+nodeSizeArray)


            var labelColor;  //边和点的颜色
            switch (nodeColorArray.filter( (item, index ,arr)=>arr.indexOf(item) === index ).length) {
                case 2:{labelColor = d3.scaleOrdinal().domain([0,1]).range(["#fc8d59","#91cf60"]);}break;
                case 3:{labelColor = d3.scaleOrdinal().domain([0,1,2]).range(["#fc8d59","#ffffbf","#91cf60"]);}break;
                case 4:{labelColor = d3.scaleOrdinal().domain([0,1,2,3]).range(["#fc8d59","#ffffbf","#a6d96a","#61875d"]);}break;
                case 5:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4]).range(["#fdae61","#ffffbf","#91cf60","#61875d","#ce5c5c"]);}break;
                case 6:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5]).range(["#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 7:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6]).range(["#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850","#ce5c5c"]);}break;
                case 8:{labelColor = d3.scaleOrdinal().domain([0,1,2,3,4,5,6,7]).range(["#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#ce5c5c"]);}break;
            }

            var edgSize = d3.scaleLinear()  //边大小
                .domain([d3.min(edgSizeArray) , d3.max(edgSizeArray)])
                .range([1,3]);

            var nodeSize = d3.scaleLinear()  //点大小
                .domain([d3.min(nodeSizeArray) , d3.max(nodeSizeArray)])
                .range([2,4]);

            var width = 200;
            var height = 135;
            //预留给轴线的距离
            var padding={top:5,right:1,bottom:1,left:5};
            var net3=d3.select("#OtherMulti").append("svg")
                .attr("id","net3Svg")
                .attr("width",200)
                .attr("height",135)
                /*.style("background-color","blue")*/;
            var x_coor = d3.scaleLinear()  //x坐标
                .domain([d3.min(nodeX) , d3.max(nodeX)])
                .range([padding.left,width-padding.left-padding.right]);
            var y_coor = d3.scaleLinear()  //Y坐标
                .domain([d3.min(nodeY) , d3.max(nodeY)])
                .range([height-padding.bottom-padding.top,padding.top]);



            //绘制连线
            var link = net3.append("g").attr("class", "links")
                .selectAll("line")
                .data(data.links)
                .enter()
                .append("line")
                .attr("id",function (d) {
                    return d.source;
                })
                .attr("x1",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y1",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("x2",function (d,i) {
                    return x_coor(nodeX[i+1]);
                })
                .attr("y2",function (d,i) {
                    return y_coor(nodeY[i+1]);
                })
                .attr("stroke","#cdcccc")
                .attr("stroke-width",function(d){
                    return edgSize(d.value);
                })
                .style("opacity",function(d,i){
                    return getOpacityLink(i)? 0.9:0.1; //version2
                });  //0.5

            //绘制圆
            var node = net3.append("g").attr("class", "nodes")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("circle")
                .attr("id",function (d) {
                    return d.id;
                })
                .attr("r", function(d){
                    return nodeSize(d.size)
                })
                .attr("cx",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("cy",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .attr("fill", function(d) {
                    return labelColor(d.group);
                })
                .style("opacity",function(d,i){
                    return getOpacityNode(i)? 0.9:0.1; //version2
                });  //0.9



            //version2：选择一定范围，下面的鼠标事件是version1，不用动
            function getOpacityNode(id)
            {
                if(id>=125 && id<=145)
                    return true;
                else
                    return false;
            }
            function getOpacityLink(id)
            {
                if(id>=125 && id<=145)
                    return true;
                else
                    return false;
            }
            net3.append("g")
                .selectAll("g")
                .data(data.nodes)
                .enter()
                .append("text")
                .text(function (d,i) {
                    return d.id;
                })
                .attr("x",function (d,i) {
                    return x_coor(nodeX[i]);
                })
                .attr("y",function (d,i) {
                    return y_coor(nodeY[i]);
                })
                .style("fill", "#9c9c9c")
                .style("font-family", "Arial")
                .style("font-size", 10)
                .style("opacity",function(d,i){
                    return getOpacityNode(i)? 0.9:0;
                }); // to prevent mouseover/drag capture


            node.on("mouseover", focus).on("mouseout", unfocus);
            //特殊：当选择的是节点0时，其节点和连线显示
            function node0(id)
            {
                if((id===0) || (id===1) || (id===2))
                    return true;
                else
                    return false;
            }
            function link0(id)
            {
                if((id===0) || (id===1))
                    return true;
                else
                    return false;
            }
            //特殊：当选择的是节点191时，其节点和连线显示
            function node191(id)
            {
                if((id===189) || (id===190) || (id===191))
                    return true;
                else
                    return false;

            }
            function link191(id)
            {
                if((id===189) || (id===190))
                    return true;
                else
                    return false;

            }
            //非特殊
            function confirmNodeThree(i,index)
            {
                if((i===index-1) || (i===index) || (i===index+1))
                    return true;
                else
                    return false;
            }
            function confirmLinkTwo(i,index)
            {
                if((i===index-1) || (i===index))
                    return true;
                else
                    return false;
            }

            function focus(d) {
                //选择的点的id
                var index = d3.select(d3.event.target).datum().id;

                //网络图上显示相应相邻节点
                if(index===0)
                {
                    d3.select("#net3Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node0(circleID)? 1 : 0.1);
                        });
                    d3.select("#net3Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link0(lineID)? 1 : 0.1);
                        });
                    net3.append("g")
                        .append("text")
                        .text("0")
                        .attr("x",x_coor(nodeX[0])-4)
                        .attr("y",y_coor(nodeY[0])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net3.append("g")
                        .append("text")
                        .text("1")
                        .attr("x",x_coor(nodeX[1])-4)
                        .attr("y",y_coor(nodeY[1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net3.append("g")
                        .append("text")
                        .text("2")
                        .attr("x",x_coor(nodeX[2])-4)
                        .attr("y",y_coor(nodeY[2])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                else if(index===191)
                {
                    d3.select("#net3Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', node191(circleID)? 1 : 0.1);
                        });
                    d3.select("#net3Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', link191(lineID)? 1 : 0.1);
                        });
                    net3.append("g")
                        .append("text")
                        .text("189")
                        .attr("x",x_coor(nodeX[189])-4)
                        .attr("y",y_coor(nodeY[189])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net3.append("g")
                        .append("text")
                        .text("190")
                        .attr("x",x_coor(nodeX[190])-4)
                        .attr("y",y_coor(nodeY[190])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net3.append("g")
                        .append("text")
                        .text("191")
                        .attr("x",x_coor(nodeX[191])-4)
                        .attr("y",y_coor(nodeY[191])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                else
                {
                    d3.select("#net3Svg").selectAll('circle')
                        .each(function(d, i) {
                            var circleID = d3.select(this).datum().id;
                            d3.select(this).style('opacity', confirmNodeThree(circleID,index)? 1 : 0.1);
                        });
                    d3.select("#net3Svg").selectAll('line')
                        .each(function(d, i) {
                            var lineID = d3.select(this).datum().source;
                            d3.select(this).style('opacity', confirmLinkTwo(lineID,index)? 1 : 0.1);
                        });
                    net3.append("g")
                        .append("text")
                        .text(index)
                        .attr("x",x_coor(nodeX[index])-4)
                        .attr("y",y_coor(nodeY[index])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net3.append("g")
                        .append("text")
                        .text(index-1)
                        .attr("x",x_coor(nodeX[index-1])-4)
                        .attr("y",y_coor(nodeY[index-1])+3)
                        .style("fill", "#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture
                    net3.append("g")
                        .append("text")
                        .text(index+1)
                        .attr("x",x_coor(nodeX[index+1])-4)
                        .attr("y",y_coor(nodeY[index+1])+3)
                        .style("fill","#9c9c9c")
                        .style("font-family", "Arial")
                        .style("font-size", 10); // to prevent mouseover/drag capture

                }
                //同时在index.jsp显示相应折线bin-bulk 暂时不用。用的是手动修改localBulk.jsp
                /* var chooseIndex = index;
                 mtfLineBulkJS(nodeColorArray,chooseIndex)*/



            }

            function unfocus() {
                node.style("opacity", 1);
                link.style("opacity", 1);
                net3.selectAll("text").style("opacity", 0);

            }
        },
        error:function(xhr,type,errorThrown) {
            alert(xhr.responseText)
            console.log(xhr.status);
            console.log(type)
        }

    });
}
