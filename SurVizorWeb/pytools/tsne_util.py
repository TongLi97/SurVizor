import sys
from sklearn.manifold import TSNE
import numpy as np
import csv

class TSNEUtil():
    def __init__(self, video, left, right):
        self.video = int(video)
        self.left = int(left)
        self.right = int(right)


    def getCSV(self):
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

    def getFeatureXY(self):
        left = self.left
        right = self.right

        doc = self.getCSV()
        allCsv = []
        with open(doc) as csv_file:
            row = csv.reader(csv_file, delimiter=',')
            next(row)  # read first line

            for r in row:
                one = []
                one.append(float(r[0]))
                one.append(float(r[2]))
                one.append(float(r[4]))
                one.append(float(r[6]))
                allCsv.append(one)

        # Get the data in the corresponding time period is the feature 4 as a group to represent a frame [[4 feature values],[],[],[].....]
        selected = []
        while left <= right:
            selectOne = allCsv[left]
            selected.append(selectOne)
            left += 1

        S = np.array(selected)  # list转np.ndarray
        tsne_em = TSNE(n_components=2, perplexity=30.0, n_iter=1000, verbose=1).fit_transform(S)  # tsne calculate coordinates

        # Calculate XY coordinates of all points based on features [[x y],[],[].....]
        xys= []
        for xy in tsne_em:
            x = xy[0].item()
            y = xy[1].item()
            xys.append([x, y])

        # Assembly Features and Coordinates
        resultList = []
        frame = self.left
        for feature, xy in zip(selected, xys):
            temp = {}
            temp["aes"] = feature[0]
            temp["mem"] = feature[1]
            temp["qua"] = feature[2]
            temp["ano"] = feature[3]
            temp["x"] = xy[0]
            temp["y"] = xy[1]
            temp['frame'] = frame

            frame += 1
            resultList.append(temp)


        return resultList



if __name__ == '__main__':
    video = 1
    left = 0.1
    right = 10.1

    tsneUtil = TSNEUtil(video, left, right)
    tsneUtil.getFeatureXY()
