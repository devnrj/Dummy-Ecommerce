function deleteProduct(cartId){
  const choice = confirm("Do You Really Want to delete it?")
  if(choice == true){
    $.ajax({
      url:'/cart',
      type: 'DELETE',
      data :{
        id : cartId
      },
      success : function(){
        refreshProductList()
      }
    })
  }
}

function increment(cartId){
  $.post("/cart/increment",
  {
    id : cartId
  },
  (data)=>{
    console.log(data)
    refreshProductList()
  })
}

function decrement(cartId){
  $.post("/cart/decrement",
  {
    id : cartId
  },
  (data)=>{
    console.log(data)
    refreshProductList()
  })
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
                for (let cart of data) {
                  $('#productList').append(
                    `<tr>
                      <th>${i++}</th>
                      <td> ${cart.Product.productName}</td>
                      <td> ${cart.quantity}</td>
                      <td> ${cart.Product.price}</td>
                      <td> 
                      <i id="${cart.id}" class="fas fa-plus-circle" onclick="increment(${cart.id})"></i>
                      <i id="${cart.id}" class="fas fa-minus-circle" onclick="decrement(${cart.id})"></i>
                        <button id="${cart.id}" onclick="deleteProduct(${cart.id})" type="button" class="btn btn-danger">Delete</button>
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