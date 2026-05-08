import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import Modal from '../../components/Modal';
import { projectService, companyService, clientService } from '../../api/services';

const empty = { company_id: '', client_id: '', title: '', description: '', status: 'planning', visibility: 'private', budget: '', start_date: '', end_date: '' };

const statusColors = { planning: 'bg-yellow-100 text-yellow-700', in_progress: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', on_hold: 'bg-gray-100 text-gray-700', cancelled: 'bg-red-100 text-red-700' };

export default function ProjectsPage() {
  const [data, setData]         = useState([]);
  const [companies, setCompanies] = useState([]);
  const [clients, setClients]   = useState([]);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(empty);
  const [loading, setLoading]   = useState(true);

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
  const openAdd  = ()    => { setForm(empty); setModal(true); };
  const openEdit = (row) => { setForm(row);   setModal(true); };
  const closeModal = ()  => { setModal(false); setForm(empty); };

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
        onAdd={openAdd} onEdit={openEdit} onDelete={remove} />

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
    </AdminLayout>
  );
}
