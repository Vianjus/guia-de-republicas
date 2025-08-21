export async function uploadImageToCloudinary(file) {
  const cloud = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.REACT_APP_CLOUDINARY_UNSIGNED_PRESET;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);

  const url = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;

  const res = await fetch(url, { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Upload falhou");

  return json.secure_url;
}


