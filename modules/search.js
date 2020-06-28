export class Search {

   constructor(view, api, log) { // чтобы получить доступ к классу
      this.view = view
      this.api = api
      this.log = log

      this.current_page = 1
      this.USERS_PER_PAGE = 20

      this.view.searcInput.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500))
      this.view.loadMore.addEventListener('click', this.loadMoreUsers.bind(this))
   }

   loadUsers() {
      this.setCurrentPage(1) // при первой загрузке
      if(this.view.searcInput.value === ''){
         this.clearUsers()
         this.view.toggleLoadMoreBtn(false)
         this.view.setCounterMessage('')
      } else{
         this.clearUsers()
         this.usersRequest(this.view.searcInput.value)
      }
   }

   loadMoreUsers(){
      this.setCurrentPage(this.current_page + 1)
      this.usersRequest(this.view.searcInput.value)
   }
   
   async usersRequest(searchValue) {
      let totalCount

      try{
         await this.api.loadUsers(searchValue, this.current_page)
            .then(response => { 
               response.json()
               .then(response => {
                  totalCount = response.total_count
                  this.view.setCounterMessage(this.log.counterMessage(totalCount))
                  this.view.toggleLoadMoreBtn(totalCount > this.USERS_PER_PAGE && (this.current_page - 1) * this.USERS_PER_PAGE < totalCount)
                  response.items.forEach(user => this.view.createUser(user))
               })
            })
      } catch (error) {
         console.log('Error' + error)
      }
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