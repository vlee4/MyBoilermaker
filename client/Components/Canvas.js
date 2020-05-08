// import React from "react";
// import Konva from "konva";
// // import { render } from "react-dom";
// import { Stage, Layer, Image, Text } from "react-konva";
// import { connect } from "react-redux";
// // import bodyPix from "@tensorflow-models";
// // import * as bodyPix from "@tensorflow-models/body-pix";
// const bodyPix = require("@tensorflow-models/body-pix");
// import regeneratorRuntime from "regenerator-runtime";

// class Canvas extends React.Component {
//   constructor() {
//     super()

//     // this.startCam = this.startCam.bind(this);
//     // this.stopCam = this.stopCam.bind(this);
//     // this.segmentAndMask = this.segmentAndMask.bind(this);
//     // this.loadAndPredict = this.loadAndPredict.bind(this);
//     this.loadWebcamCapture = this.loadWebcamCaputure.bind(this);
//     this.loadImage = this.loadImage.bind(this)
//     this.setup = this.setup.bind(this)
//     this.startDrawLoop = this.startDrawLoop.bind(this)
//     this.draw = this.draw.bind(this)
//   }

//   async loadWebcamCapture() {
//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       throw new Error(
//           'Browser API navigator.mediaDevices.getUserMedia not available');
//     }

//     const videoElement = document.getElementById('video');

//     const stream = await navigator.mediaDevices.getUserMedia(
//       {'audio': false, 'video': true});
//       videoElement.srcObject = stream;

//       return new Promise((resolve) => {
//         videoElement.onloadedmetadata = () => {
//           videoElement.width = videoElement.videoWidth;
//           videoElement.height = videoElement.videoHeight;
//       resolve(videoElement);
//     };
//   });
// }
// async loadImage(imagePath) {
//   const image = new Image();
//   const promise = new Promise((resolve, reject) => {
//     image.crossOrigin = '';
//     image.onload = () => {
//       resolve(image);
//     };
//   });

//   image.src = imagePath;
//   return promise;
// }

// async setup() {
//   // capture from the webcam
//   capture = await this.loadWebcamCapture('user');
//   capture.play();

//   backgroundVideo = document.getElementById('background-video');

//   canvas = document.getElementById('canvas');
//   canvas.width = capture.width;
//   canvas.height = capture.height;

//   maskCanvas = document.createElement('canvas');

//   loadModelAndStartEstimating();

//   startDrawLoop();
// }

//  startDrawLoop() {
//   draw();

//   document.getElementById('background-video').play();
// }

// async draw() {
//   const ctx = canvas.getContext('2d');
//   // make sure video is loaded, and a mask has been estimated from the video.  The mask
//   // continuously gets updated in the loop estimateFrame below, which is independent
//   // from the draw loop
//   if (capture && segmentationEstimated) {
//     const maskedFrame = tf.tidy(() => {
//       const image = tf.browser.fromPixels(capture);

//       if (existingMask) {
//         return image;// image.matMul(image, existingMask);
//       }

//       return image;
//     });

//     await tf.browser.toPixels(maskedFrame, capture);

//     maskedFrame.dispose();

// //     ctx.clearRect(0, 0, canvas.width, canvas.height);

// //     ctx.save();

// //     if (flipHorizontal) {
// //       // flip the drawing of the results horizontally
// //       ctx.scale(-1, 1);
// //       ctx.translate(-canvas.width, 0);
// //     }

// //     // blur the mask and draw it onto the canvas
// //     ctx.filter = `blur(${maskBlurAmount}px)`;
// //     ctx.drawImage(maskCanvas, 0, 0);
// //     ctx.filter = 'blur(0px)';

// //     // draw the background video on the canvas using the compositing operation 'source-in.'
// //     // "The new shape is drawn only where both the new shape and the destination canvas overlap. Everything else is made transparent."
// //     // see all possible compositing operations at https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
// //     ctx.globalCompositeOperation = 'source-in';
// //     ctx.drawImage(backgroundVideo, 0, 0, canvas.width, canvas.height);

// //     // draw camera feed frame onto the canvas using the compositing operation 'destination-over.'
// //     // "New shapes are drawn behind the existing canvas content."
// //     ctx.globalCompositeOperation = 'destination-over';
// //     ctx.drawImage(capture, 0, 0);

// //     ctx.restore();
//   }

//   requestAnimationFrame(draw);
// }

// async loadModelAndStartEstimating() {
//   setStatusText('downloading the machine learning model...');
//   model = await bodyPix.load();

//   setStatusText('');

