import sys
import os
import matplotlib.pyplot as plt
from matplotlib import gridspec
import pandas as pd
from numba import njit, prange
import numpy as np
from pyts.image import MarkovTransitionField
import tsia.plot
import tsia.markov
import tsia.network_graph
import networkx as nx


class MTFLineUtil():
    def __init__(self, video):
        self.video = int(video)

    def getDoc(self):
        doc = {
            1: r'E:\project\DjangoWeb\SurVizor\static\upload\data\multi_HC3_normal.csv',
            2: r'E:\project\DjangoWeb\SurVizor\static\upload\data\multi_HC4_normal.csv',
            3: r'E:\project\DjangoWeb\SurVizor\static\upload\data\multi_IP2_normal.csv',
            4: r'E:\project\DjangoWeb\SurVizor\static\upload\data\multi_IP5_normal.csv',
            5: r'E:\project\DjangoWeb\SurVizor\static\upload\data\multi_Air_normal.csv',
            6: r'E:\project\DjangoWeb\SurVizor\static\upload\data\multi_Car_normal.csv',
            7: r'E:\project\DjangoWeb\SurVizor\static\upload\data\multi_ST_normal.csv',
        }
        return doc.get(self.video, None)

    def getNodeEdg(self):
        # 1. Read the data and visualize the line chart
        tag_df = pd.read_csv(self.getDoc(), usecols=[7, 8])  # signal_4.csv
        tag_df = tag_df.set_index("index")
        # 2. Split the bin and visualize the bin division
        X_binned, bin_edges = tsia.markov.discretize(tag_df)  # The value divided by the bin         bin corresponding to each x

        bins = []
        for bin in bin_edges:
            bins.append(bin)
        return bins

    # Need to be called to execute! ! ! ! ! ! ! ! ! ! ! ! !
    def get_bin_result(self):
        bins = self.getNodeEdg()

        temp = {}
        i = 0
        for bin in bins:
            temp[str(i)] = bin
            i += 1

        return temp # {'0': 0.0, '1': 0.0, '2': 0.2375, '3': 0.4, '4': 0.6, '5': 1.0}



if __name__ == '__main__':
    video = 1

    mtflineUtil = MTFLineUtil(video)
    mtflineUtil.get_bin_result()

