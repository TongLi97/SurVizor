from django.shortcuts import render

# Create your views here.


import os

import re
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import csv
import pandas as pd
import numpy as np
import json
from django.http import StreamingHttpResponse
from wsgiref.util import FileWrapper
import mimetypes

from tsne_util import *
from network_util import *
from mtf_line_util import *




def index(request):
    return render(request, 'index.html')

def ajax_tsne(request):
    if request.is_ajax():
        video = request.GET.get("video")
        left = request.GET.get("leftSecond")
        right = request.GET.get("rightSecond")

        # Call the TSNEUtil class to obtain the eigenvalues and XY coordinates of the corresponding time period [ {4 eigenvalues + 2 coordinates + frame number}, {}, {} ]
        print('TSNE tool start responding')
        tsneUtil = TSNEUtil(video, left, right)
        resultList = tsneUtil.getFeatureXY()
        print('TSNE result：', resultList)

        return HttpResponse(json.dumps(resultList),content_type='application/json') # list

def ajax_network(request):
    if request.is_ajax():
        video = request.GET.get("video")

        # Call the NetworkUtil class to get the node and edge information of the network graph
        print('Network tool start responding')
        netUtil = NetworkUtil(video)
        result = netUtil.get_result()
        print('Net result：', result)

        return HttpResponse(json.dumps(result),content_type='application/json') # json

def ajax_mtfline(request):
    if request.is_ajax():
        video = request.GET.get("video")

        # 调用MTFLineUtil类，获取相应的bin
        print('MTFLine tool start responding')
        mtflineUtil = MTFLineUtil(video)
        result = mtflineUtil.get_bin_result()
        print('MTFLine result：', result)

        return HttpResponse(json.dumps(result),content_type='application/json') # json



# Use StreamingHttpResponse to solve the problem that the video cannot be dragged and cannot be positioned
def file_iterator(file_name, chunk_size=8192, offset=0, length=None):
    with open(file_name, "rb") as f:
        f.seek(offset, os.SEEK_SET)
        remaining = length
        while True:
            bytes_length = chunk_size if remaining is None else min(remaining, chunk_size)
            data = f.read(bytes_length)
            if not data:
                break
            if remaining:
                remaining -= len(data)
            yield data

def stream_video(request):
    """Respond with video files as streaming media"""
    range_header = request.META.get('HTTP_RANGE', '').strip()
    range_re = re.compile(r'bytes\s*=\s*(\d+)\s*-\s*(\d*)', re.I)
    range_match = range_re.match(range_header)
    path = request.GET.get('path') #path is  template?  the value of the following parameter
    print('path:',path)

    size = os.path.getsize(path)
    content_type, encoding = mimetypes.guess_type(path)
    content_type = content_type or 'application/octet-stream'
    if range_match:
        first_byte, last_byte = range_match.groups()
        first_byte = int(first_byte) if first_byte else 0
        last_byte = first_byte + 1024 * 1024 * 10
        if last_byte >= size:
            last_byte = size - 1
        length = last_byte - first_byte + 1
        resp = StreamingHttpResponse(file_iterator(path, offset=first_byte, length=length), status=206, content_type=content_type)
        resp['Content-Length'] = str(length)
        resp['Content-Range'] = 'bytes %s-%s/%s' % (first_byte, last_byte, size)
    else:
        resp = StreamingHttpResponse(FileWrapper(open(path, 'rb')), content_type=content_type)
        resp['Content-Length'] = str(size)
    resp['Accept-Ranges'] = 'bytes'
    return resp
