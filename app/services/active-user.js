import Ember from 'ember';

export default Ember.Service.extend({
    user: null,
          setUser(username) {
              this.set('user', username);
              console.log('user set');
          },
          hasUser() {
              return this.get('user') != undefined;
          }
});
