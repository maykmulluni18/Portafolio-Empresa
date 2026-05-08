import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import {
  companyService, serviceService, projectService,
  clientService, contactService, requestService,
} from '../../api/services';

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-black ${color || 'text-[#1e2730]'}`}>{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ companies: 0, projects: 0, clients: 0, contacts: 0, services: 0, requests: 0 });

  useEffect(() => {
    Promise.allSettled([
      companyService.getAll(),
      projectService.getAll(),
      clientService.getAll(),
      contactService.getAll(),
      serviceService.getAll(),
      requestService.getAll(),
    ]).then(([co, pr, cl, cn, sv, rq]) => {
      setStats({
        companies: co.value?.data?.length ?? 0,
        projects:  pr.value?.data?.length ?? 0,
        clients:   cl.value?.data?.length ?? 0,
        contacts:  cn.value?.data?.length ?? 0,
        services:  sv.value?.data?.length ?? 0,
        requests:  rq.value?.data?.length ?? 0,
      });
    });
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-[#1e2730] mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Empresas"   value={stats.companies} color="text-[#ea5959]" />
        <StatCard label="Proyectos"  value={stats.projects}  color="text-blue-600" />
        <StatCard label="Clientes"   value={stats.clients}   color="text-green-600" />
        <StatCard label="Servicios"  value={stats.services}  />
        <StatCard label="Solicitudes" value={stats.requests} color="text-yellow-600" />
        <StatCard label="Mensajes"   value={stats.contacts}  color="text-purple-600" />
      </div>
    </AdminLayout>
  );
}
