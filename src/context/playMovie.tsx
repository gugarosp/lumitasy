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
    const [getVideoInfo, setGetInfoVideo] = useState('');
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

    // Change play/pause icon acording to movie status
    const [playPauseIcon, setPlayPauseIcon] = useState("play_arrow");

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
                setMovieLoaded,
                playPauseIcon,
                setPlayPauseIcon
            }
        }>
            {children}
        </PlayMovieContext.Provider>
    )

}