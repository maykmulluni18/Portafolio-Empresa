import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Modal from '../../components/Modal';
import { companyService, companySocialService, companyTimelineService } from '../../api/services';

const emptyCompany = { name: '', description: '', mission: '', vision: '', history: '', email: '', phone: '', website: '', address: '', logo: '' };
const emptySocial  = { company_id: '', platform: '', url: '' };
const emptyTimeline = { company_id: '', title: '', description: '', event_date: '', image: '' };

function FormField({ label, name, value, onChange, type = 'text', textarea }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea name={name} value={value || ''} onChange={onChange} rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
      ) : (
        <input type={type} name={name} value={value || ''} onChange={onChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
      )}
    </div>
  );
}

export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [socials, setSocials]     = useState([]);
  const [timelines, setTimelines] = useState([]);
  const [selected, setSelected]   = useState(null);
  const [modal, setModal]         = useState(null);
  const [form, setForm]           = useState({});

  const load = async () => {
    const [c] = await Promise.all([companyService.getAll()]);
    setCompanies(c.data);
  };

  useEffect(() => { load(); }, []);

  const selectCompany = async (c) => {
    setSelected(c);
    const [s, t] = await Promise.all([
      companySocialService.getAll({ company_id: c.id }),
      companyTimelineService.getAll({ company_id: c.id }),
    ]);
    setSocials(s.data);
    setTimelines(t.data);
  };

  const openModal = (type, data = {}) => { setModal(type); setForm(data); };
  const closeModal = () => { setModal(null); setForm({}); };
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const saveCompany = async () => {
    if (form.id) await companyService.update(form.id, form);
    else await companyService.create(form);
    await load();
    closeModal();
  };

  const deleteCompany = async (c) => {
    if (!confirm(`¿Eliminar ${c.name}?`)) return;
    await companyService.destroy(c.id);
    if (selected?.id === c.id) setSelected(null);
    await load();
  };

  const saveSocial = async () => {
    if (form.id) await companySocialService.update(form.id, form);
    else await companySocialService.create({ ...form, company_id: selected.id });
    const s = await companySocialService.getAll({ company_id: selected.id });
    setSocials(s.data);
    closeModal();
  };

  const deleteSocial = async (s) => {
    if (!confirm('¿Eliminar?')) return;
    await companySocialService.destroy(s.id);
    setSocials((prev) => prev.filter((x) => x.id !== s.id));
  };

  const saveTimeline = async () => {
    if (form.id) await companyTimelineService.update(form.id, form);
    else await companyTimelineService.create({ ...form, company_id: selected.id });
    const t = await companyTimelineService.getAll({ company_id: selected.id });
    setTimelines(t.data);
    closeModal();
  };

  const deleteTimeline = async (t) => {
    if (!confirm('¿Eliminar?')) return;
    await companyTimelineService.destroy(t.id);
    setTimelines((prev) => prev.filter((x) => x.id !== t.id));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1e2730]">Empresa</h1>
        <button onClick={() => openModal('company', emptyCompany)}
          className="px-4 py-2 bg-[#ea5959] text-white rounded-xl text-sm font-semibold hover:bg-[#d94848]">
          + Nueva empresa
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {companies.map((c) => (
          <div key={c.id}
            onClick={() => selectCompany(c)}
            className={`cursor-pointer bg-white rounded-2xl p-5 border-2 shadow-sm transition-all ${selected?.id === c.id ? 'border-[#ea5959]' : 'border-transparent hover:border-gray-200'}`}>
            <h3 className="font-bold text-[#1e2730] mb-1">{c.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{c.description}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={(e) => { e.stopPropagation(); openModal('company', c); }}
                className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-lg font-semibold">Editar</button>
              <button onClick={(e) => { e.stopPropagation(); deleteCompany(c); }}
                className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-lg font-semibold">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Socials */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#1e2730]">Redes Sociales</h2>
              <button onClick={() => openModal('social', emptySocial)}
                className="text-xs px-3 py-1.5 bg-[#ea5959] text-white rounded-lg font-semibold">+ Agregar</button>
            </div>
            {socials.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <span className="text-sm font-semibold text-[#1e2730]">{s.platform}</span>
                  <p className="text-xs text-gray-400 truncate max-w-48">{s.url}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('social', s)} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">Editar</button>
                  <button onClick={() => deleteSocial(s)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-lg">X</button>
                </div>
              </div>
            ))}
          </div>

          {/* Timelines */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#1e2730]">Historia / Timeline</h2>
              <button onClick={() => openModal('timeline', emptyTimeline)}
                className="text-xs px-3 py-1.5 bg-[#ea5959] text-white rounded-lg font-semibold">+ Agregar</button>
            </div>
            {timelines.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <span className="text-sm font-semibold text-[#1e2730]">{t.title}</span>
                  <p className="text-xs text-gray-400">{t.event_date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('timeline', t)} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">Editar</button>
                  <button onClick={() => deleteTimeline(t)} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-lg">X</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Company modal */}
      {modal === 'company' && (
        <Modal title={form.id ? 'Editar Empresa' : 'Nueva Empresa'} onClose={closeModal}>
          <FormField label="Nombre *" name="name" value={form.name} onChange={handleChange} />
          <FormField label="Descripción" name="description" value={form.description} onChange={handleChange} textarea />
          <FormField label="Misión" name="mission" value={form.mission} onChange={handleChange} textarea />
          <FormField label="Visión" name="vision" value={form.vision} onChange={handleChange} textarea />
          <FormField label="Historia" name="history" value={form.history} onChange={handleChange} textarea />
          <FormField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
          <FormField label="Teléfono" name="phone" value={form.phone} onChange={handleChange} />
          <FormField label="Sitio Web" name="website" value={form.website} onChange={handleChange} />
          <FormField label="Dirección" name="address" value={form.address} onChange={handleChange} />
          <FormField label="Logo (URL)" name="logo" value={form.logo} onChange={handleChange} />
          <button onClick={saveCompany} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">
            Guardar
          </button>
        </Modal>
      )}

      {/* Social modal */}
      {modal === 'social' && (
        <Modal title={form.id ? 'Editar Red Social' : 'Nueva Red Social'} onClose={closeModal}>
          <FormField label="Plataforma *" name="platform" value={form.platform} onChange={handleChange} />
          <FormField label="URL *" name="url" value={form.url} onChange={handleChange} />
          <button onClick={saveSocial} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">
            Guardar
          </button>
        </Modal>
      )}

      {/* Timeline modal */}
      {modal === 'timeline' && (
        <Modal title={form.id ? 'Editar Evento' : 'Nuevo Evento'} onClose={closeModal}>
          <FormField label="Título *" name="title" value={form.title} onChange={handleChange} />
          <FormField label="Descripción" name="description" value={form.description} onChange={handleChange} textarea />
          <FormField label="Fecha *" name="event_date" value={form.event_date} onChange={handleChange} type="date" />
          <FormField label="Imagen (URL)" name="image" value={form.image} onChange={handleChange} />
          <button onClick={saveTimeline} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">
            Guardar
          </button>
        </Modal>
      )}
    </AdminLayout>
  );
}
