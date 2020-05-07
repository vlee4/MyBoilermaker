import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Image, Text } from "react-konva";
import { connect } from "react-redux";

class Canvas extends React.Component {
  constructor() {
    super();
    this.startCam = this.startCam.bind(this);
    this.stopCam = this.stopCam.bind(this);
  }

  componentDidMount() {}

  startCam() {
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  }

  stopCam() {
    var video = document.querySelector("#videoElement");
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
  }

  render() {
    if (!navigator.mediaDevices.getUserMedia) {
      return <h2>Loading...</h2>;
    }

    return (
      <div id="container">
        <video autoPlay={true} id="videoElement"></video>
        <button onClick={this.startCam}>START</button>
        <button onClick={this.stopCam}>STOP</button>
      </div>
    );
  }
}

export default connect()(Canvas);
