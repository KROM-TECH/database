const Loader = document.querySelector('.collapsible')
const result = document.querySelector('#result')
const uniWarn = document.querySelector('#uniWarning')
const uni = document.getElementById('university')

document.getElementById('search').addEventListener('click', function (e) {
  e.preventDefault();
  Loader.innerHTML = ""
  uni.addEventListener('change', function(){
    uniWarn.innerHTML = ""
  })
  
  const university = uni.value;
  if (university == "") {
    uniWarn.innerHTML = `<span class="helper-text red-text">Select a University</span>`
  }

  const service = document.getElementById('service').value;
  result.innerHTML = service
  const uniColl = db.collection(`${university}`)


  if(service == 'viewAll'){
    uniColl.get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        loadDataAll(doc.data())
      })
    })
  }
  else {

  uniColl.where("service", "==", `${service}`)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty) {
        Loader.innerHTML = `<h4 class="center red-text">Oops, No result found</h4>`
      }
      querySnapshot.forEach(function (doc) {
        loadData(doc.data())      
    })
})
  }  
})





function loadData(data){
  console.log(data)
  const html = `
      <li>
        <div class="collapsible-header ">${data.business}</div>
        <div class="collapsible-body">
          <p> <span class="blue-text">Description</span>:- ${escape(data.description)}</p>
          <p> <span class="blue-text">Specifications</span>:- ${data.specification}</p>
          <p> <span class="blue-text">Contact</span>:- ${data.contact}</p>
          <p> <span class="blue-text">Status</span>:- ${data.verification}</p>
        </div>
      </li>
    `;
  Loader.innerHTML += html
  if (doc.data().verification == 'unverified') {
    document.getElementById('status').className = 'red-text'
  } else if (doc.data().verification == 'verified') {
    document.getElementById('status').className = 'green-text'
  }

}

function loadDataAll(data){
  console.log(data)
  const html = `
      <li>
        <div class="collapsible-header ">${data.business}</div>
        <div class="collapsible-body">
          <p> <span class="blue-text">Service Type</span>:- ${data.service}</p>
          <p> <span class="blue-text">Description</span>:- ${data.description}</p>
          <p> <span class="blue-text">Specifications</span>:- ${data.specification}</p>
          <p> <span class="blue-text">Contact</span>:- ${data.contact}</p>
          <p> <span class="blue-text">Status</span>:- <span id= "status">${data.verification} </span> </p>
        </div>
      </li>
    `;

  Loader.innerHTML += html
  
}

