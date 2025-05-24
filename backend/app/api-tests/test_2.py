import requests
from requests.models import PreparedRequest

# Alternative working endpoint (WFS service)
BASE_URL = "https://wfs.geonorge.no/skwms1/wfs.matrikkelen-bygningspunkt"

def fetch_buildings(limit=10, municipality=None):
    params = {
        'service': 'WFS',
        'version': '2.0.0',
        'request': 'GetFeature',
        'typeName': 'matrikkelen_bygning',
        'outputFormat': 'application/json',
        'count': limit,
    }
    
    if municipality:
        params['cql_filter'] = f"kommunenummer='{municipality}'"
    
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        # Print basic building information
        for feature in data['features']:
            props = feature['properties']
            print(f"Building ID: {props.get('bygningsnr')}")
            print(f"Type: {props.get('bygningstype')}")
            print(f"Status: {props.get('bygningsstatus')}")
            print(f"Coordinates: {feature['geometry']['coordinates']}")
            print("-" * 40)
            
        return data
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        print(f"Attempted URL: {response.url if 'response' in locals() else BASE_URL}")
        return None

# Example usage
if __name__ == "__main__":
    # Fetch 5 buildings in Oslo (kommunenummer 0301)
    buildings_data = fetch_buildings(limit=5, municipality="0301")