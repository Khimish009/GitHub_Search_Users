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
}



class Search{
   constructor(view){ // чтобы получить доступ к классу View
      this.view = view

      this.view.searcInput
   }


}

new Search(new View())