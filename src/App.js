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
      imageUrl: '',
    }
  }

  //an event listener, part of the App class, must pass event that is happening on an input
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
        // URL
        //needs to be input instead of imageUrl (which would give an error b/c React)
        this.state.input
    )
    //need to work your way through the response to get the bounding box that we want
    .then(function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecoginition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
