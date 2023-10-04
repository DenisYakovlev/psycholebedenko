import hashlib
import pytz
from datetime import datetime
from django.conf import settings



def generateResultHash(user_id, score):
    # Hash length is divided by 2 because hexdigest() function
    # returns hash with given_length * 2

    HASH_LENGTH = 10

    # get current time of result generation with settings time zone

    tz = pytz.timezone(settings.TIME_ZONE)
    now = datetime.now(tz=tz)

    str_to_encode = "-".join(map(str, [user_id, now, score]))
    encoded_str = str_to_encode.encode()

    hash = hashlib.shake_256(encoded_str)
    return hash.hexdigest(HASH_LENGTH // 2)