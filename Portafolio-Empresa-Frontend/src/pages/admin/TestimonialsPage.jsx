import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import Modal from '../../components/Modal';
import { testimonialService, companyService } from '../../api/services';

const empty = { company_id: '', client_name: '', content: '', rating: 5 };

export default function TestimonialsPage() {
  const [data, setData]         = useState([]);
  const [companies, setCompanies] = useState([]);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(empty);
  const [loading, setLoading]   = useState(true);

  const load = async () => {
    setLoading(true);
    const [t, c] = await Promise.all([testimonialService.getAll(), companyService.getAll()]);
    setData(t.data);
    setCompanies(c.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const openAdd  = ()    => { setForm(empty); setModal(true); };
  const openEdit = (row) => { setForm(row);   setModal(true); };
  const closeModal = ()  => { setModal(false); setForm(empty); };

  const save = async () => {
    if (form.id) await testimonialService.update(form.id, form);
    else await testimonialService.create(form);
    await load();
    closeModal();
  };

  const remove = async (row) => {
    if (!confirm('¿Eliminar testimonio?')) return;
    await testimonialService.destroy(row.id);
    await load();
  };

  const columns = [
    { key: 'client_name', label: 'Cliente' },
    { key: 'company',     label: 'Empresa', render: (_, r) => r.company?.name ?? '-' },
    { key: 'rating',      label: 'Rating',  render: (v) => '★'.repeat(v) },
    { key: 'content',     label: 'Comentario', render: (v) => v?.substring(0, 60) + (v?.length > 60 ? '...' : '') },
  ];

  return (
    <AdminLayout>
      <CrudTable title="Testimonios" columns={columns} data={data} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={remove} />

      {modal && (
        <Modal title={form.id ? 'Editar Testimonio' : 'Nuevo Testimonio'} onClose={closeModal}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Empresa *</label>
            <select name="company_id" value={form.company_id || ''} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]">
              <option value="">Seleccionar...</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del cliente *</label>
            <input type="text" name="client_name" value={form.client_name || ''} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Comentario *</label>
            <textarea name="content" value={form.content || ''} onChange={handleChange} rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (1-5)</label>
            <input type="number" name="rating" min="1" max="5" value={form.rating || 5} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
          </div>
          <button onClick={save} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">Guardar</button>
        </Modal>
      )}
    </AdminLayout>
  );
}
