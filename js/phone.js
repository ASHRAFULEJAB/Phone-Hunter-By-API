const phonesContainer = async(searhText,dataLimit) =>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${searhText}`
  const res = await fetch(url);
  const data = await res.json();
  phoneLoading(data.data, dataLimit);
}

const phoneLoading = (phones, dataLimit) =>{
    const phoneConatiner =  document.getElementById('phones-container');
    phoneConatiner.textContent='';

    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 15){

        phones = phones.slice(0,15);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    const notFound = document.getElementById('not-found');
    
    if(phones.length === 0){
       notFound.classList.remove('d-none')
       
    }
    else{
        notFound.classList.add('d-none');
    }

    phones.forEach(phone=>{
      const phoneDiv = document.createElement('div');
      phoneDiv.classList.add('col');
      const {image,phone_name,slug} = phone;
      phoneDiv.innerHTML = `
      <div class="card">
      <img src="${image}" class="card-img-top " alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone_name}</h5>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, similique placeat ea quod minima quaerat cum voluptatibus alias, iste quia veritatis ipsa autem quidem necessitatibus at, odio modi odit eligendi!</p>
        <button onclick="loadDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
      </div>
    </div>
      
      `
    phoneConatiner.appendChild(phoneDiv);
    })
    toggleSpinner(false);
}

const processSearch = dataLimit =>{

    toggleSpinner(true)
    const inputField = document.getElementById('input-field');
    const searhText=inputField.value;
    phonesContainer(searhText,dataLimit);
    
    
}

document.getElementById('btn-search').addEventListener('click',function(){

    processSearch(15);
    
})

document.getElementById('input-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        processSearch(15);
    }
})

const toggleSpinner = isLoading =>{
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }
    else{
        loadingSpinner.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
    // console.log(processSearch);
//    processSearch.textContent='';
})

const loadDetails = async id =>{
   const url =`https://openapi.programming-hero.com/api/phone/${id}`
   const res = await fetch(url);
   const data = await res.json();
   displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    const {name, image,mainFeatures,others } = phone
   const phoneModal =  document.getElementById('phoneDetailsModalLabel')
   phoneModal.innerText = name;

   const phoneModalDetails = document.getElementById('phone-modal-details');
   phoneModalDetails.innerHTML=`
        <img src="${image}"/>
        <p> MainFeatures: ${mainFeatures.storage ? mainFeatures.storage : 'no Storage'}</p>
        <p> MainFeatures: ${mainFeatures.memory ? mainFeatures.memory : 'no Memory'}</p>
        <p> MainFeatures: ${mainFeatures.displaySize ? mainFeatures.displaySize : 'no displaySize'}</p>
        <p>Sensors: ${mainFeatures.sensors ? mainFeatures.sensors[0] : 'no sensors'}</p>
        <p> Others: ${others.Bluetooth ? others.Bluetooth : 'no Bluetooth'}</p>
        <p> Others: ${others.WLAN ? others.WLAN : 'no WLAN'}</p>
   `
    
}

phonesContainer('apple')