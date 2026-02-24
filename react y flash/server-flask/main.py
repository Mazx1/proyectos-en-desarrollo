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
        "users":["manue", "sandra", "gaby", "vale", "alejandro"]
    }
    
@app.route("/api/fruits")
def get_fruits():
    return{
        "users":["apple", "banana", "watermelon", "estamberry", "pineaple"]
    }    

if __name__ == "__main__":
    app.run(debug=True)