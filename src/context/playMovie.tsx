import { ReactElement, createContext, useRef, useState } from "react";

export const PlayMovieContext:any = createContext<PlayMovieProviderProps | null>(null);

interface PlayMovieProviderProps {
    children: ReactElement
}

export const PlayMovieProvider = ({children}:PlayMovieProviderProps) => {

    // Video Element
    const video = useRef<HTMLVideoElement>();

    function metaDataVideo () {
        if (video.current !== undefined) {
            setVideoCurrentTime(Math.floor(video.current.currentTime));
            setVideoDuration(Math.ceil(video.current.duration));
            setMovieLoaded(true);
        }
    }

    // Video Infos
    const getVideoInfo = useRef<ReturnType<typeof setInterval>>();
    const [videoCurrentTime, setVideoCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    
    // Play and pause video
    function PlayPauseVideo () {
        if (video.current?.paused === true && movieLoaded === true) {
            video.current.play();
        } else if (video.current?.paused === false && movieLoaded === true) {
            video.current.pause();
        }
    }
    
    // Video while playing
    function whilePlayVideo(element:HTMLVideoElement) {
        getVideoInfo.current = setInterval(() => {
            videoInfo(element);
        }, 1);
    }
    
    // Video Infos
    function videoInfo(element:HTMLVideoElement) {
        setVideoCurrentTime(Math.floor(element.currentTime));
        setVideoDuration(Math.ceil(element.duration));
    }

    // Video when paused
    function whenPauseVideo () {
        clearInterval(getVideoInfo.current);
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
                metaDataVideo,
                getVideoInfo,
                videoCurrentTime,
                setVideoCurrentTime,
                videoDuration,
                setVideoDuration,
                PlayPauseVideo,
                videoInfo,
                whilePlayVideo,
                whenPauseVideo,
                movieLoaded,
                setMovieLoaded,
                playPauseIcon,
                setPlayPauseIcon,
                fullscreenIcon,
                fullscreen,
                setFullscreenIcon
            }
        }>
            {children}
        </PlayMovieContext.Provider>
    )

}