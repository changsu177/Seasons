import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

  // THIS IS THE ONLY TIME we do direct assignment to this.state
  state = { lat: null , errorMessage : ""};

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
        // call setState !! this func is inherited from the React.Component
      position => this.setState({lat : position.coords.latitude} ),
      err => this.setState({errorMessage : err.message} )
    );
  }
 // helper function
  renderContent() {
    if( this.state.errorMessage && !this.state.lat ){
      return <div> Error : {this.state.errorMessage} </div> ;
    }
    if( !this.state.errorMessage && this.state.lat ){
      return <SeasonDisplay lat = {this.state.lat} />;
    }
    return  <Spinner message = "Please accept the location request."/>  ;
  }
  // react says we have to define render .. required by react
  render() {
    return (
      <div className = "border red">
        {this.renderContent()}
      </div>
    );
  }
}

ReactDOM.render(<App /> , document.querySelector('#root'));
