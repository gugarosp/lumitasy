import { ReactElement, createContext, useRef, useState } from "react";

export const PlayMovieContext:any = createContext('');

interface PlayMovieProviderProps {
    children: ReactElement
}

export const PlayMovieProvider = ({children}:PlayMovieProviderProps) => {

    // Video Element
    const video = useRef<any>();

    function metaDataVideo (event:any) {
        setVideoCurrentTime(Math.floor(video.current.currentTime));
        setVideoDuration(Math.ceil(video.current.duration));
        setMovieLoaded(true);
    }

    // Video Infos
    const [getVideoInfo, setGetInfoVideo] = useState('');
    const [videoCurrentTime, setVideoCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    
    // Play and pause video
    const [videoStatus, setVideoStatus] = useState("paused");

    function PlayPauseVideo () {
        if (videoStatus === "paused" && movieLoaded === true) {
            video.current.play();
            setVideoStatus("playing");
        } else if (videoStatus === "playing" && movieLoaded === true) {
            video.current.pause();
            setVideoStatus("paused");
        }
    }

    // Video Infos
    function videoInfo(element:any) {
        setVideoCurrentTime(Math.floor(element.currentTime));
        setVideoDuration(Math.ceil(element.duration));
    }

    // Video while playing
    function whilePlayVideo(event:any) {
        const intervalVideo:any = window.setInterval(() => {
            videoInfo(event.target);
        }, 1);
        setGetInfoVideo(intervalVideo);
    }

    // Video when paused
    function whenPauseVideo () {
        clearInterval(getVideoInfo);
    }

    // Show controls when loaded
    const [movieLoaded, setMovieLoaded] = useState(false);

    return (
        <PlayMovieContext.Provider value={
            {
                video,
                metaDataVideo,
                getVideoInfo,
                setGetInfoVideo,
                videoCurrentTime,
                setVideoCurrentTime,
                videoDuration,
                setVideoDuration,
                PlayPauseVideo,
                videoInfo,
                whilePlayVideo,
                whenPauseVideo,
                movieLoaded,
                setMovieLoaded
            }
        }>
            {children}
        </PlayMovieContext.Provider>
    )

}