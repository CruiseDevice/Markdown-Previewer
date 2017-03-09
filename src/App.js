import React, { Component } from 'react';
import './App.css';
import marked from 'marked'
class App extends Component {
  getMarkDownText(){
    var rawMarkup = marked('# This is _Markdown_.',{sanitize: true});
    return{
      __html: rawMarkup
    };
  }
  render() {
    return (
      <div className="App">
        <div className="heading">
          <h1>MarkDown Previewer</h1>
        </div>
        <textarea
          className = "editor">
        </textarea>
        <div dangerouslySetInnerHTML={this.getMarkDownText()}/>
      </div>
    );
  }
}

export default App;
