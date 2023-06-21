import datetime
from rest_framework import serializers
from .models import Event, Participation

class EventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Event
        fields = '__all__'


class EventListSerializer(serializers.ModelSerializer):
    participants_count = serializers.SerializerMethodField('get_participants_count')
    outdated = serializers.SerializerMethodField('get_outdated')
    participated = serializers.SerializerMethodField('get_participated')
    
    class Meta:
        model = Event
        fields = ['created', 'title', 'thumbnail_text', 'appointed', 'participants_count', 'outdated', 'participated']
        
    def get_participants_count(self, obj):
        return obj.participants.all().count()
    
    def get_outdated(self, obj):
        # change to timestamp
        return obj.appointed < datetime.date.today()
    
    def get_participated(self, obj):
        try:
            user = self.context["request"].user
            return Participation.objects.filter(user=user.id, event=obj.id).exists()
        except KeyError:
            return False
        
        
class EventDetailSerializer(EventListSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['main_text'] = serializers.CharField()
    
    
class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = ['user', 'event']