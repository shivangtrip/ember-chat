import Ember from 'ember';
import axios from 'npm:axios';
import Pusher from 'npm:pusher-js';

const SAD_EMOJI = [55357, 56864];
const HAPPY_EMOJI = [55357, 56832];
const NEUTRAL_EMOJI = [55357, 56848];

export default Ember.Component.extend({
    activeUserService: Ember.inject.service('active-user'),
          messages: ['Welcome to your chat app!'].map((message) => {
              return {
                username: 'Admin',
                time: new Date(),
                text: message,
              };
            }),
          init() {
              this._super(...arguments);
              let pusher = new Pusher('36197b25768cdb28c23f', { // update your APP_KEY
                  cluster: 'ap2',
                  encrypted: true
              });
              const channel = pusher.subscribe('chat');
              channel.bind('message', data => {
                  const analysis = data.sentiment > 0 ? HAPPY_EMOJI : (data.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI);
                  const response = {
                      text: data.text,
                      username: data.username,
                      time: data.time,
                      mood: String.fromCodePoint(...analysis)
                  }
                  this.get('messages').pushObject(response);
              });
          },
          actions: {
              newMessage() {
                  const text = this.get('newMessage');
                  const username = this.get('activeUserService').get('user');
                  const time = new Date();

                  axios.post('https://morning-atoll-69322.herokuapp.com/messages', { text, username, time });
                  this.set('newMessage', '');
              }
          }
});
