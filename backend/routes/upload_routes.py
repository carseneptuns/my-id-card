import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from config import Config

upload_bp = Blueprint("upload", __name__)


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in Config.ALLOWED_EXTENSIONS
    )


@upload_bp.route("/upload", methods=["POST"])
def upload_image():
    try:
        if "photo" not in request.files:
            return jsonify({"success": False, "message": "No photo was sent."}), 400

        file = request.files["photo"]

        if file.filename == "":
            return jsonify({"success": False, "message": "No photo was selected."}), 400

        if not allowed_file(file.filename):
            return jsonify({"success": False, "message": "Please upload a JPG, PNG, or WEBP image."}), 400

        ext = secure_filename(file.filename).rsplit(".", 1)[1].lower()
        unique_name = f"{uuid.uuid4().hex}.{ext}"

        upload_folder = current_app.config["UPLOAD_FOLDER"]
        os.makedirs(upload_folder, exist_ok=True)
        filepath = os.path.join(upload_folder, unique_name)
        file.save(filepath)

        image_url = f"/uploads/{unique_name}"
        return jsonify({
            "success": True,
            "data": {"image_url": image_url},
            "message": "Photo uploaded successfully!",
        }), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Upload failed: {str(e)}"}), 500
