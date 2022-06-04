console.log('Client side JS file')


const weatherForm = document.querySelector('form')
const searchElement  = document.querySelector('input')
const errorMessage  = document.querySelector('#error')
const successMessage  = document.querySelector('#success')

weatherForm.addEventListener('submit',(e)=>{    
    e.preventDefault()        
    errorMessage.textContent = 'Loading.....'
    const url = "http://localhost:3000/weather?city="+searchElement.value

    fetch(url).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            errorMessage.textContent = data.forecast
            successMessage.textContent = ''
        }else{
            errorMessage.textContent = data.location
            successMessage.textContent = data.forecast
        }
        
    });
})
})



