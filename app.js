class View{
   constructor(){
      this.app = document.getElementById('app')
      this.title = this.createElement('h1', 'title')
      this.title.textContent = 'GitHub Search Users'

      this.searchLine = this.createElement('div', 'search-line')
      this.searcInput = this.createElement('input', 'searc-input')
      this.searcCounter = this.createElement('span', 'searc-counter')

      this.usersWrapper = this.createElement('div', 'users-wrapper')
      this.usersList = this.createElement('ul', 'users')
      this.main = this.createElement('div', 'main')
      this.usersWrapper.append(this.usersList)
      this.main.append(this.usersWrapper)

      this.searchLine.append(this.searcInput)
      this.searchLine.append(this.searcCounter)

      this.app.append(this.title)
      this.app.append(this.searchLine)
      this.app.append(this.main)
   }

   createElement(elementTag, elementClass){
      const element = document.createElement(elementTag)
      if(elementClass){
         element.classList.add(elementClass)
      }
      return element
   }

   createUser(user){
      console.log(user)
      const userElement = this.createElement('li', 'user-prev')
      userElement.innerHTML = `
         <img class="user-prev-photo" src="${user.avatar_url}" alt="${user.login}">
         <span class="user-prev-name">${user.login}</span>
      `

      this.usersList.append(userElement)
   }
}



class Search{
   constructor(view){ // чтобы получить доступ к классу View
      this.view = view

      this.view.searcInput.addEventListener('keyup', this.searchUsers.bind(this))
   }

   async searchUsers(){
      return await fetch(`https://api.github.com/search/users?q=${this.view.searcInput.value}`)
      .then(response => {
         if(response.ok){
            response.json()
            .then(response => response.items.forEach(user =>  this.view.createUser(user)))
         } else{

         }
      })
   }



}

new Search(new View())