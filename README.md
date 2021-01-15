# bttscanv2
Final version of BTT scan
This repo contains the source files for the former bttscan.xyz site. It contains dlive staking rewards history data from inception until January 14 2021. If anyone is interested in borrowing the historical data only you can find it in the following files:

-Dlive Staking: lineChart_dlive.json
-Dlive Partners Staking: lineChartPartners.json

The python script that was used to scrap the data from dlive website is: web_scrapper_dlive_server.py

If anyone is interested in running this piece of SW in their own servers you have to consider running a Crontab service(linux) to automatically trigger the execution of the python script some minutes after the website data is updated (00:00 UTC)

It was definetly interesting and educating to build this project (it was the second website I developed). Unfortunately I cannot longer keep paying the annual server fee. Feel free to take what you need from the sources :)

Cheers TRONICS / BTT community!
