//Image Carousel
function playImage(value)
{
    console.log("Image Carousel！！")
    var imageDiv = document.getElementById("imageDiv")
    imageDiv.style.display = "block";
    var brushvalue = value;
    console.log("brush video:"+brushvalue)
    var root = "static/upload/imgpath/"
    console.log(root)

    let imgArr = [];
    switch(parseInt(brushvalue))
    {
        case 1:{//imageIndex = [175,158,52,29,11,33,38,166,178]
            imgArr = [
                {url: '#', imgPath: root + '/view_HC3/011.jpg'},
                {url: '#', imgPath: root + '/view_HC3/029.jpg'},
                {url: '#', imgPath: root + '/view_HC3/033.jpg'},
                {url: '#', imgPath: root + '/view_HC3/038.jpg'},
                {url: '#', imgPath: root + '/view_HC3/052.jpg'},
                {url: '#', imgPath: root + '/view_HC3/158.jpg'},
                {url: '#', imgPath: root + '/view_HC3/166.jpg'},
                {url: '#', imgPath: root + '/view_HC3/175.jpg'},
                {url: '#', imgPath: root + '/view_HC3/178.jpg'}
                ];
        }break;
        case 2:{//imageIndex = [158,15,33,179,175,9,21,12,180]
            imgArr = [
                {url: '#', imgPath: root + '/view_HC4/009.jpg'},
                {url: '#', imgPath: root + '/view_HC4/012.jpg'},
                {url: '#', imgPath: root + '/view_HC4/015.jpg'},
                {url: '#', imgPath: root + '/view_HC4/021.jpg'},
                {url: '#', imgPath: root + '/view_HC4/033.jpg'},
                {url: '#', imgPath: root + '/view_HC4/158.jpg'},
                {url: '#', imgPath: root + '/view_HC4/175.jpg'},
                {url: '#', imgPath: root + '/view_HC4/179.jpg'},
                {url: '#', imgPath: root + '/view_HC4/180.jpg'}
            ];
        }break;
        case 3:{//imageIndex = [50,60,44,165,153,30,52,172,48];
            imgArr = [
                {url: '#', imgPath: root + '/view_IP2/030.jpg'},
                {url: '#', imgPath: root + '/view_IP2/044.jpg'},
                {url: '#', imgPath: root + '/view_IP2/050.jpg'},
                {url: '#', imgPath: root + '/view_IP2/052.jpg'},
                {url: '#', imgPath: root + '/view_IP2/060.jpg'},
                {url: '#', imgPath: root + '/view_IP2/148.jpg'},
                {url: '#', imgPath: root + '/view_IP2/153.jpg'},
                {url: '#', imgPath: root + '/view_IP2/165.jpg'},
                {url: '#', imgPath: root + '/view_IP2/172.jpg'}
            ];
        }break;
        case 4:{//imageIndex = [165,158,135,110,160,172,129,143,53]
            imgArr = [
                {url: '#', imgPath: root + '/view_IP5/053.jpg'},
                {url: '#', imgPath: root + '/view_IP5/110.jpg'},
                {url: '#', imgPath: root + '/view_IP5/129.jpg'},
                {url: '#', imgPath: root + '/view_IP5/135.jpg'},
                {url: '#', imgPath: root + '/view_IP5/143.jpg'},
                {url: '#', imgPath: root + '/view_IP5/158.jpg'},
                {url: '#', imgPath: root + '/view_IP5/160.jpg'},
                {url: '#', imgPath: root + '/view_IP5/165.jpg'},
                {url: '#', imgPath: root + '/view_IP5/172.jpg'}
            ];
        }break;
        case 5:{//imageIndex = [170,148,174,176,175,65,72,80,84]
            imgArr = [
                {url: '#', imgPath: root + '/view_Air/065.jpg'},
                {url: '#', imgPath: root + '/view_Air/072.jpg'},
                {url: '#', imgPath: root + '/view_Air/080.jpg'},
                {url: '#', imgPath: root + '/view_Air/084.jpg'},
                {url: '#', imgPath: root + '/view_Air/148.jpg'},
                {url: '#', imgPath: root + '/view_Air/170.jpg'},
                {url: '#', imgPath: root + '/view_Air/174.jpg'},
                {url: '#', imgPath: root + '/view_Air/175.jpg'},
                {url: '#', imgPath: root + '/view_Air/176.jpg'}
            ];
        }break;
        case 6:{//imageIndex = [87,85,92,63,54,38,112,117,35]
            imgArr = [
                {url: '#', imgPath: root + '/view_Car/035.jpg'},
                {url: '#', imgPath: root + '/view_Car/038.jpg'},
                {url: '#', imgPath: root + '/view_Car/054.jpg'},
                {url: '#', imgPath: root + '/view_Car/063.jpg'},
                {url: '#', imgPath: root + '/view_Car/085.jpg'},
                {url: '#', imgPath: root + '/view_Car/087.jpg'},
                {url: '#', imgPath: root + '/view_Car/092.jpg'},
                {url: '#', imgPath: root + '/view_Car/112.jpg'},
                {url: '#', imgPath: root + '/view_Car/117.jpg'}
            ];
        }break;
        case 7:{//imageIndex = [30,38,44,53,6,26,24,32,34]
            imgArr = [
                {url: '#', imgPath: root + '/view_ST/06.jpg'},
                {url: '#', imgPath: root + '/view_ST/24.jpg'},
                {url: '#', imgPath: root + '/view_ST/26.jpg'},
                {url: '#', imgPath: root + '/view_ST/30.jpg'},
                {url: '#', imgPath: root + '/view_ST/32.jpg'},
                {url: '#', imgPath: root + '/view_ST/34.jpg'},
                {url: '#', imgPath: root + '/view_ST/38.jpg'},
                {url: '#', imgPath: root + '/view_ST/44.jpg'},
                {url: '#', imgPath: root + '/view_ST/53.jpg'}
            ];
        }break;
    }
    console.log(imgArr)


    new Swiper({
        imgArr: imgArr,
        imgWidth: 280,
        aniTime: 1000,
        intervalTime: 1500,
        scale: 0.9,
        autoplay: false,
        gap: 0,
        clsSuffix: '-card'
    }).init();


    new Swiper({
        imgArr: imgArr,
        imgWidth: 280,
        aniTime: 1000,
        intervalTime: 1500,
        scale: 0.9,
        autoplay: false,
        gap: -200,
        clsSuffix: '-stack'
    }).init();

}



