// import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRepeat, faCircleChevronUp, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';



const padWithZero = (num) => {
  return num < 10 ? `0${num}` : num;
}



function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timerMinute, setTimerMinute] = useState(25)
  const [timerSecond, setTimerSecond] = useState(0);
  const [timerState, setTimerState] = useState(false);
  const timerIdRef = useRef(null)
  const beepRef = useRef(null)


  // Utility function to pad numbers with zero
  

  const handleClick = (e) => {
    if(!timerState) {
      if(e.currentTarget.id === 'break-increment' && breakLength < 60) {
        setBreakLength( breakLength + 1) 
      } else if(e.currentTarget.id === 'break-decrement' && breakLength > 1) {
        setBreakLength( breakLength - 1) 
      } else if(e.currentTarget.id === 'session-increment' && sessionLength < 60) {
        setSessionLength( sessionLength + 1);
        // setTimerMinute( timerMinute + 1)
      } else if(e.currentTarget.id === 'session-decrement' && sessionLength > 1) {
        setSessionLength( sessionLength - 1);
        // setTimerMinute(timerMinute - 1)
      }
    } 
    
    if(e.currentTarget.id === 'start_stop') {
      
      if (timerState) {
        clearInterval(timerIdRef.current)

      } else {
        timer()
      }
      setTimerState(!timerState)
      // console.log(timerState)
    } 
    if(e.currentTarget.id === 'reset') {
      clearInterval(timerIdRef.current);
      setSessionLength(25);
      setBreakLength(5);
      setTimerLabel('Session');
      setTimerMinute(25)
      setTimerSecond(0);
      setTimerState(false);
      beepRef.current.pause();
      beepRef.current.currentTime=0;

    }
  }

  
  const timer = () => {
    timerIdRef.current = setInterval(() => {
      setTimerSecond((prevSecond) => {
        if (prevSecond === 0) {
          setTimerMinute((prevMinute) => {
            if (prevMinute === 0) {
              
              setTimerLabel((prevTimerLabel) => {
                if (prevTimerLabel === 'Session') {
                  setTimerLabel('Break');
                  setTimerMinute(breakLength)
                  setTimeout(() => {
                    setTimerMinute(breakLength - 1);
                  }, 1000);
                  
                  // console.log(breakLength)
                  beepRef.current.play();
              
                } else {
                  setTimerLabel('Session');
                  setTimerMinute(sessionLength)
                  setTimeout(() => {
                    setTimerMinute(sessionLength - 1)
                  }, 1000);
                  
                  // console.log(sessionLength)
                  beepRef.current.play();
              
                }
              })
              // return prevMinute - 1;
              
            } else {
              return prevMinute - 1;
            }
          })
          return 59;
        }
        return prevSecond - 1;
      })
    }, 1000);
  }

  useEffect(() => {
    setTimerMinute(sessionLength)
  }, [sessionLength])

  useEffect(() => {
    if (timerMinute === 0 ) {
      document.getElementById('display').classList.add('red-col')
      
    } else {
      document.getElementById('display').classList.remove('red-col')
      
    }
  }, [timerMinute])

  return(
    <div className='flex justify-center items-center min-h-screen bg-emerald-900 text-slate-300'>
      <div className='container flex flex-col justify-center items-center gap-4 w-[350px] md:w-[600px]'>
        <div id='heading' className='flex flex-col items-center'>
          <h1 className='text-5xl font-bold'>25 + 5 clock</h1>
          <p className='text-2xl'>Pomodoro Productivity Clock</p>
        </div>
        <div id='adjustment' className='flex gap-6 flex-wrap justify-center m-2'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <label id='break-label' className='text-3xl'>Break Length</label>
            <div className='flex gap-2 justify-center items-center text-2xl'>
              <button id='break-increment' onClick={handleClick}><FontAwesomeIcon icon={faCircleChevronUp} /></button>
              <div id='break-length' className=''>{breakLength}</div>
              <button id='break-decrement' onClick={handleClick}><FontAwesomeIcon icon={faCircleChevronDown} /></button>
            </div>
          </div>
          <div className='flex flex-col items-center gap-2 '>
            <label id='session-label' className='text-3xl'>Session Length</label>
            <div className='flex gap-2 justify-center items-center text-2xl'>
              <button id='session-increment' onClick={handleClick}><FontAwesomeIcon icon={faCircleChevronUp} /></button>
              <div id='session-length' className=''>{sessionLength}</div>
              <button id='session-decrement' onClick={handleClick}><FontAwesomeIcon icon={faCircleChevronDown} /></button>
            </div>
          </div>
        </div>
        <div id='display' className='w-[300px] h-[150px] ring-black ring-4 rounded p-2 flex flex-col items-center'>
          <div id='timer-label' className='text-xl'>{timerLabel}</div>
          <div id='time-left' className='text-8xl'>{padWithZero(timerMinute)}:{padWithZero(timerSecond)}</div>
        </div>
        <div id='buttons' className='flex gap-2 text-2xl'>
          <button id='start_stop' onClick={handleClick}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
          <button id='reset' onClick={handleClick}><FontAwesomeIcon icon={faRepeat} /></button>
        </div>
        <audio id='beep' ref={beepRef} src='/vintage-alarm-beep.mp3' />
      </div>
    </div>
  )
}


export default App;
