const btn=document.querySelector("button");
let baseUrl="https://api.frankfurter.app/latest?amount=1&from=";
const dropdowns=document.querySelectorAll(".dropdown select");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg = document.querySelector(".msg")

const updateFlag = (element) => {
    let currcode=element.value;
    let councode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${councode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}

for( let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name === "from" && currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal <= 0){
        amtVal=1;
        amount.value=1;
    }
    let url=`${baseUrl}${fromcurr.value}&to=${tocurr.value}`;//
    let response = await fetch(url);
    let data=await response.json();
    let rate=data.rates[tocurr.value];
    finalAmt = amtVal*rate;
    msg.innerText=`${amtVal}${fromcurr.value} = ${finalAmt}${tocurr.value}`; 
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
    

window.addEventListener("load",()=>{
    updateExchangeRate();
});