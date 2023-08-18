import { Component, Prop, State, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'login-component',
  styleUrl: 'login-component.css',
  scoped: true,
  assetsDirs: ['media']
})
export class LoginComponent {
  @State() email: string;
  @State() password: string;
  @State() attemptingLogin: boolean = false;
  @Prop() image = 'background-design.png';

  inputrow = 'input-row';

  emailChanged(event) {
    this.email = event.target.value;
  }

  passwordChanged(event) {
    this.password = event.target.value;
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.attemptingLogin = true;
    try {
      //make a fake async await call to simulate a server call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
      let errmessage = 'Login failed:Unkonwn Error';
      if (error.status === 401) {
        errmessage = 'Login failed: Incorrect Login Email or Password';
      } else if (error.status === 400 && error.data.password) {
        errmessage = 'Login failed: No password provided. Please fill in your password.';
      } else if (error.status === 'FETCH_ERROR') {
        errmessage = 'Login failed: Unable to reach server';
      }
      console.log('ERROR MESSAGE: ', errmessage);
      this.password = null;
      this.inputrow = 'input-row-red';
      document.getElementById('PasswordInput').focus();
    }
  }

  // Input focus
  handleInputFocus(event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.placeholder = ''; // Remove placeholder text
  }

  // Input blur
  handleInputBlur(event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value) {
      inputElement.placeholder = 'Your Placeholder Text'; // Restore placeholder text if input is empty
    }
  }

  render() {
    const backgroundImagePath = getAssetPath(`./assets/${this.image}`);
    return (
     
      <div class="app-login">
        <img src={backgroundImagePath}/>
        <div class="login-logo">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M60.2915 21.7006H48.0001V32.0944H35.7086H23.433H23.425V74.2994H23.433H35.7086H48.0001V63.9056H60.2915H72.5671H72.575V21.7006H72.5671H60.2915ZM35.7086 63.9056H48.0001V53.5118H60.2915V32.0944H48.0001V42.4882H35.7086V63.9056Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="login-box">
          <div class="h1 head">Log in</div>
          <form class="login-form" onSubmit={e => this.handleSubmit(e)}>
            <div class="input-container input-row">
              <label>
                <div class="h4">Email</div>
                <input 
                  type="email" 
                  autocomplete="username" 
                  spellcheck={false} 
                  value={this.email} 
                  onInput={e => this.emailChanged(e)} 
                  placeholder="example@example.com"
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                  />
              </label>
            </div>
            <div class={this.inputrow}>
              <label>
                <div class="h4">Password</div>
                <input 
                id="PasswordInput" 
                type="password" 
                autocomplete="current-password" 
                value={this.password} 
                onInput={e => this.passwordChanged(e)} 
                placeholder="Type your password"
                onFocus={this.handleInputFocus} 
                onBlur={this.handleInputBlur} 
                />
              </label>
            </div>
            {this.attemptingLogin ? 'Loading...' : <input class="chl-button login-submit " type="submit" value="Log in" />}
            <text class="forgot-pass-link">Forgot your password?</text>
          </form>
        </div>
      </div>
    );
  }
}
