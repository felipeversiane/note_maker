from django.core.exceptions import ValidationError
import re
from django.core.exceptions import ValidationError


def validate_first_letter(str):    
    if str[0].isdigit():        
        raise ValidationError("Primeira letra nao pode ser um numero.")

def validate_letters(name):    
    if not re.match(r'^[A-Za-z ]+$', name):      
        raise ValidationError(_("Somente letras e espaços permitidos."))

def validate_value(value):
    if value <= 0:
        raise ValidationError(_("Somente valores positivos."))
        
