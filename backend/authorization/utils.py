import json
import hmac
import requests
from hashlib import sha256


def confirmTelegramHash(data, secret_key):
    user_hash = data.pop("hash")
    secret_key = sha256(secret_key.encode('utf-8'))
    sorted_user_data = json.loads(json.dumps(data, sort_keys=True))
    
    # data check string values must be separeted by new line
    data_check_string = '\\n'.join([f"{key}={value}" for key, value in sorted_user_data.items()])
    
    # generate hash
    decoded_string = data_check_string.encode('utf-8').decode('unicode-escape').encode('ISO-8859-1')
    data_check_hash = hmac.new(secret_key.digest(), decoded_string, sha256).hexdigest()
    
    return data_check_hash == user_hash

def validateIMGURL(url):
    req = requests.get(url)
    return req.ok
    