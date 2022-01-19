import React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
class Slider extends React.Component {
  state = {
    values: [this.props.defaultValue],
    min:this.props.min,
    max:this.props.max

  };
  handleValue=(value)=>{
      this.setState({values:value})
    }
  submitValue=()=>{
    this.props.onChange(this.state.values)
  }
  render() {
    return (
      <div
        style={{marginTop:"20px" }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={this.state.min}
          max={this.state.max}
          onChange={(values) => this.handleValue(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseUp={this.submitValue}
              onTouchEnd={this.submitValue}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["#548BF4", "#ccc"],
                    min: this.state.min,
                    max: this.state.max
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "35px",
                width: "35px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA"
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC"
                }}
              />
            </div>
          )}
        />
        <div className="text-center"  id="output">
          <h6>{this.props.label}: {this.state.values[0]} Months</h6>
        </div>
      </div>
    );
  }
}

export default Slider
