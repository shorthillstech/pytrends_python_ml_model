# Pytrends-python-ML-Model
**Build a Trend prediction app:-**

This repo contains all the code require to build an app to predict the trends. In this you will get both the actual trend for a given keyword and prediction for the future.

**Some prerequisites to build:-**

1. Python installed on your device(latest version)
2. node and npm (preferably the latest versions) installed on your machine
3. dart to predict the trend
4. flask to build an api
5. slugify 
6. pandas
7. scipy
8. Fontawesome for the icons 
9. react-chartjs-2 for the charts.
10. Bootstrap for the styling.

**Building a backend for Pytrends**
To build a backend on your local machine you have to use the test.py file for the backend. In this file you will need to install some dependencies which are as follows:-
1. pip install flask
2. pip install flask-cors
3. pip install pandas
4. pip install u8darts
5. pip install scipy

After installing all these dependencies you just need to click right click of mouse and click on "Run python file in Terminal". you will get a link in the terminal.
![image](https://user-images.githubusercontent.com/96161286/147666892-4fa9ce69-bd6b-4dd2-a9b5-4f890c26ec16.png)
Copy this link.

**Building a frontend for Pytrends**

To build frontend you need to open following files:-
1. charts.jsx file
2.  index.js
3.  app.css
4.  app.js

The file chart.jsx contains all the code for the frontend. you just need to install some dependencies like:-
1.   npm install --save @fortawesome/react-fontawesome
2.   npm install react-chartjs-2
3.   npm i bootstrap

Now to link this with your api that you have already made. You just need to copy that link in line number-31 and line number-42.
![image](https://user-images.githubusercontent.com/96161286/147667674-0de2fd82-0158-49d5-9f27-2baa6ed83df3.png)
 
 Suppose you have the link like http://127.0.0.1:5000/ then you have to paste it exactly same as shown in the above screenshot.
 After pasting this link just get to your directory where you have saved the file through the terminal and write npm start and press enter to start the local server.
 You will get the Local server link and app will be open on your local machine. 
 **Testing App on local machine**
 ![image](https://user-images.githubusercontent.com/96161286/147668119-14f04eb1-177a-41e3-a6dd-34ca3662a269.png)

Above screenshot shows the UI of our app and you can test it by clicking on any some searched words like Google, Instagram etc. The default values for the actual trend and prediction trend has been set to 6 and 2 months respectively. You can select the duration in months only. Thats how our app works and hope you like it.
	
