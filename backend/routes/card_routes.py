from flask import Blueprint, request, jsonify
from models import card_model

card_bp = Blueprint("cards", __name__)


@card_bp.route("/cards", methods=["GET"])
def list_cards():
    try:
        cards = card_model.get_all_cards()
        return jsonify({"success": True, "data": cards}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Could not load cards: {str(e)}"}), 500


@card_bp.route("/cards/<int:card_id>", methods=["GET"])
def get_card(card_id):
    try:
        card = card_model.get_card_by_id(card_id)
        if not card:
            return jsonify({"success": False, "message": "This identity could not be found."}), 404
        return jsonify({"success": True, "data": card}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Something went wrong: {str(e)}"}), 500


@card_bp.route("/cards", methods=["POST"])
def create_card():
    try:
        data = request.get_json(force=True) or {}
        if not data.get("given_name") or not str(data.get("given_name")).strip():
            return jsonify({"success": False, "message": "Please tell us your name first!"}), 400
        if data.get("short_bio") and len(data["short_bio"]) > 150:
            return jsonify({"success": False, "message": "Short bio must be 150 characters or fewer."}), 400

        card = card_model.create_card(data)
        return jsonify({"success": True, "data": card, "message": "Your little identity has been saved. ★"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Oops! Something went wrong: {str(e)}"}), 500


@card_bp.route("/cards/<int:card_id>", methods=["PUT"])
def update_card(card_id):
    try:
        existing = card_model.get_card_by_id(card_id)
        if not existing:
            return jsonify({"success": False, "message": "This identity could not be found."}), 404

        data = request.get_json(force=True) or {}
        if not data.get("given_name") or not str(data.get("given_name")).strip():
            return jsonify({"success": False, "message": "Please tell us your name first!"}), 400
        if data.get("short_bio") and len(data["short_bio"]) > 150:
            return jsonify({"success": False, "message": "Short bio must be 150 characters or fewer."}), 400

        card = card_model.update_card(card_id, data)
        return jsonify({"success": True, "data": card, "message": "Identity updated!"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Oops! Something went wrong: {str(e)}"}), 500


@card_bp.route("/cards/<int:card_id>", methods=["DELETE"])
def delete_card(card_id):
    try:
        deleted = card_model.delete_card(card_id)
        if not deleted:
            return jsonify({"success": False, "message": "This identity could not be found."}), 404
        return jsonify({"success": True, "message": "Identity deleted."}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Oops! Something went wrong: {str(e)}"}), 500
