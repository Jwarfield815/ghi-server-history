# This file is not used to run the web server in production, it is only for local testing purposes
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
import os
import re

# if you want to access the website from other devices on your local network, you'll have to change HOST to your local IP adress
HOST = "localhost"
PORT = 3000

class MyHttp(SimpleHTTPRequestHandler):
    def do_GET(self):
        try:
            path = os.getcwd() + self.path
            contentType = ""
            if self.path.endswith(".json"):
                contentType = "application/json"
            elif self.path.endswith(".prbm"):
                contentType = "application/octet-stream"

            if re.search("\\/maps\\/.+\\/textures.json$|.+\\.prbm$", self.path):
                print(self.headers)
                with open(path + ".gz", 'rb') as f:
                    data = f.read()
                self.send_response(200)
                self.send_header("Content-Encoding", "gzip")
                self.send_header("Content-Type", contentType)
                self.end_headers()
                self.wfile.write(data)
            elif self.path.endswith("/images"):
                self.send_response(200)
                self.end_headers()

                files = sorted(os.listdir(path))
                jsonFilesData = "["
                for (name) in files:
                    jsonFilesData += "{ \"name\": \"" + name + "\", \"type\":\"file\", \"mtime\": \"Tue, 10 Mar 2026 05:19:57 GMT\", \"size\":10620431 },"
                
                # remove trailing comma
                jsonFilesData = jsonFilesData[:-1]
                jsonFilesData += "]"

                self.wfile.write(str(jsonFilesData).encode())
            else:
                super().do_GET()
        except Exception as err:
            print("File " + self.path + " not found")
            print(err)
            self.send_response(204)

server = HTTPServer((HOST, PORT), MyHttp)
print ("Server now running...")

server.serve_forever()
server.server_close()
print("Server stopped!")
