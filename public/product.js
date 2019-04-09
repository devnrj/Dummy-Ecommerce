$(()=>{
    function refreshVendorList(){
        $.get('/vendors',(data)=>{
            for (let vendor of data) {
                $('#vendorList').append(
                  `<option value=${vendor.name}> ${vendor.name}</option>`
                )
            }
        })
    }
    refreshVendorList()

    $('#addProduct').click(()=>{
        $.post('/products',
              {
                  name: $('#productName').val(),
                  vendor : $('#vendorList').val(),
                  price : $('#price').val(),
                  quantity : $('#quantity').val()
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

    //delete not implemented
    function deleteProduct(id){
        
    }
    function refreshProductList(){
        $.get('/products',(data)=>{
            $('#productList').empty()
            let i=1
            for (let product of data) {
                $('#productList').append(
                  `<tr class='row'>
                  <th scope="row" class="col-sm-2">${i++}</th>
                  <td class="col-sm-2"> ${product.name}</td>
                  <td class="col-sm-2 center"> ${product.vendor}</td>
                  <td class="col-sm-2"> ${product.quantity}</td>
                  <td class="col-sm-2"> ${product.price}</td>
                  <td class="col-sm-2"> 
                    <button id="${product.id}" onclick="deleteProduct(${product.id})" type="button" class="btn btn-primary">Delete</button>
                  </td>
                  </tr>`
                )
            }
        })
    }
    refreshProductList()
})