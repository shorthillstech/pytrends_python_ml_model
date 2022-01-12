import React,{Component} from "react";
class HomePage extends Component{
    state={
        id:this.props.id,
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let s1={...this.state}
        s1.id=input.value
        this.setState(s1);
    }
handleSubmit=(e)=>{
    e.preventDefault();
    this.props.onSubmit(this.state.id)
}
    render(){
        let {id}=this.state;
        return (
            <div className="container">
                <h3 className="text-center" >Welcome to the Pytrends</h3>
                 <div className="form-group">
                <label>Link</label>
                <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={id}
               
                onChange={this.handleChange}
                onBlurr={this.handleValidate}
                />
                </div>
                <br/>
                <div className="text-center">
                <button className="btn btn-primary "onClick={this.handleSubmit}>Submit</button>
            </div>
            </div>
        )
    }
}
export default HomePage;