import requests
import pprint
from bs4 import BeautifulSoup
import re
import json
from datetime import date
import datetime
import time
from pytz import timezone
import pytz
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

pp = pprint.PrettyPrinter(indent=4)
options = Options()
options.headless = True
options.add_argument('--no-sandbox')
options.add_argument("--window-size=1920,1200")
options.binary_location = "/usr/bin/google-chrome"
DRIVER_PATH = '/home/bttscan/src/components/charts/chromedriver'
driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)
#all_links = driver.find_elements_by_tag_name('a')
#/html/body/div/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[5]/td[2]

#//*[@id="root"]/main/div/div/div/div/div/div/div[1]/div[1]/table/tbody/tr[5]/td[2]/text()[1]
#dliveStats_pre = ""	#Initializing string
driver.get('https://dlive.tv/s/stake')
time.sleep(4)	#Wait for page to load
timeout = 5
try:
    element_present = EC.presence_of_element_located((By.XPATH, "//*[@id='router-view']/div/div[3]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div"))
    WebDriverWait(driver, timeout).until(element_present)        
except TimeoutException:
    print("Timed out waiting for page to load")
finally:
	print("Page loaded")
	totalBTTStaked = driver.find_element_by_xpath("//*[@id='router-view']/div/div[3]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]/div")
	totalBTTStaked = totalBTTStaked.text.strip("B")
	#print(totalBTTStaked)
	distributedBTT = driver.find_element_by_xpath("//*[@id='router-view']/div/div[3]/div[2]/div[2]/div[2]/div[2]/div[2]/div[1]/div")
	distributedBTT = distributedBTT.text.strip("M")
							
	arBTT = driver.find_element_by_xpath("//*[@id='router-view']/div/div[3]/div[2]/div[2]/div[2]/div[3]/div[2]/div[1]/div")
	arBTT = arBTT.text.strip("+%")



	totalPartnersBTTStaked = driver.find_element_by_xpath("//*[@id='router-view']/div/div[3]/div[2]/div[2]/div[2]/div[4]/div[2]/div[1]/div")
	totalPartnersBTTStaked = totalPartnersBTTStaked.text.strip("MB")
	#print(totalBTTStaked)
	distributedPartnersBTT = driver.find_element_by_xpath("//*[@id='router-view']/div/div[3]/div[2]/div[2]/div[2]/div[5]/div[2]/div[1]/div")
	distributedPartnersBTT = distributedPartnersBTT.text.strip("MB")

	arPartnersBTT = driver.find_element_by_xpath("//*[@id='router-view']/div/div[3]/div[2]/div[2]/div[2]/div[6]/div[2]/div[1]/div")
	arPartnersBTT = arPartnersBTT.text.strip("+%")

	print("Total Staked BTT: "+ totalBTTStaked)
	print("Distributed BTT: " + distributedBTT)
	print("dLive Staking APR: " + arBTT)
	print("Total Partners Staked BTT: "+ totalPartnersBTTStaked)
	print("Distributed Partners BTT: " + distributedPartnersBTT)
	print("dLive Partners Staking APR: " + arPartnersBTT)

	driver.quit()
	tz_NY = pytz.timezone('America/New_York')
	date_daily = datetime.datetime.now(tz_NY)
	date_daily = date_daily.strftime("%d/%m/%Y")
	print(date_daily)

	totalBTTStaked = float(totalBTTStaked)
	distributedBTT = float(distributedBTT)
	arBTT = float(arBTT)
	dailyReturn = round(arBTT / 365,3)

	totalPartnersBTTStaked = float(totalPartnersBTTStaked)   #Convert to billion format
	distributedPartnersBTT = float(distributedPartnersBTT)
	arPartnersBTT = float(arPartnersBTT)
	dailyPartnerReturn = round(arPartnersBTT / 365,3)




dliveBTTDictionary =	{					#Converting dlive data into a dictionary (to be later added to our json file)
  "date": date_daily,
  "ar": arBTT,
  "dailyreturn": dailyReturn,
  "totaldist": distributedBTT,
  "totalstaked": totalBTTStaked
}

