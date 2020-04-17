import React from "react";
import { connect } from "react-redux";
import anime from "animejs/lib/anime.es.js";

export class Moving extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    anime({
      targets: ".Mog",
      keyframes: [
        { translateY: -50 },
        { translateX: 1300 },
        { translateY: 300 },
        { translateX: 0 },
        { translateY: 0 },
      ],
      duration: 4000,
      easing: "easeOutElastic(1, .8)",
      loop: true,
    });
  }

  render() {
    return (
      <div className="Moving">
        <h2 id="moogleLand">Moogle Land</h2>
        <img className="Mog" src="Moogle-v1.png"></img>
      </div>
    );
  }
}
export default connect()(Moving);
