import {Search} from './modules/search.js'
import {View} from './modules/view.js'
import {API} from './modules/api.js'
import {Log} from './modules/log.js'

const api = new API()
const app = new Search(new View(), api, new Log())