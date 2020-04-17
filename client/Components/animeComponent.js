import React from "react";
import { connect } from "react-redux";
import anime from "animejs/lib/anime.es.js";

export class animeComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml7 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml7 .letter",
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: 750,
        easing: "easeOutExpo",
        delay: (el, i) => 50 * i,
      })
      .add({
        targets: ".ml7",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }

  render() {
    return (
      <h1 className="ml7">
        <span className="text-wrapper">
          <span className="letters">Reality is broken</span>
        </span>
      </h1>
    );
  }
}
export default connect()(animeComponent);
//Animation from https://tobiasahlin.com/moving-letters/#7
