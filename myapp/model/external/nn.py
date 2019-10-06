from bert_serving.client import BertClient
from tqdm import tqdm
import numpy as np
import joblib
import sys
import json

def merge_feature(*args):
    feat_all=[]
    for  i in tqdm(range(args[0].shape[0])):
        feat=[]
        for arg in args:
            if len(arg) > i:
                feat+=list(arg[i])
            else:
                feat = []
                break
        feat_all.append(feat)
    return np.array(feat_all)

twits_file = sys.argv[1]
laser_file = sys.argv[2]
laser_lower_file = sys.argv[3]

twits = []
with open(twits_file) as json_file:
    data = json.load(json_file)
    twits = data['data']

bc = BertClient(ip='127.0.0.1')  # ip address of the GPU machine
bert_encode = bc.encode(twits)

dim = 1024
engX_commen = np.fromfile(laser_file, dtype=np.float32, count=-1)                                                                         
engX_lib = np.fromfile(laser_lower_file, dtype=np.float32, count=-1)                                                                          
engX_commen.resize(engX_commen.shape[0] // dim, dim)                                                                          
engX_lib.resize(engX_lib.shape[0] // dim, dim)

data = merge_feature(engX_commen, engX_lib, bert_encode)

model = joblib.load("model/external/light_gbm_eng_task_1.joblib.pkl")
predictions = model.predict(data)

catalogation = {'o': 0, 'i': 0}
for p in predictions:
    if p == 1:
        catalogation['o'] += 1
    else:
        catalogation['i'] += 1

print(json.dumps(catalogation))
sys.stdout.flush()
