from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # enable CORS on all routes

@app.route("/")
def Hello_world():
    return "hello, wolrd"

@app.route("/api/users")
def get_users():
    return{
        "users":[
            { 
              "id": 1,
              "name": "manuel",
              "lastname": "zarate"
            },
            {
              "id": 2,
              "name": "sandra",
              "lastname": "Beltran"    
            },
            {
                "id":3,
                "name":"gaby",
                "lastname": "niño"     
            },
            {
                "id": 4,
                "name": "vale",
                "lastname": "zarate"   
            },
            {
                "id": 5,
                "name": "alejadro",
                "lastname": "zarate"   
            } 
            ]
    }
    
@app.route("/api/fruits")
def get_fruits():
    return{
        "users":["apple", "banana", "watermelon", "estamberry", "pineaple"]
    }    

if __name__ == "__main__":
    app.run(debug=True)