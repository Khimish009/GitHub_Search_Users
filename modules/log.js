export class Log {

   counterMessage(counter){
      return counter ? `<i>Найдено ${counter} пользователей</i>` : `<i>ничего не найдено</i>`
   }
}