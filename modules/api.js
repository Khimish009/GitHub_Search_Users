const URL = 'https://api.github.com/'
const USERS_PER_PAGE = 20

export class API {

   async loadUsers(viewSearcInputValue, current_page) {
      return await fetch(`${URL}search/users?q=${viewSearcInputValue}&per_page=${USERS_PER_PAGE}&page=${current_page}`)
   }

   loadUserData(login){
      const urls = [
         `${URL}users/${login}/following`,
         `${URL}users/${login}/followers`,
         `${URL}users/${login}/repos`,
      ]

      const requests = urls.map(url => fetch(url))
      return Promise.all(requests)
         .then(responses => Promise.all(responses.map(response => response.json())))
   }
}