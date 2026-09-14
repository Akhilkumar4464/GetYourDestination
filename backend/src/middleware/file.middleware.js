import multer from "multer";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype) || !file.mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"), false);
    }
  }
});

// Resilient middleware that handles non-multipart and multer errors safely
export const safeUploadSingle = (fieldName) => (req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("multipart/form-data")) {
    return next();
  }

  upload.single(fieldName)(req, res, (err) => {
    if (err) {
      console.warn("File upload warning:", err.message);
      if (err.name === "MulterError" || err.message?.includes("allowed")) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }
      // If boundary issue or stream error, continue without file rather than throwing 500
      req.file = undefined;
    }
    next();
  });
};