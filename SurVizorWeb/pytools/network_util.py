
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
# import communityTest as community_louvain
from networkx.drawing.nx_agraph import graphviz_layout




class NetworkUtil():
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

    def getTimestamps(self):
        n_timestamps = {
            1: 192,
            2: 192,
            3: 192,
            4: 192,
            5: 184,
            6: 152,
            7: 72,
        }
        return n_timestamps.get(self.video, None)

    def getImageSize(self):
        image_size = {
            1: 192,
            2: 192,
            3: 192,
            4: 192,
            5: 184,
            6: 152,
            7: 72,
        }
        return image_size.get(self.video, None)

    def getNodeEdg(self):

        # 1. Read the data and visualize the line chart
        DATA = self.getDoc()
        strategy = 'quantile'
        tag_df = pd.read_csv(self.getDoc(), usecols=[7, 8])

        tag_df["index"] = pd.to_datetime(tag_df["index"])
        tag_df = tag_df.set_index("index")
        # 2. Split the bin and visualize the bin division
        X_binned, bin_edges = tsia.markov.discretize(tag_df)  # The value divided by the bin     bin corresponding to each x
        # 3. Calculate the transition matrix (points)
        X_mtm = tsia.markov.markov_transition_matrix(X_binned)
        # 4. Calculate the transition matrix (probability)
        X_mtm = tsia.markov.markov_transition_probabilities(X_mtm)

        # 5. Calculate and visualize the Markov transition field
        def _markov_transition_field(X_binned, X_mtm, n_timestamps, n_bins):
            X_mtf = np.zeros((n_timestamps, n_timestamps))
            for i in prange(n_timestamps):
                for j in prange(n_timestamps):
                    X_mtf[i, j] = X_mtm[X_binned[i], X_binned[j]]
            return X_mtf

        n_bins = 8
        n_timestamps = self.getTimestamps()
        X_mtf = _markov_transition_field(X_binned, X_mtm, n_timestamps, n_bins)
        X_mtf = np.round(X_mtf * 100, 1)

        # 6. Computational Aggregate Markov Transition Fields: To make image size manageable and computationally efficient
        image_size = self.getImageSize()  # 可以修改 例如8  192
        window_size, remainder = divmod(n_timestamps, image_size)
        if remainder == 0:
            X_amtf = np.reshape(
                X_mtf, (image_size, window_size, image_size, window_size)
            ).mean(axis=(1, 3))
        else:
            pass


        # AAAAAAA. Output transition field (only output the probability of 0-1 1-2 2-3...)
        adjacent_p = []
        i = 0
        for i in range(len(X_amtf) - 1):
            row = X_amtf[i]
            adjacent_p.append(row[i + 1])


        # 7. Map transition probabilities back to the original data and visualize (take self-transition probabilities)
        # 8. Draw the node graph
        tag_df = pd.read_csv(os.path.join(DATA), usecols=[7, 8])

        tag_df["index"] = pd.to_datetime(tag_df["index"])
        tag_df = tag_df.set_index("index")
        image_size = self.getImageSize()
        X = tag_df.values.reshape(1, -1)
        mtf = MarkovTransitionField(image_size=image_size, n_bins=n_bins, strategy=strategy)
        tag_mtf = mtf.fit_transform(X)


        G = tsia.network_graph.get_network_graph(tag_mtf[0])


        # color
        encoding = tsia.network_graph.get_modularity_encoding(G)  # json  node_size,edge_color,node_color     three arrays

        edgColorList = self.deleteDuplicatedElementFromList(encoding.get("edge_color"))

        def getEdgLabel(color):
            return edgColorList.index(color)


        # DDDDDDDDDDDD  output point size
        nodeSizes = []
        for nodeSize in encoding.get("node_size"):
            nodeSizes.append(nodeSize)


        # EEEEEEEEEEEE  Type of output point
        nodeColors = []
        for nodeColor in encoding.get("node_color"):
            nodeColors.append(nodeColor)

        # Node location information
        poss = []
        pos = graphviz_layout(G)
        for i in range(len(pos)):
            onetuple = pos[i]  # tuple type() stores x onetuple[0] and y onetuple[1]
            poss.append(onetuple)

        return adjacent_p, nodeSizes, nodeColors, poss

    # Need to be called to execute! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
    def get_result(self):
        adjacent_p, nodeSizes, nodeColors, poss = self.getNodeEdg()

        # Integrate adjacent edges
        result_edgs = []
        for i in range(len(adjacent_p)):
            temp = {}
            temp['source'] = i
            temp['target'] = i + 1
            temp['value'] = int(adjacent_p[i])
            result_edgs.append(temp)


        # Integrate node size and color
        result_nodeSize = nodeSizes
        result_nodeColoe = nodeColors


        # Integration node
        result_nodes = []
        for i in range(len(result_nodeSize)):
            temp = {}
            temp['id'] = i
            temp['group'] = result_nodeColoe[i]
            temp['size'] = int(result_nodeSize[i])
            result_nodes.append(temp)

        # Integrated coordinates
        result_xy = []
        for i in range(len(poss)):
            temp = {}
            xy = [poss[i][0], poss[i][1]]
            temp[str(i)] = xy
            result_xy.append(temp)

        temp = {}
        temp['links'] = result_edgs
        temp['nodes'] = result_nodes
        temp['posXY'] = result_xy

        return temp


    def deleteDuplicatedElementFromList(self, listA):  # remove duplicate elements
        return sorted(set(listA), key=listA.index)

if __name__ == '__main__':
    video = 1
    left = 0.1
    right = 10.1

    netUtil = NetworkUtil(video)
    netUtil.get_result()
