from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options 
from bs4 import BeautifulSoup
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scrape.settings')
django.setup()
from myapp.models import Events
import time

class Event_Container:
    def __init__(self):
        self.title = "";
        self.link = "";
        self.description = "";
        self.img = "";
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
    driver.get('https://www.bing.com/search?q=All+Events+Events+in+New+York&filters=latlong%3a%2240.71304702758789%2c-74.00723266601562%22+location%3a%22New+York%22+eventcity%3a%2260d5dc2b-c915-460b-b722-c9e3485499ca%22+catesegtype%3a%22ZXZlbnRfY2l0eQ%3d%3d%22+eventsgroup%3a%22MTQw%22+date%3a%2220250104_20250331%22+PopulatedPlaceGeoID%3a%22NWI5ZGQ2YzYtZjAwNi00Zjg0LWI5YjItNjUwMzQ3Y2U3MjBkIw%3d%3d%22+GeoIds%3a%22NWI5ZGQ2YzYtZjAwNi00Zjg0LWI5YjItNjUwMzQ3Y2U3MjBkJHBvcHVsYXRlZHBsYWNlIw%3d%3d%22+mltype%3a%221%22+eltypedim1%3a%22Event%22+secq%3a%22All+Events+Events+in+New+York%22+tsource%3a%22events%22+supwlcar%3a%221%22+eventdg%3a%22false%22+segment%3a%22generic.carousel%22+ctype%3a%224%22+UserId%3a%22E2668640D09481C26C4D615EFFFFFFFF%22')
    time.sleep(5)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    ol = soup.find('ol', class_='items')
    a_elements = ol.find_all('a')
    data_list = []

    #scrape
    for a in a_elements[:50]:
        href = a.get('href')
        pic = a.find("img")
        if pic:
            img = pic.get('src')
        else:
            img = 'https://www.bing.com/search?q=All+Events+Events+in+Boston&filters=latlong%3a%2242.35899353027344%2c-71.05863189697266%22+location%3a%22Boston%22+eventcity%3a%22f0f5899a-361f-4fe4-89d1-11130aa2c653%22+catesegtype%3a%22ZXZlbnRfY2l0eQ%3d%3d%22+eventsgroup%3a%22MTQw%22+date%3a%2220250104_20250331%22+PopulatedPlaceGeoID%3a%22NTRkMDA0MWItYmNmNi00Yzc2LWE0NzMtYmFmMGE3ODFjOTI1Iw%3d%3d%22+GeoIds%3a%22NTRkMDA0MWItYmNmNi00Yzc2LWE0NzMtYmFmMGE3ODFjOTI1JHBvcHVsYXRlZHBsYWNlIw%3d%3d%22+mltype%3a%221%22+eltypedim1%3a%22Event%22+secq%3a%22All+Events+Events+in+Boston%22+tsource%3a%22events%22+supwlcar%3a%221%22+eventdg%3a%22false%22+segment%3a%22generic.carousel%22+ctype%3a%224%22+UserId%3a%22E2668640D09481C26C4D615EFFFFFFFF%22'
        tit = a.find("span", class_="tit").get_text(strip=True)
        print(tit)
        cat = a.find("div", class_ = "evtcat").get_text(strip=True)
        b_factrows = a.find_all("div", class_="b_factrow")
        loc = b_factrows[1].get_text(strip=True)
        tim = b_factrows[2].get_text(strip=True)
        float_meta = a.find("div", class_="b_float_meta")
        m = float_meta.contents[0].get_text(strip=True)
        meta_divs = float_meta.find_all("div")
        d = meta_divs[0].get_text(strip=True)
        w = meta_divs[1].get_text(strip=True)

        further = "https://www.bing.com/" + href
        description, link = scrape_further(further, driver)

        data = Event_Container();
        data.title = tit;
        data.category = cat;
        data.description = description
        data.img = img
        data.link = link
        data.location = loc;
        data.time = tim;
        data.month = m;
        data.day = d;
        data.weekday = w;
        data_list.append(data);

    driver.quit()
    return data_list;

def scrape_further(url, driver):
    """Scrape additional details from the 'further' URL."""
    driver.get(url)
    time.sleep(3)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    details = soup.find('p', class_='b_paractl')
    if details:
        description = details.find('span').get('title')
    else:
        description = "No descriptions for this event yet."
    if description:
        pass
    else:
        description = "No descriptions for this event yet."
    tickets = soup.find('td', class_='evt_logoCell')
    link = tickets.find('a').get('href')
    return description, link

def insert():
    datalist = scrape();
    for event in datalist:
        Events.objects.create(
            title=event.title,
            category=event.category,
            description=event.description,
            img=event.img,
            link=event.link,
            location=event.location,
            month=event.month,
            day=event.day,
            weekday=event.weekday,
            time=event.time,
        )

insert()