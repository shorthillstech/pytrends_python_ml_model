import React, { Component } from 'react'
import { Line} from 'react-chartjs-2'
import '@fortawesome/react-fontawesome'
import {Chart, ArcElement, CategoryScale, registerables} from 'chart.js'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import LinkPage from "./linkPage"
import Slider from './slider.jsx'
 Chart.register(ArcElement,CategoryScale, ...registerables);
 class Charts extends Component {
 state={
  labels:[],
  trendData:[],
  searchKeyword:'',
  predictionDuration:2,
  trendDuration:6,
  isSeasonable: false,
  checkSeasonable: "",
  serverLink: "",
  view:0,
  loader: false,
}
handleSearchBox=(e)=>{
  let copyState= {...this.state}
  copyState.searchKeyword=e.target.value;
  copyState.isSeasonable= false; 
  this.setState(copyState);
}
handlePredictionDuration=(value)=>{
  let copyState= {...this.state}
  copyState.predictionDuration=value[0];
  copyState.loader=true;
  this.setState(copyState);
  this.submit(copyState);
}
handleTrendDuration=(value)=>{
  let copyState= {...this.state}
  copyState.trendDuration=value[0];
  copyState.loader=true;
  this.setState(copyState);
  this.submit(copyState);
}
onBlurSearchBox =()=> {
 let copyState={...this.state}
 copyState.searchKeyword=document.getElementById("word").value
 if(copyState.searchKeyword)
 {
  copyState.loader=true;
  this.setState(copyState)
  this.submit(copyState);
 }
 else
 {
   window.alert("Please enter some thing")
   return ;
 }
}
handleLink=(link)=>{
  let copyState={...this.state};
  copyState.serverLink=link;
  copyState.view=1;
  this.setState(copyState);
}
submit=(value)=>{
    const user ={
      serverLink:this.state.serverLink,
      searchKeyword: value.searchKeyword,
        predictionDuration: value.predictionDuration,
        trendDuration:value.trendDuration,
      }
      axios.post(user.serverLink+`/trends?name=`+user.searchKeyword+`&&predicton_time=`+user.predictionDuration+`&&trend_time=`+user.trendDuration)
        .then(res=>{
          this.setState({loader:false,isSeasonable:res.data.Seasonality_Present,checkSeasonable:res.data.Seasonality_Present.toString(),trend:res.data.trends,trendData:res.data.trends.concat(res.data.predict_trends),labels:res.data.trends_date.concat(res.data.predict_date)});
          }).catch(
             (error) => {
             window.alert("Invalid link. Please enter another link.");
            this.setState({view:0})
            }
          )
}
handleSuggestedWord=(clickedWord)=>{
  let copyState={...this.state}
  copyState.searchKeyword=clickedWord;
  copyState.loader=true;
  this.setState(copyState);
  this.submit(copyState)
}
handleKey=(e)=>{
  let copyState={...this.state}

  if(e.key==='Enter')
  {
    copyState.loader=true;
    this.setState(copyState);
    this.submit(copyState);
  }
 
}

onInput() {
  let currentValForPredict = document.getElementById("predictSlider").value;
  let cuurentValForTrend = document.getElementById("trendSlider").value
  let copyState= {...this.state}
  copyState.predictionDurationLabel=currentValForPredict;
  copyState.trendDurationLabel=cuurentValForTrend;
  this.setState(copyState)
}
  render(){
    let {isSeasonable,checkSeasonable,view,serverLink} = this.state
  return  view===0
  ?<React.Fragment>
         <LinkPage 
         serverLink={serverLink}
         onSubmit={this.handleLink}
         />
  </React.Fragment>
  :view===1
  ?
    <React.Fragment>
    <div className="container-fluid bg-light">
      {this.state.loader ? <div class="loader"></div>: ""}
      <div className="text-center bg-primary">
         <h2 className="text-center py-4 text-white">Explore what the world is searching:</h2>
              <div className="searchBox">
                 <input type="text" onKeyDown={this.handleKey} id="word" value={this.state.searchKeyword} placeholder="Enter search word" className="bg-white" onBlur={this.onBlurSearchBox} onChange={this.handleSearchBox}/>
                  <button className="bg-white"><i className="fa fa-search"/></button>
               </div>
                <div className="text-center  py-4 text-white">
                  {checkSeasonable===""?"":isSeasonable?<h3>Seasonal</h3>:<h3>Not Seasonal</h3>}
                </div>
              </div>
                <div className="container-fluid mt-4">
                  <h3 className="headingForWords my-2 ">Some suggested words...</h3>
                  <div className="d-flex mt-4 justify-content-center relatedWordsBoxContainer">
                    <div className="suggestedWordBox bg-white mt-2" onClick={()=>this.handleSuggestedWord("Google")}>
                     <i className="fa fa-search"></i>
                     <h5 className="mx-auto pt-2" >Google</h5>
                    </div>
                    <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleSuggestedWord("Instagram")}>
                     <i className="fa fa-search"></i>
                      <h5 className="mx-auto pt-2">Instagram</h5>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center relatedWordsBox">
                    <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleSuggestedWord("React")}>
                      <i className="fa fa-search"></i>
                      <h5 className="mx-auto pt-2">React</h5>
                    </div>
                      <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleSuggestedWord("Machine Learning")}>
                        <i className="fa fa-search"></i>
                        <h5 className="mx-auto pt-2">Machine Learning</h5>
                     </div> 
                  </div>
                  <div className="d-flex   justify-content-center active">
                    <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleSuggestedWord("Snow")}>
                    <i className="fa fa-search"></i>
                    <h5 className="mx-auto pt-2">Snow</h5>
                  </div>
                  <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleSuggestedWord("Car")}>
                    <i className="fa fa-search"></i>
                    <h5 className="mx-auto pt-2">Car</h5>
                  </div>
                 </div>
               </div> 
               <div className='container row'>
               <label className='col-md-4 col-sm-12 heading'>Select the prediction duration:</label> 
              <div className="col-md-8 col-sm-12">
                {this.state.loader?"": <Slider
                defaultValue={this.state.predictionDuration}
                min={2}
                max={36}
                label={"Prediction Duration"}
                onChange={this.handlePredictionDuration}
                />}
               </div>
               </div>
               <div className='container row'>
               <label className='col-md-4 col-sm-12 text-center heading'>Select the trend duration:</label>
              <div className="col-md-8 col-sm-12">
               {this.state.loader?"": <Slider
                defaultValue={this.state.trendDuration}
                min={6}
                max={120}
                label={"Actual Trend Duration"}
                onChange={this.handleTrendDuration}
                />}
               </div>
               </div>
               <div className="text-center graphContainer  mx-auto bg-white">
              <Line     
            data={{
              labels: [...this.state.labels],
            
              datasets: [
                {
                  labels: 'Trend',
                  data: this.state.trend,
                  backgroundColor: 'red',
                  borderColor: 'red',
                },
                {
                  labels: 'Prediction Trend',
                  data: this.state.trendData,
                  backgroundColor:  'blue',
                  borderColor:  'blue',
                  borderDash: [6,6]
              }
              ], 
            }}
            width={250}
            height={300}
            
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: 
                  {
                    max: 100,
                      beginAtZero:true,
                  },
              },
              legend: {
                labels: {
                  fontSize: 12,
                },
              },
            }}
          />  
    </div>
</div>
</React.Fragment>
  :""
   }
}
export default Charts