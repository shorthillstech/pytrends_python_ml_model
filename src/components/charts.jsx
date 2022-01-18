import React, { Component } from 'react'
import { Line} from 'react-chartjs-2'
import '@fortawesome/react-fontawesome'
import {Chart, ArcElement, CategoryScale, registerables} from 'chart.js'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import LinkPage from "./linkPage"
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
  loader: false
}
handleSearchBox=(e)=>{
  let copyState= {...this.state}
  copyState.searchKeyword=e.target.value;
  copyState.isSeasonable= false; 
  this.setState(copyState);
}
handlePredictionDuration=(e)=>{
  let copyState= {...this.state}
  copyState.predictionDuration=e.target.value;
  this.setState(copyState);
}
handleTrendDuration=(e)=>{
  let copyState= {...this.state}
  copyState.trendDuration=e.target.value;
  this.setState(copyState);
}
onBlurSearchBox =()=> {
 let copyState={...this.state}
 copyState.loader=true;
 copyState.searchKeyword=document.getElementById("word").value
 this.setState(copyState)
 this.submit(copyState);
  
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
          console.log(res);
          this.setState({loader:false,isSeasonable:res.data.Seasonality_Present,checkSeasonable:res.data.Seasonality_Present.toString(),trend:res.data.trends,trendData:res.data.trends.concat(res.data.predict_trends),labels:res.data.trends_date.concat(res.data.predict_date)});
          }).catch(
            function (error) {
             window.alert("The link you entered is not in working");
             console.log("Helllooo",this.state.loader);
            }
          )
}
handleClickedSuggestedWord=(clickedWord)=>{
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
    this.submit(copyState);
  }
 
}

onInput() {
  let currentValForPredict = document.getElementById("predictSlider").value;
  let cuurentValForTrend = document.getElementById("trendSlider").value
  let copyState= {...this.state}
  copyState.predictionDuration=currentValForPredict;
  copyState.trendDuration=cuurentValForTrend;
  copyState.loader=true;
  this.setState(copyState)
  this.submit(copyState)
}
  render(){
    let {isSeasonable,checkSeasonable,view,serverLink} = this.state
    console.log(this.state.loader)
  return view===0
  ?<React.Fragment>
         <LinkPage 
         serverLink={serverLink}
         onSubmit={this.handleLink}
         />
  </React.Fragment>
  :view===1
  ? (
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
                    <div className="suggestedWordBox bg-white mt-2" onClick={()=>this.handleClickedSuggestedWord("Google")}>
                     <i className="fa fa-search"></i>
                     <h5 className="mx-auto pt-2" >Google</h5>
                    </div>
                    <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleClickedSuggestedWord("Instagram")}>
                     <i className="fa fa-search"></i>
                      <h5 className="mx-auto pt-2">Instagram</h5>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center relatedWordsBox">
                    <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleClickedSuggestedWord("React")}>
                      <i className="fa fa-search"></i>
                      <h5 className="mx-auto pt-2">React</h5>
                    </div>
                      <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleClickedSuggestedWord("Machine Learning")}>
                        <i className="fa fa-search"></i>
                        <h5 className="mx-auto pt-2">Machine Learning</h5>
                     </div> 
                  </div>
                  <div className="d-flex   justify-content-center active">
                    <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleClickedSuggestedWord("Snow")}>
                    <i className="fa fa-search"></i>
                    <h5 className="mx-auto pt-2">Snow</h5>
                  </div>
                  <div className="suggestedWordBox bg-white mt-2"onClick={()=>this.handleClickedSuggestedWord("Car")}>
                    <i className="fa fa-search"></i>
                    <h5 className="mx-auto pt-2">Car</h5>
                  </div>
                 </div>
               </div>  
              <div className=" d-flex justify-content-between mt-4 slider">
              <label><h5>Select the prediction duration:</h5> </label>
                    <input id="predictSlider" className="w-50" type="range" min="2" max="36" step="1" defaultValue="2" onChange={this.handlePredictionDuration} onMouseLeave={this.onInput.bind(this)}
                    />
               </div>
                <h6 className="mt-2 text-center">Prediction Duration: {this.state.predictionDuration} Months</h6>
              <div className=" d-flex justify-content-between mt-4 slider">
              <label><h5>Select the trend duration: </h5></label>
              <input id="trendSlider" className="w-50" type="range" min="6" max="120" step="1" defaultValue="6" onChange={this.handleTrendDuration} onMouseLeave={this.onInput.bind(this)}
              />
              </div>
               <h6 className="mt-2 text-center">Actual Trend Duration: {this.state.trendDuration} Months</h6>
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
  )
  :""
          }
}
export default Charts