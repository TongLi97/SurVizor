//Note: Use StreamingHttpResponse to solve the problem that the video cannot be dragged and cannot be positioned
//Play the video selected by the drop-down box
function multi_videoPlayerJS(value)
{
    value = parseInt(value)

    let videoStr = "/upload/video/"
    if(value===1)
        videoStr = videoStr +"view-HC3.webm"
        $("#video").attr('src', '/stream_video/?path=static/'+videoStr);   //StreamingHttpResponse
    if(value===2)
        videoStr = videoStr +"view-HC4.webm"
        $("#video").attr('src', '/stream_video/?path=static/'+videoStr);
    if(value===3)
        videoStr = videoStr +"view-IP2.webm"
        $("#video").attr('src', '/stream_video/?path=static/'+videoStr);
    if(value===4)
        videoStr = videoStr +"view-IP5.webm"
        $("#video").attr('src', '/stream_video/?path=static/'+videoStr);
    if(value===5)
        videoStr = videoStr +"Air_Force_One.webm"
        $("#video").attr('src', '/stream_video/?path=static/'+videoStr);
    if(value===6)
        videoStr = videoStr +"car_over_camera.webm"
        $("#video").attr('src', '/stream_video/?path=static/'+videoStr);
    if(value===7)
        videoStr = videoStr +"St_Maarten_Landing.webm"
        $("#video").attr('src', '/stream_video/?path=static/'+videoStr);

}


//Play the swiped video
function functionPlaySelected()
{
    //The corresponding seconds interval of the video display brushing range (add 10 seconds before and after each)
    console.log("brushPixel:"+brushPixel)
    var secondLeft = parseInt((brushPixel[0]-3)/6.2)
    var secondRight = parseInt((brushPixel[1]-3)/6.2)

    //Play the video interval specified by the swipe area
    var brushvalue = window.brushValue;
    console.log("brush video：", brushvalue)
    console.log("second:", secondLeft+","+secondRight);

    let videoStr = "/upload/video/"
    switch(brushvalue)
    {
        case 1:{videoStr = videoStr +"view-HC3.webm"} break;
        case 2:{videoStr = videoStr +"view-HC4.webm"} break;
        case 3:{videoStr = videoStr +"view-IP2.webm"} break;
        case 4:{videoStr = videoStr +"view-IP5.webm"} break;
        case 5:{videoStr = videoStr +"Air_Force_One.webm"} break;
        case 6:{videoStr = videoStr +"car_over_camera.webm"} break;
        case 7:{videoStr = videoStr +"St_Maarten_Landing.webm"} break;
    }

    var  secondStr = "#t="
    videoStr = videoStr + secondStr + secondLeft +"," +secondRight;
    $("#video").attr('src', '/stream_video/?path=static/'+videoStr); //StreamingHttpResponse

    $( "#secondLeft" ).attr( "placeholder" , secondLeft );
    $( "#secondRight" ).attr( "placeholder" , secondRight );
}

//Play the seconds clicked by the tsne scatter
function functionPlaySelectedTSNE(indexFrame)
{
    console.log("brush video：", brushvalue)
    var brushvalue = window.brushValue;
    console.log("index:", indexFrame)

    let videoStr = "/upload/video/"
    switch(brushvalue)
    {
        case 1:{videoStr = videoStr +"view-HC3.webm"} break;
        case 2:{videoStr = videoStr +"view-HC4.webm"} break;
        case 3:{videoStr = videoStr +"view-IP2.webm"} break;
        case 4:{videoStr = videoStr +"view-IP5.webm"} break;
        case 5:{videoStr = videoStr +"Air_Force_One.webm"} break;
        case 6:{videoStr = videoStr +"car_over_camera.webm"} break;
        case 7:{videoStr = videoStr +"St_Maarten_Landing.webm"} break;
    }

    var  secondStr = "#t="
    videoStr = videoStr + secondStr + indexFrame;
    $("#video").attr('src', '/stream_video/?path=static/'+videoStr);  //StreamingHttpResponse

    $( "#secondLeft" ).attr( "placeholder" , indexFrame );
    $( "#secondRight" ).attr( "placeholder" , indexFrame );
}

//Play the seconds clicked by the Net
function functionPlaySelectedNet(indexFrame)
{
    console.log("brush video：", brushvalue)
    var brushvalue = window.brushValue;
    console.log("index:", indexFrame)

    let videoStr = "/upload/video/"
    switch(brushvalue)
    {
        case 1:{videoStr = videoStr +"view-HC3.webm"} break;
        case 2:{videoStr = videoStr +"view-HC4.webm"} break;
        case 3:{videoStr = videoStr +"view-IP2.webm"} break;
        case 4:{videoStr = videoStr +"view-IP5.webm"} break;
        case 5:{videoStr = videoStr +"Air_Force_One.webm"} break;
        case 6:{videoStr = videoStr +"car_over_camera.webm"} break;
        case 7:{videoStr = videoStr +"St_Maarten_Landing.webm"} break;
    }

    var  secondStr = "#t="
    videoStr = videoStr + secondStr + indexFrame;
    $("#video").attr('src', '/stream_video/?path=static/'+videoStr);  //借助StreamingHttpResponse

    $( "#secondLeft" ).attr( "placeholder" , indexFrame );
    $( "#secondRight" ).attr( "placeholder" , indexFrame );
}




