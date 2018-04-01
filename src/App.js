import _ from 'loadash';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SeachBar from './components/search_bar';
import VideoList from './components/video_list';
import YTsearch from 'youtube-api-search';
import VideoDetail from './components/video_details';
const API_KEY = "AIzaSyChLcC57w-tIbGPv85O2lCRm0_eKtwiBUI";





class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('nice');
  };

  videoSearch(term) {
    YTsearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    })
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 3000 );

    return (
      <div className="App">
        <div>
          <SeachBar onSearchTermChange={videoSearch} />
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
            videos={this.state.videos} />
        </div>
      </div>
    );
  }
}

export default App;
