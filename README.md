# calendar-nodejs
calendar nodejs

*install nodejs*
sudo apt-get install nodejs npm

*install express js*
npm install express --save

doc: https://expressjs.com/en/4x/api.html#router

*install nodemon > recharge le server automatique*
npm install --save-dev nodemon
node_modules/.bin/nodemon index.js

*install de browsersync > recharge le navigateur*
npm install --save-dev browser-sync
node_modules/.bin/browser-sync start --watch --files public --proxy http://localhost:8000

*install de vue.js*
npm install --save vue
  - faire un lien symbolique
ln -s ../../node_modules/vue/dist/vue.js

doc: https://fr.vuejs.org/v2/guide/forms.html

*install de moment*
npm insall --save moment
  - faire un lien symbolique
ln -s ../../node_modules/moment/min/moment.min.js
ln -s ../../node_modules/moment/locale/fr.js

doc: https://momentjs.com/docs/#/get-set/set/

*vue js*
boucle > v-for="x in xx"
click > v-on:click="xx" or @click="xx"
render du html > v-html="html"

*doc de fetch*
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

*server-sent events*
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
