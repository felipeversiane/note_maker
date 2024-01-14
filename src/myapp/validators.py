from django.core.exceptions import ValidationError
import re
from django.core.exceptions import ValidationError

def validate_first_letter(value):
    if value[0].isdigit():
        raise ValidationError({"message": "First letter cannot be a number."})

def validate_letters(value):
    if not re.match(r'^[A-Za-z ]+$', value):
        raise ValidationError({"message": "Only letters and spaces are allowed."})

def validate_value(value):
    if value <= 0:
        raise ValidationError({"message": "Only positive values are allowed."})

def validate_username(value):
    validate_first_letter(value)
    validate_letters(value)
    if not re.match(r'^[\w.@+-]+$', value):
        raise ValidationError({"message": "Enter a valid username."})