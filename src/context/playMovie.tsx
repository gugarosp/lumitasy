import { ReactElement, createContext, useRef, useState } from "react";
import { playMovieContextType } from "./playMovieTypes";

export const PlayMovieContext = createContext<playMovieContextType | null>(null);
PlayMovieContext.displayName = 'Play Movie';

interface PlayMovieProviderProps {
    children: ReactElement
}

export const PlayMovieProvider = ({children}:PlayMovieProviderProps) => {

    // Video Element
    const video = useRef<HTMLVideoElement>(null);

    function metaDataVideo (element:HTMLVideoElement) {
        setVideoCurrentTime(Math.floor(element.currentTime));
        setVideoDuration(Math.ceil(element.duration));
        setMovieLoaded(true);
    }

    // Video Infos
    const getVideoInfo = useRef<ReturnType<typeof setInterval>>();
    const [videoCurrentTime, setVideoCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    
    // Play and pause video
    function playPauseVideo () {
        if (video.current?.paused === true && movieLoaded === true) {
            video.current.play();
        } else if (video.current?.paused === false && movieLoaded === true) {
            video.current.pause();
            clearInterval(getVideoInfo.current);
        }
    }
    
    // Video while playing
    function whilePlayVideo(element:HTMLVideoElement) {
        clearInterval(getVideoInfo.current);
        getVideoInfo.current = setInterval(() => {
            videoInfo(element);
        }, 100);
    }
    
    // Video Infos
    function videoInfo(element:HTMLVideoElement) {
        setVideoCurrentTime(element.currentTime === element.duration ? Math.ceil(element.currentTime) : Math.floor(element.currentTime));
        setVideoDuration(Math.ceil(element.duration));
    }

    // Show controls when loaded
    const [movieLoaded, setMovieLoaded] = useState(false);

    // Change play/pause icon acording to movie status
    const [playPauseIcon, setPlayPauseIcon] = useState("play_arrow");

    // Fullscreen
    const [fullscreenIcon, setFullscreenIcon] = useState("fullscreen")

    function fullscreen () {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreenIcon("fullscreen_exit")
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreenIcon("fullscreen")
        }
    }

    return (
        <PlayMovieContext.Provider value={
            {
                video,
                videoCurrentTime,
                videoDuration,
                movieLoaded,
                playPauseIcon,
                fullscreenIcon,
                playPauseVideo,
                fullscreen,
                metaDataVideo,
                whilePlayVideo,
                setPlayPauseIcon
            }
        }>
            {children}
        </PlayMovieContext.Provider>
    )

}