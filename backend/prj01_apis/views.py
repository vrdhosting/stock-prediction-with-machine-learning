from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response

import os
from django.conf import settings

# Machine Learning Imports
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
#import tensorflow as tf
import yfinance as yf

from .utils import save_plot_as_image



# Create your views here.

class StockPredictionAPIView(APIView):
    
    def post(self, request):
        data_serializer = StockPredictionSerializer(data=request.data)
        
        if data_serializer.is_valid():
            ticker = data_serializer.validated_data['ticker']
            
            # Calling ML Model for Prediction
            response_from_model = self.runLSTMModel(ticker)
                    
            # now = datetime.now()
            # start_time = datetime(now.year-10,now.month,now.day)
            # end_time = now
            
            # raw_stock_data = yf.download(stock_ticker,start_time,end_time)
            # print(raw_stock_data)
            
            # if raw_stock_data.empty:
            #     return Response({'status': status.HTTP_404_NOT_FOUND,
            #                     'error' : 'Invalid Stock Name'})
            
            #return Response({'status':'Success','ticker' : ticker })
            return Response(response_from_model.data)
            
    def runLSTMModel(self,ticker):
        
            stock_ticker = ticker
            now = datetime.now()
            start_time = datetime(now.year-10,now.month,now.day)
            end_time = now
            
            raw_stock_data = yf.download(stock_ticker,start_time,end_time)
            #print(raw_stock_data)
            
            if raw_stock_data.empty:
                return Response({'status': status.HTTP_404_NOT_FOUND,
                                'error' : 'Invalid Stock Name'})
                
            else:
                #return Response({'status' : status.HTTP_200_OK, 'message': 'Data Received'})
        
            
                index_reset_data = raw_stock_data.reset_index()
                #print(index_reset_data)

                # Generate Basic Plot
                plt.switch_backend('AGG')
                plt.figure(figsize=(12,5))
                plt.plot(index_reset_data.Close, label = 'Closing Price')
                plt.title(f'Closing price of {stock_ticker}')
                plt.xlabel('Days')
                plt.ylabel('Closing Price')    
                plt.legend()
                
                # Save the plot to a file
                date_str = datetime.now().strftime('%Y%m%d_%H%M%S')
                plot_img_name = f'{ticker}_plot_{date_str}.png'
                # image_path = os.path.join(settings.MEDIA_ROOT, plot_img_name)
                # plt.savefig(image_path)
                # plt.close()
                
                # plot_img_01= settings.MEDIA_URL + plot_img_name
                
                plot_img_01 = save_plot_as_image(plot_img_name)
                print(plot_img_01)
                
                # 100 Days Moving Average
                index_reset_data['100ma'] = index_reset_data.Close.rolling(100).mean()
                plt.switch_backend('AGG')
                plt.figure(figsize=(12,5))
                plt.plot(index_reset_data.Close, label = 'Closing Price')
                plt.plot(index_reset_data['100ma'], label = '100 Days Moving Average')
                plt.title(f'100 Days Moving Average of {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Closing Price')
                plt.legend()
                
                date_str = datetime.now().strftime('%Y%m%d_%H%M%S')
                plot_img_name_dma100 = f'{ticker}_100_dma_plot_{date_str}.png'
                plot_img_02 = save_plot_as_image(plot_img_name_dma100)
                print(plot_img_02)
                
                # 200 Days Moving Average
                index_reset_data['200ma'] = index_reset_data.Close.rolling(200).mean()
                plt.switch_backend('AGG')
                plt.figure(figsize=(12,5))
                plt.plot(index_reset_data.Close, label = 'Closing Price')
                plt.plot(index_reset_data['100ma'],color='red', label = '100 Days Moving Average')
                plt.plot(index_reset_data['200ma'], color= 'green', label = '200 Days Moving Average')
                plt.title(f'200 Days Moving Average of {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Closing Price')
                plt.legend()
                
                date_str = datetime.now().strftime('%Y%m%d_%H%M%S')
                plot_img_name_dma200 = f'{ticker}_200_dma_plot_{date_str}.png'
                plot_img_03 = save_plot_as_image(plot_img_name_dma200)
                print(plot_img_03)

                return Response({'status' : status.HTTP_200_OK,
                                   'plot_img': plot_img_01,
                                   'plot_img_02': plot_img_02,
                                   'plot_img_03': plot_img_03})


            
        
        
        
            
