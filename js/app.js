document.getElementById('sub').addEventListener('click', function(e){
  e.preventDefault();

  const university = document.getElementById('university').value;
  const service = document.getElementById('service').value;
  const fullName = document.getElementById('fullName').value
  const email = document.getElementById('email').value
  const bisName = document.getElementById('bis_name').value
  const description = document.getElementById('desc').value
  const specification = document.getElementById('spec').value
  const contact = document.getElementById('contact').value


  db.collection(university).doc(`${bisName}` +'.' + `${fullName.charAt(0)}`).set({
  service:service,
  business: bisName,
  description:description,
  specification:specification,
  contact:contact
}).then(()=>{
  console.log('first done')
  db.collection(university).doc(`${bisName}` + '.' + `${fullName.charAt(0)}`).collection('details').doc('detail').set({
    fullName:fullName,
    email:email
  }).then(()=>{
    console.log('all Done')

    document.getElementById('sub').innerHTML = 'Saved'
    loaction.reload()
  })
});


 })
