const Base64StringToImage = (base64String) => {
    if (base64String && base64String.length > 0) {
        if(base64String.includes('base64,')) {
            return base64String; // The string is already in the correct format
        } else {
            // If base64String does not contain 'base64,', add the necessary prefix
            return `data:image/png;base64,${base64String}`;
        }
    }
    return ''; // Return an empty string if the input is null or empty
};
export default Base64StringToImage;