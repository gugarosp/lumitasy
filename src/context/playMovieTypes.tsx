import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react"

export interface playMovieContextType {
    video: RefObject<HTMLVideoElement>
    videoCurrentTime: number
    videoDuration: number
    movieLoaded: boolean
    playPauseIcon: string
    fullscreenIcon: string
    playPauseVideo: () => void
    fullscreen: () => void
    metaDataVideo: (element: HTMLVideoElement) => void
    whilePlayVideo?: (element: HTMLVideoElement) => void
    setPlayPauseIcon: Dispatch<SetStateAction<string>>
}