//   // start the estimation loop, separately from the drawing loop.
//   // This allows drawing to happen at a high number of frames per
//   // second, independent from the speed of estimation.
//   startEstimationLoop();
// }

//  startEstimationLoop() {
//   estimateFrame();
// }

// async estimateFrame() {
//   if (capture) {
//     await performEstimation();
//   }

//   // at the end of estimating, start again after the current frame is complete.
//   requestAnimationFrame(estimateFrame);
// }

// async performEstimation() {
//   const newMask = await model.segmentPerson(capture);

//   existingMask = newMask;

//   segmentationEstimated = true;
// }

//  setStatusText(text) {
//   const statusElement = document.getElementById('status');
//   if (text) {
//     statusElement.style.display = 'block';
//     statusElement.innerText = text;
//   } else
//     statusElement.style.display = 'none';
// }

// //   startCam() {
// //     var video = document.querySelector("#videoElement");

// //     if (navigator.mediaDevices.getUserMedia) {
// //       navigator.mediaDevices
// //         .getUserMedia({ video: true })
// //         .then(function (stream) {
// //           video.srcObject = stream;
// //         })
// //         .catch(function (err0r) {
// //           console.log("Something went wrong!");
// //         });
// //     }
// //   }

// //   stopCam() {
// //     var video = document.querySelector("#videoElement");
// //     var stream = video.srcObject;
// //     var tracks = stream.getTracks();

// //     for (var i = 0; i < tracks.length; i++) {
// //       var track = tracks[i];
// //       track.stop();
// //     }

// //     video.srcObject = null;
// //   }

// //   async loadAndPredict() {
// //     console.log("LOAD AND PREDICT");
// //     var video = document.querySelector("#videoElement");
// //     try {
// //       const net = await bodyPix.load({
// //         architecture: "MobileNetV1",
// //         outputStride: 16,
// //         multiplier: 0.75,
// //         quantBytes: 2,
// //       }); // using default MobileNetV1 arch
// //       console.log("LOADED PIX");
// //       const segmentation = await net.segmentPerson(video, {
// //         flipHorizontal: false,
// //         internalResolution: "medium",
// //         segmentationThreshold: 0.7,
// //       });
// //       console.log("Here's the segmenation", segmentation);
// //       return segmentation;
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// //   segmentAndMask() {
// //     console.log("SEGMENT");
// //     var video = document.querySelector("#videoElement");
// //     var videoPromise = new Promise((resolve) => {
// //       video.onloadedmetadata = () => {
// //         video.width = video.videoWidth;
// //         video.height = video.videoHeight;
// //         resolve(video);
// //       };
// //     });
// //     const segmentation = this.loadAndPredict();
// //     const backgroundBlurAmount = 3;
// //     const edgeBlurAmount = 3;
// //     const flipHorizontal = false;

// //     const canvas = document.getElementById("canvas");
// //     console.log("videoPromise", videoPromise);
// //     bodyPix.drawBokehEffect(
// //       canvas,
// //       videoPromise,
// //       segmentation,
// //       backgroundBlurAmount,
// //       edgeBlurAmount,
// //       flipHorizontal
// //     );
// //   }

//   render() {
//     if (!navigator.mediaDevices.getUserMedia) {
//       return <h2>Loading...</h2>;
//     }

