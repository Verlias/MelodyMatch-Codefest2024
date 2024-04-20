def slice(link):
    return link.split('/')[-1]

if __name__ == "__main__":
    id = slice('https://open.spotify.com/track/2hgzdQdnfWwtdpZbhZlV72?si=d8e38947fb314a29')
    print(id)