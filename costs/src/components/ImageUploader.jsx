import React, { useState } from "react";
import { uploadImageToCloudinary } from "../utils/uploadCloudinary";

export default function ImageUploader({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  function onPick(e) {
    const arr = Array.from(e.target.files || []);
    setFiles(arr);
    setPreviews(arr.map(f => URL.createObjectURL(f)));
  }

  async function handleUpload() {
    setLoading(true);
    try {
      const urls = [];
      for (const f of files) {
        const url = await uploadImageToCloudinary(f);
        urls.push({ url_imagem: url, descricao_alt: f.name });
      }
      onUploaded(urls); // [{url_imagem, descricao_alt}]
    } catch (e) {
      alert(e.message || "Erro ao subir imagens");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={onPick} />
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:8}}>
        {previews.map((src,i)=>(
          <img key={i} src={src} alt={`preview-${i}`} style={{width:"100%",borderRadius:8}}/>
        ))}
      </div>
      <button type="button" onClick={handleUpload} disabled={!files.length || loading} style={{marginTop:8}}>
        {loading ? "Enviando..." : "Enviar imagens"}
      </button>
    </div>
  );
}

