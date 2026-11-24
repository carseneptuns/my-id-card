# My ID Card — Backend (Flask + MySQL)

## Setup

1. Create a virtualenv and install deps:
   ```
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. Copy `.env.example` to `.env` and fill in your MySQL credentials.
3. Create the database:
   ```
   mysql -u root -p < schema.sql
   ```
4. Run the server:
   ```
   python app.py
   ```
   API runs at `http://localhost:5000/api`.

## Endpoints
- `GET /api/cards` — list all cards
- `GET /api/cards/<id>` — get one card
- `POST /api/cards` — create a card
- `PUT /api/cards/<id>` — update a card
- `DELETE /api/cards/<id>` — delete a card
- `POST /api/upload` — upload a photo (multipart field name: `photo`)
