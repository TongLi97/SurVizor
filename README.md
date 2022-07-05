# SurVizor

## Introduction

<b>Survizor</b> is a visual analysis tool for the mining and understanding of the key content of the surveillance video.                              
This website is Survizor's Django Web project.

<div align="center">
  <div style="float:left;margin-right:10px;">
  <img src="images/pipline.png" width="380px"><br>
    <p style="font-size:1.5vw;">Pipeline of <b>Survizor</b>.</p>
  </div>
</div>

## Test on Existing Video Data
If you want to test the existing video data in the project, please prepare the python environment (<a href="#Installation">Installation</a>) and the Django Web project (<a href="#Started">Get Started</a>).         

<h2 id="Installation">Installation</h2>                         
First, you need to create a virtual environment for Survizor, and then install related dependencies.                                     
Please refer to [requirements.txt](/requirements.txt) for more detailed tools and versions.     

```shell
conda create -n SurVizorEnv python=3.8
conda activate SurVizorEnv
pip install numpy
pip install pandas 
...
```

<h2 id="Started">Get Started</h2>
Please clone the Django Web project.                   
After the environment is configured, please run the project. You can conduct visible exploration on the homepage "index.html".        

## Run on Your Own Data
If you want to run Survizor on your own video data, please get relevant features first, and the reference link is as follows:                         
[Aesthetics and Quality Feature](https://github.com/idealo/image-quality-assessment), [Memory Feature](https://github.com/ok1zjf/AMNet),  [Anomaly Feature](https://github.com/StevenLiuWen/ano_pred_cvpr2018).                  
Survizor provides a pipeline, so the project includes but not limited to these four features.         
You can expand the project according to your needs and modify the corresponding codes. 

## Citation

If you find this project useful in your research, please consider cite:

```BibTeX
@article{sun2022survizor,
  title={SurVizor: visualizing and understanding the key content of surveillance videos},
  author={Sun, Guodao and Li, Tong and Liang, Ronghua},
  journal={Journal of Visualization},
  volume={25},
  number={3},
  pages={635--651},
  year={2022},
  publisher={Springer}
}
```
