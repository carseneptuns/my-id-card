import random
from database.connection import get_connection


def generate_card_number(cursor):
    """Generate a unique XXX-XXX-XXXX style card number (not a real ID format)."""
    while True:
        number = f"{random.randint(0, 999):03d}-{random.randint(0, 999):03d}-{random.randint(0, 9999):04d}"
        cursor.execute("SELECT id FROM id_cards WHERE card_number = %s", (number,))
        if cursor.fetchone() is None:
            return number


def row_to_dict(row):
    if not row:
        return None
    if row.get("birthday") is not None:
        row["birthday"] = str(row["birthday"])
    if row.get("created_at") is not None:
        row["created_at"] = str(row["created_at"])
    if row.get("updated_at") is not None:
        row["updated_at"] = str(row["updated_at"])
    return row


def get_all_cards():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM id_cards ORDER BY created_at DESC")
            rows = cur.fetchall()
            return [row_to_dict(r) for r in rows]
    finally:
        conn.close()


def get_card_by_id(card_id):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM id_cards WHERE id = %s", (card_id,))
            return row_to_dict(cur.fetchone())
    finally:
        conn.close()


FIELDS = [
    "given_name", "nickname", "age", "pronouns", "species", "birthday",
    "favorite_things", "short_bio", "image_url", "theme",
    "primary_color", "secondary_color", "accent_color",
    "decoration", "personal_symbol", "photo_frame",
]


def create_card(data):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            card_number = generate_card_number(cur)
            values = [data.get(f) or None for f in FIELDS]
            columns = ", ".join(FIELDS + ["card_number"])
            placeholders = ", ".join(["%s"] * (len(FIELDS) + 1))
            cur.execute(
                f"INSERT INTO id_cards ({columns}) VALUES ({placeholders})",
                values + [card_number],
            )
            conn.commit()
            new_id = cur.lastrowid
            cur.execute("SELECT * FROM id_cards WHERE id = %s", (new_id,))
            return row_to_dict(cur.fetchone())
    finally:
        conn.close()


def update_card(card_id, data):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            set_clause = ", ".join([f"{f} = %s" for f in FIELDS])
            values = [data.get(f) or None for f in FIELDS]
            cur.execute(
                f"UPDATE id_cards SET {set_clause} WHERE id = %s",
                values + [card_id],
            )
            conn.commit()
            cur.execute("SELECT * FROM id_cards WHERE id = %s", (card_id,))
            return row_to_dict(cur.fetchone())
    finally:
        conn.close()


def delete_card(card_id):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM id_cards WHERE id = %s", (card_id,))
            existing = cur.fetchone()
            if not existing:
                return False
            cur.execute("DELETE FROM id_cards WHERE id = %s", (card_id,))
            conn.commit()
            return True
    finally:
        conn.close()
