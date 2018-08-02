import Ember from 'ember';

export default Ember.Component.extend({
    activeUserService: Ember.inject.service('active-user'),
          actions: {
              userSubmittedName() {
                  const user = this.get('userName');
                  this.get('activeUserService').setUser(user);
              }
          }
});
