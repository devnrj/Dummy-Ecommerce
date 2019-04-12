function deleteProduct(productId){
  const choice = confirm("Do You Really Want to delete it?")
  if(choice == true){
    $.ajax({
      url:'/cart',
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
function refreshProductList(){
  console.log("in login")
  $.get("/users/"+$("#userName").val(),(user)=>{
          $.post("/cart/getItems/",
          {id : user.id},
          (data)=>{
              $('#productList').empty()
              let i = 1
              console.log(data)
              for (let product of data) {
                $('#productList').append(
                  `<tr class='row'>
                    <th scope="row" class="col-sm-1">${i++}</th>
                    <td class="col-sm-3"> ${product.Product.productName}</td>
                    <td class="col-sm-2"> ${product.quantity}</td>
                    <td class="col-sm-2"> ${product.Product.price}</td>
                    <td class="col-sm-4"> 
                      
                      <i class="fas fa-plus-circle"></i>
                      <i class="fas fa-minus-circle"></i>
                    
                      <button id="${product.id}" onclick="deleteProduct(${product.id})" type="button" class="btn btn-danger">Delete</button>
                    </td>
                  </tr>`
                )
              }
          })
      }
  )
}
$(()=>{
    $("#login").click(()=>{
      refreshProductList()
    })
})