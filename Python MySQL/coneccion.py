#pip install mysql-connector-python
import mysql.connector
conexion= mysql.connector.connect(user="root", password="", host = "localhost", database="taller_de_desarrollo",port="3306")

print(conexion)

