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
        `<tr>
          <th>${i++}</th>
          <td> ${product.productName}</td>
          <td> ${product.Vendor.name}</td>
          <td> ${product.quantity}</td>
          <td> ${product.price}</td>
          <td> 
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

