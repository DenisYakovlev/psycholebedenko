import requests
import pytz
from datetime import datetime
import base64
from django.conf import settings


# global utils of app


def aware_now():
    # returns current time with app timezone

    tz = pytz.timezone(settings.TIME_ZONE)
    now = datetime.now(tz=tz)

    return now

def generate_zoom_auth_token():
    # generate auth token with base64 encoding

    token_to_encode = f"{settings.ZOOM_CLIENT_ID}:{settings.ZOOM_CLIENT_SECRET}".encode()
    encoded_token = base64.b64encode(token_to_encode)

    auth_token = f"Basic {encoded_token.decode()}"

    return auth_token


def generate_zoom_access_key():
    # generate zoom acces key with zoom api
    # zoom meetings are used for handling appointments and events
    # more info: https://developers.zoom.us/docs/internal-apps/s2s-oauth/

    url = 'https://zoom.us/oauth/token'

    params = {
        "grant_type": "account_credentials",
        "account_id": settings.ZOOM_ACCOUNT_ID
    }

    auth_token = generate_zoom_auth_token()

    req = requests.post(url, params=params, headers= {
        "Authorization": auth_token
    })

    req.raise_for_status()
    data = req.json()

    return data["access_token"]