dlivePartnersDictionary =	{					#Converting dlive data into a dictionary (to be later added to our json file)
  "date": date_daily,
  "ar": arPartnersBTT,
  "dailyreturn": dailyPartnerReturn,
  "totaldist": distributedPartnersBTT,
  "totalstaked": totalPartnersBTTStaked
}

pp.pprint(dliveBTTDictionary)
pp.pprint(dlivePartnersDictionary)

#-------BTT Holders SEction------------------------------
'''
## JSON Manipulation section (dliveStats) ##
with open('lineChart_dlive.json') as json_file:	#Opening table data as json file...
	data_BTTtable = json.load(json_file)				#Assigning json into a variable
	## DEBUG:pp.pprint(data["dliveStats"][1])

data_BTTtable["lineChart_dlive"].append(dliveBTTDictionary)  #Appending our new dictionary into our json (array of dictionaries)
pp.pprint(data_BTTtable)
with open('lineChart_dlive.json', 'w') as outfile:	#Save dictionary to json file
	json.dump(data_BTTtable, outfile, indent=4)
'''
## JSON Manipulation section (lineChart) ##
with open('lineChart_dlive.json') as json_file:	#Opening charts data as json file...
	data_BTTlineChart = json.load(json_file)   #Assigning json into a variable
	data_BTTlineChart["labels"].append(date_daily)	#Appending today's date in labels key in dictionary
	## DEBUG: pp.pprint(data_lineChart["labels"])
	data_BTTlineChart["datasets"][0]["data"].append(arBTT)	#Appending today's ATR
	## DEBUG: pp.pprint(data_lineChart["datasets"][0]["data"])
	data_BTTlineChart["datasets"][1]["data"].append(distributedBTT)	#Appending today's total distribution
	## DEBUG: pp.pprint(data_lineChart["datasets"][1]["data"])
	data_BTTlineChart["datasets"][2]["data"].append(totalBTTStaked)	#Appending today's staked BTT
	## DEBUG: pp.pprint(data_lineChart["datasets"][2]["data"])

with open('lineChart_dlive.json', 'w') as outfile:	#Save dictionary to json file
	json.dump(data_BTTlineChart, outfile, indent=4)


#------------Partners Section--------------
'''
## JSON Manipulation section (dliveStats) ##
with open('dliveStatsPartners.json') as json_file:	#Opening table data as json file...
	data_Partnerstable = json.load(json_file)				#Assigning json into a variable
	## DEBUG:pp.pprint(data["dliveStats"][1])

data_Partnerstable["dliveStats"].append(dlivePartnersDictionary)  #Appending our new dictionary into our json (array of dictionaries)
pp.pprint(data_Partnerstable)
with open('dliveStatsPartners.json', 'w') as outfile:	#Save dictionary to json file
	json.dump(data_Partnerstable, outfile, indent=4)
'''
## JSON Manipulation section (lineChart) ##
with open('lineChartPartners.json') as json_file:	#Opening charts data as json file...
	data_PartnerslineChart = json.load(json_file)   #Assigning json into a variable
	data_PartnerslineChart["labels"].append(date_daily)	#Appending today's date in labels key in dictionary
	## DEBUG: pp.pprint(data_lineChart["labels"])
	data_PartnerslineChart["datasets"][0]["data"].append(arPartnersBTT)	#Appending today's ATR
	## DEBUG: pp.pprint(data_lineChart["datasets"][0]["data"])
	data_PartnerslineChart["datasets"][1]["data"].append(distributedPartnersBTT)	#Appending today's total distribution
	## DEBUG: pp.pprint(data_lineChart["datasets"][1]["data"])
	data_PartnerslineChart["datasets"][2]["data"].append(totalPartnersBTTStaked)	#Appending today's staked BTT
	## DEBUG: pp.pprint(data_lineChart["datasets"][2]["data"])

with open('lineChartPartners.json', 'w') as outfile:	#Save dictionary to json file
	json.dump(data_PartnerslineChart, outfile, indent=4)
#Use this on crontab file to automate execution process(Edit your paths): */05 00 * * * cd /home/simbad/Documents/Git_Repos/bttscan/src/components/charts && /usr/bin/python3 /home/simbad/Documents/Git_Repos/bttscan/src/components/charts/web_scrapper_test.py > /tmp/listener.log 2>&1
