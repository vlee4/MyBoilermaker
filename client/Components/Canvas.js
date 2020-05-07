import React from "react";
import Konva from "konva";
// import { render } from "react-dom";
import { Stage, Layer, Image, Text } from "react-konva";
import { connect } from "react-redux";
// import bodyPix from "@tensorflow-models";
// import * as bodyPix from "@tensorflow-models/body-pix";
const bodyPix = require("@tensorflow-models/body-pix");
import regeneratorRuntime from "regenerator-runtime";

class Canvas extends React.Component {
  constructor() {
    super();
    this.startCam = this.startCam.bind(this);
    this.stopCam = this.stopCam.bind(this);
    this.segmentAndMask = this.segmentAndMask.bind(this);
    this.loadAndPredict = this.loadAndPredict.bind(this);
  }

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

  async loadAndPredict() {
    console.log("LOAD AND PREDICT");
    var video = document.querySelector("#videoElement");
    try {
      const net = await bodyPix.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2,
      }); // using default MobileNetV1 arch
      console.log("LOADED PIX");
      const segmentation = await net.segmentPerson(video, {
        flipHorizontal: false,
        internalResolution: "medium",
        segmentationThreshold: 0.7,
      });
      console.log("Here's the segmenation", segmentation);
      return segmentation;
    } catch (error) {
      console.log(error);
    }
  }
  async segmentAndMask() {
    console.log("SEGMENT");
    var video = document.querySelector("#videoElement");
    var videoPromise = await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        resolve(video);
      };
    });
    const segmentation = this.loadAndPredict();
    const backgroundBlurAmount = 3;
    const edgeBlurAmount = 3;
    const flipHorizontal = false;

    const canvas = document.getElementById("canvas");
    bodyPix.drawBokehEffect(
      canvas,
      videoPromise,
      segmentation,
      backgroundBlurAmount,
      edgeBlurAmount,
      flipHorizontal
    );
  }

  render() {
    if (!navigator.mediaDevices.getUserMedia) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <div id="container">
          <video autoPlay={true} id="videoElement"></video>
          <button onClick={this.startCam}>START</button>
          <button onClick={this.stopCam}>STOP</button>
          <button onClick={this.segmentAndMask}>SEGMENT</button>
          <hr />
          {/* <div id="canvas"></div> */}
          <canvas id="canvas" width="500"></canvas>
        </div>
      </div>
    );
  }
}

export default connect()(Canvas);
