from flask import Flask,request
from flask_cors import CORS, cross_origin

from pytrends.request import TrendReq
from pandas import *
# import time
from slugify import slugify
import pandas as pd
from darts import TimeSeries
from darts.models import ExponentialSmoothing
from darts.utils.statistics import check_seasonality, extract_trend_and_seasonality
from scipy import stats
import datetime as dt
import calendar
# import json
# import random
# import matplotlib.pyplot as plt


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def predict_trend( data, n_prediction):
  n_prediction
  df = data
  series = TimeSeries.from_dataframe(df, df.columns[0], df.columns[1])
  model = ExponentialSmoothing()
  model.fit(series)

  predictions = model.predict(n_prediction)
  return predictions


def clean_trends_data( data):
  data['date'] = pd.to_datetime(data['date'])
  data.iloc[:, 1] = data.iloc[:, 1].replace(['<1', '0', 0], 0.5)
  data.iloc[:, 1] = pd.to_numeric(data.iloc[:, 1])
  return data

def seasonalit( trend_data, n_prediction,n_trends):
  trend_data.reset_index(inplace=True)
  clean_data = clean_trends_data(trend_data)
  series = TimeSeries.from_dataframe(clean_data, clean_data.columns[0], clean_data.columns[1])
  seasonality_flag, seasonality_period = check_seasonality(series)
  print(f"Seasonality Present: {seasonality_flag}, Seasonality Period: {seasonality_period}")
  t, s = extract_trend_and_seasonality(series)
  trend = t.pd_dataframe(copy=True)
  seasonality = s.pd_dataframe(copy=True)
  print(type(t),type(seasonality))
  trend.reset_index(inplace=True)
  trend['date_ordinal'] = trend['date'].map(dt.datetime.toordinal)
  growth, intercept, r_value, p_value, std_err = stats.linregress(trend['date_ordinal'], trend['0'])
  print(f"Growth: {growth}, Intercept: {intercept}, R Value: {r_value}, P Value: {p_value}, Standard Error: {std_err} ")
  seasonality.reset_index(inplace=True)
  seasonality['month'] = seasonality['date'].dt.month
  month_wise_seasonality = seasonality.groupby('month')['0'].mean()
  months_eligible_for_campaigns = month_wise_seasonality.apply(lambda x: 1 if x > 1 else 0)
  filtered_months = months_eligible_for_campaigns.where(lambda x: x == 1).dropna().index.values
  month_names = list(map(lambda mon: calendar.month_name[mon], filtered_months))
  critical_months = ', '.join(map(str, month_names))
  print(f"Critical Months to observe: {critical_months}")

  predictions = predict_trend(clean_data, n_prediction)
  month = {  '01':'Janauary',
    '02':'February',
    '03':'March',
    '04':'April',
    '05':'May',
    '06':'June',
    '07':'July',
    '08':'August',
    '09':'September',
    '10':'October',
    '11':'November',
    '12':'December'    }

  series_list=[]
  series_date=[]
  for val in series[-(n_trends):]:
    series_list.append(int(str(val).split("array([[[")[1].split(".")[0]))
    T_date = str(val).split("datetime64[ns] ")[1].split("\n")[0][:-3].split("-")
    series_date.append(f'{month[T_date[1]]} {T_date[0]}')

  predict_list=[]
  predict_date=[]
  for val in predictions:
    predict_list.append(int(str(val).split("array([[[")[1].split(".")[0]))
    P_date = str(val).split("datetime64[ns] ")[1].split("\n")[0][:-3].split("-")
    predict_date.append(f'{month[P_date[1]]} {P_date[0]}')
  return {"trends":series_list,"trends_date":series_date, "predict_trends":predict_list,"predict_date":predict_date,"Critical_Months_to_observe":critical_months,"Seasonality_Present": seasonality_flag}

@app.route('/')
@cross_origin()
def hello_world():
  return '<h1>Hello, Shabid!</h1>'
@app.route('/akash')
@cross_origin()
def hello_world1():
  return '<h1>Hello, Akash!</h1>'

@app.route("/trends",methods=['POST', 'GET'])
@cross_origin()
def Trends():
  n_prediction = int(request.args.get('predicton_time',12) )
  keyword = request.args.get('name','')
  print(keyword)
  n_trends = int(request.args.get('trend_time',12))
  print(bool(n_prediction),bool(n_trends),keyword)
  cat_list = []
  cat_list.append(keyword)
  cat_pytrends = TrendReq(hl='en-US', tz=360)
  cat_pytrends.build_payload(cat_list, cat=0, timeframe='all', geo='US')
  lifetime_trends = cat_pytrends.interest_over_time()
  if lifetime_trends.empty:
    return ("Trends data not present for ",keyword)
  else:
    return seasonalit(lifetime_trends, n_prediction,n_trends)


if __name__ == '__main__':
    app.run()