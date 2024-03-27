import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: {[key: string]: unknown}[]
    }
}

export default function AdSense () {

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
            console.log("teste");
        }
    },[]);

    return (
        <ins className="adsbygoogle"
            style={{
                display: "block",
                width: "300px",
                height: "300px"}}
            data-ad-client="ca-pub-0670208710876378"
            data-ad-slot="6415366891"
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>


    )
}