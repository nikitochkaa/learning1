import {Page} from '@core/Page';
import {$} from '@core/dom';
// eslint-disable-next-line no-unused-vars
import {signIn, signUp} from '@/pages/auth.functions';

export class AuthPage extends Page {
  getRoot() {
    const params = this.params ? this.params : 'signin'

    if (params === 'signin') {
      return $.create('div', 'auth').html(`
    <div class = "signIn">
      <section class="loginpage">
        <div id="signin">
          <div class="containerForm">
            <h1>Sign In</h1>
            <p>Please log in to your account.</p>
            <hr>

            <label><b>Email</b></label>
            <input type="text" placeholder="Enter Email" id="email" required>

            <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" id="psw" required>

            <div class="clearfix">
              <a href="/#auth/signup">
                <button type="button" class="button" id="cancelbtn">
                I don't have an account
                </button>
              </a>
          <button type="button" class="button" id="signinbtn"
              >Sign In</button>
            </div>
          </div>
        </div>

      </section>
        </div>
    `)
    } else {
      return $.create('div', 'auth').html(`
        <div class = "signIn">
          <section class="loginpage">
            <div id="signup">
              <div class="containerForm">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <label><b>Email</b></label>
              <input type="text" placeholder="Enter Email" id="email" required>

                <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" id="psw" required>

                <label><b>Repeat Password</b></label>
  <input type="password" placeholder="Repeat Password" id="psw-repeat" required>


                <div class="clearfix">
                  <a href="#auth/signin">
                    <button type="button" class="button" id="cancelbtn"
                    >Already have an account</button>
                  </a>
      <button type="button" class="button" id="signupbtn"
                  >Sign Up</button>
                </div>
              </div>
            </div>

            </section>
        </div>
      `);
    }
  }
  afterRender() {
    let email
    let password
    const form = (document.getElementById('signinbtn')) ||
      (document.getElementById('signupbtn'))
    form.onclick = function() {
      email = (document.getElementById('email')).value
      password = (document.getElementById('psw')).value
      if (form.id === 'signinbtn') {
        signIn(email, password)
      } else {
        signUp(email, password)
      }
    }
  }
}
