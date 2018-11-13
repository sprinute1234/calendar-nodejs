# calendar-nodejs
calendar nodejs

*install nodejs*
sudo apt-get install nodejs npm

*install express js*
npm install express --save

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

*install de moment*
npm insall --save moment
  - faire un lien symbolique
ln -s ../../node_modules/moment/min/moment.min.js
ln -s ../../node_modules/moment/locale/fr.js

*vue js*
boucle > v-for="x in xx"
click > v-on:click="xx" or @click="xx"
render du html > v-html="html"
