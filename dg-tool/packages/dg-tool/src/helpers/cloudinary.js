export const CLOUDINARY_PRESET_NAME =
  process.env.REACT_APP_CLOUDINARY_PRESET_NAME;
export const CLOUDINARY_RETRIEVE_URL =
  process.env.REACT_APP_CLOUDINARY_RETRIEVE_URL;
export const CLOUDINARY_UPLOAD_URL =
  process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

export function buildCloudinaryURL(filename, transforms) {
  // Build a Cloudinary URL from a filename and the list of transforms
  // supplied. Transforms should be specified as objects (e.g {a: 90} becomes
  // 'a_90').
  var i, name, transform, transformArgs, transformPaths, urlParts;

  // Convert the transforms to paths
  transformPaths = [];
  for (i = 0; i < transforms.length; i++) {
    transform = transforms[i];

    // Convert each of the object properties to a transform argument
    transformArgs = [];
    for (name in transform) {
      if (transform.hasOwnProperty(name)) {
        transformArgs.push(name + "_" + transform[name]);
      }
    }

    transformPaths.push(transformArgs.join(","));
  }

  // Build the URL
  urlParts = [CLOUDINARY_RETRIEVE_URL];
  if (transformPaths.length > 0) {
    urlParts.push(transformPaths.join("/"));
  }
  urlParts.push(filename);

  return urlParts.join("/");
}

export function parseCloudinaryURL(url) {
  // Parse a Cloudinary URL and return the filename and list of transforms
  var filename, i, j, transform, transformArgs, transforms, urlParts;

  // Strip the URL down to just the transforms, version (optional) and
  // filename.
  url = url.replace(CLOUDINARY_RETRIEVE_URL, "");

  // Split the remaining path into parts
  urlParts = url.split("/");

  // The path starts with a '/' so the first part will be empty and can be
  // discarded.
  urlParts.shift();

  // Extract the filename
  filename = urlParts.pop();

  // Strip any version number from the URL
  if (urlParts.length > 0 && urlParts[urlParts.length - 1].match(/v\d+/)) {
    urlParts.pop();
  }

  // Convert the remaining parts into transforms (e.g `w_90,h_90,c_fit >
  // {w: 90, h: 90, c: 'fit'}`).
  transforms = [];
  for (i = 0; i < urlParts.length; i++) {
    transformArgs = urlParts[i].split(",");
    transform = {};
    for (j = 0; j < transformArgs.length; j++) {
      transform[transformArgs[j].split("_")[0]] = transformArgs[j].split(
        "_"
      )[1];
    }
    transforms.push(transform);
  }

  return [filename, transforms];
}

const defaultHandler = {
  onStart: () => {},
  onProgress: () => {},
  onComplete: () => {},
  onError: () => {},
};

export function upload(file, handler = defaultHandler) {
  const xhrProgress = (ev) => {
    handler.onProgress((ev.loaded / ev.total) * 100);
  };

  const xhrComplete = (ev) => {
    var response;

    if (ev.target.readyState !== 4) return;

    if (parseInt(ev.target.status) === 200) {
      response = JSON.parse(ev.target.responseText);
      // Store the image details
      const image = {
        angle: 0,
        height: parseInt(response.height),
        maxWidth: parseInt(response.width),
        width: parseInt(response.width),
      };

      // Apply a draft size to the image for editing
      image.filename = parseCloudinaryURL(response.secure_url)[0];
      image.url = buildCloudinaryURL(image.filename, [
        { c: "fit", h: 600, w: 600 },
      ]);

      handler.onComplete(image);
    } else {
      handler.onError();
    }
  };

  handler.onStart();

  // Build the form data to post to the server
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET_NAME);

  // Make the request
  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", xhrProgress);
  xhr.addEventListener("readystatechange", xhrComplete);
  xhr.open("POST", CLOUDINARY_UPLOAD_URL, true);
  xhr.send(formData);
}

export function rotate(image, angle) {
  // Handle a request by the user to rotate the image
  var height, transforms, width;

  // Update the angle of the image
  image.angle += angle;

  // Stay within 0-360 degree range
  if (image.angle < 0) {
    image.angle += 360;
  } else if (image.angle > 270) {
    image.angle -= 360;
  }

  // Rotate the image's dimensions
  width = image.width;
  height = image.height;
  image.width = height;
  image.height = width;
  image.maxWidth = width;

  // Build the transform to rotate the image
  transforms = [{ c: "fit", h: 600, w: 600 }];
  if (image.angle > 0) {
    transforms.unshift({ a: image.angle });
  }

  // Build a URL for the transformed image
  image.url = buildCloudinaryURL(image.filename, transforms);

  // Update the image in the dialog
  return image;
}

export function crop(image, cropRegion) {
  // Handle a user saving an image
  var cropTransform, ratio, transforms;

  // Build a list of transforms
  transforms = [];

  // Angle
  if (image.angle !== 0) {
    transforms.push({ a: image.angle });
  }

  // Crop
  if (cropRegion.toString() !== [0, 0, 1, 1].toString()) {
    cropTransform = {
      c: "crop",
      x: parseInt(image.width * cropRegion[1]),
      y: parseInt(image.height * cropRegion[0]),
      w: parseInt(image.width * (cropRegion[3] - cropRegion[1])),
      h: parseInt(image.height * (cropRegion[2] - cropRegion[0])),
    };
    transforms.push(cropTransform);

    // Update the image size based on the crop
    image.width = cropTransform.w;
    image.height = cropTransform.h;
    image.maxWidth = cropTransform.w;
  }

  // Resize (the image is inserted in the page at a default size)
  if (image.width > 400 || image.height > 400) {
    transforms.push({ c: "fit", w: 400, h: 400 });

    // Update the size of the image in-line with the resize
    ratio = Math.min(400 / image.width, 400 / image.height);
    image.width *= ratio;
    image.height *= ratio;
  }

  // Build a URL for the image we'll insert
  image.url = buildCloudinaryURL(image.filename, transforms);

  // Build attributes for the image
  // imageAttrs = { 'alt': '', 'data-ce-max-width': image.maxWidth };

  return image;
}

export function handleTaint(element) {
  var args, filename, transforms, url;

  // Check the element tainted is an image
  if (element.type() !== "Image") {
    return;
  }

  // Parse the existing URL
  args = parseCloudinaryURL(element.attr("src"));
  filename = args[0];
  transforms = args[1];

  // If no filename is found then exit (not a Cloudinary image)
  if (!filename) {
    return;
  }

  // Remove any existing resize transform
  if (
    transforms.length > 0 &&
    transforms[transforms.length - 1]["c"] === "fit"
  ) {
    transforms.pop();
  }

  // Change the resize transform for the element
  transforms.push({ c: "fit", w: element.size()[0], h: element.size()[1] });
  url = buildCloudinaryURL(filename, transforms);

  if (url !== element.attr("src")) {
    element.attr("src", url);
  }
}
