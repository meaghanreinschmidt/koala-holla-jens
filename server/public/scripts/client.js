console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  $('body').on('click', '.delete-koala', deleteKoala);
  $('body').on('click', '.update-transfer-status-koala', transferKoala)
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    if ($('#genderIn').val() === '') {
      alert('Choose Male or Female');
      return;
    } else if ($('#readyForTransferIn').val() === '') {
      alert('Choose True or False');
      return;
    } else {
      let koalaToSend = {
        name: $('#nameIn').val(),
        age: $('#ageIn').val(),
        gender: $('#genderIn').val(),
        ready_to_transfer: $('#readyForTransferIn').val(),
        notes: $('#notesIn').val(),
      };
      // call saveKoala with the new obejct
      saveKoala(koalaToSend);
      emptyInputs();
    }
  });
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas - GET
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log(response);
    $('#viewKoalas').empty();
    for (let koala of response) {
      // ID from database for delete button
      let transferButton = checkTransferStatus(koala)
      console.log(transferButton);
        $('#viewKoalas').append(`
        <tr>
        <td>${koala.id}</td>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>${transferButton}</td>
        <td><button class="delete-koala" data-id="${koala.id}">Delete</button></td>
      </tr>
        `);
    }
  }).catch(function (error) {
    console.log(error);
    alert('Something went wrong!')
  })
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function (response) {
    console.log(response);
    getKoalas();
  });
}

function emptyInputs() {
  $('input').val('');
  $('select').val('');
}

function deleteKoala(){
  console.log('in deleteKoala');
  const koalaID = $(this).data('id');
  $.ajax({
    type: 'DELETE',
    url: `/koalas/${koalaID}`
  }).then(function (response){
    console.log(response);
    getKoalas();
  }).catch(function (error){
    console.log('error in deleteKoala',error);
    alert('something went wrong');
  });
}

function checkTransferStatus(koala) {
  if (koala.ready_to_transfer === 'N') {
    return `<button class="update-transfer-status-koala" data-id="${koala.id}">Ready for Transfer</button>`
} else {
  return ''
}
}


function transferKoala() {
  const koalaId = $(this).data('id');
  $.ajax({
    type: 'PUT',
    url: `/koalas/${koalaId}`,
    data: {
      ready_to_transfer: 'Y'
    }
  }).then(function (response) {
    getKoalas();
  }).catch(function (error) {
    console.log(error);
    alert('Something went wrong');
  })

  // if status = no - button exists
  // click button change status to yes
  // button will be removed becaus status has changed 
}