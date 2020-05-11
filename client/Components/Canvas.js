import React from "react";
// import Konva from "konva";
// import { Stage, Layer, Image, Text } from "react-konva";
import { connect } from "react-redux";
const bodyPix = require("@tensorflow-models/body-pix");
import regeneratorRuntime from "regenerator-runtime";

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      _isMounted: false,
    };
    this.startCam = this.startCam.bind(this);
    this.stopCam = this.stopCam.bind(this);
    this.segmentAndMask = this.segmentAndMask.bind(this);
    this.continuouslySegmentAndMask = this.continuouslySegmentAndMask.bind(
      this
    );
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }

  startCam() {
    var video = document.querySelector("video");
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
    var video = document.querySelector("video");
    var stream = video.srcObject;
    var tracks = stream.getTracks();
    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }
    video.srcObject = null;
  }

  async segmentAndMask() {
    let video, c_out, ctx_out, c_tmp, ctx_tmp, model;
    const bodyPixConfig = {
      architechture: "MobileNetV1",
      outputStride: 16,
      multiplier: 1,
      quantBytes: 4,
    };
    const segmentationConfig = {
      internalResolution: "high",
      segmentationThreshold: 0.05,
      scoreThreshold: 0.05,
    };
    function init() {
      video = document.getElementById("video");
      //set ouput canvas
      c_out = document.getElementById("output-canvas");
      c_out.setAttribute("width", video.videoWidth);
      c_out.setAttribute("height", video.videoHeight);
      ctx_out = c_out.getContext("2d"); //get context of output canvas
      //Create canvas
      c_tmp = document.createElement("canvas");
      c_tmp.setAttribute("width", video.videoWidth);
      c_tmp.setAttribute("height", video.videoHeight);
      ctx_tmp = c_tmp.getContext("2d"); //get context of canvas
      video.play();
      computeFrame();
    }
    function computeFrame() {
      //drawImage(image, dx, dy, dWidth, dHeight, )
      //image: element to draw into the canvas context
      //dx: x coordinate where to place top left corner of source image in the destination canvas
      //dWidth: width to draw the image in the destination canvas: allowing for scaling; default: won't scale image

      //Draws the video into the intial canvas
      ctx_tmp.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      //getImageData returns the imageData for the part of the inital canvas that is specified (ie. the whole canvas)
      let frame = ctx_tmp.getImageData(
        0,
        0,
        video.videoWidth,
        video.videoHeight
      );
      //same as when we do net.segmentPerson
      //they pass in the canvas with the video drawn into it
      //then they get the imageData for the blank output canvas
      model.segmentPerson(c_tmp, segmentationConfig).then((segmentation) => {
        ctx_out.clearRect(0, 0, c_out.width, c_out.height);
        let out_image = ctx_out.getImageData(
          0,
          0,
          video.videoWidth,
          video.videoHeight
        );
        //ctx.getImageData(sx, sy, sw, sh)
        //sx: x-coordinate of from top-left corner from which ImageData will be extracted
        //sw: width or rectangle from which Image Data will be extrated
        for (let x = 0; x < video.videoWidth; x++) {
          for (let y = 0; y < video.videoHeight; y++) {
            //n = each pixel
            let n = x + y * video.videoWidth;
            //checks to see if ImageData = 1, which denotes the pixels of the person
            if (segmentation.data[n] == 1) {
              out_image.data[n * 4] = frame.data[n * 4]; //R
              out_image.data[n * 4 + 1] = frame.data[n * 4 + 1]; //G
              out_image.data[n * 4 + 2] = frame.data[n * 4 + 2]; //B
              out_image.data[n * 4 + 3] = frame.data[n * 4 + 3]; //A
            }
          }
        }

        //putImageData(imageData, dx, dy)
        //imageData: ImageData obj with array of pixel values
        //dx: x-coordinate where to put the imagedata in the destination canvas; destination canvas being: ctx_out
        ctx_out.putImageData(out_image, 0, 0);
        setTimeout(computeFrame, 0);
      });
    }

    bodyPix.load(bodyPixConfig).then((m) => {
      //load will return bodyPix instance w/ provided bodyPixConfiguration
      model = m;
      init();
    });
  }
  continuouslySegmentAndMask() {
    //continuously renders next frame of video
    var video = document.querySelector("video");
    if (video.srcObject && this.state._isMounted) {
      requestAnimationFrame(() => {
        console.log("this", this);
        this.segmentAndMask();
      });
    }
    //if cam is running then continue this function if not, then stop this function
    //Also, check if component is mounted first before running this fn
  }

  render() {
    if (!navigator.mediaDevices.getUserMedia) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <div id="container">
          <video autoPlay={true} id="video"></video>
          <div className="buttons">
            <button onClick={this.startCam}>START</button>
            <button onClick={this.stopCam}>STOP</button>
            <button onClick={this.segmentAndMask}>SEGMENT</button>
          </div>
          <hr />
          {/* OUTPUT CANVAS */}
          <canvas id="output-canvas"></canvas>
        </div>
      </div>
    );
  }
}
export default connect()(Canvas);
