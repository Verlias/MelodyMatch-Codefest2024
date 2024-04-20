#import bs4
from bs4 import BeautifulSoup 
import requests 
import re


def get_id(id):
    id = str(id)
    url = "https://open.spotify.com/track/" + id
    r = requests.get(url) 
    soup = BeautifulSoup(r.content, 'html.parser')
    list_id = soup.find_all("a",href=re.compile("/track"))
    return_list =[]
    for i in range(5):
        id = str(list_id[i])
        return_list.append((id[34:56]))
    return return_list
    

def get_name(id):
    id = str(id)
    url = "https://open.spotify.com/track/" + id
    r = requests.get(url) 
    soup = BeautifulSoup(r.content, 'html.parser')
    list_name = soup.find_all("span", class_="Type__TypeElement-sc-goli3j-0 bbnnQt SFL_8OScayNetZYtCrnW")
    return_list =[]
    for i in range(5):
        name = str(list_name[i])
        return_list.append((name[94:-7]))
    return return_list


if __name__ == "__main__":
    print(get_id("5sdQOyqq2IDhvmx2lHOpwd"))
    print(get_name("5sdQOyqq2IDhvmx2lHOpwd"))