import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecoginition from './components/FaceRecoginition/FaceRecoginition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'cb4e2548750644a8b30819481c13b595'
})

const particleOptions = {
  polygon: {
    enable: true,
    type: 'inside',
    move: {
        radius: 10
    },
    url: 'path/to/svg.svg'
  }
}

//we need state so its a class
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  //an event listener, part of the App class, must pass event that is happening on an input
  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmit = () => {
    console.log('click');
    app.models
    .predict(
    Clarifai.COLOR_MODEL,
        // URL
        "https://samples.clarifai.com/metro-north.jpg"
    )
    .then(function(response) {
        console.log(response);
        },
        function(err) {
        }
    );
    }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={{particleOptions}} />
        <Navigation />
        <Logo />
        <Rank />
        {/* passing onInputChange AND onSubmit as a prop to ImageLinkForm (which needs to have these parameters in function defintion) */}
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
        <FaceRecoginition />
      </div>
    );
  }
}

export default App;
