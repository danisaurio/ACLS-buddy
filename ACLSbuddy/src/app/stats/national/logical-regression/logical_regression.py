#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from sklearn import preprocessing
import matplotlib.pyplot as plt 
plt.rc("font", size=14)
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import seaborn as sns
sns.set(style="white")
sns.set(style="whitegrid", color_codes=True)


# In[2]:


data = pd.read_csv('../DataDaniela.csv', header=0)
data = data.dropna()
print(data.shape)
print(list(data.columns))


# In[3]:


data['rosc']=np.where(data['rosc'] =='yes', 0, data['rosc'])
data['rosc']=np.where(data['rosc'] =='no', 1, data['rosc'])


# In[4]:


count_death = len(data[data['rosc']==1])
count_surv = len(data[data['rosc']==0])
total = count_death+count_surv
pct_of_death = count_death/total
print("percentage of death is", pct_of_death*100)
pct_of_surv = count_surv/total
print("percentage of survival", pct_of_surv*100)


# In[5]:


# get_ipython().run_line_magic('matplotlib', 'inline')

pd.crosstab(data.rhythm,data.rosc).plot(kind='bar', stacked=True)
plt.title('Survival Frequency according to Rhythm')
plt.xlabel('Rhythm')
plt.ylabel('Rosc')
plt.savefig('graphs/survival_rosc_graph')

pd.crosstab(data.sex,data.rosc).plot(kind='bar', stacked=True)
plt.title('Survival Frequency according to sex')
plt.xlabel('Sex')
plt.ylabel('Rosc')
plt.savefig('graphs/survival_sex_graph')

pd.crosstab(data.race,data.rosc).plot(kind='bar', stacked=True)
plt.title('Survival Frequency according to race')
plt.xlabel('Race')
plt.ylabel('Rosc')
plt.savefig('graphs/survival_race_graph')


# In[6]:


data.age.hist()
plt.title('Histogram of Age')
plt.xlabel('Age')
plt.ylabel('Frequency')
plt.savefig('graphs/hist_age')


# In[7]:


cat_vars=['sex', 'rhythm', 'race']
for var in cat_vars:
    cat_list='var'+'_'+var
    cat_list = pd.get_dummies(data[var], prefix=var)
    data1=data.join(cat_list)
    data=data1
cat_vars=['sex', 'rhythm', 'race']
data_vars=data.columns.values.tolist()
to_keep=[i for i in data_vars if i not in cat_vars]

data_final=data[to_keep]
data_final.columns.values


# In[8]:


X = data_final.loc[:, data_final.columns != 'rosc']
y = data_final.loc[:, data_final.columns == 'rosc']
y=y.astype('int')


from imblearn.over_sampling import SMOTE

os = SMOTE(random_state=0)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
columns = X_train.columns

os_data_X,os_data_y=os.fit_sample(X_train, y_train)
os_data_X = pd.DataFrame(data=os_data_X,columns=columns )
os_data_y= pd.DataFrame(data=os_data_y,columns=['rosc'])
# we can Check the numbers of our data
print("length of oversampled data is ",len(os_data_X))
print("Number of no subscription in oversampled data",len(os_data_y[os_data_y['rosc']==0]))
print("Number of subscription",len(os_data_y[os_data_y['rosc']==1]))
print("Proportion of no subscription data in oversampled data is ",len(os_data_y[os_data_y['rosc']==0])/len(os_data_X))
print("Proportion of subscription data in oversampled data is ",len(os_data_y[os_data_y['rosc']==1])/len(os_data_X))


# In[9]:


data_final_vars=data_final.columns.values.tolist()
y=['y']
X=[i for i in data_final_vars if i not in y]

from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression

logreg = LogisticRegression()

rfe = RFE(logreg, 20)
rfe = rfe.fit(os_data_X, os_data_y.values.ravel())
print(rfe.support_)
print(rfe.ranking_)


# In[10]:


cols=['age', 'sex_female', 'sex_male', 'rhythm_asystole',
       'rhythm_pea', 'rhythm_pvt', 'rhythm_vf', 'race_african',
       'race_asian', 'race_caucasian', 'race_islander', 'race_native'] 
X=os_data_X[cols]
y=os_data_y['rosc']


# In[11]:


import statsmodels.api as sm
logit_model=sm.Logit(y,X)
result=logit_model.fit()
print(result.summary2())


# In[12]:


from sklearn.linear_model import LogisticRegression
from sklearn import metrics
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
logreg = LogisticRegression()
logreg.fit(X_train, y_train)


# In[13]:


y_pred = logreg.predict(X_test)
print('Accuracy of logistic regression classifier on test set: {:.2f}'.format(logreg.score(X_test, y_test)))


# In[14]:


from sklearn.metrics import confusion_matrix
confusion_matrix = confusion_matrix(y_test, y_pred)
print(confusion_matrix)


# In[15]:


from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))


# In[16]:


from sklearn.metrics import roc_auc_score
from sklearn.metrics import roc_curve
logit_roc_auc = roc_auc_score(y_test, logreg.predict(X_test))
fpr, tpr, thresholds = roc_curve(y_test, logreg.predict_proba(X_test)[:,1])
plt.figure()
plt.plot(fpr, tpr, label='Logistic Regression (area = %0.2f)' % logit_roc_auc)
plt.plot([0, 1], [0, 1],'r--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver operating characteristic')
plt.legend(loc="lower right")
plt.savefig('Log_ROC')
plt.show()


# In[18]:


finalcoefs = result.params.values #coef to be used by the statistics file
print(finalcoefs)
print(cols) 
np.savetxt('regression_coef.txt', finalcoefs, fmt='%f')
np.savetxt('regression_cols.txt', cols, fmt='%s', delimiter=' ', newline='\n', header='', footer='', comments='# ', encoding=None)


