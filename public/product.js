function refreshVendorList() {
  $.get('/vendors', (data) => {
    for (let vendor of data) {
      $('#vendorList').append(
        `<option value=${vendor.id}> ${vendor.name}</option>`
      )
    }
  })
}
refreshVendorList()
function refreshProductList() {
  $.get('/products', (data) => {
    $('#productList').empty()
    let i = 1
    for (let product of data) {
      $('#productList').append(
        `<tr class='row'>
          <th scope="row" class="col-sm-2">${i++}</th>
          <td class="col-sm-2"> ${product.productName}</td>
          <td class="col-sm-2 center"> ${product.Vendor.name}</td>
          <td class="col-sm-2"> ${product.quantity}</td>
          <td class="col-sm-2"> ${product.price}</td>
          <td class="col-sm-2"> 
          <button id="${product.id}" onclick="deleteProduct(${product.id})" type="button" class="btn btn-danger">Delete</button>
          </td>
        </tr>`
      )


    }
  })
}
refreshProductList()
function deleteProduct(productId){
  const choice = confirm("Do You Really Want to delete it?")
  if(choice == true){
    $.ajax({
      url:'/products',
      type: 'DELETE',
      data :{
        id : productId
      },
      success : function(){
        console.log("In success")
        refreshProductList()
      }
    })
  }
}
$(() => {
  $('#addProduct').click(() => {
    $.post('/products',
      {
        name: $('#productName').val(),
        VendorId: $('#vendorList').val(),
        price: $('#price').val(),
        quantity: $('#quantity').val()
      },
      (data) => {
        if (data.success) {
          refreshProductList()
        } else {
          alert(data.err)
        }
      }
    )
  })
})

