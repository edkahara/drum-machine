class Machine extends React.Component {
  constructor(props) {//set the drum kit tunes in a state
    super(props);
    this.play = this.playTune.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {drums: [
                            [{id: 'Q', name: "Heater 1", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', status: false},{id: 'W', name: "Heater 2", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', status: false},{id: 'E', name: "Heater 3", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', status: false}],
                            [{id: 'A', name: "Heater 4", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', status: false},{id: 'S', name: "Clap", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', status: false},{id: 'D', name: "Open HH", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', status: false}],
                            [{id: 'Z', name: "Kick n' Hat", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', status: false},{id: 'X', name: "Kick", audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', status: false},{id: 'C', name: "Closed HH", audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', status: false}]
                          ],
                  audioName: ""
                  };
  }
  playTune(id, row, column) {//play the tune and make the button blink
    var drums = this.state.drums;
    drums[row][column] = {id: drums[row][column].id, name: drums[row][column].name, audio: drums[row][column].audio, status: !drums[row][column].status};
    var audio = document.getElementById(id);
    var drumPad = audio.parentElement;
    audio.play();
    this.setState({drums: drums, audioName: drumPad.id});
    setTimeout(function() {
      drums[row][column] = {id: drums[row][column].id, name: drums[row][column].name, audio: drums[row][column].audio, status: !drums[row][column].status};
      this.setState({drums: drums});
    }.bind(this), 300);
  }
  handleKeyDown(e) {//trigger a click event when the keyboard letter that corresponds to the button letter is typed
    document.getElementById(e.key.toUpperCase()).parentElement.click();
  }
  componentDidMount() {//add the keydown event listener
    window.addEventListener('keydown', this.handleKeyDown);
  }
  render() {
    const drums = this.state.drums;
    return(
      <div id="drum-machine">
        <h1 className="text-center">DRUM MACHINE</h1>
        <p className="text-center">Click the button or type the keyboard letter shown below.</p>
        <div className="text-center" id="display"><strong>{this.state.audioName}</strong></div>
        {drums.map((row, i) => (
          <div className="drum-container" key={i}>
            {row.map((col, j) => (
              <div className={drums[i][j].status ? "drum-pad btn active" : "drum-pad btn"} id={drums[i][j].name} onClick={() => {this.playTune(drums[i][j].id, i, j)}} key={j}>
                <p id="name">{drums[i][j].id}</p>
                <audio className="clip" id={drums[i][j].id} src={drums[i][j].audio} type='audio/mpeg'></audio>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};

ReactDOM.render(<Machine />, document.getElementById('app'));
