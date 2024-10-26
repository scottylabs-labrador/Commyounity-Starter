from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options 
from bs4 import BeautifulSoup
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

    driver.get('https://www.google.com/search?q=pittsburgh+events&sca_esv=ea89727b02e8330d&ei=V7QBZ8r5AeCs5NoPvO-GiAk&ved=0ahUKEwiKgZSQnPiIAxVgFlkFHby3AZEQ4dUDCA8&uact=5&oq=pittsburgh+events&gs_lp=Egxnd3Mtd2l6LXNlcnAiEXBpdHRzYnVyZ2ggZXZlbnRzMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMhwQLhiABBiwAxhDGMcBGMgDGIoFGI4FGK8B2AEBMhwQLhiABBiwAxhDGMcBGMgDGIoFGI4FGK8B2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhwQLhiABBiwAxhDGMcBGMgDGIoFGI4FGK8B2AEBMhkQLhiABBiwAxhDGMcBGMgDGIoFGK8B2AEBMhwQLhiABBiwAxhDGMcBGMgDGIoFGI4FGK8B2AEBMhwQLhiABBiwAxhDGMcBGMgDGIoFGI4FGK8B2AEBMhMQLhiABBiwAxhDGMgDGIoF2AEBSKoLUL0HWP8JcAF4AJABAJgBXaAB7AKqAQE1uAEDyAEA-AEBmAIFoAKxAsICDRAAGIAEGLEDGIMBGA3CAgcQABiABBgNwgIQEAAYgAQYsQMYgwEYigUYDcICEBAAGIAEGLEDGEMYgwEYigXCAg0QABiABBixAxiDARgKwgIHEAAYgAQYCsICEBAAGIAEGLEDGIMBGIoFGAqYAwDiAwUSATEgQIgGAZAGFLoGBggBEAEYCJIHATWgB-9b&sclient=gws-wiz-serp')
    time.sleep(5)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    # ol = soup.find_all('div', attrs={'jscontroller':'NGvQ3'})
    # ol = soup.find_all('li', attrs={'class':'PaEvOc'})
    ol = soup.find_all('div', attrs={'class':'fzHfmf'})


    # a_elements = ol.find_all('a')
    data_list = []

    #scrape
    for a in ol:
        tit = a.find("div", class_="YOGjf").get_text(strip=True)
        temp = a.find("div", class_ = "cEZxRc").get_text(strip=True)
        tim = ''.join([i if ord(i) < 128 else ' ' for i in temp]).replace(",","").split()
        [k, j ]= a.find_all("div", class_ = "cEZxRc zvDXNd")
        [name,place] =[k.get_text(strip=True), j.get_text(strip=True)]


        
        data = Event_Container();
        data.title = tit;
        # data.category = cat;
        # data.location = loc;
        data.time = tim;

        m = 0
        d = 0
        if(temp[0] == "Today"):
            m = 14
        data.month = m;
        data.day = d;

        data_list.append(data);

    driver.quit()
    return data_list;

def insert():
    datalist = scrape();
    for event in datalist:
        print("Title: " +event.title + "Category: " +event.category + "Location: "+event.location + "Month: "+event.month+"Day: "+event.day+"Weekday: "+event.weekday+"Time: "+event.time)
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