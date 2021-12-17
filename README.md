# neurosky-reader
To run app:
```shell
node app.js
```
App runs on [localhost:3000](http://localhost:3000)

Script `thinkgear.js` is for reading data from MindWave Mobile 2.

Script `preprocessData.js` is for preprocessing data (moving average and discard frist and last 10 records)

Script `generateEmotions.js` is for predict emotions based on measured data (using ML model https://github.com/MaciejRys/Engineering-Thesis)
