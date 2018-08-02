import Ember from 'ember';
import strftime from 'npm:strftime';
import he from 'npm:he';

export default Ember.Component.extend({
    timestamp: Ember.computed('message.time', function() {
        return strftime('%H:%M:%S %P', new Date(this.get('message').time));
    }),
    text: Ember.computed('message.text', function() {
        return he.decode(this.get('message').text);
    }),
});
