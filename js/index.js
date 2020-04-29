let bookList = document.getElementById("list")


fetch("http://localhost:3000/books")
.then(r => r.json())
.then(booksResponse => {
    booksResponse.forEach(element => {
        render(element)
    })
})



function render(books)
{
    
    let header = document.createElement('h2')
    header.innerText = books.title

    let bookDescriptions = document.createElement("p")
    bookDescriptions.innerText = books.description
    
    let img = document.createElement('img')
    img.src = books.img_url
    img.alt = "pictures of books"

    bookList.append(header , bookDescriptions , img)

    books.users.forEach( usernames => {

        let bookLi = document.createElement("li")
        bookLi.innerText = "Username :  " + usernames.username
        bookList.append(bookLi)

    })

    let likeButton = document.createElement('button')
    likeButton.innerText = "Like"
    bookList.append(likeButton)
     

    likeButton.addEventListener("click" , function(evt) {
        
        let newLikedUsers = [...books.users, {"id":1, username:"pouros" }] 
        
        fetch(`http://localhost:3000/books/${books.id}`, {

              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
               id: books.id, 
               "users": newLikedUsers 
              }

              )



        }).then(r => r.json())
        .then(booksObj => {
             
            books.users.push(booksObj.newLikedUsers)

            books.users = booksObj.users
            console.log(booksObj)

        })





    })





}