from django.shortcuts import render


# Create your views here.
# views.py
@api_view(['POST'])
def crear_producto(request):
    serializer = ProductoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        print("Errores del serializer:", serializer.errors)
        return Response(serializer.errors, status=400)