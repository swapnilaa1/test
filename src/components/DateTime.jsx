import { Button } from "@mui/material";
import React, { Component } from "react";
import "../style/pages.css";
import "./test.css";

export default class DateTime extends Component {
  state = {
    display_msg: "",
    isNaN: false,
    timetoggle: true,
    sec: 0,
    min: 0,
    hour: 0,
    ref: null,
    count: 0,
    toggle: "",
    arr: [],
    currentTime1: new Date(),
    currentTime2: new Date(),
    currentTime3: new Date(),
    sec1: null,
    min1: null,
    hour1: null,
    date1: null,
    month1: null,
    year1: null,
    reff: null,
    stopWatchToggler: false,
    countDownToggler: false,
    currentTimeToggler: true,
    switch_stopped: true,
    switch_stopped2: true,
    sec2: null,
    min2: null,
    hour2: null,
    date2: null,
    date: null,
    refff: null,
  };
  componentDidMount = () => {
    this.setState({ display_msg: "select the date and time for count Down" });
    setInterval(() => {
      let today = new Date();
      this.setState({ sec1: today.getSeconds() });
      this.setState({ min1: today.getMinutes() });
      this.setState({ hour1: today.getHours() });
      this.setState({ date1: today.getDate() });
      this.setState({ month1: this.RetriveMonth(today.getMonth()) });
      this.setState({ year1: today.getFullYear() });
    }, 1000);
    this.setState({ sec1: this.state.currentTime2.getSeconds() });
    this.setState({ min1: this.state.currentTime2.getMinutes() });
    this.setState({ hour1: this.state.currentTime2.getHours() });
 
  };

  handleClickStart = () => {
    if (this.state.switch_stopped) {
      this.setState({ toggle: false, switch_stopped: false });

      this.setState({
        ref: setInterval(() => {
          if (this.state.sec < 59) this.setState({ sec: this.state.sec + 1 });
          else if (this.state.min < 59)
            this.setState({ sec: 0, min: this.state.min + 1 });
          else if (this.state.hour < 23)
            this.setState({ min: 0, hour: this.state.hour + 1 });
          else this.setState({ sec: 0, min: 0, hour: 0 });
        }, 1000),
      });
    }
  };

 
  RetriveDay = (y) => {
    let arr = ["sun", "mon ", "tues", "wed", "thur", "fri", "sat"];
    return arr[y];
  };
  RetriveMonth = (m) => {
    let arr = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return arr[m];
  };

  showTime=()=>{
    let hr=0 , format="AM" , min=0;

   if(this.state.hour1 > 12){
      hr=this.state.hour1-12
      format="PM";
    } 
   else{
    hr=this.state.hour1;
    format="AM";
    }
    return `${hr}:${this.state.min1<10?`0${this.state.min1}`:this.state.min1} ${format}`
  }
 

  render() {
    return (
      <div className="Time">
            <div>     <Button color="primary" variant="contained" size="small" >Punch In</Button> </div>
            <div className="time-div">
            {this.state.month1},{this.state.date1} {this.state.year1}
              </div><h4 className="disp-time">|</h4>
            <div size="small" className="disp-day" >
              {this.showTime()}
            </div>
          
      </div>
    );
  }
}