"""SurVizor URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.static import serve
from django.urls import path, re_path # Fix Chrome resource safe loading issue


from SurVizorWeb import views as SurVizorViews

urlpatterns = [
    # html map
    path("", SurVizorViews.index),


    # function map
    path('ajax_tsne/', SurVizorViews.ajax_tsne),
    path('ajax_network/', SurVizorViews.ajax_network),
    path('ajax_mtfline/', SurVizorViews.ajax_mtfline),

    path('stream_video/', SurVizorViews.stream_video),  # StreamingHttpResponse


    path('admin/', admin.site.urls),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': 'E:\project\DjangoWeb\SurVizor\static'}) # Fix Chrome resource safe loading issue
]
