from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import json
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins =["*"],
    allow_credentials = False,
    allow_methods =["*"],
    allow_headers=["*"],  
)

class model_input(BaseModel):

    Symptom_1     :str
    Symptom_2     :str
    Symptom_3     :str
    Symptom_4     :str
    Symptom_5     :str
    Symptom_6     :str
    Symptom_7     :str
    Symptom_8     :str
    Symptom_9     :str
    Symptom_10    :str
    Symptom_11    :str
    Symptom_12    :str
    Symptom_13    :str
    Symptom_14    :str
    Symptom_15    :str
    Symptom_16    :str
    Symptom_17    :str


dieseaseModel = pickle.load(open('model.pkl','rb'))
data_sevrity = pd.read_csv("Symptom-severity.csv")
symptomDes = pd.read_csv("symptom_Description.csv")
precation = pd.read_csv("symptom_precaution.csv")

for i in range(len(precation['Disease'])):

    if(type(precation['Disease'][i]) == str):
        precation['Disease'][i] = precation['Disease'][i].strip()
        precation['Disease'][i] = precation['Disease'][i].replace(" ", "_")


for i in range(len(symptomDes['Disease'])):

    if(type(symptomDes['Disease'][i]) == str):
        symptomDes['Disease'][i] = precation['Disease'][i].strip()
        symptomDes['Disease'][i] = precation['Disease'][i].replace(" ", "_")





@app.post('/prediction')
def prediction(input_parameter :model_input):

    

    input_data = input_parameter.model_dump_json()
    input_dictionary = json.loads(input_data)
    diesease_weight = []



    for sym in input_dictionary.values():

        sym = sym.strip()
        sym = sym.replace(" ","_")


        for index, row in data_sevrity.iterrows():

            symtom = row['Symptom']
            weight = row['weight']

            if(sym == symtom):
                diesease_weight.append(weight)
    

    diesease_weight += [0] * (17 - len(diesease_weight))

    qw=pd.DataFrame([diesease_weight],columns=['Symptom_1', 'Symptom_2', 'Symptom_3', 'Symptom_4', 'Symptom_5',
       'Symptom_6', 'Symptom_7', 'Symptom_8', 'Symptom_9', 'Symptom_10',
       'Symptom_11', 'Symptom_12', 'Symptom_13', 'Symptom_14', 'Symptom_15',
       'Symptom_16', 'Symptom_17'])
    
    result = dieseaseModel.predict(qw)

    diesease = result[0]
    descript =""
    precaut = "You can follow these precautions : "


    for index,row in symptomDes.iterrows():

        Disease = row['Disease']
        Description = row['Description']

        if(Disease == diesease):
            descript = descript + " "+Description


    for index,row in precation.iterrows():

        Disease = row['Disease']
        preca1 = row['Precaution_1']
        preca2 = row['Precaution_2']
        preca3 = row['Precaution_3']
        preca4 = row['Precaution_4']

        # print (type(preca1))
        # print (preca1)

        if(diesease == Disease):
            print(type(preca1))
            print(type(preca2))
            print(type(preca3))
            print(type(preca4))
            
            # precaut = precaut + " "+preca1 + " "+preca2 + " "+preca3 + " "+preca4
            if(type(preca1) == str):
                precaut = precaut + " 1. "+ preca1
            
            if(type(preca2) == str):
                precaut = precaut + " 2. "+ preca2
            if(type(preca3) == str):
                precaut = precaut + " 3. "+ preca3
            if(type(preca4) == str):
                precaut = precaut + " 4. "+ preca4
            
                
    

    retStr = "You might be "+ diesease + " "+descript + " "+precaut

    return retStr


















    

        




