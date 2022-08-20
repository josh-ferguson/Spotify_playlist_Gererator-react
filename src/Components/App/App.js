import React from 'react';
import { Spotify } from '../../util/Spotify';
import { LoadingSpinner } from '../Loading/Loading';
import { Modal } from '../Modal/Modal';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import './App.css';

Spotify.getAccessToken();

 export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      searchResults: [],
      playlistName: "New Playlist name...",
      playlistTracks: [],
      isLoading: false,
      isModal: false
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.clsModal = this.clsModal.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      console.log("Not working")
      return;
    } else {
      console.log("working")
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    this.setState({
      isLoading: true
    });
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      searchResults: [],
      playlistTracks: [],
      isLoading: false,
      isModal: true
    });
    this.updatePlaylistName('New Playlist name...');
  }

  search(term) {
    Spotify.search(term)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }

  clsModal() {
    this.setState({
      isModal: false
    });
  }

  render() {
    return(
      <div>
        {this.state.isLoading && <LoadingSpinner />}
        {this.state.isModal && <Modal onClsModal={this.clsModal}/>}
        <h1><span className="highlight">S</span>potify <span className="highlight">P</span>laylist <span className="highlight">G</span>enerator</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}
