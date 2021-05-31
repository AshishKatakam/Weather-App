
// window.addEventListener('load',()=>{
//     let lat;
//     let long;
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition
//         (pos=>{
//             lat=pos.coords.latitude;
//             long=pos.coords.longitude;
//             const api=`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6bf280c7484367b0a4d5ec85cc98f7c9`;
//             fetch(api).then((response)=>{
//                 return response.json();
//             })
//             .then(data=>{
//                 const {name}=data;
//                 getWeather(name);
//             })
        
//         });
//     }
// });
const inp=document.getElementById('inp')
const btn=document.getElementById('btn')

const cityname=document.getElementById('cityname');
const temp=document.getElementById('temp');
const county=document.getElementById('country');
const desc=document.getElementById('desc')
const img=document.getElementById('img')
const al=document.getElementById('alert');


btn.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(inp.value);
    inp.value="";
});
const getWeather=async(city)=>
{
    try{
        const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6bf280c7484367b0a4d5ec85cc98f7c9`);
        const weatherData=await res.json();
        console.log(weatherData);
        const {name}=weatherData;
        const {feels_like}=weatherData.main;
        const {id,main,icon}=weatherData.weather[0];
        const {country}=weatherData.sys;
        if(id>=200&&id<300)
        {
            img.src="./animated/thunder.svg";
        }
        else if(id>=300&&id<400)
        {
            img.src="./animated/rainy-1.svg";
        }
        else if(id>=400&&id<500)
        {
            img.src="./animated/rainy-3.svg";
        }
        else if(id>=500&&id<600)
        {
            img.src="./animated/rainy-7.svg";
        }
        else if(id>=600&&id<700)
        {
            img.src="./animated/snowy-4.svg";
        }
        else if(id>=700&&id<800)
        {
            img.src="./animated/cloudy-day-2.svg";
        }
        else
        {
            img.src="./animated/cloudy.svg";
        }
        
        temp.textContent=Math.floor(feels_like-273);
        cityname.textContent=name;
        county.textContent=country;
        desc.textContent=main;
    }catch(e){
        al.textContent="You have entered an invalid city name";
        console.log(e.message);
    }
}
