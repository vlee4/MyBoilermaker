import React from "react";
import { connect } from "react-redux";
// //also import any thunks you may be using here from the reducer(s)

export class dummyComponent extends React.Component {
  render() {
    return (
      <div className="dummyComponent">
        <form>
          <label htmlFor="name">Name </label>
          <input name="name" type="text" placeholder="Type in a name"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default connect()(dummyComponent);
// class SomeComponent extends React.Component {

//   render(){
//     return (
//        <div>Test Component</div>)

//   }
// }

// const mapState = state => {
//   return {
//     property: state.property
//   }
// }
// const mapDispatch = dispatch => {
//   return {
//     method: () => dispatch(thunkCreator())
//   }
// }

// export default connect(mapState,mapDispatch)(SomeComponent);
