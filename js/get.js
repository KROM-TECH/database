const Loader = document.querySelector('.collapsible')
const result = document.querySelector('#result')

document.getElementById('search').addEventListener('click', function (e) {
  e.preventDefault();
  Loader.innerHTML = ""

  const university = document.getElementById('university').value;
  const service = document.getElementById('service').value;
  result.innerHTML = service
  const uniColl = db.collection(`${university}`)

  console.log(service)

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
          <p> <span class="blue-text">Description</span>:- ${data.description}</p>
          <p> <span class="blue-text">Specifications</span>:- ${data.specification}</p>
          <p> <span class="blue-text">Contact</span>:- ${data.contact}</p>
        </div>
      </li>
    `;
  Loader.innerHTML += html

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
        </div>
      </li>
    `;
  Loader.innerHTML += html

}