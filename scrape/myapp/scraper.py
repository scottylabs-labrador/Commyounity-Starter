from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options 
from bs4 import BeautifulSoup
from myapp.models import Events
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
    driver = webdriver.Edge(service=service, options=options)
    driver.get('https://www.bing.com/search?q=All+Events+Events+in+Philadelphia&filters=latlong%3a%2239.9510612487793%2c-75.16561889648438%22+location%3a%22Philadelphia%22+eventcity%3a%22020d4bbf-2971-4236-b87d-c3ec1d7f851c%22+catesegtype%3a%22ZXZlbnRfY2l0eQ%3d%3d%22+eventsgroup%3a%22MTQw%22+date%3a%2220241005_20241231%22+PopulatedPlaceGeoID%3a%22YWZlNTQzZmYtNzFlMi00ZWQ0LWFjMjAtNDk0ZjQ5MjI3MTM3Iw%3d%3d%22+GeoIds%3a%22YWZlNTQzZmYtNzFlMi00ZWQ0LWFjMjAtNDk0ZjQ5MjI3MTM3JHBvcHVsYXRlZHBsYWNlIw%3d%3d%22+mltype%3a%221%22+eltypedim1%3a%22Event%22+secq%3a%22All+Events+Events+in+Philadelphia%22+tsource%3a%22events%22+supwlcar%3a%221%22+eventdg%3a%22false%22+segment%3a%22generic.carousel%22+ctype%3a%224%22+UserId%3a%22E2668640D09481C26C4D615EFFFFFFFF%22')
    time.sleep(5)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    ol = soup.find('ol', class_='items')
    a_elements = ol.find_all('a')
    data_list = []

    #scrape
    for a in a_elements:
        tit = a.find("span", class_="tit").get_text(strip=True)
        cat = a.find("div", class_ = "evtcat").get_text(strip=True)
        b_factrows = a.find_all("div", class_="b_factrow")
        loc = b_factrows[1].get_text(strip=True)
        tim = b_factrows[2].get_text(strip=True)
        float_meta = a.find("div", class_="b_float_meta")
        m = float_meta.contents[0].get_text(strip=True)
        meta_divs = float_meta.find_all("div")
        d = meta_divs[0].get_text(strip=True)
        w = meta_divs[1].get_text(strip=True)
        
        data = Event_Container();
        data.title = tit;
        data.category = cat;
        data.location = loc;
        data.time = tim;
        data.month = m;
        data.day = d;
        data.weekday = w;
        data_list.append(data);

    driver.quit()
    return data_list;

def insert():
    datalist = scrape();
    for event in datalist:
        Events.objects.create(
            title=event.title,
            category=event.category,
            location=event.location,
            month=event.month,
            day=event.day,
            weekday=event.weekday,
            time=event.time,
        )

