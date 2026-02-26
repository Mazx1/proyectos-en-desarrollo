from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.FloatField()
    description = models.TextField()
    created = models.DateField(auto_now_add=True)
    upload = models.DateTimeField(auto_now=True)
    
    def _str_(self):
        return self.nombre