console.log('Client Side JS loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
// response.json().then((data)=>{
// console.log(data);
// })
// })




const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent=''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    // console.log('http://localhost:3000/weather?address='+ location);
  fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
    // console.log(data);
    if(data.error){
        messageOne.textContent=data.error
        console.log(data.error);
    }else{
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast.current.weather_descriptions[0]

        console.log(data.location,'lll');
        console.log(data.forecast,'ddddfff');
    }
    })
    })
  })