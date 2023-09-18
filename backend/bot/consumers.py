import json
from channels.generic.websocket import WebsocketConsumer
from django.core.cache import cache
from asgiref.sync import async_to_sync


class PhoneVerificationConsumer(WebsocketConsumer):
    def tokenIsValid(self):
        try:
            confirmToken = cache.get(self.token)

            if confirmToken == None:
                return False
            
            return True
        except:
            return False

    def connect(self):
        self.token = self.scope["url_route"]["kwargs"]["token"]
        self.room_group_name = "phone_verification_%s" % self.token

        if not self.tokenIsValid():
            self.close()

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, 
            self.channel_name
        )

        print(self.token)
        self.accept()

        # send acception message
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'client_message',
                'message': {
                    "state": "connected"
                }
            }
        )

    def client_message(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'type':'client_message',
            'message': message
        }))