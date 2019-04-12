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
          if(user.success==true){
            console.log(user)
            $.post("/cart/getItems/",
            {id : user.message.id},
            (data)=>{
                $('#productList').empty()
                let i = 1
                console.log(data)
                for (let product of data) {
                  $('#productList').append(
                    `<tr>
                      <th>${i++}</th>
                      <td> ${product.Product.productName}</td>
                      <td> ${product.quantity}</td>
                      <td> ${product.Product.price}</td>
                      <td> 
                        <button id="${product.id}" onclick="deleteProduct(${product.id})" type="button" class="btn btn-danger">Delete</button>
                      </td>
                    </tr>`
                  )
                }              
            })
          }else{
            alert(user.message)
          }
      }
  )
}
$(()=>{
    $("#login").click(()=>{
      refreshProductList()
    })
})