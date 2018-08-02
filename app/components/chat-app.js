import Ember from 'ember';

export default Ember.Component.extend({
    activeUserService: Ember.inject.service('active-user'),
          nameIsSet: Ember.computed('activeUserService.user',function() {
              return this.get('activeUserService').hasUser();
          })
});
