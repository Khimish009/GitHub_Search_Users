const USERS_PER_PAGE = 20

export class Search {

   constructor(view) { // чтобы получить доступ к классу View
      this.view = view
      this.current_page = 1

      this.view.searcInput.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500))
      this.view.loadMore.addEventListener('click', this.loadUsers.bind(this))
   }

   async loadUsers() {
      if(this.view.searcInput.value === ''){
         console.log('clear')
         this.clearUsers()
      }
      return await fetch(`https://api.github.com/search/users?q=${this.view.searcInput.value}&per_page=${USERS_PER_PAGE}&page=${this.current_page}`)
         .then(response => {
            if (response.ok) {
               this.setCurrentPage(this.current_page + 1)
               response.json()
                  .then(response => response.items.forEach(user => this.view.createUser(user)))
            } else {

            }
         })
   }

   setCurrentPage(page) {
      this.current_page = page
   }

   clearUsers(){
      this.view.usersList.innerHTML = ''
   }

   debounce(func, wait, immediate) {
      let timeout;
      return function () {
         let context = this,
            args = arguments
         let later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
         };
         let callNow = immediate && !timeout
         clearTimeout(timeout)
         timeout = setTimeout(later, wait)
         if (callNow) func.apply(context, args)
      }
   }

}