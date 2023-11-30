from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

DB_HOST = '127.0.0.1'
DB_PORT = '5432'
DB_NAME = 'postgres'
DB_USER = 'postgres'
DB_PASSWORD = '1234'

conn = psycopg2.connect(
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)
cursor = conn.cursor()

@app.route('/create_donor', methods=['POST'])
def create_donor():
    data = request.json

    name = data.get('name')
    birth_year = data.get('birth_year')
    cellphone = data.get('cellphone')
    address = data.get('address')
    email = data.get('email')
    blood_type = data.get('blood_type')
    weight = data.get('weight')
    height = data.get('height')

    if not name or not birth_year or not cellphone or not address or not email or not blood_type or not weight or not height:
        return jsonify({'error': 'Missing required fields'}), 400

    cursor.execute('INSERT INTO donor (name, birth_year, cellphone, address, email, blood_type, weight, height) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id', (name, birth_year, cellphone, address, email, blood_type, weight, height))
    donor_id = cursor.fetchone()[0]
    conn.commit()

    return jsonify({'message': 'Donor created successfully', 'donor_id': donor_id}), 201

@app.route('/create_contact', methods=['POST'])
def create_contact():
    data = request.json

    name = data.get('name')
    birth_year = data.get('birth_year')
    cellphone = data.get('cellphone')
    email = data.get('email')
    message = data.get('message')

    if not name or not birth_year or not cellphone or not email or not message:
        return jsonify({'error': 'Missing required fields'}), 400

    cursor.execute('INSERT INTO contact (name, birth_year, cellphone, email, message) VALUES (%s, %s, %s, %s, %s) RETURNING id', (name, birth_year, cellphone, email, message))
    contact_id = cursor.fetchone()[0]
    conn.commit()

    return jsonify({'message': 'Contact created successfully', 'contact_id': contact_id}), 201

if __name__ == '__main__':
    app.run(debug=True)
