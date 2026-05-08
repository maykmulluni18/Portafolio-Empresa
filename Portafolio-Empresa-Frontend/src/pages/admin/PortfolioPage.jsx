import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import Modal from '../../components/Modal';
import { portfolioService } from '../../api/services';

const empty = { project_id: '', title: '', description: '', demo_url: '', visible: true };

export default function PortfolioPage() {
  const [data, setData]       = useState([]);
  const [modal, setModal]     = useState(false);
  const [form, setForm]       = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const r = await portfolioService.getAll();
    setData(r.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [e.target.name]: val }));
  };
  const openAdd  = ()    => { setForm(empty); setModal(true); };
  const openEdit = (row) => { setForm(row);   setModal(true); };
  const closeModal = ()  => { setModal(false); setForm(empty); };

  const save = async () => {
    if (form.id) await portfolioService.update(form.id, form);
    else await portfolioService.create(form);
    await load();
    closeModal();
  };

  const remove = async (row) => {
    if (!confirm(`¿Eliminar "${row.title}"?`)) return;
    await portfolioService.destroy(row.id);
    await load();
  };

  const columns = [
    { key: 'title',       label: 'Título' },
    { key: 'demo_url',    label: 'Demo', render: (v) => v ? <a href={v} target="_blank" rel="noreferrer" className="text-[#ea5959] underline">Ver</a> : '-' },
    { key: 'visible',     label: 'Visible', render: (v) => v ? '✓' : '✗' },
  ];

  return (
    <AdminLayout>
      <CrudTable title="Portafolio" columns={columns} data={data} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={remove} />

      {modal && (
        <Modal title={form.id ? 'Editar Entrada' : 'Nueva Entrada'} onClose={closeModal}>
          {!form.id && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">ID de Proyecto *</label>
              <input type="number" name="project_id" value={form.project_id || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
            </div>
          )}
          {[['Título *', 'title'], ['Descripción', 'description'], ['URL Demo', 'demo_url']].map(([label, name]) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type="text" name={name} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
            </div>
          ))}
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" name="visible" id="visible" checked={!!form.visible} onChange={handleChange} />
            <label htmlFor="visible" className="text-sm font-semibold text-gray-700">Visible en portafolio</label>
          </div>
          <button onClick={save} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">Guardar</button>
        </Modal>
      )}
    </AdminLayout>
  );
}