//     return (
//       <div>
//         <div id="container">
//           <video autoPlay={true} id="videoElement"></video>
//           <video id='background-video' playsinline loop autoplay style="display:none">
//       <source src="https://cdn.glitch.com/df9e423d-65e8-438e-8860-b1fed0f1040f%2Fliquid.mp4?1550622383996" type="video/mp4"></source>
//           <button onClick={this.setup}>START</button>
//           <button onClick={this.stopCam}>STOP</button>
//           <button onClick={this.segmentAndMask}>SEGMENT</button>
//           <hr />
//           {/* <div id="canvas"></div> */}
//           <canvas id="canvas" width="500"></canvas>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect()(Canvas);

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
    this.state = {
      _isMounted: false,
    };
    this.startCam = this.startCam.bind(this);
    this.stopCam = this.stopCam.bind(this);
    this.segmentAndMask = this.segmentAndMask.bind(this);
    // this.loadAndPredict = this.loadAndPredict.bind(this);
    this.draw = this.draw.bind(this);
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
  // async loadAndPredict() {
  //   console.log("LOAD AND PREDICT");
  //   var video = document.querySelector("video");
  //   try {
  //     console.log("in try");
  //     // using default MobileNetV1 arch
  //     console.log("LOADED PIX");
  //     const segmentation = await net.segmentPerson(video, {
  //       flipHorizontal: false,
  //       internalResolution: "medium",
  //       segmentationThreshold: 0.7
  //     });
  //     console.log("Here's the segmenation", segmentation);
  //     return segmentation;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async segmentAndMask() {
  //   console.log("SEGMENT");
  //   var video = document.getElementById("video");

  //   const net = await bodyPix.load({
  //     architecture: "MobileNetV1",
  //     outputStride: 16,
  //     multiplier: 0.5,
  //     quantBytes: 2,
  //   });
  //   const segmentation = await net.segmentPerson(video, {
  //     flipHorizontal: false,
  //     internalResolution: "medium",
  //     segmentationThreshold: 0.7,
  //   });
  //   console.log("after promise");
  //   // const segmentation = this.loadAndPredict();
  //   const maskBackground = true;
  //   const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
  //   const backgroundColor = { r: 255, g: 255, b: 255, a: 255 };
  //   const backgroundDarkeningMask = bodyPix.toMask(
  //     segmentation,
  //     foregroundColor,
  //     backgroundColor
  //   );
  //   const opacity = 1.0;
  //   const maskBlurAmount = 3;
  //   const backgroundBlurAmount = 20;
  //   const edgeBlurAmount = 3;
  //   const flipHorizontal = false;
  //   const canvas = document.getElementById("canvas");
  //   console.log("canvas", canvas);
  //   const coloredPartImage = bodyPix.toMask(segmentation);

  //   // const backgroundBlurAmount = 3;
  //   // const edgeBlurAmount = 3;
  //   // const flipHorizontal = false;
  //   //////////////
  //   // bodyPix.drawMask(
  //   //   canvas,
  //   //   video,
  //   //   backgroundDarkeningMask,
  //   //   opacity,
  //   //   maskBlurAmount,
  //   //   flipHorizontal
  //   // );

  //   //////////

  //   // var context = canvas.getContext("2d");
  //   // context.globalCompositeOperation = "destination-over";
  //   // bodyPix.drawBokehEffect(
  //   //   canvas,
  //   //   video,
  //   //   segmentation,
  //   //   backgroundBlurAmount,
  //   //   edgeBlurAmount,
  //   //   flipHorizontal
  //   // );
  //   this.continuouslySegmentAndMask();
  //   // this.renderImageToCanvas(video, size, canvas);
  // }

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
      ctx_tmp.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      let frame = ctx_tmp.getImageData(
        0,
        0,
        video.videoWidth,
        video.videoHeight
      );
      //same as when we do net.segmentPerson
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
            let n = x + y * video.videoWidth;
            if (segmentation.data[n] == 1) {
              out_image.data[n * 4] = frame.data[n * 4]; //R
              out_image.data[n * 4 + 1] = frame.data[n * 4 + 1]; //G
              out_image.data[n * 4 + 2] = frame.data[n * 4 + 2]; //B
              out_image.data[n * 4 + 3] = frame.data[n * 4 + 3]; //A
            }
          }
        }
        ctx_out.putImageData(out_image, 0, 0);
        setTimeout(computeFrame, 0);
      });
    }
    // document.addEventListener("DOMContentLoaded", () => {
    bodyPix.load(bodyPixConfig).then((m) => {
      //load will return
      model = m;
      init();
    });
    // });
    // this.continuouslySegmentAndMask();
    // this.renderImageToCanvas(video, size, canvas);
  }
  continuouslySegmentAndMask() {
    //continuously renders next frame of video
    var video = document.querySelector("video");
    if (video.srcObject && this.state._isMounted) {
      requestAnimationFrame(() => {
        console.log("this", this);
        this.segmentAndMask();
        // continouslySegmentAndMask();
      });
    }
    //if cam is running then continue this function if not, then stop this function
    //check if component is mounted first before running this fn
  }

  draw() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.globalCompositeOperation = "destination-over";
  }
  render() {
    if (!navigator.mediaDevices.getUserMedia) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <div id="container" height="375" width="500">
          <video autoPlay={true} id="video" height="375" width="500"></video>
          <button onClick={this.startCam}>START</button>
          <button onClick={this.stopCam}>STOP</button>
          <button onClick={this.segmentAndMask}>SEGMENT</button>
          <hr />
          {/* <div id="canvas"></div> */}
          {/* OUTPUT CANVAS */}
          <canvas id="output-canvas" height="375" width="500"></canvas>
        </div>
      </div>
    );
  }
}
export default connect()(Canvas);
