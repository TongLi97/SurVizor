//draw tree - anomaly
function pipBSTJS()
{
    console.log("Draw Tree！！")
    var brushvalue = window.brushValue;
    console.log(" brush video:"+brushvalue)
    var treeData = {};
    switch(brushvalue)
    {
        case 1:{ treeData ={
            "value": 175,
            "imp":1,
            "children": [
                {
                    "parent": 175,
                    "label": 1,
                    "value": 158,
                    "imp":2,
                    "children": [
                        {
                            "parent": 158,
                            "label": 1,
                            "value": 52,
                            "imp":3,
                            "children": [
                                {
                                    "parent": 52,
                                    "label": 1,
                                    "value": 29,
                                    "imp":4,
                                    "children": [
                                        {
                                            "parent": 29,
                                            "label": 1,
                                            "value": 11,
                                            "imp":5,
                                        },
                                        {
                                            "parent": 29,
                                            "label": 2,
                                            "value": 33,
                                            "imp":6,
                                            "children": [
                                                {
                                                    "parent": 33,
                                                    "label": 2,
                                                    "value": 38,
                                                    "imp":7,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "parent": 158,
                            "label": 2,
                            "value": 166,
                            "imp":8,
                        }
                    ]
                },
                {
                    "parent": 175,
                    "label": 2,
                    "value": 178,
                    "imp":9,
                }
            ]
        } } break;  //HC3
        case 2:{ treeData ={
            "value": 158,
            "imp":1,
            "children": [
                {
                    "parent": 158,
                    "label": 1,
                    "value": 15,
                    "imp":2,
                    "children": [
                        {
                            "parent": 15,
                            "label": 1,
                            "value": 9,
                            "imp":6,
                            "children": [
                                {
                                    "parent": 9,
                                    "label": 2,
                                    "value": 12,
                                    "imp":8,
                                }
                            ]
                        },
                        {
                            "parent": 15,
                            "label": 2,
                            "value": 33,
                            "imp":3,
                            "children": [
                                {
                                    "parent": 33,
                                    "label": 2,
                                    "value": 21,
                                    "imp":7,
                                }
                            ]
                        }
                    ]
                },
                {
                    "parent": 158,
                    "label": 2,
                    "value": 179,
                    "imp":4,
                    "children": [
                        {
                            "parent": 179,
                            "label": 2,
                            "value": 175,
                            "imp":5,
                        },
                        {
                            "parent": 179,
                            "label": 2,
                            "value": 180,
                            "imp":9,
                        }
                    ]
                }
            ]
        } } break;    //HC4
        case 3:{ treeData ={
            "value": 50,
            "imp":1,
            "children": [
                {
                    "parent": 50,
                    "label": 1,
                    "value": 44,
                    "imp":3,
                    "children": [
                        {
                            "parent": 44,
                            "label": 1,
                            "value": 30,
                            "imp":6,
                        },
                        {
                            "parent": 44,
                            "label": 2,
                            "value": 48,
                            "imp":9,
                        }
                    ]
                },
                {
                    "parent": 50,
                    "label": 2,
                    "value": 60,
                    "imp":2,
                    "children": [
                        {
                            "parent": 60,
                            "label": 2,
                            "value": 52,
                            "imp":7,
                        },
                        {
                            "parent": 60,
                            "label": 2,
                            "value": 165,
                            "imp":4,
                            "children": [
                                {
                                    "parent": 165,
                                    "label": 2,
                                    "value": 153,
                                    "imp":5,
                                },
                                {
                                    "parent": 165,
                                    "label": 2,
                                    "value": 172,
                                    "imp":8,
                                }
                            ]
                        }
                    ]
                }
            ]
        } } break;  //IP2
        case 4:{ treeData ={
            "value": 165,
            "imp":1,
            "children": [
                {
                    "parent": 165,
                    "label": 1,
                    "value": 158,
                    "imp":2,
                    "children": [
                        {
                            "parent": 158,
                            "label": 1,
                            "value": 135,
                            "imp":3,
                            "children": [
                                {
                                    "parent": 135,
                                    "label": 1,
                                    "value": 110,
                                    "imp":4,
                                    "children": [
                                        {
                                            "parent": 110,
                                            "label": 1,
                                            "value": 53,
                                            "imp":9,
                                        },
                                        {
                                            "parent": 110,
                                            "label": 2,
                                            "value": 129,
                                            "imp":7,
                                        }
                                    ]
                                },
                                {
                                    "parent": 135,
                                    "label": 2,
                                    "value": 143,
                                    "imp":8,
                                }
                            ]
                        },
                        {
                            "parent": 158,
                            "label": 2,
                            "value": 160,
                            "imp":5,
                        }
                    ]
                },
                {
                    "parent": 165,
                    "label": 2,
                    "value": 172,
                    "imp":6,
                }
            ]
        } } break;  //IP5
        case 5:{ treeData ={
            "value": 170,
            "imp":1,
            "children": [
                {
                    "parent": 170,
                    "label": 1,
                    "value": 148,
                    "imp":2,
                    "children": [
                        {
                            "parent": 148,
                            "label": 1,
                            "value": 65,
                            "imp":6,
                            "children": [
                                {
                                    "parent": 65,
                                    "label": 1,
                                    "value": "e"
                                },
                                {
                                    "parent": 65,
                                    "label": 2,
                                    "value": 72,
                                    "imp":7,
                                    "children": [
                                        {
                                            "parent": 72,
                                            "label": 1,
                                            "value": "e"
                                        },
                                        {
                                            "parent": 72,
                                            "label": 2,
                                            "value": 80,
                                            "imp":8,
                                            "children": [
                                                {
                                                    "parent": 80,
                                                    "label": 1,
                                                    "value": "e"
                                                },
                                                {
                                                    "parent": 80,
                                                    "label": 2,
                                                    "value": 84,
                                                    "imp":9,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "parent": 148,
                            "label": 2,
                            "value": "e"
                        }
                    ]
                },
                {
                    "parent": 170,
                    "label": 2,
                    "value": 174,
                    "imp":3,
                    "children": [
                        {
                            "parent": 174,
                            "label": 1,
                            "value": "e"
                        },
                        {
                            "parent": 174,
                            "label": 2,
                            "value": 176,
                            "imp":4,
                            "children": [
                                {
                                    "parent": 176,
                                    "label": 1,
                                    "value": 175,
                                    "imp":5,
                                },
                                {
                                    "parent": 176,
                                    "label": 2,
                                    "value": "e"
                                }
                            ]
                        }
                    ]
                }
            ]
        } } break;  //Air
        case 6:{ treeData ={
            "value": 87,
            "imp":1,
            "children": [
                {
                    "parent": 87,
                    "label": 1,
                    "value": 85,
                    "imp":2,
                    "children": [
                        {
                            "parent": 85,
                            "label": 1,
                            "value": 63,
                            "imp":4,
                            "children": [
                                {
                                    "parent": 63,
                                    "label": 1,
                                    "value": 54,
                                    "imp":5,
                                    "children": [
                                        {
                                            "parent": 54,
                                            "label": 1,
                                            "value": 38,
                                            "imp":6,
                                            "children": [
                                                {
                                                    "parent": 38,
                                                    "label": 1,
                                                    "value": 35,
                                                    "imp":9,
                                                },
                                                {
                                                    "parent": 38,
                                                    "label": 2,
                                                    "value": "e"
                                                }
                                            ]
                                        },
                                        {
                                            "parent": 54,
                                            "label": 2,
                                            "value": "e"
                                        }
                                    ]
                                },
                                {
                                    "parent": 63,
                                    "label": 2,
                                    "value": "e"
                                }
                            ]
                        },
                        {
                            "parent": 85,
                            "label": 2,
                            "value": "e"
                        }
                    ]
                },
                {
                    "parent": 87,
                    "label": 2,
                    "value": 92,
                    "imp":3,
                    "children": [
                        {
                            "parent": 92,
                            "label": 1,
                            "value": "e"
                        },
                        {
                            "parent": 92,
                            "label": 2,
                            "value": 112,
                            "imp":7,
                            "children": [
                                {
                                    "parent": 112,
                                    "label": 1,
                                    "value": "e"
                                },
                                {
                                    "parent": 112,
                                    "label": 2,
                                    "value": 117,
                                    "imp":8,
                                }
                            ]
                        }
                    ]
                }
            ]
        } } break;  //Car
        case 7:{ treeData ={
            "value": 30,
            "imp":1,
            "children": [
                {
                    "parent": 30,
                    "label": 1,
                    "value": 6,
                    "imp":5,
                    "children": [
                        {
                            "parent": 6,
                            "label": 1,
                            "value": "e"
                        },
                        {
                            "parent": 6,
                            "label": 2,
                            "value": 26,
                            "imp":6,
                            "children": [
                                {
                                    "parent": 26,
                                    "label": 1,
                                    "value": 24,
                                    "imp":7,
                                },
                                {
                                    "parent": 26,
                                    "label": 2,
                                    "value": "e"
                                }
                            ]
                        }
                    ]
                },
                {
                    "parent": 30,
                    "label": 2,
                    "value": 38,
                    "imp":2,
                    "children": [
                        {
                            "parent": 38,
                            "label": 1,
                            "value": 32,
                            "imp":8,
                            "children": [
                                {
                                    "parent": 32,
                                    "label": 1,
                                    "value": "e"
                                },
                                {
                                    "parent": 32,
                                    "label": 2,
                                    "value": 34,
                                    "imp":9,
                                }
                            ]
                        },
                        {
                            "parent": 38,
                            "label": 2,
                            "value": 44,
                            "imp":3,
                            "children": [
                                {
                                    "parent": 44,
                                    "label": 1,
                                    "value": "e"
                                },
                                {
                                    "parent": 44,
                                    "label": 2,
                                    "value": 53,
                                    "imp":4,
                                }
                            ]
                        }
                    ]
                }
            ]
        }} break;  //ST

    }

    var innerColor =d3.scaleLinear()  //time color
    .domain([1 , 9])
    .range(["rgb(205,104,104)","#f5eded"]);

    var width = $("#BST").innerWidth();
    var height = $("#BST").innerHeight();
    var padding={top:5,right:5,bottom:5,left:5};
    d3.select("#BTSSvg").remove();
    var svg=d3.select("#BST").append("svg")
            .attr("id","BTSSvg")
            .attr("width",width)
            .attr("height",height);

    var i = 0, duration = 750, root;
    //declare a tree structure
    var treemap = d3.tree().size([width, height]);
    root = d3.hierarchy(treeData, function(d){
        // console.log(d.children)
        return d.children;
    });
    //Determine the location of the root
    root.x0 = width / 2;
    root.y0 = padding.top;

    update(root);

    //tree  expand
    function collapse(d){
        if(d.children){
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null;
        }
    }

    // Update
    function update(source){  //source is root
        // Use the determined root position to assign x y coordinates to child nodes
        var treeData = treemap(root);
        // Calculate the layout of the above tree
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);
        // normalized to a fixed depth
        nodes.forEach(function(d){ d.y = d.depth*80;});

        // **************** Nodes Section ****************

        // data preparation
        var node = svg.selectAll('g.node')
            .data(nodes, function(d) {return d.id || (d.id = ++i); });
        // Draw a node, the node supports clicking, when clicked, this branch is collapsed or expanded
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d){
                return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .on('click', click);
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d){
                var im= d.data.imp;
                console.log("im"+im)
                return d._children ? "lightsteelblue" : innerColor(im);
            });
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d){
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function(d){
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d){ return d.data.value; })
            .style("opacity",
                function(d)
                {
                    return d.data.value !=="e" ? 1: 0;
                });

        // Update
        var nodeUpdate = nodeEnter.merge(node);

        // 1. When any root node expands and contracts, it is indeed over to the correct position of the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) {
                d.y = d.y + 15;  //Too sticky Modify here!
                return "translate(" + d.x + "," + d.y + ")";
            });
        // 2. When any root node expands and contracts, the root node changes style (the interior is filled with blue)
        nodeUpdate.select('circle.node')
            .attr('r', 12)
            .style("fill", function(d){
                var im= d.data.imp;
                console.log("im"+im)
                return d._children ? "#c77575" : innerColor(im);
            })
            .attr('cursor', 'pointer');

        //1. When the root node shrinks, the transformation disappears after the child node shrinks
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d){
                return "translate(" + source.x +","+ source.y +")";
            })
            .remove();
        //2. When the child node disappears, r becomes 0
        nodeExit.select('circle')
            .attr('r', 1e-6);
        //3. When the child node disappears, there is no label
        nodeExit.select('text')
            .style('fill-opacity', 1e-6)




        // **************** Links Section ****************

        // Prepare data, draw link
        var link = svg.selectAll('path.link')
            .data(links, function(d){ return d.id; });
        // Calculate link location
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d){
                var o = {x: source.x0, y: source.y0};
                return diagonal(o,o);
            });

        // Update
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function(d){ return diagonal(d, d.parent) });

        // Remove the link of the child node
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d){
                var o = {x: source.x, y: source.y};
                return diagonal(o, o);
            })
            .remove();
        linkExit.select('path')
            .attr('stroke', 1e-6)
            .attr('stroke-width',1e-6);

        // Store the old positions for transition.
        nodes.forEach(function(d){
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Create a curved (diagonal) path from parent node to child node
        function diagonal(s,d){
            path = "M" + s.x +"," + s.y
                + "C" + (s.x + d.x) / 2 + "," + s.y
                + " " + (s.x + d.x) / 2 + "," + d.y
                + " " + d.x + "," + d.y;
            return path;
        }

        //toggle child on click
        function click(d){
            if (d.children){
                d._children = d.children;
                d.children = null;
            }
            else{
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }


}

//Drae tree-memory
function pipBSTMemoryJS()
{
    console.log("Draw tree memory!")
    var brushvalue = window.brushValue;
    console.log("brush video:"+brushvalue)
    var treeData = {};
    //Notice! ! ! Here only the ''airplane'' has the importances attribute added
    switch(brushvalue)
    {
        case 1:{ treeData ={
            "value": 174,
            "children": [
                {
                    "parent": 174,
                    "label": 1,
                    "value": 172,
                    "children": [
                        {
                            "parent": 172,
                            "label": 1,
                            "value": 166,
                            "children": [
                                {
                                    "parent": 166,
                                    "label": 1,
                                    "value": 164,
                                    "children": [
                                        {
                                            "parent": 164,
                                            "label": 1,
                                            "value": 160,
                                            "children": [
                                                {
                                                    "parent": 160,
                                                    "label": 1,
                                                    "value": 4,
                                                    "children": [
                                                        {
                                                            "parent": 4,
                                                            "label": 1,
                                                            "value": "e"
                                                        },
                                                        {
                                                            "parent": 4,
                                                            "label": 2,
                                                            "value": 27,
                                                            "children": [
                                                                {
                                                                    "parent": 27,
                                                                    "label": 1,
                                                                    "value": "e"
                                                                },
                                                                {
                                                                    "parent": 27,
                                                                    "label": 2,
                                                                    "value": 37
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "parent": 160,
                                                    "label": 2,
                                                    "value": "e"
                                                }
                                            ]
                                        },
                                        {
                                            "parent": 164,
                                            "label": 2,
                                            "value": "e"
                                        }
                                    ]
                                },
                                {
                                    "parent": 166,
                                    "label": 2,
                                    "value": "e"
                                }
                            ]
                        },
                        {
                            "parent": 172,
                            "label": 2,
                            "value": "e"
                        }
                    ]
                },
                {
                    "parent": 174,
                    "label": 2,
                    "value": 175
                }
            ]
        } } break;  //HC3
        case 2:{ treeData ={
            "value": 179,
            "children": [
                {
                    "parent": 179,
                    "label": 1,
                    "value": 176,
                    "children": [
                        {
                            "parent": 176,
                            "label": 1,
                            "value": 22,
                            "children": [
                                {
                                    "parent": 22,
                                    "label": 1,
                                    "value": 18,
                                    "children": [
                                        {
                                            "parent": 18,
                                            "label": 1,
                                            "value": 14,
                                            "children": [
                                                {
                                                    "parent": 14,
                                                    "label": 1,
                                                    "value": 11,
                                                    "children": [
                                                        {
                                                            "parent": 11,
                                                            "label": 1,
                                                            "value": 9
                                                        },
                                                        {
                                                            "parent": 11,
                                                            "label": 2,
                                                            "value": "e"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "parent": 14,
                                                    "label": 2,
                                                    "value": "e"
                                                }
                                            ]
                                        },
                                        {
                                            "parent": 18,
                                            "label": 2,
                                            "value": "e"
                                        }
                                    ]
                                },
                                {
                                    "parent": 22,
                                    "label": 2,
                                    "value": 34
                                }
                            ]
                        },
                        {
                            "parent": 176,
                            "label": 2,
                            "value": "e"
                        }
                    ]
                },
                {
                    "parent": 179,
                    "label": 2,
                    "value": 180
                }
            ]
        } } break;    //HC4
        case 3:{ treeData ={
            "value": 34,
            "children": [
                {
                    "parent": 34,
                    "label": 1,
                    "value": 28
                },
                {
                    "parent": 34,
                    "label": 2,
                    "value": 162,
                    "children": [
                        {
                            "parent": 162,
                            "label": 1,
                            "value": 135,
                            "children": [
                                {
                                    "parent": 135,
                                    "label": 1,
                                    "value": 36
                                },
                                {
                                    "parent": 135,
                                    "label": 2,
                                    "value": 161
                                }
                            ]
                        },
                        {
                            "parent": 162,
                            "label": 2,
                            "value": 168,
                            "children": [
                                {
                                    "parent": 168,
                                    "label": 1,
                                    "value": 163,
                                    "children": [
                                        {
                                            "parent": 163,
                                            "label": 1,
                                            "value": "e"
                                        },
                                        {
                                            "parent": 163,
                                            "label": 2,
                                            "value": 166
                                        }
                                    ]
                                },
                                {
                                    "parent": 168,
                                    "label": 2,
                                    "value": "e"
                                }
                            ]
                        }
                    ]
                }
            ]
        } } break;  //IP2
        case 4:{ treeData ={
            "value": 161,
            "children": [
                {
                    "parent": 161,
                    "label": 1,
                    "value": 140,
                    "children": [
                        {
                            "parent": 140,
                            "label": 1,
                            "value": 63,
                            "children": [
                                {
                                    "parent": 63,
                                    "label": 1,
                                    "value": 4,
                                    "children": [
                                        {
                                            "parent": 4,
                                            "label": 1,
                                            "value": "e"
                                        },
                                        {
                                            "parent": 4,
                                            "label": 2,
                                            "value": 16,
                                            "children": [
                                                {
                                                    "parent": 16,
                                                    "label": 1,
                                                    "value": "e"
                                                },
                                                {
                                                    "parent": 16,
                                                    "label": 2,
                                                    "value": 38
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "parent": 63,
                                    "label": 2,
                                    "value": 133
                                }
                            ]
                        },
                        {
                            "parent": 140,
                            "label": 2,
                            "value": "e"
                        }
                    ]
                },
                {
                    "parent": 161,
                    "label": 2,
                    "value": 165,
                    "children": [
                        {
                            "parent": 165,
                            "label": 1,
                            "value": 164
                        },
                        {
                            "parent": 165,
                            "label": 2,
                            "value": "e"
                        }
                    ]
                }
            ]
        } } break;  //IP5
        case 5:{ treeData = {
            "value": 162,
            "imp":1,
            "children": [
                {
                    "parent": 162,
                    "label": 1,
                    "value": 123,
                    "imp":2,
                    "children": [
                        {
                            "parent": 123,
                            "label": 1,
                            "value": 53,
                            "imp":3,
                            "children": [
                                {
                                    "parent": 53,
                                    "label": 1,
                                    "value": "e"
                                },
                                {
                                    "parent": 53,
                                    "label": 2,
                                    "value": 68,
                                    "imp":4,
                                    "children": [
                                        {
                                            "parent": 68,
                                            "label": 1,
                                            "value": "e"
                                        },
                                        {
                                            "parent": 68,
                                            "label": 2,
                                            "value": 79,
                                            "imp":5,
                                            "children": [
                                                {
                                                    "parent": 79,
                                                    "label": 1,
                                                    "value": "e"
                                                },
                                                {
                                                    "parent": 79,
                                                    "label": 2,
                                                    "value": 89,
                                                    "imp":6,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "parent": 123,
                            "label": 2,
                            "value": 156,
                            "imp":7,
                            "children": [
                                {
                                    "parent": 156,
                                    "label": 1,
                                    "value": 135,
                                    "imp":8,
                                },
                                {
                                    "parent": 156,
                                    "label": 2,
                                    "value": "e"
                                }
                            ]
                        }
                    ]
                },
                {
                    "parent": 162,
                    "label": 2,
                    "value": 167,
                    "imp":9,
                }
            ]
        } } break;  //Air
        case 6:{ treeData ={
            "value": 108,
            "children": [
                {
                    "parent": 108,
                    "label": 1,
                    "value": 62,
                    "children": [
                        {
                            "parent": 62,
                            "label": 1,
                            "value": 35,
                            "children": [
                                {
                                    "parent": 35,
                                    "label": 1,
                                    "value": "e"
                                },
                                {
                                    "parent": 35,
                                    "label": 2,
                                    "value": 38
                                }
                            ]
                        },
                        {
                            "parent": 62,
                            "label": 2,
                            "value": 65,
                            "children": [
                                {
                                    "parent": 65,
                                    "label": 1,
                                    "value": "e"
                                },
                                {
                                    "parent": 65,
                                    "label": 2,
                                    "value": 87,
                                    "children": [
                                        {
                                            "parent": 87,
                                            "label": 1,
                                            "value": 85
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "parent": 108,
                    "label": 2,
                    "value": 113,
                    "children": [
                        {
                            "parent": 113,
                            "label": 1,
                            "value": "e"
                        },
                        {
                            "parent": 113,
                            "label": 2,
                            "value": 141
                        }
                    ]
                }
            ]
        } } break;  //Car
        case 7:{ treeData ={
            "value": 56,
            "children": [
                {
                    "parent": 56,
                    "label": 1,
                    "value": 52,
                    "children": [
                        {
                            "parent": 52,
                            "label": 1,
                            "value": 38,
                            "children": [
                                {
                                    "parent": 38,
                                    "label": 1,
                                    "value": 28,
                                    "children": [
                                        {
                                            "parent": 28,
                                            "label": 1,
                                            "value": 23
                                        },
                                        {
                                            "parent": 28,
                                            "label": 2,
                                            "value": 36,
                                            "children": [
                                                {
                                                    "parent": 36,
                                                    "label": 1,
                                                    "value": 34
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "parent": 38,
                                    "label": 2,
                                    "value": 49
                                }
                            ]
                        }
                    ]
                },
                {
                    "parent": 56,
                    "label": 2,
                    "value": 59
                }
            ]
        } } break;  //ST

    }

    var innerColor =d3.scaleLinear()
        .domain([1 , 9])
        .range(["rgb(251,195,87)","#f5eded"]);

    var width = $("#BST").innerWidth();
    var height = $("#BST").innerHeight();
    var padding={top:5,right:5,bottom:5,left:5};
    d3.select("#BTSSvg").remove();
    var svg=d3.select("#BST").append("svg")
            .attr("id","BTSSvg")
            .attr("width",width)
            .attr("height",height);

    var i = 0, duration = 750, root;
    var treemap = d3.tree().size([width, height]);
    root = d3.hierarchy(treeData, function(d){
        // console.log(d.children)
        return d.children;
    });
    root.x0 = width / 2;
    root.y0 = padding.top;

    update(root);

    function collapse(d){
        if(d.children){
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null;
        }
    }

    // Update
    function update(source){

        var treeData = treemap(root);
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);
        nodes.forEach(function(d){ d.y = d.depth*80;});

        // **************** Nodes Section ****************

        var node = svg.selectAll('g.node')
            .data(nodes, function(d) {return d.id || (d.id = ++i); });
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d){
                return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .on('click', click);
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d){
                return d._children ? "lightsteelblue" : "#fff";
            });
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d){
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function(d){
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d){

                  return d.data.value; })
            .style("opacity",
                function(d)
                {
                    return d.data.value !=="e" ? 1: 0;
                })
            ;

        // Update
        var nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) {
                d.y = d.y + 15;
                return "translate(" + d.x + "," + d.y + ")";
            });
        nodeUpdate.select('circle.node')
            .attr('r', 12)
            .style("fill", function(d){
                var im= d.data.imp;
                console.log("im"+im)
                return d._children ? "#c77575" : innerColor(im);
            })
            .attr('cursor', 'pointer');

        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d){
                return "translate(" + source.x +","+ source.y +")";
            })
            .remove();

        nodeExit.select('circle')
            .attr('r', 1e-6);

        nodeExit.select('text')
            .style('fill-opacity', 1e-6)




        // **************** Links Section ****************

        var link = svg.selectAll('path.link')
            .data(links, function(d){ return d.id; });

        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d){
                var o = {x: source.x0, y: source.y0};
                return diagonal(o,o);
            });

        // Update
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function(d){ return diagonal(d, d.parent) });

        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d){
                var o = {x: source.x, y: source.y};
                return diagonal(o, o);
            })
            .remove();
        linkExit.select('path')
            .attr('stroke', 1e-6)
            .attr('stroke-width',1e-6);

        // Store the old positions for transition.
        nodes.forEach(function(d){
            d.x0 = d.x;
            d.y0 = d.y;
        });

        function diagonal(s,d){
            path = "M" + s.x +"," + s.y
                + "C" + (s.x + d.x) / 2 + "," + s.y
                + " " + (s.x + d.x) / 2 + "," + d.y
                + " " + d.x + "," + d.y;
            return path;
        }

        function click(d){
            if (d.children){
                d._children = d.children;
                d.children = null;
            }
            else{
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }


}

