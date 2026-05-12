import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import Modal from '../../components/Modal';
import { projectService, projectImageService, companyService, clientService } from '../../api/services';

const empty = { company_id: '', client_id: '', title: '', description: '', status: 'planning', visibility: 'private', budget: '', start_date: '', end_date: '' };
const emptyImage = { image_url: '' };

function ImagePreviewCard({ src, label, onRemove, removeLabel = 'Quitar' }) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [src]);

  return (
    <div className="flex gap-3 rounded-xl border border-gray-100 bg-white p-3">
      <div className="h-20 w-20 flex-none overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        {src && !broken ? (
          <img
            src={src}
          //  alt={title || 'Imagen'}
            className="h-full w-full object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-gray-400">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4-4a2 2 0 012.8 0L15 16m-1-1l2-2a2 2 0 012.8 0L20 14m-8-6h.01M7 20h10a3 3 0 003-3V7a3 3 0 00-3-3H7a3 3 0 00-3 3v10a3 3 0 003 3z" />
            </svg>
            <span className="text-[10px] font-semibold uppercase tracking-wide">No hay imagen</span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500">{src && !broken ? (label || 'Imagen lista') : 'No hay imagen'}</p>

        <button
          onClick={onRemove}
          className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
        >
          {removeLabel}
        </button>
      </div>
    </div>
  );
}

