new Vue({
    el: '#app',
    data: {
      usuario: '',
      password: ''
    },
    methods: {
      login() {
        if (this.username && this.password) {
          alert(`Username: ${this.usuario}\nPassword: ${this.password}`);
        } else {
          alert('Please enter both username and password');
        }
      }
    }
  });
  