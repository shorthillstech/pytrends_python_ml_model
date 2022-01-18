import React,{Component} from "react";
class LinkPage extends Component{
    state={
        serverLink:this.props.serverLink,
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let s1={...this.state}
        s1.serverLink=input.value
        this.setState(s1);
    }
handleSubmit=(e)=>{
    e.preventDefault();
    this.props.onSubmit(this.state.serverLink)
}
    render(){
        let {serverLink}=this.state;
        return (
            <div className="container">
                <h3 className="text-center" >Welcome to the Pytrends</h3>
                 <div className="form-group">
                <label>Link</label>
                <input
                type="text"
                className="form-control"
                id="link"
                name="link"
                value={serverLink}
                onChange={this.handleChange}
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
export default LinkPage;