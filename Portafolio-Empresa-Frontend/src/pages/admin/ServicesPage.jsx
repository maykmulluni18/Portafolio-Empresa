import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import Modal from '../../components/Modal';
import { serviceService, companyService } from '../../api/services';

const empty = { company_id: '', name: '', description: '', base_price: '', estimated_time: '' };

export default function ServicesPage() {
  const [data, setData]         = useState([]);
  const [companies, setCompanies] = useState([]);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(empty);
  const [loading, setLoading]   = useState(true);

  const load = async () => {
    setLoading(true);
    const [s, c] = await Promise.all([serviceService.getAll(), companyService.getAll()]);
    setData(s.data);
    setCompanies(c.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const openAdd  = ()    => { setForm(empty); setModal(true); };
  const openEdit = (row) => { setForm(row);   setModal(true); };
  const closeModal = ()  => { setModal(false); setForm(empty); };

  const save = async () => {
    if (form.id) await serviceService.update(form.id, form);
    else await serviceService.create(form);
    await load();
    closeModal();
  };

  const remove = async (row) => {
    if (!confirm(`¿Eliminar "${row.name}"?`)) return;
    await serviceService.destroy(row.id);
    await load();
  };

  const columns = [
    { key: 'name',           label: 'Nombre' },
    { key: 'company',        label: 'Empresa', render: (_, r) => r.company?.name ?? '-' },
    { key: 'base_price',     label: 'Precio',  render: (v) => v ? `$${v}` : '-' },
    { key: 'estimated_time', label: 'Tiempo' },
  ];

  return (
    <AdminLayout>
      <CrudTable title="Servicios" columns={columns} data={data} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={remove} />

      {modal && (
        <Modal title={form.id ? 'Editar Servicio' : 'Nuevo Servicio'} onClose={closeModal}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Empresa *</label>
            <select name="company_id" value={form.company_id} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]">
              <option value="">Seleccionar...</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          {[['Nombre', 'name'], ['Descripción', 'description'], ['Precio Base', 'base_price', 'number'], ['Tiempo estimado', 'estimated_time']].map(([label, name, type]) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input type={type || 'text'} name={name} value={form[name] || ''} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959]" />
            </div>
          ))}
          <button onClick={save} className="w-full py-3 bg-[#ea5959] text-white rounded-xl font-bold mt-2">Guardar</button>
        </Modal>
      )}
    </AdminLayout>
  );
}
