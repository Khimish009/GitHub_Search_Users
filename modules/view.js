export class View {
   constructor() {
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

      this.loadMore = this.createElement('button', 'btn')
      this.loadMore.textContent = 'Загрузить еще'
      this.loadMore.classList.add('hide')
      this.usersWrapper.append(this.loadMore)

      this.searchLine.append(this.searcInput)
      this.searchLine.append(this.searcCounter)

      this.app.append(this.title)
      this.app.append(this.searchLine)
      this.app.append(this.main)
   }

   createElement(elementTag, elementClass) {
      const element = document.createElement(elementTag)
      if (elementClass) {
         element.classList.add(elementClass)
      }
      return element
   }

   createUser(user) {
      console.log(user)
      const userElement = this.createElement('li', 'user-prev')
      userElement.innerHTML = `
         <img class="user-prev-photo" src="${user.avatar_url}" alt="${user.login}">
         <span class="user-prev-name">${user.login}</span>
      `

      this.usersList.append(userElement)
      this.loadMore.classList.remove('hide')
   }
}