const statusColors = { planning: 'bg-yellow-100 text-yellow-700', in_progress: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', on_hold: 'bg-gray-100 text-gray-700', cancelled: 'bg-red-100 text-red-700' };

export default function ProjectsPage() {
  const [data, setData]         = useState([]);
  const [companies, setCompanies] = useState([]);
  const [clients, setClients]   = useState([]);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(empty);
  const [imageModal, setImageModal] = useState(false);
  const [imageForm, setImageForm] = useState(emptyImage);
  const [imageFile, setImageFile] = useState(null);
  const [imageFilePreview, setImageFilePreview] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [pendingUrls, setPendingUrls] = useState([]);
  const [pendingUrlInput, setPendingUrlInput] = useState('');
  const [imageFilePreviews, setImageFilePreviews] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const previews = imageFiles.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    setImageFilePreviews(previews);

    return () => {
      previews.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
    };
  }, [imageFiles]);

  useEffect(() => {
    if (!imageFile) {
      setImageFilePreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImageFilePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  const load = async () => {
    setLoading(true);
    const [p, c, cl] = await Promise.all([projectService.getAll(), companyService.getAll(), clientService.getAll()]);
    setData(p.data);
    setCompanies(c.data);
    setClients(cl.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleImageChange = (e) => setImageForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const openAdd  = ()    => { setForm(empty); setModal(true); };
  const openEdit = (row) => { setForm(row);   setModal(true); };
  const closeModal = ()  => { setModal(false); setForm(empty); };

  const openImages = async (project) => {
    setSelectedProject(project);
    setImageForm(emptyImage);
    setImageFile(null);
    setImageFiles([]);
    setPendingUrls([]);
    setPendingUrlInput('');
    setImageModal(true);
    setImageLoading(true);

    try {
      const response = await projectImageService.getAll({ project_id: project.id });
      setProjectImages(response.data);
    } finally {
      setImageLoading(false);
    }
  };

  const closeImageModal = () => {
    setImageModal(false);
    setSelectedProject(null);
    setImageForm(emptyImage);
    setImageFile(null);
    setImageFiles([]);
    setPendingUrls([]);
    setPendingUrlInput('');
    setProjectImages([]);
  };

  const addPendingUrl = () => {
    const value = pendingUrlInput.trim();
    if (!value) return;

    setPendingUrls((prev) => [...prev, value]);
    setPendingUrlInput('');
  };

  const removePendingUrl = (index) => {
    setPendingUrls((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const removePendingFile = (index) => {
    setImageFiles((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const pendingCount = pendingUrls.length + imageFilePreviews.length + (imageForm.id && (imageForm.image_url || imageFile) ? 1 : 0);

  const saveImage = async () => {
    if (!selectedProject) return;

    const hasFile = Boolean(imageFile);
    const hasUrl = Boolean(imageForm.image_url);
    const extraUrls = pendingUrls;
    const hasBatchFiles = imageFiles.length > 0;

    if (!hasFile && !hasUrl && extraUrls.length === 0 && !hasBatchFiles) return;

    const payload = hasFile || hasBatchFiles || extraUrls.length > 0
      ? (() => {
          const formData = new FormData();
          formData.append('project_id', selectedProject.id);
          if (hasFile) {
            formData.append('image_file', imageFile);
          }
          imageFiles.forEach((file) => formData.append('image_files[]', file));
          extraUrls.forEach((url) => formData.append('image_urls[]', url));
          return formData;
        })()
      : {
          project_id: selectedProject.id,
          image_url: imageForm.image_url,
        };

    if (imageForm.id) await projectImageService.update(imageForm.id, payload);
    else await projectImageService.create(payload);

    const response = await projectImageService.getAll({ project_id: selectedProject.id });
    setProjectImages(response.data);
    setImageForm(emptyImage);
    setImageFile(null);
    setImageFiles([]);
    setPendingUrls([]);
    setPendingUrlInput('');
  };

  const editImage = (image) => {
    setImageForm(image);
    setImageFile(null);
    setImageFiles([]);
    setPendingUrls([]);
    setPendingUrlInput('');
  };

  const deleteImage = async (image) => {
    if (!confirm('¿Eliminar esta imagen?')) return;
    await projectImageService.destroy(image.id);
    setProjectImages((prev) => prev.filter((item) => item.id !== image.id));
  };

  const save = async () => {
    if (form.id) await projectService.update(form.id, form);
    else await projectService.create(form);
    await load();
    closeModal();
  };

  const remove = async (row) => {
    if (!confirm(`¿Eliminar "${row.title}"?`)) return;
    await projectService.destroy(row.id);
    await load();
  };

  const columns = [
    { key: 'title',   label: 'Título' },
    { key: 'company', label: 'Empresa', render: (_, r) => r.company?.name ?? '-' },
    { key: 'status',  label: 'Estado',  render: (v) => <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[v] ?? ''}`}>{v}</span> },
    { key: 'visibility', label: 'Visibilidad' },
    { key: 'budget',  label: 'Presupuesto', render: (v) => v ? `$${v}` : '-' },
  ];

  return (
    <AdminLayout>
      <CrudTable title="Proyectos" columns={columns} data={data} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={remove} onManageImages={openImages} />

      {modal && (
        <Modal title={form.id ? 'Editar Proyecto' : 'Nuevo Proyecto'} onClose={closeModal}>
          {[['Empresa *', 'company_id', companies, 'select'], ['Cliente', 'client_id', clients, 'select']].map(([label, name, opts, type]) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <select name={name} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]">
                <option value="">Seleccionar...</option>
                {opts.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          ))}
          {[['Título *', 'title'], ['Descripción', 'description'], ['Presupuesto', 'budget', 'number'], ['Inicio', 'start_date', 'date'], ['Fin', 'end_date', 'date']].map(([label, name, type]) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type={type || 'text'} name={name} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
            </div>
          ))}
          {[['Estado', 'status', ['planning','in_progress','completed','on_hold','cancelled']], ['Visibilidad', 'visibility', ['public','private']]].map(([label, name, opts]) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <select name={name} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]">
                {opts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button onClick={save} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">Guardar</button>
        </Modal>
      )}

      {imageModal && selectedProject && (
        <Modal title={`Imágenes de ${selectedProject.title}`} onClose={closeImageModal} size="xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-[#1e2730]">Imágenes subidas</h4>
                  <p className="text-xs text-gray-400 mt-1">Estas imágenes ya están guardadas en el proyecto.</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">{projectImages.length}</span>
              </div>

              {imageLoading ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-sm text-gray-400 text-center">Cargando imágenes...</div>
              ) : projectImages.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-8 text-sm text-gray-400 text-center">Todavía no hay imágenes cargadas.</div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {projectImages.map((image) => (
                    <ImagePreviewCard
                      key={`uploaded-${image.id}`}
                      src={image.image_url}
                      label={`Imagen ${image.id}`}
                      onRemove={() => deleteImage(image)}
                      removeLabel="Quitar"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
                {imageForm.id ? (
                  <>
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#1e2730]">Editar imagen</h4>
                      <p className="text-xs text-gray-400 mt-1">Puedes cambiar la URL o reemplazarla por un archivo nuevo.</p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">URL de imagen</label>
                      <input
                        type="url"
                        name="image_url"
                        value={imageForm.image_url || ''}
                        onChange={handleImageChange}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Reemplazar por archivo</label>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                        className="w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-200 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-300"
                      />
                    </div>

                    <button
                      onClick={saveImage}
                      disabled={!imageForm.image_url && !imageFile}
                      className="w-full py-3 bg-[#ea5959] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold"
                    >
                      Guardar cambios
                    </button>
                    <button
                      onClick={() => setImageForm(emptyImage)}
                      className="w-full py-3 mt-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-white transition-colors"
                    >
                      Cancelar edición
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#1e2730]">Agregar varias imágenes</h4>
                      <p className="text-xs text-gray-400 mt-1">Agrega URLs o selecciona varios archivos para enviarlos juntos.</p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Agregar URL</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={pendingUrlInput}
                          onChange={(e) => setPendingUrlInput(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]"
                        />
                        <button
                          type="button"
                          onClick={addPendingUrl}
                          className="px-4 py-2 rounded-xl bg-[#ea5959] text-white text-sm font-semibold"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Seleccionar varios archivos</label>
                      <input
                        type="file"
                        multiple
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
                        className="w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-200 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-300"
                      />
                    </div>

                    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-400 text-center mb-4">
                      Las imágenes seleccionadas aparecerán en el panel de abajo.
                    </div>

                    <button
                      onClick={saveImage}
                      disabled={pendingUrls.length === 0 && imageFiles.length === 0}
                      className="w-full py-3 bg-[#ea5959] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold"
                    >
                      Guardar todo
                    </button>
                  </>
                )}
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-[#1e2730]">Pendientes por guardar</h4>
                    <p className="text-xs text-gray-400 mt-1">Revisa aquí lo que todavía no se ha enviado.</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">{pendingCount}</span>
                </div>

                {pendingCount === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-200 p-8 text-sm text-gray-400 text-center">Selecciona imágenes o agrega URLs para verlas aquí antes de guardar.</div>
                ) : (
                  <div className="space-y-3 max-h-[32vh] overflow-y-auto pr-1">
                    {imageForm.id && (imageForm.image_url || imageFile) && (
                      <ImagePreviewCard
                        key="edit-preview"
                        src={imageFilePreview || imageForm.image_url}
                        label="Cambio pendiente"
                        onRemove={() => {
                          setImageFile(null);
                          setImageForm(emptyImage);
                        }}
                        removeLabel="Quitar"
                      />
                    )}

                    {!imageForm.id && pendingUrls.map((url, index) => (
                      <ImagePreviewCard
                        key={`${url}-${index}`}
                        src={url}
                        label={`URL pendiente ${index + 1}`}
                        onRemove={() => removePendingUrl(index)}
                        removeLabel="Quitar"
                      />
                    ))}

                    {!imageForm.id && imageFilePreviews.map(({ file, previewUrl }, index) => (
                      <ImagePreviewCard
                        key={`${file.name}-${file.lastModified}`}
                        src={previewUrl}
                        label={`Archivo pendiente ${index + 1}`}
                        onRemove={() => removePendingFile(index)}
                        removeLabel="Quitar"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
