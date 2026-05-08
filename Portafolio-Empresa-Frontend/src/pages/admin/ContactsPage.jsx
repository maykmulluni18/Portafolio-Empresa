import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import CrudTable from '../../components/CrudTable';
import { contactService } from '../../api/services';

export default function ContactsPage() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const r = await contactService.getAll();
    setData(r.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (row) => {
    if (!confirm('¿Eliminar mensaje?')) return;
    await contactService.destroy(row.id);
    await load();
  };

  const columns = [
    { key: 'name',    label: 'Nombre' },
    { key: 'email',   label: 'Email' },
    { key: 'message', label: 'Mensaje', render: (v) => v?.substring(0, 80) + (v?.length > 80 ? '...' : '') },
    { key: 'created_at', label: 'Fecha', render: (v) => v ? new Date(v).toLocaleDateString('es') : '-' },
  ];

  return (
    <AdminLayout>
      <CrudTable title="Mensajes de Contacto" columns={columns} data={data} loading={loading}
        onDelete={remove} />
    </AdminLayout>
  );
}
