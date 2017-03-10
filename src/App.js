import React, { Component } from 'react';
import './App.css';
import marked from 'marked'

var initialSource = getDefaultSource();

class App extends Component {
  getMarkDownText = (initialSource) => {
    var rawMarkup = marked(initialSource,{sanitize: true});
    return{
      __html: rawMarkup
    };
  }
  render() {
    return (
      <div className="App">
        <div>
          <TextArea/>
          <div className = "preview" dangerouslySetInnerHTML={this.getMarkDownText(initialSource)}/>
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
class TextArea extends Component{
  onChange(e){
     this.setState({ source: e.target.value });
  }
  render(){
    return(
      <div>
        <textarea
          className = "editor"
          defaultValue = {initialSource}>
        </textarea>
     </div>
   );
  }
}
export default App;
