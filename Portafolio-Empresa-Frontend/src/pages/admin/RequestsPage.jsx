import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import Modal from '../../components/Modal';
import { requestService, clientService, serviceService } from '../../api/services';

const empty = { client_id: '', service_id: '', title: '', description: '', budget: '', status: 'pending' };
const statusColors = { pending: 'bg-yellow-100 text-yellow-700', reviewing: 'bg-blue-100 text-blue-700', approved: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700' };

export default function RequestsPage() {
  const [data, setData]         = useState([]);
  const [clients, setClients]   = useState([]);
  const [services, setServices] = useState([]);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(empty);
  const [loading, setLoading]   = useState(true);

  const load = async () => {
    setLoading(true);
    const [r, c, s] = await Promise.all([requestService.getAll(), clientService.getAll(), serviceService.getAll()]);
    setData(r.data);
    setClients(c.data);
    setServices(s.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const openAdd  = ()    => { setForm(empty); setModal(true); };
  const openEdit = (row) => { setForm(row);   setModal(true); };
  const closeModal = ()  => { setModal(false); setForm(empty); };

  const save = async () => {
    if (form.id) await requestService.update(form.id, form);
    else await requestService.create(form);
    await load();
    closeModal();
  };

  const remove = async (row) => {
    if (!confirm(`¿Eliminar solicitud?`)) return;
    await requestService.destroy(row.id);
    await load();
  };

  const columns = [
    { key: 'title',  label: 'Título' },
    { key: 'client', label: 'Cliente',  render: (_, r) => r.client?.name ?? '-' },
    { key: 'service',label: 'Servicio', render: (_, r) => r.service?.name ?? '-' },
    { key: 'budget', label: 'Presupuesto', render: (v) => v ? `$${v}` : '-' },
    { key: 'status', label: 'Estado',   render: (v) => <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[v] ?? ''}`}>{v}</span> },
  ];

  return (
    <AdminLayout>
      <CrudTable title="Solicitudes" columns={columns} data={data} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={remove} />

      {modal && (
        <Modal title={form.id ? 'Editar Solicitud' : 'Nueva Solicitud'} onClose={closeModal}>
          {[['Cliente *', 'client_id', clients], ['Servicio *', 'service_id', services]].map(([label, name, opts]) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <select name={name} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]">
                <option value="">Seleccionar...</option>
                {opts.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          ))}
          {[['Título *', 'title'], ['Descripción', 'description'], ['Presupuesto', 'budget', 'number']].map(([label, name, type]) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type={type || 'text'} name={name} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]">
              {['pending','reviewing','approved','rejected'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={save} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">Guardar</button>
        </Modal>
      )}
    </AdminLayout>
  );
}
