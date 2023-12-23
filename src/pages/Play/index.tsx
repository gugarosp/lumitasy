import { SyntheticEvent, useState } from "react";

export default function Play () {

    // Video Info
    const [getVideoInfo, setGetInfoVideo] = useState('');
    const [videoCurrentTime, setVideoCurrentTime] = useState(0);

    function videoInfo(element:any) {
        setVideoCurrentTime(Math.floor(element.currentTime));
    }
    
    // Video Play
    function playVideo(event:SyntheticEvent<HTMLVideoElement>) {
        const intervalVideo:any = window.setInterval(() => {
            videoInfo(event.target);
        }, 1);
        setGetInfoVideo(intervalVideo);
    }

    // Video Pause
    function pauseVideo () {
        clearInterval(getVideoInfo);
    }

    return (
        <div>
            <video onPlay={(event) => playVideo(event)} onPause={pauseVideo} width="320" height="240" controls>
                <source src="https://rr1---sn-gpv7yne6.c.drive.google.com/videoplayback?expire=1703366075&ei=iyOHZeHOCoWa2LYP-qi1mA0&ip=2804:14c:65d6:622f:d929:c283:d5e2:aacb&id=494bea3da781c032&itag=18&source=webdrive&requiressl=yes&xpc=EghonaK1InoBAQ==&mh=DO&mm=32&mn=sn-gpv7yne6&ms=su&mv=m&mvi=1&pl=48&sc=yes&ttl=transient&susc=dr&driveid=1QwzNGufGvAqe-QVappJRn7fXH16I0dAW&app=explorer&eaua=WIug9EHVF8Q&mime=video/mp4&vprv=1&prv=1&dur=46.695&lmt=1701378722501658&mt=1703354934&subapp=DRIVE_WEB_FILE_VIEWER&txp=0006224&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,eaua,mime,vprv,prv,dur,lmt&sig=AJfQdSswRgIhAM_zJKfFx3LIXz8QP_IYUnbmR8qM03nGtlDPh8Ei7XBIAiEAp7rAoTvCOXV-bCCbPby82yJTi9CQkNZbzeQBH3tFY5c=&lsparams=mh,mm,mn,ms,mv,mvi,pl,sc&lsig=AAO5W4owRQIgQPfdjjwHu3c-kVy65Q-teW_MD6IeFUmmF1j6Y1cCTNQCIQCNOxVwfXlNNeoe4ACpJPMHsZEgmDfKpaMS5eBSlQFUzg==&cpn=u6CzmWniEoRK8iQX&c=WEB_EMBEDDED_PLAYER&cver=1.20231217.00.00" type="video/mp4" />
            </video>
            <br />
            <span>{videoCurrentTime}</span>
        </div>
    )
}