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
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
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