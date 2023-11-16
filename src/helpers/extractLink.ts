export default function extractLink(text:any){
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?[\w.-]+\.\w{2,}(?:\/\S*)?/g;
    // const text = ""
    // const text = " Do you have dreams of becoming a Freelance Software Developer? 💻Check out my new YouTube video, where I talk all about the harsh truths behind being a Freelance Developer! 🎥Watch it here: https://www.youtube.com/watch?v=SI_WuWOlHKY You really don’t want to miss out on this one!! 🔥"
    const urls:any = text.match(urlRegex);
    
    console.log('urls' , urls);

    const link = urls ? urls[0] : "";
    // console.log("link",link);
    // console.log('splitted',link === "" || link === null ? "" : text.split(link)[0]);
    // console.log('splitted',link === "" || link === null ? "" : text.body.split(link)[1]);

    return link;
}