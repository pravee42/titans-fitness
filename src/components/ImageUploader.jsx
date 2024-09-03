import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function ImageUploader() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageUploaded(false);
  };

  return (
    <div className="flex items-center justify-center w-32 h-32 mb-5 relative">
      {imagePreview ? (
        <div className="w-full h-full relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full rounded-lg object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 rounded-full text-white p-1"
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">+</span>
            </p>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-green-600">Add Image</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
      {imageUploaded && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="absolute top-0 right-0 text-green-500"
        />
      )}
    </div>
  );
}

export default ImageUploader;
