import React, { useState, useEffect } from 'react';
import './App.css';
import { marked } from 'marked';

const initialSource = getDefaultSource();

const App = () => {
  const [source, setSource] = useState(initialSource);
  const [darkMode, setDarkMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isSplitView, setIsSplitView] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {

    if (autoSave) {
      localStorage.setItem('markdown-source', source);
    }

    // Update word count whenever source changes
    const words = source.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [source, autoSave]);

  // check for saved markdown on initial load
  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdown-source');
    if(savedMarkdown) {
      setSource(savedMarkdown);
    }
  }, []);

  const onChange = (e) => {
    setSource(e.target.value);
  };

  const getMarkDownText = (evaluate) => {
    const rawMarkup = marked(evaluate);
    return { __html: rawMarkup };
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearEditor = () => {
    setSource('');
  };

  const toggleView = () => {
    setIsSplitView(!isSplitView);
  };

  return (
    <div className={`App min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold">MarkDown Previewer</h1>
          </div>
          {/* primary actions */}
          <div className="flex flex-wrap grap-2">
            <div className="flex space-x-2">
              <button
                onClick={toggleDarkMode}
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={toggleView}
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {isSplitView ? 'Stack View' : 'Split View'}
              </button>
              <button
                onClick={clearEditor}
                className="px-3 py-2 rounded-lg bg-red-500 text-white"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary toolbar */}
      {/* TODO */}

      <main className="max-w-6xl mx-auto px-4 py-8 transition-all duration-200 ">
        <div className={`flex ${isSplitView ? 'flex-col md:flex-row' : 'flex-col'} gap-4`}>
          <div className={`${isSplitView ? 'w-full md:w-1/2' : 'w-full'}`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Editor</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">{wordCount} words</span>
              </div>
            </div>
            <textarea
              className="w-full h-96 p-4 rounded-lg border focus:outline-none transition-colors duraton-200 resize-none"
              value={source}
              onChange={onChange}
              placeholder="Type your markdown here..."
              style={{fontSize: `${fontSize}px`}}
            />
          </div>

          {/* Preview panel */}
          <div className={`${isSplitView ? 'w-full md:w-1/2' : 'w-full'}`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Preview</h2>
            </div>
            <div
              className="preview w-full h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-auto prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={getMarkDownText(source)}
              style={{fontSize: `${fontSize}px`}}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-4 text-center`}>
        <p>Improved Markdown Previwer • Built with React</p>
      </footer>
    </div>
  );
};

function getDefaultSource() {
  return [
    'Heading', '', '=======', '', 'Sub-heading', '-----------', '',
    '### Another deeper heading', '', 'Paragraphs are separated',
    'by a blank line.', '', 'Leave 2 spaces at the end of a line to do a',
    'line break', '', 'Text attributes *italic*, **bold**,',
    '`monospace`, ~~strikethrough~~ .', '', 'Shopping list:', '',
    ' * apples', ' * oranges', ' * pears', '', 'Numbered list:', '',
    ' 1. apples', ' 2. oranges', ' 3. pears', '', 'The rain---not the reign---in',
    'Spain.', '', '*[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
  ].join('\n');
}

export default App;