// import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRepeat, faCircleChevronUp, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className='flex justify-center items-center min-h-screen'>
        <div className='container flex flex-col justify-center items-center'>
          <div id='heading' className='flex flex-col items-center'>
            <h1>25+5 clock</h1>
            <p>Pomodoro Productivity Clock</p>
          </div>
          <div id='adjustment' className='flex gap-4 flex-wrap'>
            <div className='flex flex-col items-center'>
              <label>Break Length</label>
              <div className='flex gap-2'>
                <button><FontAwesomeIcon icon={faCircleChevronUp} /></button>
                <di>display</di>
                <button><FontAwesomeIcon icon={faCircleChevronDown} /></button>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <label>Session Length</label>
              <div className='flex gap-2'>
                <button><FontAwesomeIcon icon={faCircleChevronUp} /></button>
                <di>display</di>
                <button><FontAwesomeIcon icon={faCircleChevronDown} /></button>
              </div>
            </div>
          </div>
          <div id='display' className='w-[300px] h-[150px] ring-black ring-4 rounded'>25:00</div>
          <div id='buttons' className='flex gap-2'>
            <button><FontAwesomeIcon icon={faPlay} /></button>
            <button><FontAwesomeIcon icon={faPause} /></button>
            <button><FontAwesomeIcon icon={faRepeat} /></button>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
