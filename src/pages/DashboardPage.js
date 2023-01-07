import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecordsTable} from './dashboard.functions';
import {logOut} from '@/pages/auth.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    const token = localStorage.getItem('token')
    let signIn = `<a href="#auth/signin">
        <button class="db__signIn">Sign In</button>
        </a>`
    let newTable = `<div class="db__new">
        <div class="db__view">
        </div>
      </div>`
    if (token) {
      signIn = `<button class="db__signIn">
        <div id="logout" class="button" data-button="exit">
          <span 
          class="material-symbols-outlined" 
          data-button="exit"
          >logout</span>
        </div>
      </button>`
      newTable = `<div class="db__new">
        <div class="db__view">
          <a href="#excel/${now}" class="db__create">
            New <br/> Table
          </a>
        </div>
      </div>`
    }
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel Dashboard</h1>
        ${signIn}
      </div>

      ${newTable}

      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    `)
  }

  afterRender() {
    const button = (document.getElementById('logout'))
    button.onclick = function() {
      logOut()
      location.reload()
    }
  }
}
