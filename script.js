const bganimation=document.getElementById("bganimation");
const smallbox=400;
for (let i=0;i<smallbox;i++){
    const colorbox=document.createElement("div");
    colorbox.classList.add("colorbox");
    bganimation.appendChild(colorbox);
    
}
let btn=document.getElementById("btn");
let content=document.getElementById("content");
let voice=document.getElementById("voice");
function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.volume=1;
    text_speak.pitch=1;
    window.speechSynthesis.speak(text_speak);
    text_speak.lang="hi-GB";
}
function wishme(){
    let day=new Date();
    let hours=day.getHours();
    console.log(day.getHours());
    console.log(day.getMinutes());
    if(hours>=0 && hours<12){
        speak("good morning");
    }
    else if(hours>=12 && hours<16){
        speak("good afternoon");
    }
    else{
        speak("good evening");
    }
}
window.addEventListener('load',()=>{
    wishme()
})
let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition();
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex;
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript;
    console.log(transcript);
    takecommand(transcript.toLowerCase());
}
btn.addEventListener("click",()=>{
    recognition.start();
    btn.style.display="none";
    voice.style.display="block";
})
function takecommand(message){
    btn.style.display="flex";
    voice.style.display="none";
    if(message.includes("hello")){
        speak("hello sir, at your service");
    }
    else if(message.includes("hu r u")||message.includes("who are you")){
        speak("I am Kautilya, a virtual assistant");
    }
    else if(message.includes("opening youtube")||message.includes("open youtube")){

        speak("What do you want to listen");
        
       
        let speechRecognitions=window.SpeechRecognition || window.webkitSpeechRecognition
        let recognitions=new speechRecognitions();
        console.log(recognitions);
        recognitions.start();
        recognitions.onresult=(event)=>{
            let currentIndexs=event.resultIndex;
            let transcripts=event.results[currentIndexs][0].transcript
            content.innerText=transcripts;
            console.log(transcripts);
            if(0){
                console.log("hi");
            }
            else{
            console.log(transcripts);
            fetchNews((`${transcripts}`));
            }
        }
        
       
    }
    else if(message.includes("opening facebook")||message.includes("open facebook")){
        speak("opening facebook");
        window.open("https://facebook.com");
    }
    else if(message.includes("opening instagram")||message.includes("openinstagram")){
        speak("opening insta");
        window.open("https://instagram.com");
    }
    else if(message.includes("opening google")||message.includes("open google")){
        speak("opening google");
        window.open("https://google.com");
    }
    else if(message.includes("open calculator")||message.includes("opening calculator")){
        speak("opening calculator");
        window.open('https://www.google.com/search?q=online+calculator+google&rlz=1C1VDKB_enIN1062IN1062&oq=onilne+calcu&gs_lcrp=EgZjaHJvbWUqDQgCEAAYkQIYgAQYigUyBggAEEUYOTITCAEQABiDARiRAhixAxiABBiKBTINCAIQABiRAhiABBiKBTIQCAMQABiRAhixAxiABBiKBTINCAQQABiRAhiABBiKBTIJCAUQABgKGIAEMgkIBhAAGAoYgAQyCQgHEAAYChiABDIJCAgQABgKGIAEMgkICRAAGAoYgATSAQg4MzIxajBqOagCALACAQ&sourceid=chrome&ie=UTF-8');
        
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak(time);
        console.log(DataView());
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak(date);
        
    }
    else{
        speak(`this is what i found on internet regarding ${message.replace("shipra","")}||${message.replace("shifra","")}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
async function fetchNews(message) {
    try {
        const response = await axios.get(` https://www.googleapis.com/youtube/v3/search?key=AIzaSyAleKkrIDfnbnxOYTXd1oZGdvfbofh3w6g&q=${message}&type=video&part=snippet&maxResults=5`);
        const newsData = response.data.items;
        const id=newsData[0].id.videoId;
       console.log(message);
       console.log(`https://www.youtube.com/watch?v=${id}`);
        window.open(`https://www.youtube.com/watch?v=${id}`);

       
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}


