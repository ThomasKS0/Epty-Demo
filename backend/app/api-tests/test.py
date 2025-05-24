from requests import session
from requests.models import PreparedRequest

URL = "https://ws.geonorge.no/adresser/v1/sok"

params = {
    'sok':'Bygdøy allé ',
    'treffPerSide': 100
}
req = PreparedRequest()
req.prepare_url(URL, params)


sess = session()

data = sess.get(req.url)
data.raise_for_status()

try:
    jdata = data.json()
    for adr in jdata['adresser']:
        print(f"{adr['adressetekst']}, {adr['postnummer']} {adr['poststed']}")
    #print(data.json())
except:
    pass
    print(data.text)