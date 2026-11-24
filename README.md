# My ID Card — Tomorrow's Identity

"create your own little identity."

A playful, retro/scrapbook-style personal digital ID card generator.
Fill in info, upload a photo, pick a theme and symbol, flip the card, save
it to your collection, and download it as a PNG.

Note: this is a **fun/aesthetic identity card generator**, not an official
document — every card is labeled "FOR FUN ONLY · NOT AN OFFICIAL DOCUMENT".

## Structure
- `frontend/` — React + Vite + Tailwind + Framer Motion
- `backend/` — Flask + MySQL (PyMySQL) REST API

## Quick start

**Backend:**
```
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your MySQL credentials
mysql -u root -p < schema.sql
python app.py
```
Runs at `http://localhost:5000/api`.

**Frontend:**
```
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs at `http://localhost:5173`.

See `backend/README.md` for full API docs.
