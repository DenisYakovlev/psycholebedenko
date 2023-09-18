import json
from urllib.parse import unquote 
import hmac
import requests
import hashlib
from hashlib import sha256
from django.conf import settings


def confirmTelegramWidgetHash(data, secret_key):
    user_hash = data.pop("hash")
    secret_key = sha256(secret_key.encode('utf-8'))
    sorted_user_data = json.loads(json.dumps(data, sort_keys=True))
    
    # data check string values must be separeted by new line
    data_check_string = '\\n'.join([f"{key}={value}" for key, value in sorted_user_data.items()])
    
    # generate hash
    decoded_string = data_check_string.encode('utf-8').decode('unicode-escape').encode('ISO-8859-1')
    data_check_hash = hmac.new(secret_key.digest(), decoded_string, sha256).hexdigest()
    
    return data_check_hash == user_hash

def validateBotAppHash(hash_str, init_data, token, c_str="WebAppData"):
    """
    Validates the data received from the Telegram web app, using the
    method documented here: 
    https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app

    hash_str - the has string passed by the webapp
    init_data - the query string passed by the webapp
    token - Telegram bot's token
    c_str - constant string (default = "WebAppData")
    """

    init_data = sorted([ chunk.split("=") 
          for chunk in unquote(init_data).split("&") 
            if chunk[:len("hash=")]!="hash="],
        key=lambda x: x[0])
    init_data = "\n".join([f"{rec[0]}={rec[1]}" for rec in init_data])

    secret_key = hmac.new(c_str.encode(), token.encode(),
        hashlib.sha256 ).digest()
    data_check = hmac.new( secret_key, init_data.encode(),
        hashlib.sha256)

    return data_check.hexdigest() == hash_str

def confirmTelegramBotAppHash(initData: str, secret_key: str):
    init_hash_idx = initData.find("hash=") + len("hash=")
    init_hash = initData[init_hash_idx:]

    return validateBotAppHash(init_hash, initData, secret_key)


def validateIMGURL(url):
    req = requests.get(url)
    return req.ok
    

def generatePhoneVerificationTokens(user_id, auth_date):
    secret_key = settings.TELEGRAM_BOT_API_KEY
    string_to_encode = str(user_id) + " " + str(auth_date)

    wsToken = hmac.new(secret_key.encode(), string_to_encode.encode(), hashlib.sha256).hexdigest()
    confirmToken = hmac.new(secret_key.encode(), wsToken.encode(), hashlib.sha256).hexdigest()
    return wsToken, confirmToken