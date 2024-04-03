const cityName = document.querySelector('#cityName');
const submitData = document.querySelector('#submitData');
const clearBtn = document.querySelector("#btn");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const warning = document.querySelector('#warning');
const warning2 = document.querySelector(".warning2");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const info = document.querySelector(".info");

submitData.addEventListener('submit', 
function checkInput(e){             //check for input data
    e.preventDefault();
    if(cityName.value !== ""){
        getData();
        cityName.value="";
    }
    else{
        warning.textContent = "Please Enter a city name";
        setTimeout(()=>{
           warning.textContent = "";
        }, 2000);
    }
});

//Get weather data
async function getData(){
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=b417b24e9be64d192a560e45d2c7c41e&units=standard`);
    if (response.status == 200){
        let data = await response.json();
        info.style.display="flex";    
        temp.textContent =`Temperature: `+ Math.ceil(Number(data.main.temp) - 273.1) + "°C";
        city.textContent = `City: ` + data.name;     
        description.textContent = `Description: `+ data.weather[0].description;
        humidity.textContent = `Humidity: `+ data.main.humidity;
        clearBtn.style.display = "block";
        setTimeout(()=>{
            info.style.display = "none"
        }, 20000);
    } else{
        warning2.textContent = "Error, please try again";
        setTimeout(()=>{
            warning2.textContent = "";
         }, 2000); 
    }
}


//clear response
function clearResponse(){
    info.innerHTML ="";
    clearBtn.style.display = "none";
}

