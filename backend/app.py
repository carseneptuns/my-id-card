from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from config import Config
from routes.card_routes import card_bp
from routes.upload_routes import upload_bp
import os


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

    app.register_blueprint(card_bp, url_prefix="/api")
    app.register_blueprint(upload_bp, url_prefix="/api")

    @app.route("/uploads/<path:filename>")
    def uploaded_file(filename):
        return send_from_directory(Config.UPLOAD_FOLDER, filename)

    @app.route("/api/health")
    def health():
        return jsonify({"success": True, "message": "My ID Card API is alive ★"})

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"success": False, "message": "Route not found."}), 404

    @app.errorhandler(413)
    def too_large(e):
        return jsonify({"success": False, "message": "That photo is too big — 5MB max."}), 413

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"success": False, "message": "Something went wrong on our end."}), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=Config.FLASK_DEBUG, port=5000)
