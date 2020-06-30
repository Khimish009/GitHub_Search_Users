export class View {
   constructor(api) {
      this.api = api

      this.app = document.getElementById('app')
      this.title = this.createElement('h1', 'title')
      this.title.textContent = 'GitHub Search Users'

      this.searchLine = this.createElement('div', 'search-line')
      this.searcInput = this.createElement('input', 'searc-input')
      this.searcCounter = this.createElement('span', 'searc-counter')

      this.userEl = this.createElement('div', 'user')

      this.usersWrapper = this.createElement('div', 'users-wrapper')
      this.usersList = this.createElement('ul', 'users')
      this.main = this.createElement('div', 'main')
      this.usersWrapper.append(this.usersList)
      this.main.append(this.usersWrapper)

      this.loadMore = this.createElement('button', 'btn')
      this.loadMore.textContent = 'Загрузить еще'
      this.loadMore.style.display = 'none'
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
      const userElement = this.createElement('li', 'user-prev')
      userElement.addEventListener('click', () => this.showUserData(user))
      userElement.innerHTML = `
         <img class="user-prev-photo" src="${user.avatar_url}" alt="${user.login}">
         <span class="user-prev-name">${user.login}</span>
      `

      this.usersList.append(userElement)
   }

   showUserData(user){
      this.api.loadUserData(user.login).then(response => {
         const [following, followers, repos] = response
         const followingList = this.createDataList(following, 'Following:')
         const followersList = this.createDataList(followers, 'Followers:')
         const reposList = this.createDataList(repos, 'Repos:')

         if (this.userEl.innerHTML){
            this.userEl.innerHTML = ''
         }

         this.userEl.innerHTML = `<img src="${user.avatar_url}" alt="${user.login}">
                              <h2>${user.login}</h2>
                              ${followingList}
                              ${followersList}
                              ${reposList}`   
      })

      this.main.append(this.userEl)
   }

   createDataList(list, title){
      const block = this.createElement('div', 'user-block')
      const titleTag = this.createElement('h3', 'user-block-title')
      const listTag = this.createElement('ul', 'user-list')

      if(!list.length){
            const el = this.createElement('li', 'user-list-item')
            el.innerHTML = `отсутствиют`
            listTag.append(el)
      }
      else{
         list.forEach(item => {
            const el = this.createElement('li', 'user-list-item')

            el.innerHTML = `<a href="${item.html_url}">${item.login ? item.login : item.name}</a>`

            listTag.append(el)
         });
      }


      titleTag.textContent = title

      block.append(titleTag)
      block.append(listTag)
      return block.innerHTML
   }

   toggleLoadMoreBtn(bool){
      this.loadMore.style.display = bool ? 'block' : 'none'
   }

   setCounterMessage(message){
      this.searcCounter.innerHTML = message
   }
}