import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import Modal from '../../components/Modal';
import { clientService } from '../../api/services';

const empty = { name: '', email: '', phone: '', company_name: '' };

export default function ClientsPage() {
  const [data, setData]       = useState([]);
  const [modal, setModal]     = useState(false);
  const [form, setForm]       = useState(empty);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const r = await clientService.getAll();
    setData(r.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const openAdd  = ()    => { setForm(empty); setModal(true); };
  const openEdit = (row) => { setForm(row);   setModal(true); };
  const closeModal = ()  => { setModal(false); setForm(empty); };

  const save = async () => {
    if (form.id) await clientService.update(form.id, form);
    else await clientService.create(form);
    await load();
    closeModal();
  };

  const remove = async (row) => {
    if (!confirm(`¿Eliminar "${row.name}"?`)) return;
    await clientService.destroy(row.id);
    await load();
  };

  const columns = [
    { key: 'name',         label: 'Nombre' },
    { key: 'email',        label: 'Email' },
    { key: 'phone',        label: 'Teléfono' },
    { key: 'company_name', label: 'Empresa' },
  ];

  const fields = [['Nombre *', 'name'], ['Email', 'email', 'email'], ['Teléfono', 'phone'], ['Empresa', 'company_name']];

  return (
    <AdminLayout>
      <CrudTable title="Clientes" columns={columns} data={data} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={remove} />

      {modal && (
        <Modal title={form.id ? 'Editar Cliente' : 'Nuevo Cliente'} onClose={closeModal}>
          {fields.map(([label, name, type]) => (
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
