
import { PlayCircleIcon, PauseCircleIcon, ForwardIcon, BackwardIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import '../styles/songplay.scss';
import { YourOneSong } from './YourOneSong';
import { secondsToMinutes } from '../utils/secondsToMinutes';
import { appActions } from '../slices/appSlice';
import { audiostorage } from '../utils/audiostorage';

export function SongPlay() {
    const onesong = useAppSelector(state => state.app.onesong);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPause, setIsPause] = React.useState(false);
    const [min, setMin] = React.useState(0);
    const [timerange, setTimeRange] = React.useState(0);
    const dispatch = useAppDispatch();



    React.useEffect(() => {
        if (audioRef.current) {
            setIsPause(false);
            audioRef.current.load();
            audioRef.current.onloadedmetadata = () => {
                setMin(audioRef.current?.duration ?? 0);
                setTimeRange(0);
                audioRef.current?.play();
                setIsPause(true)
            }
        }
    }, [onesong.urlAudio]);

    return (
        <>
            <YourOneSong {...onesong} />
            <audio controls ref={audioRef} style={{ display: 'none' }} onTimeUpdate={e => {
                const audio = e.target as HTMLAudioElement;
                setTimeRange(audio.currentTime);
                if (secondsToMinutes(min) == secondsToMinutes(timerange) && min != 0 && timerange != 0) {
                    dispatch(appActions.nextSong());
                    setTimeRange(0);
                }
            }}>
                <source src={onesong.urlAudio} type='audio/mpeg' />
            </audio>
            <div className="area_controls">
                <div className="areas area_button">
                    <button className="der">
                        <BackwardIcon className='play_icon' onClick={() => dispatch(appActions.backWardSong())} />
                    </button>
                    <button
                        className='center_icon'
                        onClick={() => {
                            if (!isPause) {
                                audioRef.current?.play();
                                setIsPause(true);
                            }
                            else {
                                audioRef.current?.pause();
                                setIsPause(false);
                            }
                        }}>{!isPause ? <PlayCircleIcon className='play_icon' /> : <PauseCircleIcon className='play_icon' />}</button>
                    <button className="izq">
                        <ForwardIcon className='play_icon' onClick={() => dispatch(appActions.nextSong())} />
                    </button>
                </div>
                <div className="areas area_time">
                    <span>{secondsToMinutes(timerange)}</span>
                    <input 
                     type="range" className='rangos' min={0} max={min} step={0.01} value={timerange} onChange={e => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = Number(e.target.value);

                        }
                    }} />
                    <span>{secondsToMinutes(min)}</span>
                </div>
            </div>
            <div className="area_extra">
                <button className='vol' onClick={() => {
                    if (audioRef.current) {
                        if (audioRef.current?.volume == 0)
                            audioRef.current.volume = audiostorage.read();
                        else
                            audioRef.current.volume = 0;
                    }

                }}>
                    {audioRef.current?.volume !== 0 ? <SpeakerWaveIcon className='icon_wave' /> :
                        <SpeakerXMarkIcon className='icon_wave' />}
                </button>
                <input type="range" className='rangos' value={audioRef.current?.volume ?? 0} min={0} max={1} step={0.001} onChange={e => {
                    if (audioRef.current) {
                        audioRef.current.volume = Number(e.target.value);
                        if (Number(e.target.value) != 0)
                            audiostorage.save(Number(e.target.value));
                    }
                }} />
            </div>
        </>
    );
}
