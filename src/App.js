import React, { Component } from 'react';
import './App.css';
import marked from 'marked'

var initialSource = getDefaultSource();

class App extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
     this.setState({ source: e.target.value });
  }
  getMarkDownText = (evaluate) => {
    var rawMarkup = marked(evaluate,{sanitize: true});
    return{
      __html: rawMarkup
    };
  }
  render() {
    var evaluate = this.state ? this.state.source : initialSource;
    return (
      <div className="App">
        <div>
          <textarea
            className = "editor"
            defaultValue = {initialSource}
            onChange={this.onChange}>
          </textarea>

          <div className = "preview" dangerouslySetInnerHTML={this.getMarkDownText(evaluate)}/>
        </div>
      </div>
    );
  }
}
function getDefaultSource(){
  return [
    'Heading','',
    '=======',
    '',
    'Sub-heading',
    '-----------',
    '',
    '### Another deeper heading',
    '',
    'Paragraphs are separated',
    'by a blank line.',
    '',
    'Leave 2 spaces at the end of a line to do a',
    'line break',
    '',
    'Text attributes *italic*, **bold**,',
    '`monospace`, ~~strikethrough~~ .',
    '',
    'Shopping list:',
    '',
    ' * apples',
    ' * oranges',
    ' * pears',
    '',
    'Numbered list:',
    '',
    ' 1. apples',
    ' 2. oranges',
    ' 3. pears',
    '',
    'The rain---not the reign---in',
    'Spain.',
    '',
    '*[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
  ].join('\n')
}

export default App;
