function refreshList() {
  $.get('/vendors', (data) => {
    $('#vendorList').empty();
    for (let vendor of data) {
      $('#vendorList').append(`
            <tr class='list-group-item'>
              <td class="col-sm-2"> ${vendor.name}</td>
              <td class="col-sm-2">
                <button id="${vendor.id}" onclick="deleteVendor(${vendor.id})" type="button" class="btn btn-primary">Delete</button>
              </td>
            </tr>`
      )
    }
  })
}
refreshList()
function deleteVendor(vendorId) {
  const choice = confirm("Do You Really Want to delete it?")
  if (choice == true) {
    $.ajax({
      url: '/vendors',
      type: 'DELETE',
      data: {
        id: vendorId
      },
      success: function () {
        console.log("In success")
        refreshList()
      }
    })
  }
}

$(() => {

  $('#addVendor').click(() => {
    $.post(
      '/vendors',
      {
        vendorName: $('#vendorName').val(),
      },
      (data) => {
        if (data.success) {
          refreshList()
        } else {
          alert(data.err)
        }
      }
    )
  })
})