const phonesContainer = async(searhText) =>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${searhText}`
  const res = await fetch(url);
  const data = await res.json();
  phoneLoading(data.data)
}

const phoneLoading = phones =>{
    const phoneConatiner =  document.getElementById('phones-container');
    phoneConatiner.textContent='';
    phones = phones.slice(0,15);

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
        <p class="card-text">${slug}</p>
      </div>
    </div>
      
      `
    phoneConatiner.appendChild(phoneDiv);
    })
}

document.getElementById('btn-search').addEventListener('click',function(){
    const inputField = document.getElementById('input-field');
    const searhText=inputField.value;
    inputField.value ='';
    phonesContainer(searhText);
})
// phonesContainer()