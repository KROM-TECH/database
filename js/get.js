const Loader = document.querySelector('.collapsible')

document.getElementById('search').addEventListener('click', function (e) {
  e.preventDefault();
  Loader.innerHTML = ""

  const university = document.getElementById('university').value;
  const service = document.getElementById('service').value;

  const uniColl = db.collection(`${university}`)

  uniColl.where("service", "==", `${service}`)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty) {
        Loader.innerHTML = `<h4 class="center red-text">Oops, No result found</h4>`
      }
      querySnapshot.forEach(function (doc) {
  // db.collection(`${university}`).onSnapshot((snapshot) => {
  //   // console.log(snapshot.docChanges())
  //   snapshot.docChanges().forEach(change => {

        loadData(doc.data())

      
    })
})
})





function loadData(data){
  console.log(data)
  const html = `
      <li>
        <div class="collapsible-header ">${encodeURIComponent(data.business)}</div>
        <div class="collapsible-body">
          <p> <span class="blue-text">Description</span>:- ${encodeURIComponent(data.description)}</p>
          <p> <span class="blue-text">Specifications</span>:- ${encodeURIComponent(data.specification)}</p>
          <p> <span class="blue-text">Contact</span>:- ${encodeURIComponent(data.contact)}</p>
        </div>
      </li>
    `;
  Loader.innerHTML += html

}