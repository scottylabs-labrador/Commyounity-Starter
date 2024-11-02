from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options 
from bs4 import BeautifulSoup
from datetime import date, datetime
# from myapp.models import Events
import time

class Event_Container:
    def __init__(self):
        self.title = "";
        self.category = "";
        self.location = "";
        self.month = "";
        self.day = 0;
        self.weekday = "";
        self.time = "";

def scrape():
    # configuring
    edge_driver_path = "D:/edgedriver_win64/msedgedriver.exe"
    service = Service(edge_driver_path)
    options = Options()
    options.add_argument('--lang=en-US')
    # driver = webdriver.Edge(service=service, options=options)
    driver = webdriver.Chrome()

    categories = ["arts+and+crafts", "performing+arts", "music", "travel","play", "theater", "athletic","sports","urban","workshop","comedy","food", "other"]
    nameCategories = ["ART & CRAFTS", "PERFORMING ARTS", "MUSIC", "TRAVEL","PLAY", "THEATER", "ATHLETIC","SPORTS & OUTDOORS","URBAN","WORKSHOP", "COMEDY","FOOD & DRINK","OTHERS"]
    data_list = []
    for x in range(len(categories)):

        driver.get('https://www.google.com/search?q=' + categories[x] + '+pittsburgh+events')
        time.sleep(2)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        ol = soup.find_all('div', attrs={'class':'odIJnf'})

        # a_elements = ol.find_all('a')
        #scrape
        for a in ol:

            tit = a.find("div", class_="YOGjf").get_text(strip=True)
            temp = a.find("div", class_ = "cEZxRc").get_text(strip=True)
            tim = ''.join([i if ord(i) < 128 else ' ' for i in temp]).replace(",","").split()
            day = a.find("div", class_="UIaQzd").get_text(strip=True)
            month = a.find("div", class_="wsnHcb").get_text(strip=True).upper()
            [k, j ]= a.find_all("div", class_ = "cEZxRc zvDXNd")
            [name,place] =[k.get_text(strip=True), j.get_text(strip=True)]


            
            data = Event_Container();
            data.title = tit;
            data.month = month
            data.day = day
            data.category = nameCategories[x];
            data.location = name+" "+place;
            if(len(tim)>3 and tim[0] in ["Mon","Tues","Tue","Wed","Thurs","Thu","Fri","Sat","Sun","Today","Tomorrow"]):
                if(":" in tim[1]):
                    if(len(tim)==4):
                        data.time = tim[1] + " " + tim[3]
                    elif(len(tim)==5):
                        data.time = tim[1]+" "+tim[2]
                    else:
                        data.time = "Unknown"
                elif(tim[1].isnumeric()):
                    if(len(tim)==4):
                        data.time = tim[1]+":00 "+tim[3]
                    elif(len(tim)==5):
                        data.time = tim[1]+":00 "+tim[2]
                    else:
                        data.time = "Unknown"
                else:
                    data.time = "Unknown"
            else:
                data.time = "Unknown"

            weekdays = ["MON", "TUE","WED","THU","FRI","SAT","SUN"]
            if(tim[0] == "Today"):
                data.weekday = weekdays[date.today().weekday()%7]
            elif(tim[0] == 'Tomorrow'):
                data.weekday = weekdays[(date.today().weekday()+1) %7]
            else:
                practice = date.today().replace(month=datetime.strptime(month, '%b').month).replace(day=int(day))
                data.weekday = weekdays[practice.weekday()%7]
            
            similar = False;
            for a in data_list:
                if (a.title == data.title and a.day == data.day and a.month == data.month):
                    similar = True;
            if( not similar):
                data_list.append(data);
                    

    driver.quit()
    return data_list;

def insert():
    datalist = scrape();
    for event in datalist:
        print("Title: " +event.title + " Category: " +event.category + " Location: "+event.location + " Month: "+event.month+" Day: "+event.day+" Weekday: "+event.weekday+" Time: "+event.time)
        # Events.objects.create(
        #     title=event.title,
        #     category=event.category,
        #     location=event.location,
        #     month=event.month,
        #     day=event.day,
        #     weekday=event.weekday,
        #     time=event.time,
        # )

insert()