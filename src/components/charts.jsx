import React, { Component } from 'react'
import { Line} from 'react-chartjs-2'
import '@fortawesome/react-fontawesome'
import {Chart, ArcElement, CategoryScale, registerables} from 'chart.js'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./homePage"
 Chart.register(ArcElement,CategoryScale, ...registerables);
 class Charts extends Component {
 state={
  label:[],
  trendData:[],
  keyword:'',
  predictionDuration:2,
  trendDuration:6,
  seasonable: false,
  checkSeasonable: "",
  id: "",
  id1:"",
  view:0,
  loader: false
}
handleChange=(e)=>{
  let s1= {...this.state}
  s1.keyword=e.target.value;
  s1.seasonable= false; 
  this.setState(s1);
}
handleChange1=(e)=>{
  let s1= {...this.state}
  s1.predictionDuration=e.target.value;
  this.setState(s1);
}
handleChange2=(e)=>{
  let s1= {...this.state}
  s1.trendDuration=e.target.value;
  this.setState(s1);
}
blurFunction =()=> {
 let s1={...this.state}
 s1.loader=true;
 s1.keyword=document.getElementById("name").value
 this.setState(s1)
 this.submit(s1);
  
}
handleName=(name)=>{
  let s1={...this.state};
  s1.id1=name;
  s1.view=1;
  this.setState(s1);
}
// handleSubmit=event=>{
//   event.preventDefault(); 
//   let s1={...this.state}
//   const user ={
//     keyword: this.state.keyword,
//     id:this.state.id1,
//     predictionDuration: this.state.predictionDuration,
//     trendDuration:this.state.trendDuration
//   }
//   axios.post(user.id+`/trends?name=`+user.keyword+`&&predicton_time=`+user.predictionDuration+`&&trend_time=`+user.trendDuration)
//   .then(res=>{
//       this.setState({loader:false,seasonable:res.data.Seasonality_Present,checkSeasonable:res.data.Seasonality_Present.toString(),trend:res.data.trends,trendData:res.data.trends.concat(res.data.predict_trends),label:res.data.trends_date.concat(res.data.predict_date)});
//       }).catch(
//         function (error) {
//          window.alert("The link you entered is not in working please refresh the page and try again")
//         }
//       )
// }
submit=(s)=>{
    const user ={
      id:this.state.id1,
        keyword: s.keyword,
        predictionDuration: s.predictionDuration,
        trendDuration:s.trendDuration,
      }
      axios.post(user.id+`/trends?name=`+user.keyword+`&&predicton_time=`+user.predictionDuration+`&&trend_time=`+user.trendDuration)
        .then(res=>{
          this.setState({loader:false,seasonable:res.data.Seasonality_Present,checkSeasonable:res.data.Seasonality_Present.toString(),trend:res.data.trends,trendData:res.data.trends.concat(res.data.predict_trends),label:res.data.trends_date.concat(res.data.predict_date)});
          }).catch(
            function (error) {
             window.alert("The link you entered is not in working");
            }
          )
}
importName=(name)=>{
  let s1={...this.state}
  s1.keyword=name;
  s1.loader=true;
  this.setState(s1);
  this.submit(s1)
}
handleKey=(e)=>{
  let s1={...this.state}

  if(e.key==='Enter')
  {
    this.submit(s1);
  }
 
}

onInput() {
  console.log("hello");
  var inputPredict = document.getElementById("predictInp");
  var inputTrend = document.getElementById("trendInp")
  var currentValForPredict = inputPredict.value;
  var cuurentValForTrend = inputTrend.value
  let s1= {...this.state}
  s1.predictionDuration=currentValForPredict;
  s1.trendDuration=cuurentValForTrend;
  s1.loader=true;
  this.setState(s1)
  this.submit(s1)
}
  render(){
    let {seasonable,checkSeasonable,view,id1} = this.state
    console.log(this.state.loader)
  return view===0
  ?<React.Fragment>
         <HomePage 
         id={id1}
         onSubmit={this.handleName}
         />
  </React.Fragment>
  :view===1
  ? (
    <div className="container-fluid bg-light p-0">
      {this.state.loader ? <div class="contain" role="status">
  <div class="loader"></div>
</div>: ""}
      <div className="text-center bg-primary">
         <h2 className="text-center py-4 text-white">Explore what the world is searching:</h2>
            <form onSubmit={this.handleSubmit} className="d-flex formStyle">
              <div className="searchBox">
                 <input type="text" onKeyDown={this.handleKey} id="name" value={this.state.keyword} placeholder="Enter search word" className="bg-white" onBlur={this.blurFunction} onChange={this.handleChange}/>
                  <button className="bg-white"><i className="fa fa-search"/></button>
               </div>
             </form>
                <div className="text-center  py-4 text-white">
                  {checkSeasonable===""?"":seasonable?<h3>Seasonal</h3>:<h3>Not Seasonal</h3>}
                </div>
              </div>
                <div className="container-fluid mt-4">
                  <h3 className="headingForWords my-2 ">Some suggested words...</h3>
                  <div className="d-flex mt-4 justify-content-center relatedWordsBox">
                    <div className="box bg-white mt-2" onClick={()=>this.importName("Google")}>
                     <i className="fa fa-search"></i>
                     <h5 className="mx-auto pt-2" >Google</h5>
                    </div>
                    <div className="box bg-white mt-2"onClick={()=>this.importName("Instagram")}>
                     <i className="fa fa-search"></i>
                      <h5 className="mx-auto pt-2">Instagram</h5>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center relatedWordsBox">
                    <div className="box bg-white mt-2"onClick={()=>this.importName("React")}>
                      <i className="fa fa-search"></i>
                      <h5 className="mx-auto pt-2">React</h5>
                    </div>
                      <div className="box bg-white mt-2"onClick={()=>this.importName("Machine Learning")}>
                        <i className="fa fa-search"></i>
                        <h5 className="mx-auto pt-2">Machine Learning</h5>
                     </div> 
                  </div>
                  <div className="d-flex   justify-content-center hello">
                    <div className="box bg-white mt-2"onClick={()=>this.importName("Snow")}>
                    <i className="fa fa-search"></i>
                    <h5 className="mx-auto pt-2">Snow</h5>
                  </div>
                  <div className="box bg-white mt-2"onClick={()=>this.importName("Car")}>
                    <i className="fa fa-search"></i>
                    <h5 className="mx-auto pt-2">Car</h5>
                  </div>
                 </div>
               </div>  
              <div className=" d-flex justify-content-between mt-4 slider">
              <label><h5>Select the prediction duration:</h5> </label>
                    <input id="predictInp" className="w-50" type="range" min="2" max="36" step="1" defaultValue="2" onChange={this.handleChange1} onMouseLeave={this.onInput.bind(this)}
                    />
               </div>
                <h6 className="mt-2 text-center">Prediction Duration: {this.state.predictionDuration} Months</h6>
              <div className=" d-flex justify-content-between mt-4 slider">
              <label><h5>Select the trend duration: </h5></label>
              <input id="trendInp" className="w-50" type="range" min="6" max="120" step="1" defaultValue="6" onChange={this.handleChange2} onMouseLeave={this.onInput.bind(this)}
              />
              </div>
               <h6 className="mt-2 text-center">Actual Trend Duration: {this.state.trendDuration} Months</h6>
               <div className="text-center graphBox  mx-auto bg-white">
              <Line     
            data={{
              labels: [...this.state.label],
            
              datasets: [
                {
                  label: 'Trend',
                  data: this.state.trend,
                  backgroundColor: 'red',
                  borderColor: 'red',
                },
                {
                  label: 'Prediction Trend',
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