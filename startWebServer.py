from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
import os
import re

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
                self.wfile.write(str(sorted(os.listdir(path))).encode())
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
